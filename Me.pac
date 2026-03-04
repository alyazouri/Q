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
  inMatch:  false,
  inlobby:  false
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
ip.startsWith("2a01:9700:1700:") ||
ip.startsWith("2a01:9700:1c00:") ||
ip.startsWith("2a01:9700:3100:") ||
ip.startsWith("2a01:9700:3200:") ||
ip.startsWith("2a01:9700:3300:") ||
ip.startsWith("2a01:9700:3400:") ||
ip.startsWith("2a01:9700:3500:") ||
ip.startsWith("2a01:9700:3800:") ||
ip.startsWith("2a01:9700:3900:") ||
ip.startsWith("2a01:9700:3a00:") ||
ip.startsWith("2a01:9700:3b00:") ||
ip.startsWith("2a01:9700:3c00:") ||
ip.startsWith("2a01:9700:3d00:") ||
ip.startsWith("2a01:9700:3e00:") ||
ip.startsWith("2a01:9700:3f00:") ||
ip.startsWith("2a01:9700:4000:") ||
ip.startsWith("2a01:9700:4100:") ||
ip.startsWith("2a01:9700:4200:") ||
ip.startsWith("2a01:9700:4300:") ||
ip.startsWith("2a01:9700:4400:") ||
ip.startsWith("2a01:9700:4500:") ||
ip.startsWith("2a00:18d8:40:") ||
ip.startsWith("2a00:18d8:50:") ||
ip.startsWith("2a00:18d8:60:") ||
ip.startsWith("2a00:18d8:70:") ||
ip.startsWith("2a00:18d8:80:") ||
ip.startsWith("2a00:18d8:90:") ||
ip.startsWith("2a00:18d8:c0:") ||
ip.startsWith("2a00:18d8:d0:") ||
ip.startsWith("2a00:18d8:e0:") ||
ip.startsWith("2a00:18d8:f0:") ||
ip.startsWith("2a00:18d8:100:") ||
ip.startsWith("2a00:18d8:110:") ||
ip.startsWith("2a00:18d8:120:") ||
ip.startsWith("2a00:18d8:130:") ||
ip.startsWith("2a00:18d8:140:") ||
ip.startsWith("2a00:18d8:150:") ||
ip.startsWith("2a03:6b01:8000:") ||

// محافظة إربد (Irbid Governorate): ~6-10%، تغطية جيدة من Zain وOrange في الشمال.
ip.startsWith("2a01:9700:4600:") ||
ip.startsWith("2a01:9700:4700:") ||
ip.startsWith("2a01:9700:4800:") ||
ip.startsWith("2a01:9700:4900:") ||
ip.startsWith("2a01:9700:4a00:") ||
ip.startsWith("2a01:9700:4b00:") ||
ip.startsWith("2a01:9700:4d00:") ||
ip.startsWith("2a03:6b01:4000:") ||
ip.startsWith("2a00:18d8:4000:") ||
ip.startsWith("2a00:18d8:4001:") ||
ip.startsWith("2a00:18d8:4002:") ||

// محافظة الزرقاء (Zarqa Governorate): ~4-6%، قريبة من عمان، Orange وZain قوية.
ip.startsWith("2a01:9700:4e00:") ||
ip.startsWith("2a01:9700:4f00:") ||
ip.startsWith("2a01:9700:5000:") ||
ip.startsWith("2a01:9700:5100:") ||
ip.startsWith("2a01:9700:5200:") ||
ip.startsWith("2a01:9700:5300:") ||
ip.startsWith("2a03:6b01:6000:") ||
ip.startsWith("2a00:18d8:100:") ||

// محافظة البلقاء (Balqa Governorate): ~3-5%، مثل السلط، تغطية متوسطة من Orange.
ip.startsWith("2a01:9700:5400:") ||
ip.startsWith("2a01:9700:5500:") ||
ip.startsWith("2a01:9700:5600:") ||
ip.startsWith("2a01:9700:5700:") ||
ip.startsWith("2a01:9700:5800:") ||
ip.startsWith("2a03:6b01:4400:") ||

// محافظة مادبا (Madaba Governorate): ~2%، تغطية أساسية من JT وOrange.
ip.startsWith("2a01:9700:5900:") ||
ip.startsWith("2a01:9700:5a00:") ||
ip.startsWith("2a01:9700:5b00:") ||
ip.startsWith("2a01:9700:5c00:") ||
ip.startsWith("2a01:9700:5e00:") ||
ip.startsWith("2a00:18d8:d0:") ||

