// ================= PROXIES (OPTIMIZED WITH PRIORITY TIERS) =================
// Match proxies - استخدام أسرع بروكسي للمباريات
var MATCH_PRIMARY = "PROXY 46.185.131.218:20001";  // أسرع بروكسي مباشر
var MATCH_BACKUP  = "PROXY 212.35.66.45:8085";     // احتياطي في حالة فشل الأول

// Lobby pool with priority ordering - مرتبة حسب الأولوية من الأسرع للأبطأ
var LOBBY_POOL = [
  "PROXY 46.185.131.218:20001",  // الأولوية الأولى
  "PROXY 212.35.66.45:8085",     // الأولوية الثانية
  "PROXY 212.35.66.45:8181",     // الأولوية الثالثة
  "PROXY 46.185.131.218:443"     // الأولوية الرابعة
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN IP RANGES WITH PRIORITY TIERS =================
// تقسيم النطاقات حسب الجودة والسرعة

// TIER 1 (GOLD) - أسرع النطاقات وأقربها لمراكز البيانات الرئيسية
// هذه النطاقات لها اتصال مباشر بكابلات الإنترنت البحرية
var JORDAN_TIER1_IPV4 = [
  ["46.185.128.0", "255.255.192.0"],  // Umniah Fiber Backbone - اتصال ممتاز
  ["46.185.192.0", "255.255.224.0"],  // Jordan IX - نقطة تبادل الإنترنت
  ["87.237.0.0",   "255.255.128.0"],  // Orange Premium Network
  ["212.35.64.0",  "255.255.224.0"],  // Jordan DC Primary
  ["185.194.0.0",  "255.255.252.0"]   // Gaming CDN Nodes
];

// TIER 2 (SILVER) - نطاقات ممتازة لكن أبطأ قليلاً من الفئة الذهبية
var JORDAN_TIER2_IPV4 = [
  ["87.236.232.0", "255.255.248.0"],  // Orange Standard
  ["87.237.128.0", "255.255.128.0"],  // Orange Secondary
  ["79.134.0.0",   "255.255.192.0"],  // Zain Primary
  ["79.134.192.0", "255.255.192.0"],  // Zain Secondary
  ["185.37.0.0",   "255.255.252.0"],  // Game Servers
  ["185.52.0.0",   "255.255.252.0"],  // CDN Secondary
  ["188.161.0.0",  "255.255.224.0"]   // Cloud Services
];

// TIER 3 (BRONZE) - نطاقات مقبولة جداً لكن قد تكون أبطأ في أوقات الذروة
var JORDAN_TIER3_IPV4 = [
  ["176.28.0.0",   "255.255.0.0"],    // JTG Primary
  ["176.29.0.0",   "255.255.0.0"],    // JTG Secondary
  ["94.249.0.0",   "255.255.128.0"],  // Batelco
  ["176.241.0.0",  "255.255.128.0"],  // Regional Provider
  ["37.44.0.0",    "255.255.128.0"]   // ISP Block
];

// دمج كل الفئات في قائمة واحدة للتحقق السريع
var JORDAN_ALL_TIERS = JORDAN_TIER1_IPV4.concat(JORDAN_TIER2_IPV4).concat(JORDAN_TIER3_IPV4);

// ================= BLACKLIST (COMPREHENSIVE) =================
var GEO_BLACKLIST = [
  // Western Europe
  ["5.0.0.0","255.0.0.0"],
  ["50.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["52.0.0.0","254.0.0.0"],
  ["80.0.0.0","252.0.0.0"],
  ["82.0.0.0","254.0.0.0"],
  ["88.0.0.0","254.0.0.0"],
  ["90.0.0.0","254.0.0.0"],
  ["92.0.0.0","252.0.0.0"],
  
  // Russia & Eastern Europe
  ["5.136.0.0","255.248.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["188.0.0.0","252.0.0.0"],
  ["213.0.0.0","255.0.0.0"],
  
  // Iran (النطاقات الإيرانية المختلطة)
  ["31.220.0.0","255.254.0.0"],
  ["91.106.0.0","255.254.0.0"],
  ["2.184.0.0","255.248.0.0"],
  ["5.52.0.0","255.252.0.0"],
  ["5.56.0.0","255.248.0.0"],
  ["5.112.0.0","255.240.0.0"],
  ["31.2.0.0","255.254.0.0"],
  ["37.32.0.0","255.224.0.0"],
  ["37.130.0.0","255.254.0.0"],
  ["46.32.0.0","255.224.0.0"],
  ["62.60.0.0","255.252.0.0"],
  ["78.38.0.0","255.254.0.0"],
  ["79.127.0.0","255.255.0.0"],
  ["79.175.0.0","255.255.0.0"],
  ["80.191.0.0","255.255.0.0"],
  ["81.90.0.0","255.254.0.0"],
  ["82.99.0.0","255.255.0.0"],
  ["85.9.0.0","255.255.0.0"],
  ["85.133.0.0","255.255.0.0"],
  ["86.104.0.0","255.248.0.0"],
  ["88.135.0.0","255.255.0.0"],
  ["89.32.0.0","255.224.0.0"],
  ["91.98.0.0","255.254.0.0"],
  ["91.109.0.0","255.255.0.0"],
  ["92.38.0.0","255.254.0.0"],
  ["92.119.0.0","255.255.0.0"],
  
  // Afghanistan (النطاقات الأفغانية)
  ["103.6.0.0","255.254.0.0"],
  ["103.9.0.0","255.255.0.0"],
  ["103.11.0.0","255.255.0.0"],
  ["103.15.0.0","255.255.0.0"],
  ["103.19.0.0","255.255.0.0"],
  ["103.31.0.0","255.255.0.0"],
  ["119.160.0.0","255.240.0.0"],
  ["175.107.0.0","255.255.0.0"],
  ["182.52.0.0","255.252.0.0"],
  ["202.163.64.0","255.255.192.0"],
  
  // Far East Asia
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"],
  ["49.0.0.0","255.0.0.0"],
  ["58.0.0.0","255.0.0.0"],
  ["59.0.0.0","255.0.0.0"],
  ["60.0.0.0","255.0.0.0"],
  ["61.0.0.0","255.0.0.0"],
  ["101.0.0.0","255.0.0.0"],
  ["103.0.0.0","255.0.0.0"],
  ["106.0.0.0","254.0.0.0"],
  ["110.0.0.0","254.0.0.0"],
  ["112.0.0.0","248.0.0.0"],
  ["120.0.0.0","248.0.0.0"],
  
  // Americas
  ["3.0.0.0","255.0.0.0"],
  ["4.0.0.0","252.0.0.0"],
  ["8.0.0.0","248.0.0.0"],
  ["12.0.0.0","252.0.0.0"],
  ["24.0.0.0","248.0.0.0"],
  ["32.0.0.0","224.0.0.0"],
  ["64.0.0.0","192.0.0.0"],
  ["128.0.0.0","192.0.0.0"],
  ["192.0.0.0","252.0.0.0"],
  ["196.0.0.0","252.0.0.0"],
  ["198.0.0.0","254.0.0.0"],
  ["199.0.0.0","255.0.0.0"],
  ["200.0.0.0","248.0.0.0"],
  ["208.0.0.0","240.0.0.0"]
];

// ================= ENHANCED SESSION TRACKING =================
// نظام متقدم لتتبع حالة الاتصال
var SESSION = {
  // قفل المباراة الصارم
  matchIP: null,           // عنوان IP الكامل للمباراة
  matchPort: null,         // البورت المحدد
  matchHost: null,         // اسم الخادم
  matchNet24: null,        // الشبكة /24
  matchNet16: null,        // الشبكة /16 للحماية من الانجراف
  matchTier: null,         // فئة الجودة المستخدمة
  
  // إحصائيات ومراقبة
  matchStartTime: 0,       // وقت بداية المباراة
  matchPacketCount: 0,     // عدد الحزم المرسلة
  lastPacketTime: 0,       // وقت آخر حزمة
  driftAttempts: 0,        // محاولات الانجراف المحظورة
  
  // تخزين DNS مؤقت
  dnsCache: {},
  
  // مرحلة ما قبل المباراة
  preMatchDetected: false, // كشف مبكر للمباراة
  preMatchHost: null       // الخادم المحتمل
};

// ================= HELPER FUNCTIONS =================

// تطبيع اسم الخادم
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

// استخراج البورت من اسم الخادم إن وجد
function extractPort(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(i + 1) : null;
}

// التحقق من وجود IP في قائمة نطاقات
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// تحديد فئة النطاق الأردني (يرجع 1 للذهبي، 2 للفضي، 3 للبرونزي، 0 إذا لم يكن أردني)
function getJordanTier(ip) {
  if (isInList(ip, JORDAN_TIER1_IPV4)) return 1;
  if (isInList(ip, JORDAN_TIER2_IPV4)) return 2;
  if (isInList(ip, JORDAN_TIER3_IPV4)) return 3;
  return 0;
}

// حل DNS مع التخزين المؤقت
function resolvePinned(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

// اختيار بروكسي اللوبي بذكاء (يعطي أولوية للبروكسيات الأسرع)
function pickLobbyProxy(host, tier) {
  // إذا كان النطاق من الفئة الذهبية، استخدم أسرع بروكسي
  if (tier === 1) return LOBBY_POOL[0];
  
  // للفئات الأخرى، استخدم توزيع متوازن
  var h = 0;
  for (var i = 0; i < host.length; i++) {
    h = (h + host.charCodeAt(i)) % (LOBBY_POOL.length - 1);
  }
  return LOBBY_POOL[h + 1]; // نتجنب البروكسي الأول ونحفظه للمباريات
}

// استخراج الشبكة /24 من IP
function getNet24(ip) {
  return ip.split('.').slice(0, 3).join('.');
}

// استخراج الشبكة /16 من IP
function getNet16(ip) {
  return ip.split('.').slice(0, 2).join('.');
}

// ================= TRAFFIC DETECTION (ENHANCED) =================

// كشف نطاقات PUBG
function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|quantum|gameloop|proximabeta|intlgame/i.test(h);
}

// كشف محسّن للمباريات مع أنماط إضافية
function isMatch(u, h) {
  // الأنماط الأساسية للمباريات
  var basicMatch = /match|battle|game|combat|realtime|sync|udp|tick|room|server|session|play|live|arena|gameplay/i.test(u + h);
  
  // أنماط متقدمة للكشف المبكر
  var advancedMatch = /ready|spawn|deploy|drop|land|parachute|plane/i.test(u + h);
  
  return basicMatch || advancedMatch;
}

// كشف مرحلة ما قبل المباراة (الاستعداد والانتظار)
function isPreMatch(u, h) {
  return /ready|waiting|prepare|starting|countdown|warmup/i.test(u + h);
}

// كشف اللوبي
function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|connect|entrance/i.test(u + h);
}

// كشف الخدمات الاجتماعية
function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|voice/i.test(u + h);
}

// كشف CDN والأصول
function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|file/i.test(u + h);
}

