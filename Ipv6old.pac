// ============================================================
// JORDAN ULTRA STRICT LOCK v10 FINAL
// Fiber Optimized
// Europe Hard Block
// /40 + /64 + Full IP Lock During Match
// Lobby Flexible
// Auto Unlock When Leaving Match
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ================= SESSION =================

var SESSION = {
  locked40: null,
  locked64: null,
  lockedIP: null,
  matchActive: false
};

// ================= EUROPE HARD BLOCK =================

function isEuropePrefix(exp){
  var sig = exp.substring(0,4);
  return (sig === "2a03" ||
          sig === "2a07" ||
          sig === "2a06" ||
          sig === "2a02");
}

// ================= ALLOWED /40 (Jordan + ME Only) =================

var ALLOWED_40 = {
  "2a01:970017":true,"2a01:97001c":true,"2a01:970031":true,"2a01:970032":true,
  "2a01:970033":true,"2a01:970034":true,"2a01:970035":true,"2a01:970038":true,
  "2a01:970039":true,"2a01:97003a":true,"2a01:97003b":true,"2a01:97003c":true,
  "2a01:97003d":true,"2a01:97003e":true,"2a01:97003f":true,"2a01:970040":true,
  "2a01:970041":true,"2a01:970042":true,"2a01:970043":true,"2a01:970044":true,
  "2a01:970045":true,"2a01:970046":true,"2a01:970047":true,"2a01:970048":true,
  "2a01:970049":true,"2a01:97004a":true,"2a01:97004b":true,"2a01:97004d":true,
  "2a01:97004e":true,"2a01:97004f":true,"2a01:970050":true,"2a01:970051":true,
  "2a01:970052":true,"2a01:970053":true,"2a01:970054":true,"2a01:970055":true,
  "2a01:970056":true,"2a01:970057":true,"2a01:970058":true,"2a01:970059":true,
  "2a01:97005a":true,"2a01:97005b":true,"2a01:97005c":true,"2a01:97005e":true,
  "2a01:970060":true,"2a01:970061":true,"2a01:970062":true,"2a01:970063":true,
  "2a01:970064":true,"2a01:970065":true,"2a01:970067":true,"2a01:970068":true,
  "2a01:970069":true,"2a01:97006a":true,"2a01:97006b":true,"2a01:97006c":true,
  "2a01:97006e":true,"2a01:97006f":true,"2a01:970070":true,"2a01:970071":true,
  "2a01:970072":true,"2a01:970073":true,"2a01:970074":true,"2a01:970075":true,
  "2a01:970076":true,"2a01:97007a":true,"2a01:970080":true,"2a01:970081":true,
  "2a01:970084":true,"2a01:970085":true,"2a01:970086":true,"2a01:970090":true,
  "2a01:970091":true,"2a01:970092":true,"2a01:970093":true,"2a01:970094":true
};

// ================= HELPERS =================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

function expandIPv6(addr){
  var full = [], parts = addr.split("::");

  if(parts.length === 2){
    var left = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left.concat(Array(missing).fill("0")).concat(right);
  } else {
    full = addr.split(":");
  }

  for(var i=0;i<full.length;i++){
    while(full[i].length < 4) full[i] = "0" + full[i];
  }

  return full.join(":").toLowerCase();
}

function isAllowed40(exp){
  return ALLOWED_40[exp.substring(0,10)] === true;
}

function isPUBG(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ================= TRAFFIC CLASSIFICATION =================

function isMatchTraffic(data){
  return /match|battle|classic|ranked|unranked|arena|tdm|teamdeathmatch|
          gungame|domination|assault|payload|metro|metroroyale|zombie|
          infection|evoground|ultimate|cheer|war|sniper|quickmatch|
          arcade|battlefield|clash|gunfight|training|erangel|livik|
          miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|
          duo|solo|competitive|tournament|scrim|custom|roomcreate|
          matchstart|ingame|gamesvr|relay|realtime/i.test(data);
}

function isLobbyTraffic(data){
  return /lobby|login|auth|profile|inventory|store|catalog|shop|
          region|gateway|session|friends|clan|rp|workshop|
          events|mission|settings|social|news|update/i.test(data);
}

// ================= MAIN =================

function FindProxyForURL(url, host){

  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ ip=""; }

  if(!isPUBG(host,url)) return DIRECT;
  if(!ip || !isIPv6(ip)) return BLOCK;

  var expanded = expandIPv6(ip);

  if(isEuropePrefix(expanded)) return BLOCK;
  if(!isAllowed40(expanded)) return BLOCK;

  var net40 = expanded.substring(0,10);
  var net64 = expanded.substring(0,19);
  var data  = (host+url).toLowerCase();

  // ===== MATCH LOCK =====
  if(isMatchTraffic(data)){

    if(!SESSION.matchActive){
      SESSION.matchActive = true;
      SESSION.locked40 = net40;
      SESSION.locked64 = net64;
      SESSION.lockedIP = expanded;
      return PROXY;
    }

    if(net40 !== SESSION.locked40) return BLOCK;
    if(net64 !== SESSION.locked64) return BLOCK;
    if(expanded !== SESSION.lockedIP) return BLOCK;

    return PROXY;
  }

  // ===== AUTO UNLOCK WHEN BACK TO LOBBY =====
  if(isLobbyTraffic(data)){
    SESSION.matchActive = false;
    SESSION.locked40 = null;
    SESSION.locked64 = null;
    SESSION.lockedIP = null;
    return PROXY;
  }

  return PROXY;
}
