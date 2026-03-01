// ============================================================
// 🇯🇴 JORDAN V19.2
// v19.1 Engine + v17 Prefix Style
// Match = /56 Strict
// Lobby = Wide Reset
// ============================================================

var PROXY  = "PROXY 91.106.109.50:20005";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  locked56: null,
  locked64: null,
  lockedIP: null,
  active: false
};

// ================= HELPERS (v19.1) =================

function isIPv6(ip){ return ip && ip.indexOf(":") !== -1; }
function isIPv4(ip){ return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1; }

function expandIPv6(addr){
  if(!addr) return "";

  var parts=addr.split("::");
  var full=[];

  if(parts.length===2){
    var left=parts[0]?parts[0].split(":"):[];
    var right=parts[1]?parts[1].split(":"):[];
    var missing=8-(left.length+right.length);
    for(var i=0;i<missing;i++) left.push("0");
    full=left.concat(right);
  }else{
    full=addr.split(":");
  }

  for(var j=0;j<full.length;j++){
    while(full[j].length<4) full[j]="0"+full[j];
  }

  return full.join(":").toLowerCase();
}

function isPUBG(host,url){
  var s=(host+(url||"")).toLowerCase();
  return /pubg|tencent|krafton|lightspeed|levelinfinite|anticheat|tpgbattle/i.test(s);
}

function isMatchTraffic(data){
  return /match|battle|ranked|arena|tdm|ingame|gamesvr|relay|realtime|matchstart|matchmaking|playerjoin|spawn/i.test(data);
}

function isLobbyTraffic(data){
  return /lobby|login|auth|profile|inventory|store|gateway|session|friends|clan|settings|heartbeat|status|reward|mail/i.test(data);
}

// ================= EUROPE HARD BLOCK (v19.1) =================

function isEurope(expanded){

  if(expanded.startsWith("2a02:0"))
    return true;

  if(expanded.startsWith("2a00") &&
     !expanded.startsWith("2a00:1f40") &&
     !expanded.startsWith("2a00:1f41"))
    return true;

  return false;
}

// ================= PREFIX CHECK (v17 STYLE) =================

function isAllowed(expanded){

  if(
    expanded.startsWith("2a01:9700") ||
    expanded.startsWith("2a01:9701") ||
    expanded.startsWith("2a01:9702") ||
    expanded.startsWith("2a01:9703") ||
    expanded.startsWith("2a01:9704") ||
    expanded.startsWith("2a01:9705") ||
    expanded.startsWith("2a01:9706") ||
    expanded.startsWith("2a01:9707") ||
    expanded.startsWith("2a01:9708") ||
    expanded.startsWith("2a01:9709") ||
    expanded.startsWith("2a01:970a") ||
    expanded.startsWith("2a01:970b") ||
    expanded.startsWith("2a01:970c") ||
    expanded.startsWith("2a01:970d") ||
    expanded.startsWith("2a01:970e") ||
    expanded.startsWith("2a01:970f") ||

    expanded.startsWith("2a02:2400") ||
    expanded.startsWith("2a02:2401") ||
    expanded.startsWith("2a02:2402") ||
    expanded.startsWith("2a02:2403") ||

    expanded.startsWith("2a02:2500") ||
    expanded.startsWith("2a02:2501") ||
    expanded.startsWith("2a02:2502") ||

    expanded.startsWith("2a02:2700") ||
    expanded.startsWith("2a02:2701") ||

    expanded.startsWith("2a01:9e00") ||
    expanded.startsWith("2a01:9e01") ||

    expanded.startsWith("2a01:9f00") ||

    expanded.startsWith("2a00:1f40") ||
    expanded.startsWith("2a00:1f41")
  )
    return true;

  return false;
}

// ================= MAIN (v19.1) =================

function FindProxyForURL(url,host){

  if(!isPUBG(host,url))
    return DIRECT;

  var ip="";
  try{ ip=dnsResolve(host); }catch(e){}

  if(!ip) return PROXY;
  if(isIPv4(ip)) return BLOCK;
  if(!isIPv6(ip)) return BLOCK;

  var expanded=expandIPv6(ip);

  if(isEurope(expanded)) return BLOCK;
  if(!isAllowed(expanded)) return BLOCK;

  var net56=expanded.substring(0,17);
  var net64=expanded.substring(0,19);
  var data=(host+(url||"")).toLowerCase();

  // ================= MATCH MODE (v19.1) =================
  if(isMatchTraffic(data)){

    if(!SESSION.active){
      SESSION.locked56=net56;
      SESSION.locked64=net64;
      SESSION.lockedIP=expanded;
      SESSION.active=true;
      return PROXY;
    }

    if(net56!==SESSION.locked56) return BLOCK;
    if(net64!==SESSION.locked64) return BLOCK;
    if(expanded!==SESSION.lockedIP) return BLOCK;

    return PROXY;
  }

  // ================= LOBBY MODE (v19.1) =================
  if(isLobbyTraffic(data)){
    SESSION.active=false;
    SESSION.locked56=null;
    SESSION.locked64=null;
    SESSION.lockedIP=null;
    return PROXY;
  }

  return PROXY;
}
