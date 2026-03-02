// ============================================================
// PUBG FINAL ULTIMATE FORCED JORDAN LOCK
// Lobby  = 3 segments
// Match  = 4 segments
// Forced Retry
// + Global Country Blocks
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
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

// ================= JORDAN LOBBY RANGES =================

function isJordanLobby(ip){

  ip = expandIPv6(ip);

  return (
    ip.startsWith("2a01:9700:4710:") ||
    ip.startsWith("2a01:9700:4800:") ||
    ip.startsWith("2a01:9700:4810:") ||
    ip.startsWith("2a01:9700:4820:") ||
    ip.startsWith("2a01:9700:4830:") ||
    ip.startsWith("2a01:9700:4840:") ||
    ip.startsWith("2a01:9700:4980:") ||
    ip.startsWith("2a01:9700:4990:") ||
    ip.startsWith("2a01:9700:4a20:") ||
    ip.startsWith("2a01:9700:4a30:") ||
    ip.startsWith("2a01:9700:4a40:") ||
    ip.startsWith("2a01:9700:4a50:") ||
    ip.startsWith("2a01:9700:4b80:") ||
    ip.startsWith("2a01:9700:4b90:") ||
    ip.startsWith("2a01:9700:4ba0:") ||
    ip.startsWith("2a01:9700:4bb0:") ||
    ip.startsWith("2a01:9700:4d70:") ||
    ip.startsWith("2a01:9700:4d80:") ||
    ip.startsWith("2a01:9700:4eb0:") ||
    ip.startsWith("2a01:9700:4fc0:") ||
    ip.startsWith("2a01:9700:4fd0:") ||
    ip.startsWith("2a01:9700:5050:") ||
    ip.startsWith("2a01:9700:5060:") ||
    ip.startsWith("2a01:9700:5070:") ||
    ip.startsWith("2a01:9700:5080:") ||
    ip.startsWith("2a01:9700:5090:") ||
    ip.startsWith("2a01:9700:50a0:") ||
    ip.startsWith("2a01:9700:50b0:") ||
    ip.startsWith("2a01:9700:50c0:") ||
    ip.startsWith("2a01:9700:5100:") ||
    ip.startsWith("2a01:9700:51b0:") ||
    ip.startsWith("2a01:9700:51c0:") ||
    ip.startsWith("2a01:9700:51d0:") ||
    ip.startsWith("2a01:9700:51e0:") ||
    ip.startsWith("2a01:9700:51f0:") ||
    ip.startsWith("2a01:9700:5240:") ||
    ip.startsWith("2a01:9700:5340:") ||
    ip.startsWith("2a01:9700:5350:") ||
    ip.startsWith("2a01:9700:54e0:") ||
    ip.startsWith("2a01:9700:54f0:") ||
    ip.startsWith("2a01:9700:55c0:") ||
    ip.startsWith("2a01:9700:55d0:") ||
    ip.startsWith("2a01:9700:5630:") ||
    ip.startsWith("2a01:9700:5640:") ||
    ip.startsWith("2a01:9700:5790:") ||
    ip.startsWith("2a01:9700:5800:") ||
    ip.startsWith("2a01:9700:5810:") ||
    ip.startsWith("2a01:9700:58f0:") ||
    ip.startsWith("2a01:9700:5930:") ||
    ip.startsWith("2a01:9700:5940:") ||
    ip.startsWith("2a01:9700:5950:") ||
    ip.startsWith("2a01:9700:5960:") ||
    ip.startsWith("2a01:9700:5a40:") ||
    ip.startsWith("2a01:9700:5a50:") ||
    ip.startsWith("2a01:9700:5b00:") ||
    ip.startsWith("2a01:9700:5b10:") ||
    ip.startsWith("2a01:9700:5c10:") ||
    ip.startsWith("2a01:9700:5c20:") ||
    ip.startsWith("2a01:9700:5e90:") ||
    ip.startsWith("2a01:9700:6000:") ||
    ip.startsWith("2a01:9700:6100:") ||
    ip.startsWith("2a01:9700:6280:") ||
    ip.startsWith("2a01:9700:6290:") ||
    ip.startsWith("2a01:9700:63a0:") ||
    ip.startsWith("2a01:9700:63b0:") ||
    ip.startsWith("2a01:9700:63c0:") ||
    ip.startsWith("2a01:9700:64b0:") ||
    ip.startsWith("2a01:9700:64c0:") ||
    ip.startsWith("2a01:9700:64d0:") ||
    ip.startsWith("2a01:9700:64e0:") ||
    ip.startsWith("2a01:9700:6560:") ||
    ip.startsWith("2a01:9700:6570:") ||
    ip.startsWith("2a01:9700:6580:") ||
    ip.startsWith("2a01:9700:6750:") ||
    ip.startsWith("2a01:9700:6760:") ||
    ip.startsWith("2a01:9700:6850:") ||
    ip.startsWith("2a01:9700:6990:") ||
    ip.startsWith("2a01:9700:6a30:") ||
    ip.startsWith("2a01:9700:6b70:") ||
    ip.startsWith("2a01:9700:6b80:") ||
    ip.startsWith("2a01:9700:6b90:") ||
    ip.startsWith("2a01:9700:6c50:") ||
    ip.startsWith("2a01:9700:6e30:") ||
    ip.startsWith("2a01:9700:6f00:") ||
    ip.startsWith("2a01:9700:7050:") ||
    ip.startsWith("2a01:9700:7100:") ||
    ip.startsWith("2a01:9700:7200:") ||
    ip.startsWith("2a01:9700:7360:") ||
    ip.startsWith("2a01:9700:7370:") ||
    ip.startsWith("2a01:9700:7400:") ||
    ip.startsWith("2a01:9700:7500:") ||
    ip.startsWith("2a01:9700:7600:") ||
    ip.startsWith("2a01:9700:7ac0:") ||
    ip.startsWith("2a01:9700:7b00:") ||
    ip.startsWith("2a01:9700:8400:") ||
    ip.startsWith("2a01:9700:9000:") ||
    ip.startsWith("2a01:9700:9010:") ||
    ip.startsWith("2a01:9700:9020:") ||
    ip.startsWith("2a01:9700:9030:") ||
    ip.startsWith("2a01:9700:9040:") ||
    ip.startsWith("2a01:9700:9050:") ||
    ip.startsWith("2a01:9700:9060:") ||
    ip.startsWith("2a01:9700:9070:") ||
    ip.startsWith("2a01:9700:9080:") ||
    ip.startsWith("2a01:9700:9090:") ||
    ip.startsWith("2a01:9700:90a0:") ||
    ip.startsWith("2a01:9700:90b0:") ||
    ip.startsWith("2a01:9700:90d0:") ||
    ip.startsWith("2a01:9700:90f0:") ||
    ip.startsWith("2a01:9700:9100:")
  );
}

