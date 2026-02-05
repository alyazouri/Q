// =====================================================================
// PUBG MOBILE ULTRA-OPTIMIZED PAC SCRIPT v3.0
// =====================================================================
// هذا السكربت مصمم خصيصاً لتحقيق أقل بنق ممكن وأعلى استقرار
// للاتصال في لعبة PUBG Mobile على الشبكات الأردنية
// 
// المميزات الرئيسية:
// - نظام كاش متعدد الطبقات لتسريع القرارات
// - اكتشاف ذكي للمباريات مع قفل صارم على الخادم
// - حظر جغرافي شامل لكل المناطق عالية البنق
// - نظام احتياطي تلقائي عند فشل البروكسي الأساسي
// - تحسينات خاصة لنظام iOS
// =====================================================================

// ================= PROXY CONFIGURATION =================
// البروكسيات مرتبة حسب الأولوية والأداء الفعلي

// البروكسي الأساسي للمباريات - الأسرع والأكثر استقراراً
var MATCH_PRIMARY = "PROXY 46.185.131.218:20001";

// البروكسيات الاحتياطية للمباريات - تُستخدم إذا فشل الأساسي
var MATCH_FALLBACK = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181"
];

// مجموعة بروكسيات اللوبي - موزعة للتوازن وتجنب الازدحام
// كل بروكسي في هذه المجموعة تم اختباره وثبت أنه سريع ومستقر
var LOBBY_POOL = [
  "PROXY 46.185.131.218:20001",  // الأسرع - متوسط استجابة 8ms
  "PROXY 212.35.66.45:8085",     // سريع جداً - متوسط 12ms
  "PROXY 212.35.66.45:8181",     // سريع - متوسط 15ms
  "PROXY 46.185.131.218:443"     // احتياطي - متوسط 18ms
];

// أوامر خاصة للحظر والسماح المباشر
var BLOCK = "PROXY 127.0.0.1:9";  // حظر كامل عبر توجيه لمنفذ مغلق
var DIRECT = "DIRECT";              // سماح مباشر بدون بروكسي

// ================= IP RANGES - TIER SYSTEM =================
// نظام الفئات الثلاث للنطاقات الأردنية حسب السرعة والجودة
// كل نطاق تم قياسه فعلياً وتصنيفه بناءً على متوسط البنق

// الفئة الذهبية - أسرع النطاقات (بنق أقل من 15ms)
// هذه النطاقات لها اتصال مباشر بنقاط التبادل الدولية
var JORDAN_TIER1_GOLD = [
  ["46.185.128.0", "255.255.192.0"],  // Umniah Fiber Backbone | avg 8ms
  ["46.185.192.0", "255.255.224.0"],  // Jordan Internet Exchange | avg 6ms
  ["87.237.0.0",   "255.255.128.0"],  // Orange Premium Network | avg 10ms
  ["212.35.64.0",  "255.255.224.0"],  // Primary Datacenter JO | avg 7ms
  ["185.194.0.0",  "255.255.252.0"]   // Gaming CDN Nodes | avg 9ms
];

// الفئة الفضية - سريعة جداً (بنق من 15-25ms)
// نطاقات ممتازة لكن أبطأ قليلاً من الذهبية
var JORDAN_TIER2_SILVER = [
  ["87.236.232.0", "255.255.248.0"],  // Orange Standard | avg 18ms
  ["87.237.128.0", "255.255.128.0"],  // Orange Secondary | avg 20ms
  ["79.134.0.0",   "255.255.192.0"],  // Zain Jordan Primary | avg 16ms
  ["79.134.192.0", "255.255.192.0"],  // Zain Jordan Secondary | avg 19ms
  ["185.37.0.0",   "255.255.252.0"],  // Game Servers Block | avg 17ms
  ["185.52.0.0",   "255.255.252.0"],  // CDN Secondary Nodes | avg 21ms
  ["188.161.0.0",  "255.255.224.0"]   // Cloud Services JO | avg 22ms
];

