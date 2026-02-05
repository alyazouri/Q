// =====================================================================
// PUBG MOBILE — INSANE MODE (FINAL)
// Lobby Open / Match Jordan CORE-ONLY
// Production-grade PAC — No Proxy, DIRECT routing
// =====================================================================

// ===================== CONFIG =====================
var INSANE_CONFIG = {
  MATCH_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  IDLE_TIMEOUT_MS: 90 * 1000,       // idle reset
  LOBBY_FALLBACK_MS: 3 * 60 * 1000  // lobby-only fallback
};

// ===================== UTILS =====================
function normalize(h){ var i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }
function now(){ return new Date().getTime(); }
function subnet24(ip){ return ip.split(".").slice(0,3).join("."); }
function hardDrop(){ return "PROXY 127.0.0.1:9"; }

// ===================== PUBG IDENT =====================
function isPUBG(host){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|intlgame|battlegrounds/i
    .test(host);
}

// ===================== JORDAN CORE-ONLY (MAX STABILITY) =====================
// *No CGNAT*, *No wide pools*, *Core/Fiber slices only*
function isJordanInsaneCore(ip){
  return (
    // UMNIAH — Core slices
    isInNet(ip, "46.185.128.0", "255.255.192.0") ||
    isInNet(ip, "46.185.192.0", "255.255.224.0") ||

    // ORANGE JORDAN — Core/Fiber
    isInNet(ip, "212.35.64.0",  "255.255.240.0") ||
    isInNet(ip, "212.35.80.0",  "255.255.240.0") ||

    // ZAIN — Core only
    isInNet(ip, "79.134.0.0",   "255.255.192.0") ||

    // Local Amman IX / DC (stable peering)
    isInNet(ip, "185.37.0.0",   "255.255.252.0") ||
    isInNet(ip, "185.52.0.0",   "255.255.252.0") ||
    isInNet(ip, "185.194.0.0",  "255.255.252.0")
  );
}

// ===================== TRAFFIC CLASSIFIER =====================
function classifyTraffic(url, host){
  var s=(url+host).toLowerCase();

  // Real-time gameplay
  if (/match|battle|realtime|sync|tick|ingame|frame|state|action|damage|kill|position|movement/.test(s))
    return "match";

  // Lobby / matchmaking / social
  if (/lobby|queue|gateway|dispatch|matchmaking|ready|waiting|countdown|friends|social|chat|voice/.test(s))
    return "lobby";

  // CDN / updates
  if (/cdn|asset|patch|update|download/.test(s))
    return "cdn";

  return "other";
}

// ===================== MATCH SESSION =====================
var MATCH_SESSION = {
  active:false,
  serverIP:null,
  subnet:null,
  startAt:0,
  lastSeen:0,
  lobbySince:0,
  reset:function(){
    this.active=false;
    this.serverIP=null;
    this.subnet=null;
    this.startAt=0;
    this.lastSeen=0;
    this.lobbySince=0;
  }
};

// ===================== MAIN =====================
function FindProxyForURL(url, host){

  host = normalize(host.toLowerCase());

  // Non-PUBG → DIRECT
  if (!isPUBG(host)) return "DIRECT";

  var ip = dnsResolve(host);
  if (!ip || ip.indexOf(":")!==-1) return hardDrop();

  var t = classifyTraffic(url, host);
  var ts = now();

  // ---- Auto Reset (timeout / idle) ----
  if (MATCH_SESSION.active){
    if (ts - MATCH_SESSION.startAt > INSANE_CONFIG.MATCH_TIMEOUT_MS){
      MATCH_SESSION.reset();
    } else if (ts - MATCH_SESSION.lastSeen > INSANE_CONFIG.IDLE_TIMEOUT_MS){
      MATCH_SESSION.reset();
    }
  }

  // ---- LOBBY / CDN / OTHER (OPEN) ----
  if (t==="lobby" || t==="cdn" || t==="other"){
    if (!MATCH_SESSION.active){
      if (!MATCH_SESSION.lobbySince) MATCH_SESSION.lobbySince = ts;
      // Lobby-only fallback after wait
      if (ts - MATCH_SESSION.lobbySince > INSANE_CONFIG.LOBBY_FALLBACK_MS){
        return "DIRECT";
      }
    }
    return "DIRECT";
  }

  // ---- MATCH (INSANE CORE-ONLY) ----
  if (t==="match"){

    // First packet → must be Jordan CORE
    if (!MATCH_SESSION.active){
      if (!isJordanInsaneCore(ip)) return hardDrop();

      MATCH_SESSION.active = true;
      MATCH_SESSION.serverIP = ip;
      MATCH_SESSION.subnet = subnet24(ip);
      MATCH_SESSION.startAt = ts;
      MATCH_SESSION.lastSeen = ts;
      MATCH_SESSION.lobbySince = 0;
      return "DIRECT";
    }

    // Ongoing match → update activity
    MATCH_SESSION.lastSeen = ts;

    // Pinning: same IP + same /24
    if (ip !== MATCH_SESSION.serverIP) return hardDrop();
    if (subnet24(ip) !== MATCH_SESSION.subnet) return hardDrop();

    return "DIRECT";
  }

  // Default safety
  return hardDrop();
}
// =====================================================================
// END OF FILE
// =====================================================================