function isJordanMatch(ip){

  ip = expandIPv6(ip);

  return (
    ip.startsWith("2a01:9700:3f00:")||
    ip.startsWith("2a01:9700:4000:")||
    ip.startsWith("2a01:9700:4100:")||
    ip.startsWith("2a01:9700:4200:")||
    ip.startsWith("2a01:9700:4300:")||
    ip.startsWith("2a01:9700:4400:")||
    ip.startsWith("2a01:9700:4500:")
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

  // ===== GLOBAL BLOCKS =====

  if (
    fullIP.startsWith("2a00:1450:") ||
    fullIP.startsWith("2a00:bdc0:")  ||
    fullIP.startsWith("2a00:13c0:")  ||
    fullIP.startsWith("2a00:1fa0:")
  ) return BLOCK;

  if (
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:")
  ) return BLOCK;

  if (
    fullIP.startsWith("2401:4900:") ||
    fullIP.startsWith("2407:")
  ) return BLOCK;

  if (
    fullIP.startsWith("2400:3c00:") ||
    fullIP.startsWith("2400:4f00:")
  ) return BLOCK;

  if (
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:")
  ) return BLOCK;

  if (!isJordanLobby(ip) && !isJordanMatch(ip)) return BLOCK;

  var parts  = fullIP.split(":");
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

    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;
    return PROXY;
  }

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
