// ============================================================
// PUBG FINAL ULTIMATE FORCED JORDAN LOCK
// Lobby  = 3 segments
// Match  = 4 segments
// No ISP Lock
// + Strict IPv6 Validation
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

// ================= STRICT EXPAND IPv6 =================

function expandIPv6(address){

  if (!address || address.indexOf(":") === -1)
    return "";

  if (address.split("::").length > 2)
    return "";

  var parts = address.split("::");
  var left = [];
  var right = [];

  if (parts.length === 2){

    if (parts[0]) left = parts[0].split(":");
    if (parts[1]) right = parts[1].split(":");

    var missing = 8 - (left.length + right.length);
    if (missing < 0) return "";

    var middle = [];
    for (var i = 0; i < missing; i++)
      middle.push("0000");

    parts = left.concat(middle).concat(right);

  } else {

    parts = address.split(":");
    if (parts.length !== 8)
      return "";
  }

  for (var j = 0; j < parts.length; j++){

    if (!parts[j])
      parts[j] = "0000";

    while (parts[j].length < 4)
      parts[j] = "0" + parts[j];

    if (parts[j].length > 4)
      return "";
  }

  return parts.join(":").toLowerCase();
}

// ================= JORDAN PREFIX CHECK (/44 محددة) =================

function isJordan(ip){

  ip = expandIPv6(ip);
  if (!ip) return false;

  return (

    ip.startsWith("2a01:9700:4040:") ||
    ip.startsWith("2a01:9700:4110:") ||
    ip.startsWith("2a01:9700:4120:") ||
    ip.startsWith("2a01:9700:4130:") ||
    ip.startsWith("2a01:9700:4140:") ||
    ip.startsWith("2a01:9700:4200:") ||
    ip.startsWith("2a01:9700:42c0:") ||
    ip.startsWith("2a01:9700:42d0:") ||
    ip.startsWith("2a01:9700:42e0:") ||
    ip.startsWith("2a01:9700:42f0:") ||
    ip.startsWith("2a01:9700:4320:") ||
    ip.startsWith("2a01:9700:4330:") ||
    ip.startsWith("2a01:9700:4340:") ||
    ip.startsWith("2a01:9700:4350:") ||
    ip.startsWith("2a01:9700:4360:") ||
    ip.startsWith("2a01:9700:4370:") ||
    ip.startsWith("2a01:9700:43e0:") ||
    ip.startsWith("2a01:9700:44b0:") ||
    ip.startsWith("2a01:9700:44c0:") ||
    ip.startsWith("2a01:9700:4520:") ||
    ip.startsWith("2a01:9700:4530:") ||
    ip.startsWith("2a01:9700:4540:") ||
    ip.startsWith("2a01:9700:4610:") ||
    ip.startsWith("2a01:9700:46f0:") ||
    ip.startsWith("2a01:9700:4700:") ||
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
  if (!fullIP) return BLOCK;

  if (!isJordan(ip)) return BLOCK;

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

    if (!SESSION.lobbyNet)
      SESSION.lobbyNet = net3;

    if (net3 !== SESSION.lobbyNet)
      return BLOCK;

    return PROXY;
  }

  if (isMatch){

    if (!SESSION.matchNet){

      SESSION.matchNet = net4;
      SESSION.inMatch  = true;

      return PROXY;
    }

    if (net4 !== SESSION.matchNet)
      return BLOCK;

    return PROXY;
  }

  return PROXY;
}
