(function () {
"use strict";

/*══════════════════════════════════════════════
   BLACKBOX AGENT 6.0 – JORDAN LOW LATENCY
══════════════════════════════════════════════*/

const CONFIG = {
    MATCH_PROXY: { host: "46.185.131.218", port: 20001, protocol: "PROXY" },

    LOBBY_POOL: [
        { host: "212.35.66.45", port: 8085, protocol: "PROXY", weight: 3 },
        { host: "212.35.66.45", port: 8181, protocol: "PROXY", weight: 2 },
        { host: "46.185.131.218", port: 443,  protocol: "PROXY", weight: 1 }
    ],

    CACHE_TTL: 300000,
    SESSION_TIMEOUT: 30000,
    RATE_WINDOW: 5000,
    RATE_LIMIT: 120
};

/*════════════════ SESSION ════════════════*/

const SESSION = {
    matchIP: null,
    matchHost: null,
    matchMode: null,
    matchTimestamp: null,
    dnsCache: new Map(),
    rateTracker: new Map()
};

/*════════════════ UTILITIES ════════════════*/

function isValidIPv4(ip) {
    if (!ip) return false;
    const p = ip.split(".");
    if (p.length !== 4) return false;
    for (let x of p) {
        if (!/^\d+$/.test(x)) return false;
        const n = parseInt(x);
        if (n < 0 || n > 255) return false;
    }
    return true;
}

function ipToLong(ip){
    return ip.split('.').reduce((a,o)=>(a<<8)+parseInt(o),0)>>>0;
}

/*════════════════ 6 STRONG JORDAN RANGES ════════════════*/

const JORDAN_RANGES = [
    ["37.252.0.0","255.255.0.0"],
    ["94.127.0.0","255.255.0.0"],
    ["176.29.0.0","255.255.0.0"],
    ["178.77.0.0","255.255.0.0"],
    ["176.57.0.0","255.255.0.0"],
    ["149.200.0.0","255.255.0.0"]
];

function inJordan(ip){
    if(!isValidIPv4(ip)) return false;
    for(let r of JORDAN_RANGES){
        if((ipToLong(ip)&ipToLong(r[1]))===ipToLong(r[0]))
            return true;
    }
    return false;
}

/*════════════════ RATE LIMIT ════════════════*/

function rateLimit(host){
    const now = Date.now();
    const arr = SESSION.rateTracker.get(host)||[];
    const recent = arr.filter(t=>now-t<CONFIG.RATE_WINDOW);
    recent.push(now);
    SESSION.rateTracker.set(host,recent);
    return recent.length<=CONFIG.RATE_LIMIT;
}

/*════════════════ DNS PROTECTION ════════════════*/

function secureDNS(host){
    const now = Date.now();
    const cached = SESSION.dnsCache.get(host);

    if(cached && (now-cached.time<CONFIG.CACHE_TTL))
        return cached.ip;

    const ip = dnsResolve(host);
    if(!isValidIPv4(ip)) return null;

    if(cached && cached.ip!==ip && (now-cached.time<10000))
        return null;

    SESSION.dnsCache.set(host,{ip:ip,time:now});
    return ip;
}

/*════════════════ BLOCK RULES ════════════════*/

function isBlockedIP(ip){
    if(!ip||ip.indexOf(":")!==-1) return true;
    const p=[/^127\./,/^10\./,/^192\.168\./,/^172\.(1[6-9]|2\d|3[0-1])\./,/^169\.254\./,/^0\./];
    return p.some(x=>x.test(ip));
}

/*════════════════ MODE CLASSIFICATION ════════════════*/

const MODES={
    HIGH:/match|battle|ranked|classic|arena|war|payload|zombie|metro/i,
    MEDIUM:/lobby|queue|store|spin|inventory|event|esports/i,
    LOW:/cdn|asset|patch|analytics|telemetry/i,
    ANTICHEAT:/anticheat|security|verify|shield|ban/i
};

function classify(url,host){
    const i=(url+" "+host).toLowerCase();
    for(let k in MODES)
        if(MODES[k].test(i)) return k;
    return "UNKNOWN";
}

function isPUBG(host){
    return /(pubg|tencent|krafton|levelinfinite)/i.test(host);
}

/*════════════════ WEIGHTED LOAD ════════════════*/

function weightedLobby(host){
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

    return "DIRECT";
}

/*════════════════ SESSION CONTROL ════════════════*/

function validateSession(ip,host,mode){
    if(!SESSION.matchTimestamp) return false;
    if((Date.now()-SESSION.matchTimestamp)>CONFIG.SESSION_TIMEOUT)
        return false;
    if(SESSION.matchIP!==ip) return false;
    if(SESSION.matchHost!==host) return false;
    if(SESSION.matchMode!==mode) return false;
    return true;
}

function createSession(ip,host,mode){
    SESSION.matchIP=ip;
    SESSION.matchHost=host;
    SESSION.matchMode=mode;
    SESSION.matchTimestamp=Date.now();
}

/*════════════════ MAIN FUNCTION ════════════════*/

function FindProxyForURL(url,host){
    try{

        if(!rateLimit(host)) return "BLOCK";
        if(!isPUBG(host)) return "DIRECT";

        const ip=secureDNS(host);
        if(!ip) return "BLOCK";
        if(isBlockedIP(ip)) return "BLOCK";

        /* 🔥 الأردن فقط */
        if(!inJordan(ip))
            return "DIRECT";

        const mode=classify(url,host);

        if(mode==="ANTICHEAT")
            return "DIRECT";

        if(mode==="HIGH"){
            if(!validateSession(ip,host,mode))
                createSession(ip,host,mode);

            return CONFIG.MATCH_PROXY.protocol+" "+
                   CONFIG.MATCH_PROXY.host+":"+
                   CONFIG.MATCH_PROXY.port;
        }

        if(mode==="MEDIUM"||mode==="LOW")
            return weightedLobby(host);

        return "DIRECT";

    }catch(e){
        return "BLOCK";
    }
}

})();
