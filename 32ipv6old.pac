// ============================================================
// ULTRA STRICT /32 LOCK v11 FINAL
// Allowed ONLY Specific /32 Prefixes
// /32 + /64 + Full IP Lock During Match
// Lobby Flexible + Auto Unlock
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ================= SESSION =================

var SESSION = {
  locked32: null,
  locked64: null,
  lockedIP: null,
  matchActive: false
};

// ================= ALLOWED /32 PREFIXES =================

var ALLOWED_32 = {
  "2a00:18d0": true,
  "2a07:0141": true,
  "2a07:0147": true,
  "2a07:0144": true,
  "2a07:0143": true,
  "2a07:0146": true,
  "2a07:0145": true,
  "2a07:0140": true,
  "2a07:0142": true,
  "2a03:b640": true,
  "2a00:18d8": true,
  "2a01:9700": true
};

// ================= HELPERS =================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

function expandIPv6(addr){
  var full=[], parts=addr.split("::");

  if(parts.length===2){
    var left=parts[0]?parts[0].split(":"):[];
    var right=parts[1]?parts[1].split(":"):[];
    var missing=8-(left.length+right.length);
    full=left.concat(Array(missing).fill("0")).concat(right);
  } else {
    full=addr.split(":");
  }

  for(var i=0;i<full.length;i++){
    while(full[i].length<4) full[i]="0"+full[i];
  }

  return full.join(":").toLowerCase();
}

function isAllowed32(exp){
  return ALLOWED_32[exp.substring(0,9)] === true;
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

  var ip="";
  try{ ip=dnsResolve(host); }catch(e){ ip=""; }

  if(!isPUBG(host,url)) return DIRECT;
  if(!ip || !isIPv6(ip)) return BLOCK;

  var expanded=expandIPv6(ip);

  if(!isAllowed32(expanded)) return BLOCK;

  var net32=expanded.substring(0,9);
  var net64=expanded.substring(0,19);
  var data=(host+url).toLowerCase();

  // ===== MATCH LOCK =====
  if(isMatchTraffic(data)){

    if(!SESSION.matchActive){
      SESSION.matchActive=true;
      SESSION.locked32=net32;
      SESSION.locked64=net64;
      SESSION.lockedIP=expanded;
      return PROXY;
    }

    if(net32!==SESSION.locked32) return BLOCK;
    if(net64!==SESSION.locked64) return BLOCK;
    if(expanded!==SESSION.lockedIP) return BLOCK;

    return PROXY;
  }

  // ===== AUTO UNLOCK WHEN BACK TO LOBBY =====
  if(isLobbyTraffic(data)){
    SESSION.matchActive=false;
    SESSION.locked32=null;
    SESSION.locked64=null;
    SESSION.lockedIP=null;
    return PROXY;
  }

  return PROXY;
}
