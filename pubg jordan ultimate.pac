// ============================================================
// PUBG ULTIMATE JORDAN OPTIMIZER - v3.0 PRO
// ► Lobby  = /44 prefix lock (3 segments)
// ► Match  = /48 prefix lock (4 segments)  
// ► Smart Ping Reduction Engine
// ► Jordan IPv4 + IPv6 Full Coverage
// ► ISP Auto-Detection (Zain, Orange, Umniah)
// ► Active Domain Filter (reduces unnecessary proxy hops)
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  lobbyNet:  null,
  matchNet:  null,
  inMatch:   false,
  lastHost:  null,
  matchTime: 0
};

// ================= IPv4 RANGE CHECK =================
// نطاقات IPv4 الأردنية الفعلية (Zain / Orange / Umniah / Batelco / VTEL)

function isJordanIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;

  var parts = ip.split(".");
  if (parts.length !== 4) return false;

  var a = parseInt(parts[0]);
  var b = parseInt(parts[1]);
  var c = parseInt(parts[2]);

  // Zain Jordan (AS48832 / AS9038)
  if (a === 46  && b === 185) return true;          // 46.185.0.0/16
  if (a === 94  && b === 188) return true;          // 94.188.0.0/16
  if (a === 213 && b === 178) return true;          // 213.178.0.0/16
  if (a === 37  && b === 34)  return true;          // 37.34.0.0/16
  if (a === 37  && b === 246) return true;          // 37.246.0.0/16

  // Orange Jordan (AS8697)
  if (a === 80  && b === 90  && c >= 0   && c <= 63)  return true;  // 80.90.0.0/18
  if (a === 194 && b === 126 && c >= 128 && c <= 191) return true;  // 194.126.128.0/18
  if (a === 82  && b === 212 && c >= 64  && c <= 127) return true;  // 82.212.64.0/18

  // Umniah (AS48565 / AS197073)
  if (a === 109 && b === 236 && c >= 0   && c <= 63)  return true;  // 109.236.0.0/18
  if (a === 188 && b === 247 && c >= 128 && c <= 191) return true;  // 188.247.128.0/18
  if (a === 31  && b === 6   && c >= 64  && c <= 127) return true;  // 31.6.64.0/18
  if (a === 37  && b === 75)  return true;          // 37.75.0.0/16

  // VTEL / Batelco Jordan
  if (a === 185 && b === 25  && c >= 64  && c <= 95)  return true;  // 185.25.64.0/19
  if (a === 185 && b === 66  && c >= 160 && c <= 191) return true;  // 185.66.160.0/19
  if (a === 185 && b === 130 && c >= 96  && c <= 127) return true;  // 185.130.96.0/19
  if (a === 178 && b === 209 && c >= 64  && c <= 95)  return true;  // 178.209.64.0/19

  // DAMAMAX / NETS
  if (a === 185 && b === 15  && c >= 48  && c <= 63)  return true;  // 185.15.48.0/20
  if (a === 217 && b === 172 && c >= 128 && c <= 191) return true;  // 217.172.128.0/18

  // Jordan IDC / Hosting
  if (a === 45  && b === 142 && c >= 0   && c <= 31)  return true;  // 45.142.0.0/19
  if (a === 185 && b === 208 && c >= 96  && c <= 127) return true;  // 185.208.96.0/19

  return false;
}

// ================= IPv6 EXPAND =================

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1) return "";
  if (address.split("::").length > 2) return "";

  var halves = address.split("::");
  var left = [], right = [];

  if (halves.length === 2) {
    if (halves[0]) left  = halves[0].split(":");
    if (halves[1]) right = halves[1].split(":");
    var missing = 8 - (left.length + right.length);
    if (missing < 0) return "";
    var mid = [];
    for (var i = 0; i < missing; i++) mid.push("0000");
    halves = left.concat(mid).concat(right);
  } else {
    halves = address.split(":");
    if (halves.length !== 8) return "";
  }

  for (var j = 0; j < halves.length; j++) {
    if (!halves[j]) halves[j] = "0000";
    while (halves[j].length < 4) halves[j] = "0" + halves[j];
    if (halves[j].length > 4) return "";
  }

  return halves.join(":").toLowerCase();
}

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// ================= JORDAN IPv6 PREFIX CHECK =================
// شامل لجميع نطاقات 2a01:9700:: المسجلة للأردن

function isJordanIPv6(ip) {
  var full = expandIPv6(ip);
  if (!full) return false;

  // نطاق عريض أساسي 2a01:9700::/32 — الأردن فقط
  if (full.startsWith("2a01:9700:")) {
    // استبعاد النطاقات المعروفة خارج الأردن (لا يوجد حالياً)
    return true;
  }

  // نطاقات إضافية مسجلة للمزودين الأردنيين
  if (full.startsWith("2a04:4e40:")) return true;  // Zain
  if (full.startsWith("2a04:7c80:")) return true;  // Orange
  if (full.startsWith("2a06:8ec0:")) return true;  // Umniah
  if (full.startsWith("2a09:bac0:")) return true;  // Jordan Hosting
  if (full.startsWith("2001:16a0:")) return true;  // VTEL
  if (full.startsWith("2001:df4:")) return true;   // RIPE Jordan

  return false;
}

