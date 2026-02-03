// ============================================================
// GAME BOOSTER ALPHA v2.0 (PREFIX OPTIMIZED)
// Ultra-fast PAC for PUBG Mobile
// LOCATION LOCK: AMMAN - ABDALI
// ============================================================

// ================= CONFIG =================
var CONFIG = {
  // FIXED AMMAN PROXY (ABDALI)
  MATCH_TIER1: "PROXY 46.185.131.218:20001",
  MATCH_TIER2: "PROXY 46.185.131.218:20001",
  MATCH_TIER3: "PROXY 46.185.131.218:20001",

  LOBBY_FAST: [
    "PROXY 46.185.131.218:20001"
  ],

  VOICE_PROXY: "PROXY 46.185.131.218:20001",
  CDN_DIRECT: "DIRECT",
  BLOCK: "PROXY 127.0.0.1:9",
  DIRECT: "DIRECT",

  DNS_CACHE_TIME: 600000,
  STICKY_SESSION_TIME: 1800000,
  AGGRESSIVE_BLOCK: true
};

// ================= JORDAN PREFIX TABLES (AMMAN ONLY) =================
var JORDAN_PREFIX_8 = {
  "46":1,
  "176":1,
  "37":1,
  "77":1
};

var JORDAN_PREFIX_16 = {
  // ORANGE / ZAIN / UMNIAH — AMMAN (ABDALI)
  "46.185":1,
  "46.184":1,
  "176.29":1,
  "176.28":1,
  "37.202":1,
  "77.245":1
};

// ================= HIGH LATENCY BLOCK PREFIX =================
var BLOCKED_PREFIX_8 = {
  "1":1,"2":1,"5":1,"14":1,"27":1,"31":1,"36":1,
  "39":1,"42":1,"49":1,"51":1,"58":1,"59":1,
  "60":1,"61":1,"78":1,"80":1,"82":1,"83":1,
  "84":1,"86":1,"87":1,"88":1,"89":1,"90":1,
  "91":1,"92":1,"95":1,"101":1,"103":1,"106":1,
  "109":1,"110":1,"111":1,"112":1,"113":1,
  "114":1,"115":1,"116":1,"117":1,"118":1,
  "119":1,"120":1,"121":1,"122":1,"123":1,
  "124":1,"125":1,"128":1,"129":1,"130":1,
  "131":1,"132":1,"133":1,"134":1,"135":1,
  "163":1,"182":1,"183":1,"202":1,"203":1,
  "210":1,"211":1,"218":1,"219":1,"220":1,
  "221":1,"222":1,"223":1
};

// ================= SESSION =================
var SESSION = {
  match:{networkPrefix:null,hostname:null,proxy:null,startTime:0,locked:false},
  dns:{},
  counters:{match:0,lobby:0,block:0}
};

// ================= FAST HELPERS =================
function cleanHost(h){var i=h.indexOf(':');return i===-1?h:h.substring(0,i);}
function getPrefix16(ip){var d=ip.indexOf('.');var d2=ip.indexOf('.',d+1);return ip.substring(0,d2);}
function getPrefix24(ip){var p=ip.split('.');return p[0]+"."+p[1]+"."+p[2];}

function isJordanIP(ip){
  var d=ip.indexOf('.');
  var p8=ip.substring(0,d);
  if(!JORDAN_PREFIX_8[p8]) return false;
  var p16=getPrefix16(ip);
  return !!JORDAN_PREFIX_16[p16];
}

function isHighLatencyIP(ip){
  var p8=ip.substring(0,ip.indexOf('.'));
  return !!BLOCKED_PREFIX_8[p8];
}

function fastResolve(host){
  var now=Date.now();
  var c=SESSION.dns[host];
  if(c && now-c.t<CONFIG.DNS_CACHE_TIME) return c.ip;
  var ip=dnsResolve(host);
  if(ip && ip.indexOf(':')===-1){
    SESSION.dns[host]={ip:ip,t:now};
    return ip;
  }
  return c?c.ip:null;
}

function pickLobbyProxy(host,ip){
  return CONFIG.LOBBY_FAST[0];
}

// ================= TRAFFIC DETECTION =================
function hasAny(t,k){t=t.toLowerCase();for(var i=0;i<k.length;i++)if(t.indexOf(k[i])!==-1)return true;return false;}
function isPUBG(h){return hasAny(h,['pubg','tencent','krafton','lightspeed','proximabeta','levelinfinite']);}
function isMatch(u,h){return hasAny(u+h,['match','battle','realtime','pvp','udp','arena']);}
function isLobby(u,h){return hasAny(u+h,['lobby','matchmaking','queue','gateway']);}
function isVoice(u,h){return hasAny(u+h,['voice','rtc','webrtc','agora']);}
function isCDN(u,h){return hasAny(u+h,['cdn','asset','static','patch','update']);}

// ================= MAIN =================
function FindProxyForURL(url, host){

  host=cleanHost(host.toLowerCase());
  if(!isPUBG(host)) return CONFIG.DIRECT;

  var ip=fastResolve(host);
  if(!ip){SESSION.counters.block++;return CONFIG.BLOCK;}

  if(CONFIG.AGGRESSIVE_BLOCK && isHighLatencyIP(ip)){
    SESSION.counters.block++;return CONFIG.BLOCK;
  }

  // MATCH
  if(isMatch(url,host)){
    SESSION.counters.match++;
    if(!isJordanIP(ip)) return CONFIG.BLOCK;

    var p24=getPrefix24(ip), now=Date.now();

    if(!SESSION.match.locked){
      SESSION.match={networkPrefix:p24,hostname:host,proxy:CONFIG.MATCH_TIER1,startTime:now,locked:true};
      return CONFIG.MATCH_TIER1;
    }

    if(p24===SESSION.match.networkPrefix)
      return SESSION.match.proxy;

    return CONFIG.BLOCK;
  }

  // VOICE
  if(isVoice(url,host)){
    return isJordanIP(ip)?CONFIG.VOICE_PROXY:CONFIG.DIRECT;
  }

  // MATCH LOCKED
  if(SESSION.match.locked && Date.now()-SESSION.match.startTime<CONFIG.STICKY_SESSION_TIME){
    if(isCDN(url,host)) return CONFIG.CDN_DIRECT;
    return CONFIG.BLOCK;
  }

  // LOBBY
  if(isLobby(url,host)){
    if(!isJordanIP(ip)) return CONFIG.BLOCK;
    return CONFIG.LOBBY_FAST[0];
  }

  // CDN
  if(isCDN(url,host)) return CONFIG.CDN_DIRECT;

  // GENERAL
  if(isJordanIP(ip)) return CONFIG.LOBBY_FAST[0];

  return CONFIG.BLOCK;
}
