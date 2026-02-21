(function () {
"use strict";

/*══════════════════════════════════════════════
   BLACKBOX AGENT 7.3 – PERFORMANCE EDITION
   Optimized for Lowest Possible Latency
══════════════════════════════════════════════*/

const CONFIG = {
    LOBBY_POOL: [
        { host: "212.35.66.45", port: 8085, protocol: "PROXY", weight: 4 },
        { host: "212.35.66.45", port: 8181, protocol: "PROXY", weight: 3 },
        { host: "46.185.131.218", port: 443,  protocol: "PROXY", weight: 2 }
    ],

    CACHE_TTL: 300000,
    SESSION_TIMEOUT: 30000,
    RATE_WINDOW: 5000,
    RATE_LIMIT: 200
};

const SESSION = {
    matchIP: null,
    matchHost: null,
    matchMode: null,
    matchTimestamp: null,
    dnsCache: new Map(),
    rateTracker: new Map(),
    failoverIndex: 0
};

/*════════════════ UTILITIES ════════════════*/

function isValidIPv4(ip){
    if(!ip) return false;
    const p=ip.split(".");
    if(p.length!==4) return false;
    for(let x of p){
        if(!/^\d+$/.test(x)) return false;
        const n=parseInt(x);
        if(n<0||n>255) return false;
    }
    return true;
}

function rateLimit(host){
    const now=Date.now();
    const arr=SESSION.rateTracker.get(host)||[];
    const recent=arr.filter(t=>now-t<CONFIG.RATE_WINDOW);
    recent.push(now);
    SESSION.rateTracker.set(host,recent);
    return recent.length<=CONFIG.RATE_LIMIT;
}

function secureDNS(host){
    const now=Date.now();
    const cached=SESSION.dnsCache.get(host);

    if(cached && (now-cached.time<CONFIG.CACHE_TTL))
        return cached.ip;

    const ip=dnsResolve(host);
    if(!isValidIPv4(ip)) return null;

    SESSION.dnsCache.set(host,{ip:ip,time:now});
    return ip;
}

function isBlockedIP(ip){
    if(!ip||ip.indexOf(":")!==-1) return true;
    const p=[/^127\./,/^10\./,/^192\.168\./,/^172\.(1[6-9]|2\d|3[0-1])\./,/^169\.254\./,/^0\./];
    return p.some(x=>x.test(ip));
}

/*════════════════ PRIORITY ENGINE ════════════════*/

const PRIORITY={
    CRITICAL:/match|battle|ranked|classic|arena|war|payload|zombie|metro/i,
    IMPORTANT:/lobby|queue|store|inventory|event|esports/i,
    BACKGROUND:/cdn|asset|patch|analytics|telemetry/i,
    SECURITY:/anticheat|verify|shield|ban/i
};

function classify(url,host){
    const i=(url+" "+host).toLowerCase();
    for(let k in PRIORITY)
        if(PRIORITY[k].test(i)) return k;
    return "UNKNOWN";
}

function isPUBG(host){
    return /(pubg|tencent|krafton|levelinfinite)/i.test(host);
}

/*════════════════ WEIGHTED ROUTER ════════════════*/

function adaptiveLobby(host){

    let total=0;
    CONFIG.LOBBY_POOL.forEach(p=>total+=p.weight);

    let hash=0;
    for(let i=0;i<host.length;i++){
        hash=((hash<<5)-hash)+host.charCodeAt(i);
        hash|=0;
    }

    let val=Math.abs(hash)%total;

    for(let p of CONFIG.LOBBY_POOL){
        if(val<p.weight)
            return p.protocol+" "+p.host+":"+p.port;
        val-=p.weight;
    }

    SESSION.failoverIndex=
        (SESSION.failoverIndex+1)%CONFIG.LOBBY_POOL.length;

    const f=CONFIG.LOBBY_POOL[SESSION.failoverIndex];
    return f.protocol+" "+f.host+":"+f.port;
}

/*════════════════ MAIN PAC FUNCTION ════════════════*/

function FindProxyForURL(url,host){
    try{

        if(!rateLimit(host)) return "DIRECT";

        if(!isPUBG(host))
            return "DIRECT";

        const ip=secureDNS(host);
        if(!ip) return "DIRECT";
        if(isBlockedIP(ip)) return "DIRECT";

        const mode=classify(url,host);

        /* SECURITY always direct */
        if(mode==="SECURITY")
            return "DIRECT";

        /* CRITICAL GAME TRAFFIC – DIRECT FOR LOWEST LATENCY */
        if(mode==="CRITICAL")
            return "DIRECT";

        /* IMPORTANT & BACKGROUND → Adaptive Proxy */
        if(mode==="IMPORTANT"||mode==="BACKGROUND")
            return adaptiveLobby(host);

        return "DIRECT";

    }catch(e){
        return "DIRECT";
    }
}

})();
