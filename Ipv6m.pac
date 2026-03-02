// ============================================================
// PUBG HARDCORE ISP + REGION LOCK
// Lobby  = 3 segments
// Match  = 4 segments
// ISP Lock Enabled
// Ultra Secure Version
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  ispNet:   null,  // أول خانتين (ISP)
  lobbyNet: null,  // أول 3 خانات
  matchNet: null,  // أول 4 خانات
  inMatch:  false
};

// ============================================================
// BASIC CHECK
// ============================================================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ============================================================
// EXPAND IPv6 (:: support)
// ============================================================

function expandIPv6(address){

  if (!address || address.indexOf(":") === -1) return address;

  var parts = address.split("::");
  var full = [];

  if (parts.length === 2){
    var left  = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left;
    for (var i=0;i<missing;i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j=0;j<full.length;j++){
    while(full[j].length < 4) full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ============================================================
// FAST PREFIX CHECK (Jordan Only)
// ============================================================

function isAllowedIPv6(ip){

  if (!isIPv6(ip)) return false;

  ip = expandIPv6(ip);

  return (
    ip.startsWith("2a01:9700:") ||
    ip.startsWith("2a00:18d8:") ||
    ip.startsWith("2001:32c0:")
  );
}

// ============================================================
// PUBG DETECTION
// ============================================================

function isPUBG(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ============================================================
// MAIN
// ============================================================

function FindProxyForURL(url, host){

  var ip="";
  try { ip = dnsResolve(host); } catch(e){ ip=""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host,url)) return DIRECT;
  if (!ip || !isIPv6(ip)) return BLOCK;
  if (!isAllowedIPv6(ip)) return BLOCK;

  var fullIP = expandIPv6(ip);
  var parts  = fullIP.split(":");

  var isp2  = parts.slice(0,2).join(":"); // ISP
  var net3  = parts.slice(0,3).join(":"); // Lobby
  var net4  = parts.slice(0,4).join(":"); // Match

  var data = (host+url).toLowerCase();

  var isLobby = /lobby|login|auth|session|matchmaking|queue|profile|inventory|store|friends|party|clan|chat|update|cdn/i.test(data);

  var isMatch = /match|battle|classic|ranked|arena|tdm|metro|royale|war|arcade|ingame|gamesvr|relay/i.test(data);

  // =========================================================
  // ISP LOCK (أقسى مستوى)
  // =========================================================

  if (!SESSION.ispNet){
    SESSION.ispNet = isp2;
  }

  if (isp2 !== SESSION.ispNet) return BLOCK;

  // =========================================================
  // AUTO RESET AFTER MATCH
  // =========================================================

  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  // =========================================================
  // LOBBY LOCK (3 segments)
  // =========================================================

  if (isLobby){

    if (!SESSION.lobbyNet){
      SESSION.lobbyNet = net3;
    }

    return PROXY;
  }

  // =========================================================
  // MATCH LOCK (4 segments)
  // =========================================================

  if (isMatch){

    if (!SESSION.matchNet){
      SESSION.matchNet = net4;
      SESSION.inMatch  = true;
      return PROXY;
    }

    if (net4 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  return PROXY;
}
