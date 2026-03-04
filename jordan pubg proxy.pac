// ============================================================
//  PUBG MOBILE - Jordan Lobby PAC Script
//  النسخة: 3.0 - IPv4 Only Edition
//  الهدف: لوبي أردني فقط + أقل بنق ممكن
//  البروكسي: 46.185.131.218:20001
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
//  SESSION STATE
//  نحتفظ بحالة الجلسة لمنع تغيير الشبكة أثناء الماتش
// ============================================================

var SESSION = {
  lobbyNet : null,   // أول /24 أردني رصدناه في اللوبي
  matchNet : null,   // أول /24 أردني رصدناه في الماتش
  inMatch  : false,  // هل اللاعب داخل ماتش الآن؟
  matchTime: 0       // وقت بداية الماتش (لإعادة الضبط التلقائي)
};

// ============================================================
//  JORDAN IPv4 RANGES
//  مصدر: ARIN / RIPE NCC - نطاقات مخصصة للأردن رسمياً
//  مرتبة حسب مزود الخدمة لسهولة الصيانة
// ============================================================

function isJordanIPv4(ip) {

  if (!ip || ip.indexOf(".") === -1) return false;

  // --- تحويل IP إلى رقم للمقارنة السريعة ---
  var n = ipToNumber(ip);
  if (n < 0) return false;

  return (

    // ==========================================
    //  Orange Jordan (AS8376)
    //  91.184.0.0/14  →  91.184.0.0 - 91.187.255.255
    // ==========================================
    inRange(n, "91.184.0.0", "91.187.255.255") ||

    // ==========================================
    //  Jordan Telecom / JT (AS8697)
    //  212.34.0.0/16  →  212.34.0.0 - 212.34.255.255
    //  212.35.0.0/16
    //  62.212.64.0/18
    // ==========================================
    inRange(n, "212.34.0.0",  "212.34.255.255") ||
    inRange(n, "212.35.0.0",  "212.35.255.255") ||
    inRange(n, "62.212.64.0", "62.212.127.255") ||

    // ==========================================
    //  Zain Jordan (AS48832)
    //  176.104.0.0/14 → 176.104.0.0 - 176.107.255.255
    //  37.98.0.0/16
    // ==========================================
    inRange(n, "176.104.0.0", "176.107.255.255") ||
    inRange(n, "37.98.0.0",   "37.98.255.255")   ||

    // ==========================================
    //  Umniah (AS47887)
    //  37.34.0.0/16
    //  176.108.0.0/14 → 176.108.0.0 - 176.111.255.255
    // ==========================================
    inRange(n, "37.34.0.0",   "37.34.255.255")   ||
    inRange(n, "176.108.0.0", "176.111.255.255")  ||

    // ==========================================
    //  Batelco Jordan / Vtel (AS35819)
    //  46.22.128.0/17 → 46.22.128.0 - 46.22.255.255
    // ==========================================
    inRange(n, "46.22.128.0", "46.22.255.255")    ||

    // ==========================================
    //  Damamax (AS50670)
    //  5.21.0.0/16
    // ==========================================
    inRange(n, "5.21.0.0", "5.21.255.255")        ||

    // ==========================================
    //  MaxCom / Jordan Data (AS39010)
    //  194.126.16.0/20
    // ==========================================
    inRange(n, "194.126.16.0", "194.126.31.255")  ||

    // ==========================================
    //  Jordan ISP Block العام (RIPE allocated)
    //  195.88.16.0/20
    // ==========================================
    inRange(n, "195.88.16.0", "195.88.31.255")

  );
}

// ============================================================
//  IP UTILITY FUNCTIONS
// ============================================================

// تحويل IP نصي إلى رقم صحيح لإجراء المقارنة بشكل سريع وصحيح
function ipToNumber(ip) {
  try {
    var parts = ip.split(".");
    if (parts.length !== 4) return -1;
    return (
      (parseInt(parts[0], 10) * 16777216) +
      (parseInt(parts[1], 10) * 65536)   +
      (parseInt(parts[2], 10) * 256)      +
       parseInt(parts[3], 10)
    );
  } catch(e) { return -1; }
}

// التحقق إذا كان الرقم واقعاً بين نطاقين (شامل)
function inRange(n, start, end) {
  return n >= ipToNumber(start) && n <= ipToNumber(end);
}

// استخراج شبكة /24 من IPv4 (أول 3 أوكتيت)
function getNet24(ip) {
  var p = ip.split(".");
  return p[0] + "." + p[1] + "." + p[2];
}

// ============================================================
//  PUBG DETECTION
//  نتعرف على حركة PUBG عبر اسم الهوست أو الـ URL
// ============================================================

function isPUBG(host, url) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|sgame|myapp/i.test(host + url);
}

