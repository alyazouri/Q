// ============================================================
//  JORDAN PUBG MOBILE — FULL STRICT LOCK v7.0
//  IPv6 ONLY — Exact Prefix Lock (Safe Expanded)
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
// EXACT ALLOWED PREFIXES (/48 FORMAT EXPANDED)
// ============================================================
var ALLOWED_PREFIXES = [
  "2a00:18d8:0000",
  "2a00:18d8:0002",
  "2a00:18d8:0003",
  "2a00:18d8:4000",
  "2a00:18d8:4001",
  "2a00:18d8:4002",
  "2a03:6b02:2000",
  "2a01:9700:1700",
  "2a01:9700:1c00",
  "2a01:9700:3100",
  "2a01:9700:3200",
  "2a01:9700:3300",
  "2a01:9700:3400",
  "2a01:9700:3500"
];

// ============================================================
// HELPERS
// ============================================================

// Safe IPv6 detection
function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// Expand IPv6 to full 8 hextets
function expandIPv6(address) {
  var full = [];
  var halves = address.split("::");

  if (halves.length === 2) {
    var left  = halves[0] ? halves[0].split(":") : [];
    var right = halves[1] ? halves[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left.concat(Array(missing).fill("0")).concat(right);
  } else {
    full = address.split(":");
  }

  for (var i = 0; i < full.length; i++) {
    while (full[i].length < 4) full[i] = "0" + full[i];
  }

  return full;
}

// Check if IPv6 belongs to allowed /48
function isAllowedIPv6(ip) {
  if (!isIPv6(ip)) return false;

  var parts = expandIPv6(ip);
  var net48 = parts.slice(0,3).join(":");

  for (var i = 0; i < ALLOWED_PREFIXES.length; i++) {
    if (net48 === ALLOWED_PREFIXES[i]) return true;
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

  if (isPlainHostName(host)) return DIRECT;

  if (!isPUBG(host,url)) return DIRECT;

  if (!ip || !isIPv6(ip)) return BLOCK;

  if (!isAllowedIPv6(ip)) return BLOCK;

  var parts = expandIPv6(ip);
  var data = (host+url).toLowerCase();

  var isCritical = /match|battle|arena|classic|ranked|tdm|payload|metro|royale/i.test(data);
  var isSecurity = /anticheat|verify|shield|security|ban/i.test(data);
  var isLobby    = /lobby|matchmaking|queue|login|auth|region|gateway|session/i.test(data);

  // ===== MATCH / SECURITY → /64 lock =====
  if (isCritical || isSecurity) {

    var net64 = parts.slice(0,4).join(":");

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

    var net48 = parts.slice(0,3).join(":");

    if (!SESSION.lobbyNet) {
      SESSION.lobbyNet = net48;
      return PROXY;
    }

    if (net48 !== SESSION.lobbyNet) return BLOCK;

    return PROXY;
  }

  return PROXY;
}
