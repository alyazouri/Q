// ============================================================
//  JORDAN PUBG MOBILE — HIGH DENSITY FINAL
//  IPv6 ONLY — JORDAN LOCK — EGYPT/EU BLOCK
//  /48 REGION LOCK — /64 MATCH POOL (3)
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// CORE STATE
// ============================================================

var J = {
  region48: null,
  match64Pool: {},
  maxMatch64: 3
};

// ============================================================
// ✅ JORDAN ASN ROOTS
// ============================================================

var ALLOWED_ROOTS = [
  "2a00:18d8", // Orange
  "2a01:9700", // JDC
  "2a00:18d0", // Damamax
  "2a07:140",  // JEIS
  "2a01:1d0",  // Vtel
  "2a02:9c0"   // NITC
];

// ============================================================
// 🚫 BLOCK EGYPT / EUROPE COMMON RANGES
// ============================================================

var BLOCKED_ROOTS = [
  "2c0f:",      
  "2a02:2f",
  "2a03:",
  "2a01:4f8",
  "2a01:7e"
];

// ============================================================
// TRAFFIC CLASSIFICATION (ALL PUBG MODES)
// ============================================================

var SIG = {

  MATCH: /match|battle|classic|ranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|payload|metro|metroroyale|zombie|infection|evoground|royale|training|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gaming|realtime|gamesvr|relay|voice|customroom|room|scrim|tournament/i,

  LOBBY: /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|shop|news|patch|update|cdn|asset|config|feedback|event|mission|reward|season|rank|progress/i
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
  for (var i=0;i<missing;i++) zeros.push("0");

  return left.concat(zeros).concat(right).join(":");
}

function startsWithAny(ip, list){
  for (var i=0;i<list.length;i++){
    if (ip.indexOf(list[i]) === 0) return true;
  }
  return false;
}

function classify(host,url){
  var d=(host+url).toLowerCase();
  if (SIG.MATCH.test(d)) return 2;
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

  if (startsWithAny(ip, BLOCKED_ROOTS)) return BLOCK;
  if (!startsWithAny(ip, ALLOWED_ROOTS)) return BLOCK;

  var parts = ip.split(":");
  if (parts.length !== 8) return BLOCK;

  var net48 = parts.slice(0,4).join(":");
  var net64 = parts.slice(0,5).join(":");

  var phase = classify(host,url);

  // ============================
  // LOCK /48 AFTER LOBBY
  // ============================

  if (phase === 1 && !J.region48){
    J.region48 = net48;
  }

  if (!J.region48) return PROXY;

  if (net48 !== J.region48) return BLOCK;

  // ============================
  // MATCH /64 POOL
  // ============================

  if (phase === 2){

    if (!J.match64Pool[net64]){

      var count=0;
      for (var k in J.match64Pool) count++;

      if (count >= J.maxMatch64) return BLOCK;

      J.match64Pool[net64] = true;
    }
  }

  return PROXY;
}
