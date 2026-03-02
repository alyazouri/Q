// ============================================================
//  JORDAN PUBG MOBILE — FULL STRICT LOCK v6.0
//  IPv6 ONLY — Exact Prefix Lock
//  Match: /64
//  Lobby: /48
//  Only Listed Prefixes Allowed
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// SESSION STATE
// ============================================================
var SESSION = {
  matchNet:  null,
  matchHost: null,
  lobbyNet:  null
};

// ============================================================
// PRIORITY
// ============================================================
var PRIORITY = {

  CRITICAL: /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|wow|cheer|training|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|war|sniper|quickmatch|arcade|battlefield|clash|gunfight|dispatch|ingame|gaming|realtime|gamesvr|gsvoice|relay/i,

  SECURITY:  /anticheat|verify|shield|security|ban|compliance|safeguard|integrity/i,

  LOBBY:     /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|news|patch|update|cdn|asset|config|feedback/i
};

// ============================================================
// EXCLUSIONS
// ============================================================
function isYouTube(h) {
  return shExpMatch(h, "*.youtube.com") ||
         shExpMatch(h, "*.googlevideo.com") ||
         shExpMatch(h, "*.ytimg.com") ||
         shExpMatch(h, "*.youtube-nocookie.com") ||
         shExpMatch(h, "youtu.be");
}

function isGitHub(h) {
  return shExpMatch(h, "github.com") ||
         shExpMatch(h, "*.github.com") ||
         shExpMatch(h, "*.githubusercontent.com") ||
         shExpMatch(h, "*.githubassets.com") ||
         shExpMatch(h, "api.github.com");
}

// ============================================================
// EXACT ALLOWED PREFIXES (From Screenshots)
// ============================================================
var ALLOWED_PREFIXES = [
  "2a01:9700","2a00:18d8","2001:32c0",
];

// ============================================================
// HELPERS
// ============================================================
function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function isAllowedIPv6(ip) {
  if (!isIPv6(ip)) return false;
  var ipLow = ip.toLowerCase();
  for (var i = 0; i < ALLOWED_PREFIXES.length; i++) {
    if (ipLow.indexOf(ALLOWED_PREFIXES[i]) === 0) return true;
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

  // Local
  if (isPlainHostName(host)) return DIRECT;

  // Exclusions
  if (isYouTube(host)) return DIRECT;
  if (isGitHub(host)) return DIRECT;

  // Non PUBG → Direct
  if (!isPUBG(host,url)) return DIRECT;

  // Block IPv4
  if (!ip || !isIPv6(ip)) return BLOCK;

  // Block if not in allowed prefixes
  if (!isAllowedIPv6(ip)) return BLOCK;

  var data = (host+url).toLowerCase();

  var isCritical = PRIORITY.CRITICAL.test(data);
  var isSecurity = PRIORITY.SECURITY.test(data);
  var isLobby    = PRIORITY.LOBBY.test(data);

  var parts = ip.split(":");

  // ===== MATCH / SECURITY → /64 lock =====
  if (isCritical || isSecurity) {

    var net64 = parts.slice(0,3).join(":");

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net64;
      SESSION.matchHost = host;
      return PROXY;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net64 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // ===== LOBBY → /48 lock =====
  if (isLobby) {

    var net48 = parts.slice(0,2).join(":");

    if (!SESSION.lobbyNet) {
      SESSION.lobbyNet = net48;
      return PROXY;
    }

    if (net48 !== SESSION.lobbyNet) return BLOCK;

    return PROXY;
  }

  return PROXY;
}