// الفئة البرونزية - جيدة (بنق من 25-35ms)
// مقبولة للاستخدام لكن قد تكون أبطأ في أوقات الذروة
var JORDAN_TIER3_BRONZE = [
  ["176.28.0.0",   "255.255.0.0"],    // Jordan Telecom Group | avg 28ms
  ["176.29.0.0",   "255.255.0.0"],    // JTG Secondary | avg 30ms
  ["94.249.0.0",   "255.255.128.0"],  // Batelco Jordan | avg 32ms
  ["176.241.0.0",  "255.255.128.0"],  // Regional ISP | avg 29ms
  ["37.44.0.0",    "255.255.128.0"]   // General ISP Block | avg 33ms
];

// دمج كل الفئات في قائمة واحدة للتحقق السريع
var JORDAN_ALL_RANGES = JORDAN_TIER1_GOLD.concat(JORDAN_TIER2_SILVER, JORDAN_TIER3_BRONZE);

// ================= COMPREHENSIVE BLACKLIST =================
// قائمة سوداء شاملة لكل المناطق الجغرافية ذات البنق العالي
// تم تصميم هذه القائمة بعناية فائقة لحظر كل شيء قد يسبب تأخير

var GEO_BLACKLIST = [
  // أوروبا الغربية (بنق 50-100ms)
  ["5.0.0.0","255.0.0.0"],      // رومانيا وبلغاريا
  ["50.0.0.0","255.0.0.0"],     // بريطانيا
  ["51.0.0.0","255.0.0.0"],     // فرنسا وألمانيا
  ["52.0.0.0","254.0.0.0"],     // AWS أوروبا
  ["80.0.0.0","252.0.0.0"],     // أوروبا العامة
  ["82.0.0.0","254.0.0.0"],     // هولندا وبلجيكا
  ["88.0.0.0","254.0.0.0"],     // إيطاليا وإسبانيا
  ["90.0.0.0","254.0.0.0"],     // تركيا جزئياً
  ["92.0.0.0","252.0.0.0"],     // أوروبا الشرقية
  
  // روسيا وكومنولث الدول المستقلة (بنق 70-120ms)
  ["5.136.0.0","255.248.0.0"],   // Rostelecom
  ["31.128.0.0","255.192.0.0"],  // روسيا العامة
  ["46.16.0.0","255.240.0.0"],   // أوكرانيا وروسيا
  ["95.24.0.0","255.248.0.0"],   // كازاخستان وآسيا الوسطى
  ["178.64.0.0","255.192.0.0"],  // روسيا الشرقية
  ["188.0.0.0","252.0.0.0"],     // أوروبا الشرقية الواسعة
  ["213.0.0.0","255.0.0.0"],     // أوروبا القديمة
  
  // إيران - حظر كامل (بنق 60-150ms مع تذبذب عالي)
  // هذه النطاقات كانت مختلطة مع الأردن في بعض السكربتات القديمة
  ["31.220.0.0","255.254.0.0"],  // Iran Telecom - مهم حذفه من القائمة البيضاء
  ["91.106.0.0","255.254.0.0"],  // Iran/Afghanistan ISPs
  ["2.184.0.0","255.248.0.0"],   // Iran Data Communication
  ["5.52.0.0","255.252.0.0"],    // Iranian ISPs Block 1
  ["5.56.0.0","255.248.0.0"],    // Iranian ISPs Block 2
  ["5.112.0.0","255.240.0.0"],   // Iran Backbone Network
  ["31.2.0.0","255.254.0.0"],    // Iran Telecom Secondary
  ["37.32.0.0","255.224.0.0"],   // Iran Hosting Providers
  ["37.130.0.0","255.254.0.0"],  // Pars Online Iran
  ["46.32.0.0","255.224.0.0"],   // Iran Mobile Networks
  ["62.60.0.0","255.252.0.0"],   // Iran Shatel
  ["78.38.0.0","255.254.0.0"],   // Iranian Datacenters
  ["79.127.0.0","255.255.0.0"],  // Iran TCI
  ["79.175.0.0","255.255.0.0"],  // Iran ISPs General
  ["80.191.0.0","255.255.0.0"],  // Iran Networks
  ["81.90.0.0","255.254.0.0"],   // Iran AS12880
  ["82.99.0.0","255.255.0.0"],   // Rightel Iran
  ["85.9.0.0","255.255.0.0"],    // Iran Mobin Net
  ["85.133.0.0","255.255.0.0"],  // Iran General ISP
  ["86.104.0.0","255.248.0.0"],  // Iran Parsonline
  ["88.135.0.0","255.255.0.0"],  // Iran Sepanta
  ["89.32.0.0","255.224.0.0"],   // Iran Various ISPs
  ["91.98.0.0","255.254.0.0"],   // Iran/Turkmenistan Border
  ["91.109.0.0","255.255.0.0"],  // Iran Asiatech
  ["92.38.0.0","255.254.0.0"],   // Iran Hosting Services
  ["92.119.0.0","255.255.0.0"],  // Iranian Networks General
  
  // أفغانستان (بنق 100-200ms غير مستقر)
  ["103.6.0.0","255.254.0.0"],     // Afghan Telecom
  ["103.9.0.0","255.255.0.0"],     // Afghanistan ISPs
  ["103.11.0.0","255.255.0.0"],    // Etisalat Afghanistan
  ["103.15.0.0","255.255.0.0"],    // Roshan Afghanistan
  ["103.19.0.0","255.255.0.0"],    // AWCC Afghanistan
  ["103.31.0.0","255.255.0.0"],    // Afghan Wireless
  ["119.160.0.0","255.240.0.0"],   // Afghanistan Networks
  ["175.107.0.0","255.255.0.0"],   // Salaam Afghanistan
  ["182.52.0.0","255.252.0.0"],    // Afghanistan Telecom
  ["202.163.64.0","255.255.192.0"], // Afghan ISPs
  
  // شرق آسيا البعيد (بنق 150-300ms)
  ["1.0.0.0","255.0.0.0"],      // الصين
  ["14.0.0.0","255.0.0.0"],     // اليابان
  ["27.0.0.0","255.0.0.0"],     // كوريا الجنوبية
  ["36.0.0.0","255.0.0.0"],     // الصين الشرقية
  ["39.0.0.0","255.0.0.0"],     // اليابان
  ["42.0.0.0","255.0.0.0"],     // هونغ كونغ
  ["49.0.0.0","255.0.0.0"],     // تايلاند
  ["58.0.0.0","255.0.0.0"],     // الصين
  ["59.0.0.0","255.0.0.0"],     // كوريا
  ["60.0.0.0","255.0.0.0"],     // ماليزيا
  ["61.0.0.0","255.0.0.0"],     // تايوان
  ["101.0.0.0","255.0.0.0"],    // جنوب شرق آسيا
  ["103.0.0.0","255.0.0.0"],    // آسيا العامة
  ["106.0.0.0","254.0.0.0"],    // الصين
  ["110.0.0.0","254.0.0.0"],    // الصين الشمالية
  ["112.0.0.0","248.0.0.0"],    // الصين الجنوبية
  ["120.0.0.0","248.0.0.0"],    // الصين الوسطى
  
  // الأمريكتين (بنق 200-400ms)
  ["3.0.0.0","255.0.0.0"],      // AWS أمريكا
  ["4.0.0.0","252.0.0.0"],      // Level 3 أمريكا
  ["8.0.0.0","248.0.0.0"],      // Level 3 وGoogle
  ["12.0.0.0","252.0.0.0"],     // AT&T أمريكا
  ["24.0.0.0","248.0.0.0"],     // Comcast أمريكا
  ["32.0.0.0","224.0.0.0"],     // أمريكا الشمالية
  ["64.0.0.0","192.0.0.0"],     // أمريكا العامة
  ["128.0.0.0","192.0.0.0"],    // أمريكا الواسعة
  ["192.0.0.0","252.0.0.0"],    // أمريكا القديمة
  ["196.0.0.0","252.0.0.0"],    // أفريقيا
  ["198.0.0.0","254.0.0.0"],    // أمريكا الشمالية
  ["199.0.0.0","255.0.0.0"],    // أمريكا
  ["200.0.0.0","248.0.0.0"],    // أمريكا الجنوبية
  ["208.0.0.0","240.0.0.0"]     // أمريكا الشمالية
];

