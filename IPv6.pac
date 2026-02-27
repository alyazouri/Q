// ============================================================
//  JORDAN PUBG MOBILE — FULL STRICT LOCK v9 ULTRA STABLE
//  IPv6 ONLY — ASN LOCK — /48 REGION — /64 MATCH POOL
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// CORE STATE
// ============================================================

var C = {
  started: false,
  root: null,
  region48: null,
  match64: {},
  maxMatch64: 3
};

// ============================================================
// JORDAN ASN ROOT PREFIXES
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

function norm(ip){
  return ip ? ip.toLowerCase() : "";
}

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

function validIPv6(ip){
  return /^[0-9a-f:]+$/i.test(ip);
}

function rootMatch(ip){
  for (var i = 0; i < ROOTS.length; i++){
    if (ip.indexOf(ROOTS[i]) === 0){
      return ROOTS[i];
    }
  }
  return null;
}

function classify(host, url){
  var d = (host + url).toLowerCase();
  if (SIG.MATCH.test(d) || SIG.SEC.test(d)) return 2;
  if (SIG.LOBBY.test(d)) return 1;
  return 0;
}

function isGame(host, url){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(host + url);
}

function excluded(host){
  return shExpMatch(host,"*.youtube.com") ||
         shExpMatch(host,"*.googlevideo.com") ||
         shExpMatch(host,"github.com") ||
         shExpMatch(host,"*.githubusercontent.com");
}

// ============================================================
// MAIN ENGINE
// ============================================================

function FindProxyForURL(url, host){

  if (isPlainHostName(host)) return DIRECT;
  if (excluded(host)) return DIRECT;
  if (!isGame(host,url)) return DIRECT;

  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // Strict IPv6 only
  if (!ip || !isIPv6(ip)) return BLOCK;

  ip = norm(ip);

  if (!validIPv6(ip)) return BLOCK;

  // Prevent compressed IPv6 (::) to avoid split errors
  if (ip.indexOf("::") !== -1) return BLOCK;

  var root = rootMatch(ip);
  if (!root) return BLOCK;

  var parts = ip.split(":");

  if (parts.length < 5) return BLOCK;

  // Proper subnet extraction
  var net48 = parts.slice(0,4).join(":"); // /48
  var net64 = parts.slice(0,5).join(":"); // /64

  var phase = classify(host,url);

  // ============================================================
  // INITIAL LOCK
  // ============================================================

  if (!C.started){
    C.started  = true;
    C.root     = root;
    C.region48 = net48;
  }

  // ASN HARD LOCK
  if (root !== C.root) return BLOCK;

  // REGION /48 LOCK
  if (phase >= 1){
    if (net48 !== C.region48) return BLOCK;
  }

  // MATCH /64 POOL CONTROL
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
