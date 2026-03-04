// ============================================================
// PUBG ULTIMATE JORDAN LOCK — ULTRA LOW PING EDITION
// ============================================================
// نطاقات الأردن المدعومة (Orange JO + Umniah + Zain + Batelco):
//   2a01:9700:0000:  → عمّان  0.56ms
//   2a01:9700:1b05:  → عمّان  0.01ms  ← أسرع نطاق
//   2a01:9700:17e8:  → عمّان  2.94ms
//   2a01:9700:1c77:  → عمّان  1.72ms
//   2a01:9700:1cce:  → عمّان 19.19ms
//   2a01:9700:3f00-4500 → نطاقات أردنية أخرى
// ============================================================
// المنطق:
//   1. فقط PUBG/Tencent/Krafton يمر
//   2. يُرفض أي IP غير أردني
//   3. يُحجب أي خادم من إيران/باكستان/أفغانستان/ليبيا/أروبا
//   4. قفل ISP على أسرع نطاق متاح (أولوية 1b05 → 0000 → 1c77 → 17e8)
//   5. قفل صارم على الـ Match لتثبيت البنق
//   6. Cache ذاكرة DNS + أولوية البادئة السريعة
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ====== أولوية النطاقات حسب زمن الاستجابة ======
// البادئة الأسرع تأخذ الأولوية في قفل الجلسة
var JORDAN_PRIORITY = [
  "2a01:9700:1b05:", //  0.01ms ← الأفضل
  "2a01:9700:0000:", //  0.56ms
  "2a01:9700:1c77:", //  1.72ms
  "2a01:9700:17e8:", //  2.94ms
  "2a01:9700:1cce:", // 19.19ms
  "2a01:9700:3f00:", // أردن عام
  "2a01:9700:4000:", // أردن عام
  "2a01:9700:4100:", // أردن عام
  "2a01:9700:4200:", // أردن عام
  "2a01:9700:4300:", // أردن عام
  "2a01:9700:4400:", // أردن عام
  "2a01:9700:4500:"  // أردن عام
];

// ====== حالة الجلسة ======
var SESSION = {
  ispNet:      null, // قفل ISP (3 segments)
  lobbyNet:    null, // قفل اللوبي (3 segments)
  matchNet:    null, // قفل الماتش (4 segments)
  inMatch:     false,
  bestPrefix:  null, // أفضل بادئة رصدناها
  bestRank:    999,  // رتبة البادئة (0 = الأسرع)
  dnsCache:    {}    // كاش DNS لتسريع القرارات
};

// ====== DNS Cache ======
function cachedDNS(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ ip = ""; }
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

// ====== فحص IPv6 ======
function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ====== توسعة IPv6 (دعم كامل لـ ::) ======
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

// ====== فحص الأردن + تحديد الرتبة ======
function getJordanRank(ip){
  // تُعيد -1 إذا لم يكن أردنياً، وإلا رقم الأولوية (0 = أسرع)
  ip = expandIPv6(ip);
  for (var r = 0; r < JORDAN_PRIORITY.length; r++){
    if (ip.startsWith(JORDAN_PRIORITY[r])) return r;
  }
  return -1;
}

function isJordan(ip){
  return getJordanRank(ip) !== -1;
}

// ====== تحديث أفضل بادئة مرصودة في الجلسة ======
function updateBestPrefix(ip, rank){
  if (rank < SESSION.bestRank){
    SESSION.bestRank   = rank;
    SESSION.bestPrefix = JORDAN_PRIORITY[rank];
  }
}