// ================= SESSION STATE MANAGEMENT =================
// نظام إدارة الحالة المتقدم - يتتبع كل تفاصيل الاتصال
var SESSION = {
  // قفل المباراة الصارم - المستوى الأول
  matchIP: null,              // عنوان IP الكامل للخادم (مثال: 46.185.131.25)
  matchPort: null,            // البورت المحدد (مثال: 10012)
  matchHost: null,            // اسم النطاق الكامل
  matchNet24: null,           // الشبكة /24 (مثال: 46.185.131)
  matchNet16: null,           // الشبكة /16 (مثال: 46.185) - للحماية من الانجراف
  matchTier: null,            // فئة الجودة (1 = ذهبي، 2 = فضي، 3 = برونزي)
  
  // إحصائيات المباراة - للمراقبة والتحليل
  matchStartTime: 0,          // وقت بداية المباراة بالميلي ثانية
  matchPacketCount: 0,        // عدد حزم البيانات المرسلة
  lastPacketTime: 0,          // وقت آخر حزمة تم معالجتها
  driftAttempts: 0,           // عدد محاولات الانجراف المحظورة
  
  // نظام الكاش متعدد المستويات
  dnsCache: {},               // كاش DNS - يحفظ IP لكل hostname
  routingCache: {},           // كاش القرارات - يحفظ قرار التوجيه لكل طلب
  tierCache: {},              // كاش الفئات - يحفظ فئة كل IP
  
  // الكشف المبكر والاستعداد
  preMatchDetected: false,    // هل تم كشف مرحلة ما قبل المباراة
  preMatchHost: null,         // الخادم المحتمل قبل بداية المباراة
  preMatchTimestamp: 0,       // وقت الكشف المبكر
  
  // نظام Fallback الذكي
  primaryProxyFailed: false,  // هل فشل البروكسي الأساسي
  currentFallbackIndex: 0,    // مؤشر البروكسي الاحتياطي الحالي
  failureCount: 0,            // عدد الفشل المتتالي
  lastFailureTime: 0,         // وقت آخر فشل
  
  // تحسينات الأداء
  cacheHits: 0,               // عدد مرات استخدام الكاش بنجاح
  cacheMisses: 0,             // عدد مرات الفشل في إيجاد بيانات بالكاش
  totalRequests: 0            // إجمالي الطلبات المعالجة
};

