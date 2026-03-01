// ============================================================
//  PUBG MOBILE — IPv4 ULTRA HARD LOCK v2.1 + JO LIST
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// SESSION STATE
// ============================================================
var SESSION = {
  matchIP:      null,
  matchHost:    null,
  matchLocked:  false
};

// ============================================================
// ALLOWED IPv4 PREFIXES — Jordan Only
// ============================================================
var ALLOWED_IPV4 = [
  "2.59.52",
  "5.45.128",
  "5.198.240",
  "5.199.184",
  "37.17.192",
  "37.44.32",
  "37.75.144",
  "37.123.64",
  "37.152.0",
  "37.202.64",
  "37.220.112",
  "46.23.112",
  "46.32.96",
  "46.185.128",
  "46.248.192"
];

// ============================================================
// PRIORITY
// ============================================================
var PRIORITY = {
  CRITICAL: /match|battle|classic|ranked|competitive|arena|tdm|payload|metro|zombie|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|gaming|realtime|gamesvr|relay/i,
  LOBBY:    /lobby|matchmaking|queue|login|auth|gateway|session|profile|inventory|store|update|cdn|config|asset/i
};

// ============================================================
// HELPERS
// ============================================================
function isIPv4(ip) {
  return /^\d+\.\d+\.\d+\.\d+$/.test(ip);
}

function isAllowedIPv4(ip) {
  if (!isIPv4(ip)) return false;
  for (var i = 0; i < ALLOWED_IPV4.length; i++) {
    if (ip.indexOf(ALLOWED_IPV4[i]) === 0) return true;
  }
  return false;
}

function isPUBG(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ============================================================
// MAIN
// ============================================================
function FindProxyForURL(url, host) {

  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ ip=""; }

  // Local traffic
  if (isPlainHostName(host)) return DIRECT;

  // Non PUBG → Direct
  if (!isPUBG(host,url)) return DIRECT;

  // Only allowed IPv4
  if (!ip || !isAllowedIPv4(ip)) return BLOCK;

  var data = (host+url).toLowerCase();
  var isCritical = PRIORITY.CRITICAL.test(data);
  var isLobby    = PRIORITY.LOBBY.test(data);

  // ===== MATCH — HARD LOCK =====
  if (isCritical) {
    if (!SESSION.matchLocked) {
      SESSION.matchIP     = ip;
      SESSION.matchHost   = host;
      SESSION.matchLocked = true;
      return PROXY;
    }
    if (host !== SESSION.matchHost) return BLOCK;
    if (ip !== SESSION.matchIP) return BLOCK;
    return PROXY;
  }

  // ===== AFTER MATCH LOCK =====
  if (SESSION.matchLocked) {
    if (ip !== SESSION.matchIP) return BLOCK;
    if (host !== SESSION.matchHost) return BLOCK;
    return PROXY;
  }

  // ===== LOBBY =====
  if (isLobby) return PROXY;

  return PROXY;
}
