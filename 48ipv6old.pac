// ============================================================
// ULTRA STRICT /48 LOCK v12 FINAL
// Allowed ONLY Specific /48 Prefixes
// /48 + /64 + Full IP Lock During Match
// Lobby Flexible + Auto Unlock
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ================= SESSION =================

var SESSION = {
  locked48: null,
  locked64: null,
  lockedIP: null,
  matchActive: false
};

// ================= ALLOWED /48 PREFIXES =================
// Stored as first 3 hextets (normalized)

var ALLOWED_48 = {
  "2a00:18d0:0009": true,
  "2a00:18d0:0008": true,
  "2a00:18d0:0005": true,
  "2a00:18d0:0004": true,
  "2a00:18d0:0000": true,
  "2a00:18d0:0006": true,
  "2a00:18d0:0003": true,
  "2a03:6b02:2000": true,
  "2001:067c:2124": true,
  "2a10:9740:0005": true,
  "2a10:9740:0004": true,
  "2a10:9740:0003": true,
  "2a10:9740:0000": true,
  "2a10:9740:0002": true,
  "2a00:18d8:4001": true,
  "2a00:18d8:4000": true,
  "2a00:18d8:0003": true,
  "2a00:18d8:0000": true,
  "2a00:18d8:4002": true,
  "2a00:18d8:0002": true
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

function isAllowed48(expanded){
  var parts = expanded.split(":");
  var key = parts[0] + ":" + parts[1] + ":" + parts[2];
  return ALLOWED_48[key] === true;
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

  if(!isAllowed48(expanded)) return BLOCK;

  var parts=expanded.split(":");
  var net48=parts[0]+":"+parts[1]+":"+parts[2];
  var net64=parts.slice(0,4).join(":");
  var data=(host+url).toLowerCase();

  // ===== MATCH LOCK =====
  if(isMatchTraffic(data)){

    if(!SESSION.matchActive){
      SESSION.matchActive=true;
      SESSION.locked48=net48;
      SESSION.locked64=net64;
      SESSION.lockedIP=expanded;
      return PROXY;
    }

    if(net48!==SESSION.locked48) return BLOCK;
    if(net64!==SESSION.locked64) return BLOCK;
    if(expanded!==SESSION.lockedIP) return BLOCK;

    return PROXY;
  }

  // ===== AUTO UNLOCK WHEN BACK TO LOBBY =====
  if(isLobbyTraffic(data)){
    SESSION.matchActive=false;
    SESSION.locked48=null;
    SESSION.locked64=null;
    SESSION.lockedIP=null;
    return PROXY;
  }

  return PROXY;
}
