// ============================================================
//  NETWORK STABLE FLOW — PUBG UNIFIED VERSION
//  IPv6 Only
//  Single Unified Traffic Detection
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  gameNet64: null,
  gameNet48: null
};

var ALLOWED_PREFIXES = [
  "2a00:18d8:0000","2a00:18d8:0002","2a00:18d8:0003",
  "2a00:18d8:4000","2a00:18d8:4001","2a00:18d8:4002",
  "2a03:6b02:2000",
  "2a01:9700:1700","2a01:9700:1c00","2a01:9700:3100",
  "2a01:9700:3200","2a01:9700:3300","2a01:9700:3400","2a01:9700:3500"
];

// ---------- IPv6 Helpers ----------

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

function expandIPv6(addr){
  var full = [];
  var halves = addr.split("::");

  if(halves.length === 2){
    var left  = halves[0] ? halves[0].split(":") : [];
    var right = halves[1] ? halves[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left.concat(Array(missing).fill("0")).concat(right);
  } else {
    full = addr.split(":");
  }

  for(var i=0;i<full.length;i++){
    while(full[i].length < 4) full[i] = "0" + full[i];
  }

  return full;
}

function isAllowedIPv6(ip){
  if(!isIPv6(ip)) return false;

  var parts = expandIPv6(ip);
  var net48 = parts.slice(0,3).join(":");

  for(var i=0;i<ALLOWED_PREFIXES.length;i++){
    if(net48 === ALLOWED_PREFIXES[i]) return true;
  }
  return false;
}

// ============================================================
//  PUBG Unified Traffic Detection (ALL SERVICES)
// ============================================================

function isPubgTraffic(data){
  return /gamesvr|realtime|relay|world|udp|search|matchmaking|queue|matching|dispatch|lobby|login|auth|region|gateway|session|profile|account|friends|social|presence|chat|group|team|party|invite|squad|duo|solo|opponent|enemy|ranking|leaderboard|recruit|recruitment|pool|battlepool|inventory|store|shop|catalog|news|event|mission|reward|season|pass|update|patch|cdn|asset|config|feedback|mail|notice|community|announcement|ugc|clan|guild/i.test(data);
}

// ============================================================
//  MAIN
// ============================================================

function FindProxyForURL(url, host){

  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ ip=""; }

  if(isPlainHostName(host)) return DIRECT;

  if(!ip || !isIPv6(ip)) return BLOCK;
  if(!isAllowedIPv6(ip)) return BLOCK;

  var parts = expandIPv6(ip);
  var net64 = parts.slice(0,4).join(":");
  var net48 = parts.slice(0,3).join(":");

  var data = (host + url).toLowerCase();

  // ===== PUBG TRAFFIC ONLY =====
  if(isPubgTraffic(data)){

    // Lock during active realtime gameplay only
    if(/gamesvr|realtime|relay|world|udp/i.test(data)){

      if(!SESSION.gameNet64){
        SESSION.gameNet64 = net64;
        SESSION.gameNet48 = net48;
        return PROXY;
      }

      if(net64 === SESSION.gameNet64) return PROXY;
      if(net48 === SESSION.gameNet48) return PROXY;

      return BLOCK;
    }

    // All other PUBG services
    return PROXY;
  }

  return PROXY;
}