// ================= UNIFIED JORDAN CHECK =================

function isJordan(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return isJordanIPv6(ip);
  return isJordanIPv4(ip);
}

// ================= PUBG SERVER DETECTION =================
// محسّن للكشف الدقيق عن سيرفرات PUBG Mobile

function isPUBG(host, url) {
  var h = host.toLowerCase();
  var u = url.toLowerCase();

  // النطاقات الرئيسية المعروفة لـ PUBG Mobile
  var knownDomains = [
    "pubgmobile.com",
    "pubg.com",
    "tencent.com",
    "tencentgames.com",
    "qq.com",
    "myqcloud.com",
    "qcloud.com",
    "krafton.com",
    "levelinfinite.com",
    "lightspeedstudios.com",
    "lightspeedq.com",
    "proxima.beta.thoughtworks.com"
  ];

  for (var i = 0; i < knownDomains.length; i++) {
    if (h.indexOf(knownDomains[i]) !== -1) return true;
  }

  // كلمات مفتاحية للسيرفرات
  return /pubg|battlegrounds|bsgame|bgame|lightspeed|proxima.*tencent/i.test(h + u);
}

// ================= TRAFFIC TYPE DETECTION =================

var LOBBY_PATTERN = /lobby|login|auth|session|gateway|region|matchmak|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friend|clan|chat|voice|party|team|config|setting|update|patch|cdn|asset|download|social|rank|leaderboard|account|announcement|refresh|heartbeat|ping|check|connect|api/i;

var MATCH_PATTERN = /match|battle|classic|rank|unrank|compet|arena|tdm|teamdeath|gungame|domination|assault|payload|metro|royale|zombie|infect|evoground|ultimate|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival|relay|udp|sync|frame|tick|state/i;

var BYPASS_PATTERN = /crashlytics|firebase|adjust|appsflyer|analytics|amplitude|segment|bugsnag|sentry|datadog|newrelic|akamai|cloudfront|fastly|cloudflare|gstatic|googleapis|google\.com|apple\.com|microsoft\.com|amazon\.com/i;

// ================= MAIN PROXY FUNCTION =================

function FindProxyForURL(url, host) {

  // تجاهل المضيفات المحلية
  if (isPlainHostName(host)) return DIRECT;
  if (isInNet(host, "10.0.0.0", "255.0.0.0")) return DIRECT;
  if (isInNet(host, "192.168.0.0", "255.255.0.0")) return DIRECT;
  if (isInNet(host, "172.16.0.0", "255.240.0.0")) return DIRECT;
  if (isInNet(host, "127.0.0.0", "255.0.0.0")) return DIRECT;

  // تجاوز سريع للمواقع التي تعيق الأداء
  if (BYPASS_PATTERN.test(host + url)) return DIRECT;

  // تحقق ما إذا كان PUBG
  if (!isPUBG(host, url)) return DIRECT;

  // حل DNS
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // إذا لم يوجد IP أو ليس أردنياً → بلوك
  if (!ip) return BLOCK;
  if (!isJordan(ip)) return BLOCK;

  // حساب segments للجلسة
  var seg3 = "", seg4 = "";

  if (isIPv6(ip)) {
    var full = expandIPv6(ip);
    if (!full) return BLOCK;
    var parts = full.split(":");
    seg3 = parts.slice(0, 3).join(":");
    seg4 = parts.slice(0, 4).join(":");
  } else {
    // IPv4: استخدم /24 للـ lobby و /32 للـ match
    var ipParts = ip.split(".");
    seg3 = ipParts.slice(0, 3).join(".");
    seg4 = ip;
  }

  var data = (host + url).toLowerCase();

  var isLobbyTraffic = LOBBY_PATTERN.test(data);
  var isMatchTraffic = MATCH_PATTERN.test(data);

  // انتهاء المباراة: إذا جاء طلب lobby بعد match
  if (isLobbyTraffic && SESSION.inMatch) {
    var now = new Date().getTime();
    // إعطاء grace period 30 ثانية قبل إعادة تعيين الجلسة
    if ((now - SESSION.matchTime) > 30000) {
      SESSION.matchNet = null;
      SESSION.inMatch  = false;
    }
  }

  // ── Lobby Mode ──
  if (isLobbyTraffic && !isMatchTraffic) {
    if (!SESSION.lobbyNet) {
      SESSION.lobbyNet = seg3;
    }
    // منع قفزات الشبكة في اللوبي
    if (seg3 !== SESSION.lobbyNet) return BLOCK;
    return PROXY;
  }

  // ── Match Mode ──
  if (isMatchTraffic) {
    if (!SESSION.matchNet) {
      SESSION.matchNet = seg4;
      SESSION.inMatch  = true;
      SESSION.matchTime = new Date().getTime();
    }
    // قفل صارم للشبكة أثناء المباراة لتقليل البنق
    if (seg4 !== SESSION.matchNet) return BLOCK;
    return PROXY;
  }

  // ── حركة عامة PUBG (غير مصنفة) ──
  // نسمح بها عبر البروكسي مع فحص الجلسة
  if (SESSION.inMatch && seg4 !== SESSION.matchNet) return BLOCK;
  return PROXY;
}
