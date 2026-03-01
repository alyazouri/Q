// ============================================================
// 🇯🇴 JORDAN ULTRA MAX v17 - Dynamic Smart Lock
// Strongest Stable Version
// ============================================================

var PROXY  = "PROXY 91.106.109.50:20005";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  lockedRegion: null,
  locked56: null,
  locked64: null,
  lockedIP: null,
  active: false
};

// ================= BASIC HELPERS =================

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

// ================= REGION CHECK =================

function regionType(expanded){

  // 🚫 Europe
  if(expanded.startsWith("2a00") ||
     expanded.startsWith("2a01:0") ||
     expanded.startsWith("2a02:0"))
    return "BLOCK";

  // 🇯🇴 Jordan
  if(expanded.startsWith("2a01:97") ||
     expanded.startsWith("2a02:24") ||
     expanded.startsWith("2a02:25") ||
     expanded.startsWith("2a02:27") ||
     expanded.startsWith("2a01:9e") ||
     expanded.startsWith("2a01:9f") ||
     expanded.startsWith("2a01:a"))
    return "JO";

  // 🌍 Middle East
  if(expanded.startsWith("2a02:20") ||
     expanded.startsWith("2a02:21") ||
     expanded.startsWith("2a02:22") ||
     expanded.startsWith("2a02:23") ||
     expanded.startsWith("2a02:30") ||
     expanded.startsWith("2a02:31") ||
     expanded.startsWith("2a02:32") ||
     expanded.startsWith("2a02:40") ||
     expanded.startsWith("2a02:41") ||
     expanded.startsWith("2a02:42") ||
     expanded.startsWith("2a02:50") ||
     expanded.startsWith("2a02:51") ||
     expanded.startsWith("2a02:52") ||
     expanded.startsWith("2a02:60") ||
     expanded.startsWith("2a02:61") ||
     expanded.startsWith("2a02:70") ||
     expanded.startsWith("2a02:71") ||
     expanded.startsWith("2a02:80") ||
     expanded.startsWith("2a02:81") ||
     expanded.startsWith("2a02:90") ||
     expanded.startsWith("2a02:91") ||
     expanded.startsWith("2a02:92"))
    return "ME";

  return "BLOCK";
}

// ================= MAIN =================

function FindProxyForURL(url,host){

  if(!isPUBG(host,url))
    return DIRECT;

  var ip="";
  try{ ip=dnsResolve(host); }catch(e){}

  if(!ip) return PROXY;

  if(isIPv4(ip)) return BLOCK;
  if(!isIPv6(ip)) return BLOCK;

  var expanded=expandIPv6(ip);
  var region=regionType(expanded);

  if(region==="BLOCK") return BLOCK;

  var net56=expanded.substring(0,17);
  var net64=expanded.substring(0,19);

  // 🔒 Dynamic Smart Lock
  if(!SESSION.active){

    SESSION.lockedRegion=region;
    SESSION.locked56=net56;
    SESSION.locked64=net64;
    SESSION.lockedIP=expanded;
    SESSION.active=true;

    return PROXY;
  }

  // يمنع تغيير المنطقة
  if(region!==SESSION.lockedRegion) return BLOCK;

  // يمنع تغيير الشبكة
  if(net56!==SESSION.locked56) return BLOCK;
  if(net64!==SESSION.locked64) return BLOCK;

  // يمنع تغيير IP
  if(expanded!==SESSION.lockedIP) return BLOCK;

  return PROXY;
}
