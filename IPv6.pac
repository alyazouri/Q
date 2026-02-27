// ============================================================
//  JORDAN PUBG MOBILE — FULL STRICT LOCK v9 ULTRA
//  IPv6 ONLY — COMPETITIVE STABLE ENGINE
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// CORE ENGINE
// ============================================================

var C = {
  started: false,
  root: null,
  region48: null,
  match64: {},
  maxMatch64: 8
};

// ============================================================
// JORDAN ROOTS
// ============================================================

var ROOTS = [
  "2a00:18d8",
  "2a01:9700",
  "2a00:18d0",
  "2a07:140",
  "2a01:1d0",
  "2a02:9c0"
];

// ============================================================
// TRAFFIC CLASSIFICATION
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
function is6(ip){ return ip && ip.indexOf(":") !== -1; }
function valid(ip){ return /^[0-9a-f:]+$/i.test(ip); }

function rootMatch(ip){
  for (var i=0;i<ROOTS.length;i++){
    if (ip.indexOf(ROOTS[i]) === 0) return ROOTS[i];
  }
  return null;
}

function classify(h,u){
  var d=(h+u).toLowerCase();
  if (SIG.MATCH.test(d) || SIG.SEC.test(d)) return 2;
  if (SIG.LOBBY.test(d)) return 1;
  return 0;
}

function isGame(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

function excluded(h){
  return shExpMatch(h,"*.youtube.com") ||
         shExpMatch(h,"*.googlevideo.com") ||
         shExpMatch(h,"github.com") ||
         shExpMatch(h,"*.githubusercontent.com");
}

// ============================================================
// MAIN
// ============================================================

function FindProxyForURL(url, host){

  if (isPlainHostName(host)) return DIRECT;
  if (excluded(host)) return DIRECT;
  if (!isGame(host,url)) return DIRECT;

  var ip="";
  try{ ip=dnsResolve(host);}catch(e){ip="";}

  if (!ip || !is6(ip)) return BLOCK;

  ip = norm(ip);
  if (!valid(ip)) return BLOCK;

  var root = rootMatch(ip);
  if (!root) return BLOCK;

  var parts = ip.split(":");
  var net48 = parts.slice(0,4).join(":");
  var net64 = parts.slice(0,5).join(":");

  var phase = classify(host,url);

  // ============================================================
  // INITIAL REGION LOCK
  // ============================================================

  if (!C.started){
    C.started  = true;
    C.root     = root;
    C.region48 = net48;
  }

  // ASN HARD LOCK
  if (root !== C.root) return BLOCK;

  // REGION HARD LOCK
  if (phase >= 1){
    if (net48 !== C.region48) return BLOCK;
  }

  // MATCH INTELLIGENT /64 POOL
  if (phase === 2){

    if (!C.match64[net64]){

      var count = 0;
      for (var k in C.match64) count++;

      if (count >= C.maxMatch64){
        return BLOCK;
      }

      C.match64[net64] = true;
    }
  }

  return PROXY;
}