// ====== حجب الدول المزعجة ======
function isBlocked(fullIP){

  // ===== BLOCK: Aruba / Akamai / CDN خارجي =====
  if (fullIP.startsWith("2a00:1450:") ||
      fullIP.startsWith("2a00:bdc0:") ||
      fullIP.startsWith("2a00:13c0:") ||
      fullIP.startsWith("2a00:1fa0:")) return true;

  // ===== BLOCK: إيران =====
  if (fullIP.startsWith("2a00:1a60:") ||
      fullIP.startsWith("2a00:1b20:") ||
      fullIP.startsWith("2a01:5ec0:") ||
      fullIP.startsWith("2a03:3b40:")) return true;

  // ===== BLOCK: باكستان =====
  if (fullIP.startsWith("2401:4900:") ||
      fullIP.startsWith("2407:"))       return true;

  // ===== BLOCK: أفغانستان =====
  if (fullIP.startsWith("2400:3c00:") ||
      fullIP.startsWith("2400:4f00:")) return true;

  // ===== BLOCK: ليبيا =====
  if (fullIP.startsWith("2c0f:f248:") ||
      fullIP.startsWith("2c0f:f7c0:")) return true;

  // ===== BLOCK: السعودية (تعطي بنق عالي) =====
  if (fullIP.startsWith("2a01:3f0:") ||
      fullIP.startsWith("2a02:e980:")) return true;

  // ===== BLOCK: تركيا =====
  if (fullIP.startsWith("2a00:d880:") ||
      fullIP.startsWith("2a02:4a80:")) return true;

  // ===== BLOCK: روسيا =====
  if (fullIP.startsWith("2a00:1148:") ||
      fullIP.startsWith("2a03:d680:")) return true;

  // ===== BLOCK: الهند =====
  if (fullIP.startsWith("2401:4900:1c") ||
      fullIP.startsWith("2402:3a80:")) return true;

  return false;
}

// ====== كشف PUBG ======
function isPUBG(h, u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite|mycard|garena/i.test(h + u);
}

// ====== كشف نوع الطلب ======
function getRequestType(data){
  if (/match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data))
    return "match";

  if (/lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data))
    return "lobby";

  return "other";
}

// ====== الدالة الرئيسية ======
function FindProxyForURL(url, host){

  // السماح بالطلبات المحلية مباشرة
  if (isPlainHostName(host)) return DIRECT;

  // فقط PUBG يمر
  if (!isPUBG(host, url)) return DIRECT;

  // حل DNS مع الكاش
  var ip = cachedDNS(host);

  // إذا لم يُحل أو ليس IPv6 → حجب
  if (!ip || !isIPv6(ip)) return BLOCK;

  var fullIP = expandIPv6(ip);

  // حجب الدول المزعجة
  if (isBlocked(fullIP)) return BLOCK;

  // التحقق من الأردن وأخذ رتبة الأولوية
  var rank = getJordanRank(fullIP);
  if (rank === -1) return BLOCK; // ليس أردنياً

  // تحديث أفضل بادئة مرصودة
  updateBestPrefix(fullIP, rank);

  // استخراج مستويات الشبكة
  var parts = fullIP.split(":");
  var isp2  = parts.slice(0, 3).join(":");  // 3 segments = ISP lock
  var net3  = parts.slice(0, 3).join(":");  // 3 segments = lobby lock
  var net4  = parts.slice(0, 4).join(":");  // 4 segments = match lock

  var data        = (host + url).toLowerCase();
  var requestType = getRequestType(data);

  // ===== إعادة تعيين الماتش إذا خرجنا منه =====
  if (requestType !== "match" && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  // ===== معالجة اللوبي =====
  if (requestType === "lobby"){

    // قفل ISP على أول استجابة
    if (!SESSION.ispNet) SESSION.ispNet = isp2;

    // رفض أي ISP مختلف
    if (isp2 !== SESSION.ispNet) return BLOCK;

    // تسجيل شبكة اللوبي
    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;

    // تفضيل إعادة توجيه اللوبي عبر البروكسي دائماً
    return PROXY;
  }

  // ===== معالجة الماتش =====
  if (requestType === "match"){

    if (!SESSION.matchNet){

      // قفل ISP
      if (!SESSION.ispNet) SESSION.ispNet = isp2;
      if (isp2 !== SESSION.ispNet) return BLOCK;

      // ===== تفضيل النطاق الأسرع =====
      // إذا رصدنا بادئة أفضل من الحالية → نفضّلها
      if (SESSION.bestPrefix && !fullIP.startsWith(SESSION.bestPrefix)){
        // هذا الخادم ليس الأفضل، انتظر خادماً أفضل
        // لكن نسمح بالتوصيل إن لم يكن هناك خيار آخر (rank <= 3)
        if (rank > 3) return BLOCK;
      }

      SESSION.matchNet = net4;
      SESSION.inMatch  = true;

      return PROXY;
    }

    // قفل صارم في الماتش
    if (isp2 !== SESSION.ispNet) return BLOCK;
    if (net4 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // ===== بقية طلبات PUBG الأردنية =====
  // (telemetry, analytics, etc.)
  if (!SESSION.ispNet) SESSION.ispNet = isp2;
  if (isp2 !== SESSION.ispNet) return BLOCK;

  return PROXY;
}
