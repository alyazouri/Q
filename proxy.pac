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
  var full  = [];

  if (parts.length === 2){
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j = 0; j < full.length; j++){
    while (full[j].length < 4) full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ================= BLOCK: EUROPE (يُغلق قبل أي شيء) =================

function isEurope(ip){
  return (
    // ===== Germany =====
    ip.startsWith("2a00:1450:") ||  // Google DE
    ip.startsWith("2a01:4f8:")  ||  // Hetzner
    ip.startsWith("2a01:238:")  ||  // Deutsche Telekom
    ip.startsWith("2a02:8071:") ||  // Vodafone DE
    ip.startsWith("2a02:2e0:")  ||  // 1&1
    ip.startsWith("2a02:908:")  ||  // DE general
    // ===== UK =====
    ip.startsWith("2a00:23c4:") ||
    ip.startsWith("2a00:23c6:") ||
    ip.startsWith("2a00:23c7:") ||
    ip.startsWith("2a00:23c8:") ||
    ip.startsWith("2a02:c7c:")  ||  // BT UK
    ip.startsWith("2a02:c7d:")  ||
    ip.startsWith("2a02:c7f:")  ||
    // ===== France =====
    ip.startsWith("2a01:cb0:")  ||
    ip.startsWith("2a01:cb1:")  ||
    ip.startsWith("2a01:cb04:") ||
    ip.startsWith("2a01:cb05:") ||
    ip.startsWith("2a01:e0a:")  ||
    ip.startsWith("2a01:e34:")  ||
    // ===== Netherlands =====
    ip.startsWith("2a00:1388:") ||
    ip.startsWith("2a02:a210:") ||
    ip.startsWith("2a02:a211:") ||
    ip.startsWith("2a02:a212:") ||
    ip.startsWith("2a02:1800:") ||
    // ===== Sweden / Nordic =====
    ip.startsWith("2a00:801:")  ||
    ip.startsWith("2a00:802:")  ||
    ip.startsWith("2a01:3e0:")  ||
    ip.startsWith("2a02:418:")  ||
    // ===== Poland =====
    ip.startsWith("2a00:f80:")  ||
    ip.startsWith("2a01:110:")  ||
    ip.startsWith("2a02:a31:")  ||
    // ===== Russia =====
    ip.startsWith("2a00:1fa0:") ||
    ip.startsWith("2a02:6b8:")  ||
    ip.startsWith("2a04:bac0:") ||
    ip.startsWith("2a0a:e5c0:") ||
    // ===== Other EU =====
    ip.startsWith("2a00:bdc0:") ||
    ip.startsWith("2a00:13c0:") ||
    ip.startsWith("2a00:1a60:") ||
    ip.startsWith("2a00:1b20:") ||
    ip.startsWith("2a01:5ec0:") ||
    ip.startsWith("2a03:3b40:") ||
    ip.startsWith("2a02:4780:") ||  // OVH EU
    ip.startsWith("2a02:4781:") ||
    ip.startsWith("2a02:4782:") ||
    ip.startsWith("2a02:4783:")
  );
}

// ================= BLOCK: ASIA =================

function isAsia(ip){
  return (
    // ===== China =====
    ip.startsWith("2400:3c00:") ||
    ip.startsWith("2400:4f00:") ||
    ip.startsWith("2408:")      ||
    ip.startsWith("2409:")      ||
    ip.startsWith("240e:")      ||
    ip.startsWith("240f:")      ||
    ip.startsWith("2402:4e00:") ||
    ip.startsWith("2402:4f00:") ||
    // ===== Japan =====
    ip.startsWith("2400:4050:") ||
    ip.startsWith("2400:4150:") ||
    ip.startsWith("2001:268:")  ||
    ip.startsWith("2404:6800:") ||
    // ===== South Korea =====
    ip.startsWith("2001:2d8:")  ||
    ip.startsWith("240b:")      ||
    ip.startsWith("2404:8000:") ||
    // ===== India =====
    ip.startsWith("2401:4900:") ||
    ip.startsWith("2401:4901:") ||
    ip.startsWith("2405:200:")  ||
    ip.startsWith("2405:201:")  ||
    // ===== Southeast Asia =====
    ip.startsWith("2407:")      ||   // PH / SG / MY / ID
    ip.startsWith("2403:")      ||   // APAC general
    ip.startsWith("2406:")      ||   // AU / NZ / APAC
    ip.startsWith("2404:a8c0:") ||
    // ===== Africa =====
    ip.startsWith("2c0f:f248:") ||
    ip.startsWith("2c0f:f7c0:")
  );
}

// ================= JORDAN LOBBY RANGES =================

function isJordanLobby(ip){
  ip = expandIPv6(ip);

  return (
    // ================== Orange Jordan (AS8376) ==================
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
    ip.startsWith("2a01:9700:4600:") ||
    ip.startsWith("2a01:9700:4700:") ||
    ip.startsWith("2a01:9700:4710:") ||
    ip.startsWith("2a01:9700:4800:") ||
    ip.startsWith("2a01:9700:4900:") ||
    ip.startsWith("2a01:9700:4a00:") ||
    ip.startsWith("2a01:9700:4b00:") ||
    ip.startsWith("2a01:9700:4d00:") ||
    ip.startsWith("2a01:9700:4e00:") ||
    ip.startsWith("2a01:9700:4f00:") ||
    ip.startsWith("2a01:9700:5000:") ||
    ip.startsWith("2a01:9700:5100:") ||
    ip.startsWith("2a01:9700:5200:") ||
    ip.startsWith("2a01:9700:5300:") ||
    ip.startsWith("2a01:9700:5400:") ||
    ip.startsWith("2a01:9700:5500:") ||
    ip.startsWith("2a01:9700:5600:") ||
    ip.startsWith("2a01:9700:5700:") ||
    ip.startsWith("2a01:9700:5800:") ||
    ip.startsWith("2a01:9700:5900:") ||
    ip.startsWith("2a01:9700:5a00:") ||
    ip.startsWith("2a01:9700:5b00:") ||
    ip.startsWith("2a01:9700:5c00:") ||
    ip.startsWith("2a01:9700:5e00:") ||
    ip.startsWith("2a01:9700:6000:") ||
    ip.startsWith("2a01:9700:6100:") ||
    ip.startsWith("2a01:9700:6200:") ||
    ip.startsWith("2a01:9700:6300:") ||
    ip.startsWith("2a01:9700:6400:") ||
    ip.startsWith("2a01:9700:6500:") ||
    ip.startsWith("2a01:9700:6700:") ||
    ip.startsWith("2a01:9700:6800:") ||
    ip.startsWith("2a01:9700:6900:") ||
    ip.startsWith("2a01:9700:6a00:") ||
    ip.startsWith("2a01:9700:6b00:") ||
    ip.startsWith("2a01:9700:6c00:") ||
    ip.startsWith("2a01:9700:6e00:") ||
    ip.startsWith("2a01:9700:6f00:") ||
    ip.startsWith("2a01:9700:7000:") ||
    ip.startsWith("2a01:9700:7100:") ||
    ip.startsWith("2a01:9700:7200:") ||
    ip.startsWith("2a01:9700:7300:") ||
    ip.startsWith("2a01:9700:7400:") ||
    ip.startsWith("2a01:9700:7500:") ||
    ip.startsWith("2a01:9700:7600:") ||
    ip.startsWith("2a01:9700:7a00:") ||
    ip.startsWith("2a01:9700:8000:") ||
    ip.startsWith("2a01:9700:8100:") ||
    ip.startsWith("2a01:9700:8400:") ||
    ip.startsWith("2a01:9700:8500:") ||
    ip.startsWith("2a01:9700:8600:") ||
    ip.startsWith("2a01:9700:9000:") ||
    ip.startsWith("2a01:9700:9100:") ||
    ip.startsWith("2a01:9700:9200:") ||
    ip.startsWith("2a01:9700:9300:") ||
    ip.startsWith("2a01:9700:9400:") ||

    // ================== نطاقات Orange إضافية (موسّعة) ==================
    ip.startsWith("2a01:9700:a000:") ||
    ip.startsWith("2a01:9700:a100:") ||
    ip.startsWith("2a01:9700:a200:") ||
    ip.startsWith("2a01:9700:a300:") ||
    ip.startsWith("2a01:9700:a400:") ||
    ip.startsWith("2a01:9700:b000:") ||
    ip.startsWith("2a01:9700:b100:") ||
    ip.startsWith("2a01:9700:b200:") ||
    ip.startsWith("2a01:9700:b300:") ||
    ip.startsWith("2a01:9700:c000:") ||
    ip.startsWith("2a01:9700:c100:") ||
    ip.startsWith("2a01:9700:c200:") ||
    ip.startsWith("2a01:9700:d000:") ||
    ip.startsWith("2a01:9700:d100:") ||
    ip.startsWith("2a01:9700:e000:") ||
    ip.startsWith("2a01:9700:e100:") ||
    ip.startsWith("2a01:9700:f000:") ||
    ip.startsWith("2a01:9700:f100:") ||

    // ================== Jordan Telecom (JT - AS8697) ==================
    ip.startsWith("2a00:18d8:40:")  ||
    ip.startsWith("2a00:18d8:50:")  ||
    ip.startsWith("2a00:18d8:60:")  ||
    ip.startsWith("2a00:18d8:70:")  ||
    ip.startsWith("2a00:18d8:80:")  ||
    ip.startsWith("2a00:18d8:90:")  ||
    ip.startsWith("2a00:18d8:c0:")  ||
    ip.startsWith("2a00:18d8:d0:")  ||
    ip.startsWith("2a00:18d8:e0:")  ||
    ip.startsWith("2a00:18d8:f0:")  ||
    ip.startsWith("2a00:18d8:100:") ||
    ip.startsWith("2a00:18d8:110:") ||
    ip.startsWith("2a00:18d8:120:") ||
    ip.startsWith("2a00:18d8:130:") ||
    ip.startsWith("2a00:18d8:140:") ||
    ip.startsWith("2a00:18d8:150:") ||
    ip.startsWith("2a00:18d8:160:") ||
    ip.startsWith("2a00:18d8:170:") ||
    ip.startsWith("2a00:18d8:180:") ||
    ip.startsWith("2a00:18d8:190:") ||
    ip.startsWith("2a00:18d8:200:") ||
    ip.startsWith("2a00:18d8:210:") ||
    ip.startsWith("2a00:18d8:220:") ||
    ip.startsWith("2a00:18d8:230:") ||
    ip.startsWith("2a00:18d8:240:") ||
    ip.startsWith("2a00:18d8:250:") ||

    // ================== Zain Jordan (AS48832) ==================
    ip.startsWith("2a03:6b01:4000:") ||
    ip.startsWith("2a03:6b01:4400:") ||
    ip.startsWith("2a03:6b01:6000:") ||
    ip.startsWith("2a03:6b01:6400:") ||
    ip.startsWith("2a03:6b01:8000:") ||
    ip.startsWith("2a03:6b01:8400:") ||
    ip.startsWith("2a03:6b01:8800:") ||
    ip.startsWith("2a03:6b01:9000:") ||
    ip.startsWith("2a03:6b01:9400:")
  );
}

// ================= JORDAN MATCH RANGES (لا تُعدَّل) =================

function isJordanMatch(ip){
  ip = expandIPv6(ip);

  return (
    ip.startsWith("2a03:6b01:4000:") ||
    ip.startsWith("2a03:6b01:4400:") ||
    ip.startsWith("2a03:6b01:6000:") ||
    ip.startsWith("2a03:6b01:6400:") ||
    ip.startsWith("2a03:6b01:8000:")
  );
}

// ================= PUBG DETECTION =================

function isPUBG(h, u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

// ================= MAIN =================

function FindProxyForURL(url, host){

  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ ip = ""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host, url))    return DIRECT;
  if (!ip || !isIPv6(ip))    return BLOCK;

  var fullIP = expandIPv6(ip);

  // ===== BLOCK: Europe & Asia أولاً وبسرعة =====
  if (isEurope(fullIP)) return BLOCK;
  if (isAsia(fullIP))   return BLOCK;

  // ===== BLOCK: نطاقات عامة غير مرغوبة =====
  if (
    fullIP.startsWith("2a00:1fa0:") ||
    fullIP.startsWith("2a00:bdc0:") ||
    fullIP.startsWith("2a00:13c0:") ||
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:")
  ) return BLOCK;

  // ===== إذا لم يكن نطاق أردني → بلوك =====
  if (!isJordanLobby(fullIP) && !isJordanMatch(fullIP)) return BLOCK;

  var parts = fullIP.split(":");
  var net3  = parts.slice(0, 3).join(":");
  var net4  = parts.slice(0, 4).join(":");

  var data = (host + url).toLowerCase();

  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);

  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);

  // ===== تنظيف SESSION عند خروج من المباراة =====
  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  // ===== LOBBY → بروكسي مباشر =====
  if (isLobby){
    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;
    return PROXY;
  }

  // ===== MATCH → تثبيت الشبكة =====
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