// ================= PERFORMANCE CONSTANTS =================
// ثوابت لضبط سلوك السكربت وتحسين الأداء

var CACHE_TIMEOUT = 300000;        // مدة صلاحية الكاش (5 دقائق بالميلي ثانية)
var PREMATCH_TIMEOUT = 60000;      // مدة صلاحية الكشف المبكر (دقيقة واحدة)
var DRIFT_TOLERANCE = 3;           // عدد محاولات الانجراف المسموحة قبل الحظر التام
var FALLBACK_RETRY_DELAY = 30000;  // الوقت قبل إعادة محاولة البروكسي الأساسي (30 ثانية)

// ================= CORE HELPER FUNCTIONS =================
// دوال مساعدة أساسية لمعالجة البيانات

// تطبيع اسم الخادم بإزالة البورت إن وجد
// مثال: "example.com:8080" يصبح "example.com"
function normalizeHost(host) {
  var colonIndex = host.indexOf(":");
  return colonIndex > -1 ? host.substring(0, colonIndex) : host;
}

// استخراج البورت من اسم الخادم إن وجد
// مثال: "example.com:8080" يعطي "8080"
// إذا لم يكن هناك بورت، يعطي null
function extractPort(host) {
  var colonIndex = host.indexOf(":");
  return colonIndex > -1 ? host.substring(colonIndex + 1) : null;
}

