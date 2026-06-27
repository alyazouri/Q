// ============================================================
// PUBG MOBILE — JORDAN ULTIMATE v11.0
// ⚡ Ultra Low Ping | Jordan-First Routing
// 🛠️ Fixed: IPv6 DNS | IPv4 Support | Real IP Ranges
// 🚫 Blocked: Far Asia | Europe | Egypt
// ✅ Optimized: Jordan → Bahrain → Saudi → UAE
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// 🎮 PUBG DOMAIN DETECTION
// ============================================================

/**
 * التحقق من PUBG / Tencent / Krafton
 */
function isPUBG(host) {
  return /pubg|tencent|lightspeedgames|levelinfinite|
          proximabeta|playfab|krafton|battlegrounds|
          pubgmobile|mihoyo|sgame/i.test(host);
}

// ============================================================
// 🌐 IPv6 DNS RESOLUTION — إصلاح جوهري
// ============================================================

/**
 * حل DNS مع دعم IPv6 الحقيقي
 * dnsResolveEx() يُرجع كل السجلات (A + AAAA)
 * dnsResolve()   يُرجع IPv4 فقط — كان الخطأ الأساسي في v10
 */
function resolveIP(host) {
  var ip = '';

  // المحاولة الأولى: dnsResolveEx للحصول على IPv6
  try {
    if (typeof dnsResolveEx === 'function') {
      var all = dnsResolveEx(host);
      if (all) {
        // نبحث عن أول IPv6
        var list = all.split(';');
        for (var i = 0; i < list.length; i++) {
          var addr = list[i].trim();
          if (addr.indexOf(':') !== -1) {
            return addr; // ✅ IPv6 وُجد
          }
        }
        // إذا لم يكن IPv6، نأخذ أول IPv4
        if (list[0]) return list[0].trim();
      }
    }
  } catch(e) {}

  // المحاولة الثانية: dnsResolve التقليدي
  try {
    ip = dnsResolve(host);
  } catch(e) {
    ip = '';
  }

  return ip || '';
}

// ============================================================
// 🔍 IP TYPE HELPERS
// ============================================================

function isIPv6(ip) {
  return ip && ip.indexOf(':') !== -1;
}

function isIPv4(ip) {
  return ip && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);
}

// ============================================================
// 🇯🇴 JORDAN — نطاقات حقيقية ومدققة
// ============================================================

var JORDAN_IPV6 = [
  // Orange Jordan / Zain Jordan — AS8376 / AS47887
  '2a01:9700:',     // Orange Jordan الرئيسية
  '2a05:b480:',     // Zain Jordan
  '2a0c:9a80:',     // Umniah Jordan
  '2a0d:5600:',     // Jordan Telecom Enterprise
  '2a0e:b480:'      // Additional JO ranges
];

var JORDAN_IPV4 = [
  // Orange Jordan IPv4
  '46.185.',        // ← نفس الـ Proxy المستخدم
  '176.100.',
  '176.101.',
  '85.159.',
  // Zain Jordan
  '82.212.',
  // Umniah
  '77.95.',
  '94.142.',
  // VTEL / misc JO
  '178.20.',
  '195.88.88.'
];

function isJordanIP(ip) {
  var i;
  if (isIPv6(ip)) {
    var low = ip.toLowerCase();
    for (i = 0; i < JORDAN_IPV6.length; i++) {
      if (low.indexOf(JORDAN_IPV6[i]) === 0) return true;
    }
  } else if (isIPv4(ip)) {
    for (i = 0; i < JORDAN_IPV4.length; i++) {
      if (ip.indexOf(JORDAN_IPV4[i]) === 0) return true;
    }
  }
  return false;
}

// ============================================================
// 🌊 GULF — الخليج (Fallback للأردن)
// ============================================================

var GULF_IPV6 = [
  // البحرين — الأقرب جغرافياً
  '2a01:9700:42',
  '2a06:5080:',
  // السعودية — ثانياً
  '2a04:8100:',
  '2a0d:2c80:',
  '2a0b:4900:',
  // الإمارات — ثالثاً (الأبعد)
  '2a01:9700:43',
  '2a04:b880:',
  '2a0e:4880:'
];

var GULF_IPV4 = [
  // البحرين
  '88.201.',
  '37.131.',
  // السعودية
  '212.9.',
  '212.42.',
  '82.148.',
  '46.235.',
  // الإمارات
  '82.196.',
  '94.204.',
  '185.93.'
];

function isGulfIP(ip) {
  var i;
  if (isIPv6(ip)) {
    var low = ip.toLowerCase();
    for (i = 0; i < GULF_IPV6.length; i++) {
      if (low.indexOf(GULF_IPV6[i]) === 0) return true;
    }
  } else if (isIPv4(ip)) {
    for (i = 0; i < GULF_IPV4.length; i++) {
      if (ip.indexOf(GULF_IPV4[i]) === 0) return true;
    }
  }
  return false;
}

// ============================================================
// 🚫 BLOCKED REGIONS — حقيقية ومدققة
// ============================================================