// كشف Relay Servers (خوادم وسيطة يجب تجنبها)
function isRelay(h) {
  return /relay|proxy|forward|tunnel|gateway|bridge/i.test(h);
}

// التحقق من أن الخادم مباشر وليس وسيط
function isDirectServer(h) {
  // الخوادم المباشرة عادة تحتوي على كلمات محددة
  var directIndicators = /game|match|server|node|host|instance/i.test(h);
  var relayIndicators = isRelay(h);
  
  return directIndicators && !relayIndicators;
}

// ================= MAIN PROXY LOGIC (ENHANCED) =================
function FindProxyForURL(url, host) {
  
  // تطبيع اسم الخادم
  var originalHost = host;
  host = norm(host.toLowerCase());
  var port = extractPort(originalHost);
  
  // السماح للترافيك غير المتعلق بـ PUBG
  if (!isPUBG(host)) return DIRECT;
  
  // حل DNS مع التخزين المؤقت
  var ip = resolvePinned(host);
  
  // حظر العناوين غير الصالحة أو IPv6
  if (!ip || ip.indexOf(":") > -1) return BLOCK;
  
  // === الحظر الجغرافي الصارم ===
  if (isInList(ip, GEO_BLACKLIST)) {
    return BLOCK;
  }
  
  // === فحص فئة النطاق الأردني ===
  var tier = getJordanTier(ip);
  
  // إذا لم يكن النطاق أردني على الإطلاق، احظره
  if (tier === 0) {
    return BLOCK;
  }
  
  // === حظر خوادم Relay حتى لو كانت في نطاقات أردنية ===
  if (isRelay(host)) {
    return BLOCK;
  }
  
  // === معالجة مرحلة ما قبل المباراة (الكشف المبكر) ===
  if (isPreMatch(url, host) && !SESSION.preMatchDetected) {
    SESSION.preMatchDetected = true;
    SESSION.preMatchHost = host;
    // نستخدم بروكسي المباريات مباشرة للاستعداد
    return MATCH_PRIMARY;
  }
  
  // === معالجة حزم المباريات (النظام الأساسي) ===
  if (isMatch(url, host)) {
    
    // استخراج معلومات الشبكة
    var net24 = getNet24(ip);
    var net16 = getNet16(ip);
    
    // === بداية مباراة جديدة (القفل الأولي) ===
    if (!SESSION.matchIP) {
      // تحقق من أن الخادم مباشر وليس وسيط
      if (!isDirectServer(host)) {
        return BLOCK;
      }
      
      // قفل كامل المعلومات
      SESSION.matchIP = ip;
      SESSION.matchPort = port;
      SESSION.matchHost = host;
      SESSION.matchNet24 = net24;
      SESSION.matchNet16 = net16;
      SESSION.matchTier = tier;
      SESSION.matchStartTime = new Date().getTime();
      SESSION.matchPacketCount = 1;
      SESSION.lastPacketTime = SESSION.matchStartTime;
      SESSION.driftAttempts = 0;
      
      // استخدام البروكسي الأساسي للمباريات
      return MATCH_PRIMARY;
    }
    
    // === فحوصات الأمان للمباراة الجارية ===
    
    // الفحص 1: يجب أن يكون نفس عنوان IP بالضبط (أقوى قفل)
    if (ip !== SESSION.matchIP) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 2: يجب أن يكون نفس البورت إن كان محدداً
    if (SESSION.matchPort && port && port !== SESSION.matchPort) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 3: يجب أن يكون نفس اسم الخادم
    if (host !== SESSION.matchHost) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 4: منع الانجراف على مستوى الشبكة /16
    // هذا يمنع اللعبة من التحول تدريجياً لشبكات أخرى
    if (net16 !== SESSION.matchNet16) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 5: التحقق من عدم تدهور فئة الجودة
    // لا نسمح بالانتقال من فئة أعلى لفئة أقل
    if (tier > SESSION.matchTier) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // تحديث الإحصائيات
    SESSION.matchPacketCount++;
    SESSION.lastPacketTime = new Date().getTime();
    
    // كل شيء صحيح، استمر مع نفس البروكسي
    return MATCH_PRIMARY;
  }
  
  // === معالجة اللوبي والخدمات الاجتماعية ===
  if (isLobby(url, host) || isSocial(url, host)) {
    // استخدام البروكسي المناسب حسب فئة النطاق
    return pickLobbyProxy(host, tier);
  }
  
  // === معالجة CDN والتحديثات ===
  if (isCDN(url, host)) {
    // نعطي أولوية أقل لـ CDN
    return pickLobbyProxy(host, 3);
  }
  
  // === الحالة الافتراضية لأي ترافيك PUBG آخر ===
  // نستخدم بروكسي اللوبي كخيار آمن
  return pickLobbyProxy(host, tier);
}