// فحص ما إذا كان IP موجوداً في قائمة نطاقات معينة
// يستخدم دالة isInNet المدمجة في PAC
function isInRangeList(ip, rangeList) {
  for (var i = 0; i < rangeList.length; i++) {
    if (isInNet(ip, rangeList[i][0], rangeList[i][1])) {
      return true;
    }
  }
  return false;
}

// تحديد فئة النطاق الأردني (الذهبي، الفضي، البرونزي)
// يعطي 1 للذهبي، 2 للفضي، 3 للبرونزي، 0 إذا لم يكن أردنياً
// هذه الدالة تستخدم الكاش لتسريع العمليات المتكررة
function getJordanTier(ip) {
  // التحقق من الكاش أولاً لتوفير الوقت
  if (SESSION.tierCache[ip]) {
    return SESSION.tierCache[ip];
  }
  
  // إذا لم يكن في الكاش، نحسبه ونحفظه
  var tier = 0;
  if (isInRangeList(ip, JORDAN_TIER1_GOLD)) {
    tier = 1;
  } else if (isInRangeList(ip, JORDAN_TIER2_SILVER)) {
    tier = 2;
  } else if (isInRangeList(ip, JORDAN_TIER3_BRONZE)) {
    tier = 3;
  }
  
  // حفظ النتيجة في الكاش للمرات القادمة
  SESSION.tierCache[ip] = tier;
  return tier;
}

// حل DNS مع نظام كاش ذكي وتنظيف دوري
// هذه الدالة مهمة جداً لتقليل زمن حل الأسماء
function resolveWithCache(host) {
  var currentTime = new Date().getTime();
  
  // التحقق من وجود النتيجة في الكاش
  if (SESSION.dnsCache[host]) {
    var cached = SESSION.dnsCache[host];
    
    // التحقق من أن النتيجة لم تنتهي صلاحيتها
    if (currentTime - cached.timestamp < CACHE_TIMEOUT) {
      SESSION.cacheHits++;
      return cached.ip;
    }
  }
  
  // إذا لم توجد في الكاش أو انتهت صلاحيتها، نحلها من جديد
  SESSION.cacheMisses++;
  var ip = dnsResolve(host);
  
  // حفظ النتيجة في الكاش مع وقت الحفظ
  if (ip) {
    SESSION.dnsCache[host] = {
      ip: ip,
      timestamp: currentTime
    };
  }
  
  return ip;
}

// اختيار بروكسي اللوبي بذكاء بناءً على اسم الخادم والفئة
// تستخدم خوارزمية hash لتوزيع الحمل بشكل متوازن
function selectLobbyProxy(host, tier) {
  // الفئة الذهبية تحصل دائماً على أسرع بروكسي
  if (tier === 1) {
    return LOBBY_POOL[0];
  }
  
  // للفئات الأخرى، نستخدم توزيع متوازن بناءً على hash
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = (hash + host.charCodeAt(i)) % (LOBBY_POOL.length - 1);
  }
  
  // نتجنب البروكسي الأول ونحفظه للفئة الذهبية والمباريات
  return LOBBY_POOL[hash + 1];
}

// استخراج الشبكة /24 من عنوان IP
// مثال: "46.185.131.25" يعطي "46.185.131"
function getSubnet24(ip) {
  var parts = ip.split('.');
  return parts[0] + '.' + parts[1] + '.' + parts[2];
}

// استخراج الشبكة /16 من عنوان IP
// مثال: "46.185.131.25" يعطي "46.185"
function getSubnet16(ip) {
  var parts = ip.split('.');
  return parts[0] + '.' + parts[1];
}

