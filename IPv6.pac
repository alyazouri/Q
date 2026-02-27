// ============================================================
//  JORDAN PUBG MOBILE — MAX LOCAL DENSITY LOCK (MULTI ASN)
//  IPv6 ONLY — SINGLE /48 — SINGLE /64
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// CORE STATE
// ============================================================

var L = {
  active: false,
  root: null,
  region48: null,
  match64: null
};

// ============================================================
// 🔥 ALL JORDAN ASN ROOTS
// ============================================================

var ROOTS = [
  "2a00:18d8", // Orange
  "2a01:9700", // JDC
  "2a00:18d0", // Damamax
  "2a07:140",  // JEIS
  "2a01:1d0",  // Vtel
  "2a02:9c0"   // NITC
];

// ============================================================
// TRAFFIC SIGNATURES
// ============================================================

var SIG = {
  MATCH: /match|battle|ranked|arena|royale|classic|metro|payload|gamesvr|realtime|voice|relay|ingame/i,
  LOBBY: /lobby|matchmaking|queue|login|auth|gateway|session|profile|inventory|store|cdn|config/i,
  SEC:   /anticheat|verify|shield|security|ban|integrity/i
};

// ============================================================
// HELPERS
// ============================================================

function norm(ip){ return ip ? ip.toLowerCase() : ""; }
function isIPv6(ip){ return ip && ip.indexOf(":") !== -1; }
function validIPv6(ip){ return /^[0-9a-f:]+$/i.test(ip); }

function expandIPv6(ip){
  if (ip.indexOf("::") === -1) return ip;

  var parts = ip.split("::");
  var left = parts[0] ? parts[0].split(":") : [];
  var right = parts[1] ? parts[1].split(":") : [];

  var missing = 8 - (left.length + right.length);
  var zeros = [];

  for (var i = 0; i < missing; i++) zeros.push("0");

  return left.concat(zeros).concat(right).join(":");
}

function rootMatch(ip){
  for (var i=0;i<ROOTS.length;i++){
    if (ip.indexOf(ROOTS[i]) === 0) return ROOTS[i];
  }
  return null;
}

function classify(host,url){
  var d=(host+url).toLowerCase();
  if (SIG.MATCH.test(d) || SIG.SEC.test(d)) return 2;
  if (SIG.LOBBY.test(d)) return 1;
  return 0;
}

function isGame(host,url){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(host+url);
}

// ============================================================
// MAIN
// ============================================================

function FindProxyForURL(url, host){

  if (isPlainHostName(host)) return DIRECT;
  if (!isGame(host,url)) return DIRECT;

  var ip="";
  try{ ip=dnsResolve(host);}catch(e){ip="";}

  if (!ip || !isIPv6(ip)) return BLOCK;

  ip = norm(ip);
  if (!validIPv6(ip)) return BLOCK;

  ip = expandIPv6(ip);

  var root = rootMatch(ip);
  if (!root) return BLOCK;

  var parts = ip.split(":");
  if (parts.length !== 8) return BLOCK;

  var net48 = parts.slice(0,4).join(":");
  var net64 = parts.slice(0,5).join(":");

  var phase = classify(host,url);

  // INITIAL LOCK
  if (!L.active){
    L.active = true;
    L.root = root;
    L.region48 = net48;
  }

  // ASN HARD LOCK (must stay on same ASN after start)
  if (root !== L.root) return BLOCK;

  // /48 HARD LOCK
  if (phase >= 1){
    if (net48 !== L.region48) return BLOCK;
  }

  // /64 HARD MATCH LOCK
  if (phase === 2){
    if (!L.match64){
      L.match64 = net64;
    }
    if (net64 !== L.match64) return BLOCK;
  }

  return PROXY;
}