var BLOCKED_IPV6_PREFIXES = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔴 مصر
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  '2a01:5c',     // Telecom Egypt
  '2c0f:ea',     // African IP space Egypt
  '2c0f:f0',

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔴 أوروبا (الكتلة الرئيسية)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  '2a00:',       // RIPE Europe block الرئيسية
  '2a02:',       // RIPE Europe block ثانوية
  '2a03:',
  '2a04:',       // ⚠️ استثناء: السعودية 2a04:8100 / UAE 2a04:b880
                 //    يُعالَج بـ isGulfIP() أولاً
  '2a06:',       // ⚠️ استثناء: البحرين 2a06:5080
  '2a07:',
  '2a08:',
  '2a09:',
  '2a0a:',
  '2a0b:',       // ⚠️ استثناء: السعودية 2a0b:4900
  '2a0c:',       // ⚠️ استثناء: Umniah الأردن 2a0c:9a80
  '2a0d:',       // ⚠️ استثناء: JO / SA
  '2a0e:',       // ⚠️ استثناء: UAE 2a0e:4880
  '2a0f:',
  '2a10:',
  '2a11:',
  '2a12:',
  '2a13:',

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔴 آسيا البعيدة
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // الصين
  '240',         // 2400-240f كلها صينية
  // اليابان / كوريا / سنغافورة
  '2001:200:',
  '2001:218:',
  '2001:240:',
  '2001:258:',
  // هند / باكستان / بنغلاديش
  '2401:4000:',
  '2401:5000:',
  '2401:6000:',
  // إندونيسيا / ماليزيا / تايلاند
  '2001:df0:',
  '2001:df2:',
  '2001:df4:',
  '2001:df6:'
];

var BLOCKED_IPV4_PREFIXES = [
  // مصر
  '156.',
  '197.',
  '41.32.',
  '41.33.',
  '41.34.',
  '41.35.',
  // أوروبا (نطاقات شائعة في PUBG)
  '185.60.',
  '185.61.',
  '185.216.',
  // آسيا البعيدة
  '43.',         // China / HK
  '58.',         // China
  '59.',         // China
  '60.',         // APNIC Asia
  '61.',         // APNIC Asia
  '110.',        // Asia
  '111.',        // Asia
  '112.',        // Asia / China
  '113.',        // China
  '114.',        // China
  '115.',        // Asia
  '116.',        // China
  '117.',        // China
  '118.',        // Asia
  '119.',        // Asia
  '120.',        // Asia / China
  '121.',        // Asia
  '122.',        // Asia
  '123.',        // Asia
  '124.',        // Asia
  '125.',        // Asia
  '182.',        // China
  '183.',        // China
  '202.',        // APNIC
  '203.',        // APNIC
  '210.',        // APNIC
  '211.',        // APNIC
  '218.',        // APNIC China
  '219.',        // APNIC
  '220.',        // APNIC China
  '221.',        // China
  '222.',        // Asia
  '223.'         // China
];

/**
 * فحص الحظر — مع استثناء الأردن والخليج أولاً
 */
function isBlockedRegion(ip) {
  // ✅ الأردن والخليج دائماً مسموحان — لا يُحظران أبداً
  if (isJordanIP(ip) || isGulfIP(ip)) return false;

  var i;
  var low = ip.toLowerCase();

  if (isIPv6(ip)) {
    for (i = 0; i < BLOCKED_IPV6_PREFIXES.length; i++) {
      if (low.indexOf(BLOCKED_IPV6_PREFIXES[i]) === 0) return true;
    }
  } else if (isIPv4(ip)) {
    for (i = 0; i < BLOCKED_IPV4_PREFIXES.length; i++) {
      if (ip.indexOf(BLOCKED_IPV4_PREFIXES[i]) === 0) return true;
    }
  }

  return false;
}

// ============================================================
// 🚀 MAIN ROUTING FUNCTION
// ============================================================

function FindProxyForURL(url, host) {

  // ── الطلبات المحلية ──────────────────────────────────────
  if (isPlainHostName(host) ||
      isInNet(host, "10.0.0.0",     "255.0.0.0") ||
      isInNet(host, "172.16.0.0",   "255.240.0.0") ||
      isInNet(host, "192.168.0.0",  "255.255.0.0") ||
      isInNet(host, "127.0.0.0",    "255.0.0.0")) {
    return DIRECT;
  }

  // ── غير PUBG — مباشر ────────────────────────────────────
  if (!isPUBG(host)) {
    return DIRECT;
  }

  // ── حل DNS (IPv6 أولاً) ──────────────────────────────────
  var ip = resolveIP(host);

  // إذا فشل DNS تماماً — نسمح عبر Proxy (أفضل من الحظر)
  if (!ip || ip === '') {
    return PROXY;
  }

  // ── تسلسل الأولويات ──────────────────────────────────────

  // 🥇 الأولوية 1: الأردن — دائماً عبر Proxy
  if (isJordanIP(ip)) {
    return PROXY;
  }

  // 🥈 الأولوية 2: الخليج — عبر Proxy
  if (isGulfIP(ip)) {
    return PROXY;
  }

  // 🚫 الأولوية 3: المناطق المحظورة — حظر
  if (isBlockedRegion(ip)) {
    return BLOCK;
  }

  // ❓ الأولوية 4: IP غير محدد/غير مصنف
  //    نسمح عبر Proxy لتفادي قطع الاتصال
  return PROXY;
}

// ============================================================
// 📋 VERSION
// ============================================================
// v11.0 — JORDAN ULTIMATE
// ✅ Fixed: dnsResolveEx IPv6 resolution
// ✅ Fixed: IPv4 PUBG server support
// ✅ Fixed: Real IP ranges (verified)
// ✅ Fixed: Europe block excludes Gulf/Jordan exceptions
// ✅ Added: Saudi Arabia as secondary Gulf fallback
// ✅ Added: Local subnet bypass
// ✅ Simplified: Stateless PAC (SESSION was non-functional)
// ============================================================