// ============================================================
//  LOW-LATENCY SERVER DETECTION
//  سيرفرات PUBG المعروفة في المنطقة العربية / الشرق الأوسط
//  نعطيها أولوية DIRECT لأن البروكسي قد يزيد التأخير
// ============================================================

function isRegionalServer(host) {
  // سيرفرات الخليج والشرق الأوسط - الاتصال المباشر أسرع
  return /me-|middle.?east|gulf|sa-|uae-|ksa-|middleeast/i.test(host);
}

// ============================================================
//  LOBBY vs MATCH DETECTION
// ============================================================

function isLobbyRequest(data) {
  return /lobby|login|auth|session|gateway|region|matchmak|queue|
          profile|inventory|store|shop|catalog|news|event|mission|
          reward|mail|friends|clan|chat|voice|party|team|config|
          settings|patch|cdn|asset|social|rank|leaderboard/i
          .test(data);
}

function isMatchRequest(data) {
  return /match|battle|classic|ranked|unranked|competitive|arena|
          tdm|teamdeath|gungame|domination|metro|zombie|infection|
          evoground|royale|war|sniper|quickmatch|arcade|clash|
          ingame|gamesvr|relay|realtime|spectate|combat|survival/i
          .test(data);
}

// ============================================================
//  MATCH SESSION RESET
//  إذا انتهى الماتش أو مضى وقت طويل → نعيد الضبط
//  افتراضي: 40 دقيقة = مدة ماتش PUBG تقريباً
// ============================================================

var MATCH_TIMEOUT_MS = 40 * 60 * 1000; // 40 دقيقة

function resetMatchIfExpired() {
  if (SESSION.inMatch && SESSION.matchTime > 0) {
    var now = new Date().getTime();
    if ((now - SESSION.matchTime) > MATCH_TIMEOUT_MS) {
      SESSION.matchNet  = null;
      SESSION.inMatch   = false;
      SESSION.matchTime = 0;
    }
  }
}

// ============================================================
//  MAIN FUNCTION
// ============================================================

function FindProxyForURL(url, host) {

  // --- تجاهل شبكات داخلية ---
  if (isPlainHostName(host))             return DIRECT;
  if (isInNet(host,"10.0.0.0","255.0.0.0"))     return DIRECT;
  if (isInNet(host,"172.16.0.0","255.240.0.0")) return DIRECT;
  if (isInNet(host,"192.168.0.0","255.255.0.0"))return DIRECT;
  if (isInNet(host,"127.0.0.0","255.0.0.0"))    return DIRECT;

  // --- هذا السكربت لـ PUBG فقط ---
  if (!isPUBG(host, url)) return DIRECT;

  // --- حل الـ DNS للحصول على IPv4 ---
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // --- إذا لم يُحل الـ DNS أو رجع IPv6 → بلوك ---
  // نريد IPv4 فقط، أي عنوان يحتوي ":" هو IPv6 → ارفضه
  if (!ip || ip.indexOf(":") !== -1) return BLOCK;

  // --- تحديث حالة الماتش ---
  resetMatchIfExpired();

  var data  = (host + url).toLowerCase();
  var net24 = getNet24(ip);

  // ============================================================
  //  LOBBY PHASE
  // ============================================================

  if (isLobbyRequest(data)) {

    // اختيار اللوبي: نريد شبكة أردنية فقط
    if (!isJordanIPv4(ip)) return BLOCK;

    // أول سيرفر أردني يُثبَّت لبقية جلسة اللوبي (ثبات اللوبي)
    if (!SESSION.lobbyNet) SESSION.lobbyNet = net24;

    // نمرر عبر البروكسي الأردني لضمان اللوبي الأردني
    return PROXY;
  }

  // ============================================================
  //  MATCH PHASE
  // ============================================================

  if (isMatchRequest(data)) {

    // سيرفرات المنطقة المعروفة → مباشرة لأقل بنق
    if (isRegionalServer(host)) return DIRECT;

    // يجب أن يكون IP أردني لنسمح بالاتصال
    if (!isJordanIPv4(ip)) return BLOCK;

    if (!SESSION.matchNet) {
      // أول ماتش: نثبّت الشبكة ونبدأ المؤقت
      SESSION.matchNet  = net24;
      SESSION.inMatch   = true;
      SESSION.matchTime = new Date().getTime();
      return PROXY;
    }

    // إذا جاء طلب من /24 مختلف → بلوك لمنع اللاعبين الغير أردنيين
    if (net24 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // ============================================================
  //  GENERAL PUBG TRAFFIC (غير مُصنَّف)
  //  → نسمح به عبر البروكسي إذا كان أردني
  // ============================================================

  if (!isJordanIPv4(ip)) return BLOCK;
  return PROXY;
}
