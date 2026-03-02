// ============================================================
// PUBG FINAL ULTIMATE FORCED JORDAN LOCK
// Lobby  = 3 segments
// Match  = 4 segments
// ISP Lock + Forced Retry
// + Global Country Blocks
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  ispNet:   null,
  lobbyNet: null,
  matchNet: null,
  inMatch:  false
};

// ================= IPv6 CHECK =================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ================= EXPAND IPv6 (:: support) =================

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

// ================= JORDAN PREFIX CHECK =================

function isJordan(ip){

  ip = expandIPv6(ip);

  return (
ip.startsWith("2a00:18d8:")
  );
}

// ================= PUBG DETECTION =================

function isPUBG(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ================= MAIN =================

function FindProxyForURL(url, host){

  var ip="";
  try { ip = dnsResolve(host); } catch(e){ ip=""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host,url)) return DIRECT;
  if (!ip || !isIPv6(ip)) return BLOCK;

  var fullIP = expandIPv6(ip);

  // ===== BLOCK ARUBA =====
  if (
    fullIP.startsWith("2a00:1450:") ||
    fullIP.startsWith("2a00:bdc0:")  ||
    fullIP.startsWith("2a00:13c0:")  ||
    fullIP.startsWith("2a00:1fa0:")
  ) return BLOCK;

  // ===== BLOCK IRAN =====
  if (
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:")
  ) return BLOCK;

  // ===== BLOCK PAKISTAN =====
  if (
    fullIP.startsWith("2401:4900:") ||
    fullIP.startsWith("2407:")
  ) return BLOCK;

  // ===== BLOCK AFGHANISTAN =====
  if (
    fullIP.startsWith("2400:3c00:") ||
    fullIP.startsWith("2400:4f00:")
  ) return BLOCK;

  // ===== BLOCK LIBYA =====
  if (
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:")
  ) return BLOCK;

  // ===== JORDAN ONLY =====
  if (!isJordan(ip)) return BLOCK;

  var parts  = fullIP.split(":");
  var isp2 = parts.slice(0,2).join(":");
  var net3 = parts.slice(0,3).join(":");
  var net4 = parts.slice(0,4).join(":");

  var data = (host+url).toLowerCase();

  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);

  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);

  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  if (isLobby){

    if (!SESSION.ispNet) SESSION.ispNet = isp2;
    if (isp2 !== SESSION.ispNet) return BLOCK;

    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;

    return PROXY;
  }

  if (isMatch){

    if (!SESSION.matchNet){

      if (!SESSION.ispNet) SESSION.ispNet = isp2;
      if (isp2 !== SESSION.ispNet) return BLOCK;

      SESSION.matchNet = net4;
      SESSION.inMatch  = true;

      return PROXY;
    }

    if (isp2 !== SESSION.ispNet) return BLOCK;
    if (net4 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  return PROXY;
}
