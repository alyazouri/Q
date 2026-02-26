// =============================================================
//  PUBG MOBILE — Jordan Priority PAC Script
//  الهدف: أكبر عدد لاعبين أردنيين + أقل ping ممكن
//  الإصدار: 3.0
// =============================================================

// ================= PROXIES =================
var MATCH_JO   = "PROXY 46.185.131.218:20001";   // Match server — أولوية قصوى

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";   // حجب تام
var DIRECT = "DIRECT";               // خارج نطاق PUBG

// =============================================================
//  JORDAN MATCH — نطاقات الأولوية القصوى (Match Server)
//  تُستخدم فقط أثناء جلسة الماتش الفعلية
//  الترتيب: Orange أولاً ← Umniah ← Zain ← باقي المزودين
// =============================================================
var JORDAN_MATCH_IPV4 = [
["92.253.0.0", "255.255.128.0"],
["82.212.0.0", "255.255.0.0"]
];

// =============================================================
//  JORDAN WIDE — نطاقات Lobby + Matchmaking + Social
//  تشمل الأردن + الشرق الأوسط ذات الـ Hops الأردنية
// =============================================================
var JORDAN_WIDE_IPV4 = [
["82.212.0.0",   "255.255.0.0"],
["212.34.0.0",   "255.255.0.0"],
["109.224.0.0",  "255.255.0.0"],
["37.76.0.0",    "255.255.0.0"],
["188.161.0.0",  "255.255.0.0"],
["86.108.0.0",   "255.255.128.0"],
["92.253.0.0",   "255.255.128.0"],
["46.185.128.0", "255.255.128.0"],
["37.98.128.0",  "255.255.128.0"],
["82.205.0.0",   "255.255.128.0"]
];

// =============================================================
//  BLACKLIST — حجب صارم لأوروبا + روسيا + آسيا البعيدة
//  أي IP يقع في هذه النطاقات يُحجب فوراً بغض النظر عن السياق
// =============================================================
var GEO_BLACKLIST = [

  // ── Europe (broad blocks) ─────────────────────────────────────
  ["51.0.0.0",    "255.0.0.0"],
  ["77.0.0.0",    "255.0.0.0"],
  ["78.0.0.0",    "255.0.0.0"],
  ["79.0.0.0",    "255.0.0.0"],
  ["80.0.0.0",    "255.128.0.0"],       // أوروبا الغربية (مع استثناء 80.90.172 في القائمة البيضاء)
  ["85.0.0.0",    "255.0.0.0"],
  ["88.0.0.0",    "255.0.0.0"],
  ["89.0.0.0",    "255.0.0.0"],
  ["90.0.0.0",    "255.0.0.0"],
  ["93.0.0.0",    "255.0.0.0"],
  ["94.0.0.0",    "255.0.0.0"],         // قد يتعارض مع بعض نطاقات ME — يُراجع عند الحاجة

  // ── Russia ───────────────────────────────────────────────────
  ["31.128.0.0",  "255.192.0.0"],
  ["77.88.0.0",   "255.252.0.0"],
  ["95.24.0.0",   "255.248.0.0"],
  ["178.64.0.0",  "255.192.0.0"],
  ["195.82.0.0",  "255.255.0.0"],

  // ── Asia (Far East + South Asia) ─────────────────────────────
  ["1.0.0.0",     "255.0.0.0"],
  ["14.0.0.0",    "255.0.0.0"],
  ["27.0.0.0",    "255.0.0.0"],
  ["36.0.0.0",    "255.0.0.0"],
  ["39.0.0.0",    "255.0.0.0"],
  ["42.0.0.0",    "255.0.0.0"],
  ["49.0.0.0",    "255.0.0.0"],
  ["58.0.0.0",    "255.0.0.0"],
  ["59.0.0.0",    "255.0.0.0"],
  ["60.0.0.0",    "255.0.0.0"],
  ["103.0.0.0",   "255.0.0.0"],
  ["110.0.0.0",   "255.0.0.0"],
  ["111.0.0.0",   "255.0.0.0"],
  ["112.0.0.0",   "255.0.0.0"],
  ["113.0.0.0",   "255.0.0.0"],
  ["114.0.0.0",   "255.0.0.0"],
  ["115.0.0.0",   "255.0.0.0"],
  ["116.0.0.0",   "255.0.0.0"],
  ["117.0.0.0",   "255.0.0.0"],
  ["118.0.0.0",   "255.0.0.0"],
  ["119.0.0.0",   "255.0.0.0"],
  ["120.0.0.0",   "255.0.0.0"],
  ["121.0.0.0",   "255.0.0.0"],
  ["122.0.0.0",   "255.0.0.0"],
  ["123.0.0.0",   "255.0.0.0"],
  ["124.0.0.0",   "255.0.0.0"],
  ["125.0.0.0",   "255.0.0.0"],

  // ── Latin America ─────────────────────────────────────────────
  ["187.0.0.0",   "255.0.0.0"],
  ["200.0.0.0",   "255.0.0.0"],
  ["201.0.0.0",   "255.0.0.0"]
];