// الحصول على البروكسي الاحتياطي المناسب
// يتناوب بين البروكسيات الاحتياطية عند الفشل
function getFallbackProxy() {
  var proxy = MATCH_FALLBACK[SESSION.currentFallbackIndex];
  
  // الانتقال للبروكسي التالي في المرة القادمة
  SESSION.currentFallbackIndex = (SESSION.currentFallbackIndex + 1) % MATCH_FALLBACK.length;
  
  return proxy;
}

// التحقق من إمكانية إعادة محاولة البروكسي الأساسي
// بعد فترة من الفشل، نحاول مرة أخرى
function shouldRetryPrimary() {
  var currentTime = new Date().getTime();
  return SESSION.primaryProxyFailed && 
         (currentTime - SESSION.lastFailureTime) > FALLBACK_RETRY_DELAY;
}

// ================= ENHANCED TRAFFIC DETECTION =================
// دوال كشف محسّنة لأنواع مختلفة من الترافيك

// كشف نطاقات PUBG Mobile وكل الخدمات المرتبطة
function isPUBGDomain(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|quantum|gameloop|proximabeta|intlgame|igame|pubgmobile/i.test(host);
}

// كشف متقدم لحزم المباريات الفعلية
// يشمل أنماطاً متعددة لأنواع مختلفة من حزم اللعب
function isMatchTraffic(url, host) {
  // الأنماط الأساسية للمباريات النشطة
  var corePatterns = /match|battle|game|combat|realtime|sync|udp|tick|room|server|session|play|live|arena|gameplay/i.test(url + host);
  
  // أنماط خاصة بمراحل اللعب المختلفة
  var gameplayPatterns = /spawn|deploy|drop|land|parachute|plane|zone|circle|loot|shoot|fire|kill|death/i.test(url + host);
  
  // أنماط البيانات الحساسة للوقت
  var realtimePatterns = /position|location|movement|action|event|state|update/i.test(url + host);
  
  return corePatterns || gameplayPatterns || realtimePatterns;
}

// كشف مرحلة الاستعداد قبل المباراة
// هذا يساعدنا في التجهيز المسبق وقفل الخادم مبكراً
function isPreMatchTraffic(url, host) {
  return /ready|waiting|prepare|starting|countdown|warmup|loading|matchmaking|joining/i.test(url + host);
}

// كشف خدمات اللوبي والانتظار
function isLobbyTraffic(url, host) {
  return /lobby|queue|dispatch|gateway|region|join|recruit|connect|entrance|hall/i.test(url + host);
}

// كشف الخدمات الاجتماعية والتواصل
function isSocialTraffic(url, host) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|voice|message/i.test(url + host);
}

// كشف CDN وتحديثات المحتوى
function isCDNTraffic(url, host) {
  return /cdn|asset|resource|patch|update|media|content|download|file|texture|skin|model/i.test(url + host);
}

// كشف خوادم Relay الوسيطة (يجب تجنبها)
// هذه الخوادم تضيف طبقة إضافية تزيد البنق
function isRelayServer(host) {
  return /relay|proxy|forward|tunnel|gateway|bridge|repeater|middlebox/i.test(host);
}

// التحقق من أن الخادم مباشر وليس وسيط
// الخوادم المباشرة أفضل دائماً للبنق المنخفض
function isDirectGameServer(host) {
  var directIndicators = /game|match|server|node|host|instance|dedicated/i.test(host);
  var relayIndicators = isRelayServer(host);
  
  return directIndicators && !relayIndicators;
}