// محافظة الكرك (Karak Governorate): ~2-3%، جنوبية، Zain موبايل أفضل.
ip.startsWith("2a01:9700:6000:") ||
ip.startsWith("2a01:9700:6100:") ||
ip.startsWith("2a01:9700:6200:") ||
ip.startsWith("2a01:9700:6300:") ||
ip.startsWith("2a01:9700:6400:") ||
ip.startsWith("2a03:6b01:6400:") ||

// محافظة معان (Ma'an Governorate): ~1-2%، صحراوية، تغطية محدودة من Zain.
ip.startsWith("2a01:9700:6500:") ||
ip.startsWith("2a01:9700:6700:") ||
ip.startsWith("2a01:9700:6800:") ||
ip.startsWith("2a01:9700:6900:") ||
ip.startsWith("2a01:9700:6a00:") ||
ip.startsWith("2a03:6b02:2000:") ||

// محافظة الطفيلة (Tafilah Governorate): ~1%، تغطية أساسية من Orange وJT.
ip.startsWith("2a01:9700:6b00:") ||
ip.startsWith("2a01:9700:6c00:") ||
ip.startsWith("2a01:9700:6e00:") ||
ip.startsWith("2a01:9700:6f00:") ||
ip.startsWith("2a01:9700:7000:") ||
ip.startsWith("2a00:18d8:e0:") ||

// محافظة العقبة (Aqaba Governorate): ~2%، ميناء، تغطية جيدة للسياحة من Zain وOrange.
ip.startsWith("2a01:9700:7100:") ||
ip.startsWith("2a01:9700:7200:") ||
ip.startsWith("2a01:9700:7300:") ||
ip.startsWith("2a01:9700:7400:") ||
ip.startsWith("2a01:9700:7500:") ||
ip.startsWith("2a03:6b01:8000:") ||
ip.startsWith("2a00:18d8:f0:") ||

// محافظة عجلون (Ajloun Governorate): ~1-2%، شمالية، مشابهة لإربد من Zain.
ip.startsWith("2a01:9700:7600:") ||
ip.startsWith("2a01:9700:7a00:") ||
ip.startsWith("2a01:9700:8000:") ||
ip.startsWith("2a01:9700:8100:") ||
ip.startsWith("2a01:9700:8400:") ||
ip.startsWith("2a03:6b01:4000:") ||

// محافظة جرش (Jerash Governorate): ~2%، قريبة من الزرقاء، JT قوية.
ip.startsWith("2a01:9700:8500:") ||
ip.startsWith("2a01:9700:8600:") ||
ip.startsWith("2a01:9700:9000:") ||
ip.startsWith("2a01:9700:9100:") ||
ip.startsWith("2a01:9700:9200:") ||
ip.startsWith("2a00:18d8:140:") ||

// محافظة المفرق (Mafraq Governorate): ~4-6%، شرقية، تغطية موبايل من Zain وOrange.
ip.startsWith("2a01:9700:9300:") ||
ip.startsWith("2a01:9700:9400:") ||
ip.startsWith("2a03:6b01:6000:")
  return (

  );
}

function isJordanMatch(ip){

  ip = expandIPv6(ip);
ip.startsWith("2a01:9700:5900:") ||
ip.startsWith("2a01:9700:5a00:") ||
ip.startsWith("2a01:9700:5b00:") ||
ip.startsWith("2a01:9700:5c00:") ||
ip.startsWith("2a01:9700:5e00:") ||
ip.startsWith("2a00:18d8:d0:") ||
ip.startsWith("2a01:9700:5400:") ||
ip.startsWith("2a01:9700:5500:") ||
ip.startsWith("2a01:9700:5600:") ||
ip.startsWith("2a01:9700:6000:") ||
ip.startsWith("2a01:9700:6100:") ||
ip.startsWith("2a01:9700:6200:") ||
ip.startsWith("2a01:9700:5800:") ||
ip.startsWith("2a03:6b01:4400:")
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
  var net3 = parts.slice(0,4).join(":");
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
      SESSION.inlobby  = true;
      return PROXY;
  }
    if (net3 !== SESSION.lobbyNet) return BLOCK;
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