// =============================================================
//  SESSION — تتبع جلسة الماتش لمنع التبديل أثناء الجلسة
// =============================================================
var SESSION = {
  matchNet:  null,    // الـ /24 subnet للـ match server الحالي
  matchHost: null,    // hostname للـ match server الحالي
  dnsCache:  {}       // DNS cache لتسريع القرارات المتكررة
};

// =============================================================
//  HELPERS
// =============================================================

// إزالة رقم المنفذ من الـ hostname
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

// التحقق إن كان IP ضمن قائمة نطاقات
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// DNS مع cache لتقليل الاستعلامات المتكررة
function resolvePinned(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

// توزيع Lobby عبر consistent hashing لتقليل التبديل
function pickLobbyProxy(host) {
  var h = 0;
  for (var i = 0; i < host.length; i++)
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// =============================================================
//  DETECTION — تصنيف نوع الاتصال
// =============================================================

function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|mihoyo|proxima/i.test(h);
}

// اتصال ماتش فعلي (UDP/Realtime)
function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room|gs[0-9]|gameserver/i.test(u + h);
}

// Lobby وMatchmaking
function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|roster|leaderboard/i.test(u + h);
}

// Social
function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|voice/i.test(u + h);
}

// CDN وتحديثات
function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|pkg/i.test(u + h);
}

// =============================================================
//  FindProxyForURL — نقطة الدخول الرئيسية
// =============================================================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // 1. تجاهل كل ما ليس PUBG
  if (!isPUBG(host)) return DIRECT;

  // 2. حل الـ DNS
  var ip = resolvePinned(host);

  // 3. حجب IPv6 والـ DNS الفاشل
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // 4. الحجب الجغرافي الصارم أولاً — أوروبا/روسيا/آسيا
  //    ملاحظة: القائمة البيضاء لا تلغي هذا الحجب، الأولوية للـ BLACKLIST
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // 5. منطق الـ Match Server (أعلى أولوية بعد الحجب)
  if (isMatch(url, host)) {

    // رفض الـ match servers خارج النطاقات الأردنية
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split(".").slice(0, 3).join(".");

    if (!SESSION.matchNet) {
      // أول match server يُكتشف — تثبيت الجلسة عليه
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    // رفض أي match server جديد أثناء جلسة نشطة (يمنع التبديل المفاجئ)
    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet)  return BLOCK;

    return MATCH_JO;
  }

  // 6. Lobby / Matchmaking / Social / CDN
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    // يُسمح فقط للنطاقات الأردنية والمنطقة
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  // 7. أي اتصال PUBG آخر غير مصنف — يُوجَّه عبر Lobby Pool
  if (isInList(ip, JORDAN_WIDE_IPV4)) return pickLobbyProxy(host);

  // 8. أي شيء تبقى خارج كل القوائم — يُحجب
  return BLOCK;
}