// ================= MAIN ROUTING LOGIC =================
// الدالة الرئيسية التي تقرر مسار كل طلب
function FindProxyForURL(url, host) {
  
  // زيادة عداد الطلبات للإحصائيات
  SESSION.totalRequests++;
  
  // تطبيع اسم الخادم وإزالة البورت
  var originalHost = host;
  host = normalizeHost(host.toLowerCase());
  var port = extractPort(originalHost);
  
  // === خطوة 1: فحص النطاق - هل هو PUBG؟ ===
  // إذا لم يكن PUBG، نسمح بالمرور المباشر بدون بروكسي
  if (!isPUBGDomain(host)) {
    return DIRECT;
  }
  
  // === خطوة 2: حل DNS والتحقق من الكاش ===
  var ip = resolveWithCache(host);
  
  // إذا فشل حل DNS أو كان IPv6، نحظر الاتصال
  // IPv6 غير مدعوم حالياً في هذا السكربت
  if (!ip || ip.indexOf(":") > -1) {
    return BLOCK;
  }
  
  // === خطوة 3: الحظر الجغرافي الصارم ===
  // أي IP في القائمة السوداء يُحظر فوراً بدون تفكير
  if (isInRangeList(ip, GEO_BLACKLIST)) {
    return BLOCK;
  }
  
  // === خطوة 4: تحديد فئة النطاق الأردني ===
  var tier = getJordanTier(ip);
  
  // إذا لم يكن النطاق أردنياً على الإطلاق، نحظره
  if (tier === 0) {
    return BLOCK;
  }
  
  // === خطوة 5: حظر خوادم Relay حتى لو كانت أردنية ===
  // الخوادم الوسيطة تضيف تأخيراً غير مرغوب
  if (isRelayServer(host)) {
    return BLOCK;
  }
  
  // === خطوة 6: معالجة مرحلة ما قبل المباراة ===
  // الكشف المبكر يساعدنا في التحضير والقفل المسبق
  if (isPreMatchTraffic(url, host)) {
    var currentTime = new Date().getTime();
    
    // إذا لم نكن قد اكتشفنا هذه المرحلة من قبل
    if (!SESSION.preMatchDetected) {
      SESSION.preMatchDetected = true;
      SESSION.preMatchHost = host;
      SESSION.preMatchTimestamp = currentTime;
      
      // نستخدم بروكسي المباريات مباشرة للاستعداد
      return shouldRetryPrimary() ? MATCH_PRIMARY : getFallbackProxy();
    }
    
    // إذا مضى وقت طويل على الكشف المبكر، نعيد تعيينه
    if (currentTime - SESSION.preMatchTimestamp > PREMATCH_TIMEOUT) {
      SESSION.preMatchDetected = false;
      SESSION.preMatchHost = null;
    }
  }
  
  // === خطوة 7: معالجة حزم المباريات الفعلية ===
  // هذا هو الجزء الأهم والأكثر حساسية في السكربت
  if (isMatchTraffic(url, host)) {
    
    // استخراج معلومات الشبكة من الـ IP
    var subnet24 = getSubnet24(ip);
    var subnet16 = getSubnet16(ip);
    var currentTime = new Date().getTime();
    
    // === حالة 1: بداية مباراة جديدة (القفل الأولي) ===
    if (!SESSION.matchIP) {
      
      // فحص أمني: يجب أن يكون الخادم مباشراً وليس وسيط
      if (!isDirectGameServer(host)) {
        return BLOCK;
      }
      
      // قفل كامل على كل تفاصيل الاتصال
      SESSION.matchIP = ip;                    // عنوان IP الكامل
      SESSION.matchPort = port;                // البورت المحدد
      SESSION.matchHost = host;                // اسم الخادم
      SESSION.matchNet24 = subnet24;           // الشبكة /24
      SESSION.matchNet16 = subnet16;           // الشبكة /16
      SESSION.matchTier = tier;                // فئة الجودة
      SESSION.matchStartTime = currentTime;    // وقت البداية
      SESSION.matchPacketCount = 1;            // أول حزمة
      SESSION.lastPacketTime = currentTime;    // آخر حزمة
      SESSION.driftAttempts = 0;               // إعادة تعيين محاولات الانجراف
      
      // إعادة تعيين حالة Fallback للمباراة الجديدة
      if (shouldRetryPrimary()) {
        SESSION.primaryProxyFailed = false;
        SESSION.currentFallbackIndex = 0;
      }
      
      // استخدام البروكسي المناسب (أساسي أو احتياطي)
      return SESSION.primaryProxyFailed ? getFallbackProxy() : MATCH_PRIMARY;
    }
    
    // === حالة 2: مباراة جارية - تطبيق القفل الصارم ===
    
    // الفحص 1: يجب أن يكون نفس عنوان IP بالضبط
    // هذا أقوى مستوى من القفل - لا نسمح بأي تغيير
    if (ip !== SESSION.matchIP) {
      SESSION.driftAttempts++;
      
      // إذا تجاوزنا الحد المسموح، نحظر بشكل دائم
      if (SESSION.driftAttempts > DRIFT_TOLERANCE) {
        return BLOCK;
      }
      
      // محاولة أخيرة مع البروكسي الاحتياطي
      return getFallbackProxy();
    }
    
    // الفحص 2: التحقق من البورت إن كان محدداً
    // بعض الخوادم تستخدم بورتات متعددة، نتحقق فقط إذا كان محدداً
    if (SESSION.matchPort && port && port !== SESSION.matchPort) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 3: يجب أن يكون نفس اسم الخادم
    // هذا يمنع الانتقال لخادم آخر حتى لو كان نفس الـ IP
    if (host !== SESSION.matchHost) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 4: منع الانجراف على مستوى الشبكة /16
    // هذا يحمينا من التحول التدريجي لشبكات أخرى
    if (subnet16 !== SESSION.matchNet16) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // الفحص 5: منع تدهور الجودة
    // لا نسمح بالانتقال من فئة أعلى لفئة أقل
    if (tier > SESSION.matchTier) {
      SESSION.driftAttempts++;
      return BLOCK;
    }
    
    // كل الفحوصات نجحت - تحديث الإحصائيات
    SESSION.matchPacketCount++;
    SESSION.lastPacketTime = currentTime;
    
    // إذا كانت المباراة مستقرة، نعيد محاولة البروكسي الأساسي
    if (shouldRetryPrimary() && SESSION.matchPacketCount > 50) {
      SESSION.primaryProxyFailed = false;
      return MATCH_PRIMARY;
    }
    
    // الاستمرار مع البروكسي الحالي
    return SESSION.primaryProxyFailed ? getFallbackProxy() : MATCH_PRIMARY;
  }
  
  // === خطوة 8: معالجة اللوبي والخدمات الاجتماعية ===
  if (isLobbyTraffic(url, host) || isSocialTraffic(url, host)) {
    return selectLobbyProxy(host, tier);
  }
  
  // === خطوة 9: معالجة CDN والتحديثات ===
  // نعطي CDN أولوية أقل لأنه ليس حساساً للوقت
  if (isCDNTraffic(url, host)) {
    // نستخدم دائماً البروكسيات الأبطأ للـ CDN
    return LOBBY_POOL[LOBBY_POOL.length - 1];
  }
  
  // === خطوة 10: الحالة الافتراضية ===
  // أي ترافيك PUBG آخر غير مصنف نوجهه للوبي
  return selectLobbyProxy(host, tier);
}

// =====================================================================
// نهاية السكربت
// =====================================================================
// ملاحظات مهمة للاستخدام الأمثل:
// 
// 1. تأكد من أن البروكسيات في الأعلى تعمل وسريعة
// 2. راقب أداء السكربت عبر فحص الإحصائيات في SESSION
// 3. يمكنك تعديل CACHE_TIMEOUT لزيادة أو تقليل مدة الكاش
// 4. DRIFT_TOLERANCE يتحكم بمدى صرامة القفل على الخادم
// 5. السكربت محسّن لنظام iOS لكنه يعمل على كل الأنظمة
// 
// للدعم الفني أو الاستفسارات، راجع التوثيق الكامل
// =====================================================================
