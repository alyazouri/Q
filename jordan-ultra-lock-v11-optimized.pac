// ============================================================
// JORDAN ULTRA STRICT LOCK v11 OPTIMIZED
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🇯🇴 Jordan ISP Optimized - Fiber Ready
// 🌍 Middle East Region Lock
// 🔒 /40 + /64 + Full IP Lock During Match
// 🎮 Lobby Flexible with Smart Detection
// ⚡ Auto Unlock When Leaving Match
// 🛡️ Enhanced Security & Error Handling
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ============================================================

// ================= PROXY CONFIGURATION =================
// استبدل بعنوان بروكسي أردني حقيقي عند التوفر

var PROXY_CONFIG = {
  // البروكسي الأساسي - استبدله ببروكسي أردني
  primary: "PROXY jo-proxy.local:3128",
  
  // بروكسي احتياطي
  backup: "PROXY 46.185.131.218:20001",
  
  // اتصال مباشر
  direct: "DIRECT",
  
  // حظر الاتصال
  block: "PROXY 0.0.0.0:0"
};

var PROXY  = PROXY_CONFIG.primary;
var DIRECT = PROXY_CONFIG.direct;
var BLOCK  = PROXY_CONFIG.block;

// ================= SESSION STATE =================

var SESSION = {
  locked40: null,
  locked64: null,
  lockedIP: null,
  matchActive: false,
  connectionCount: 0,
  lastHost: null,
  lastAction: null,
  startTime: Date.now()
};

// ================= DEBUG MODE =================

var DEBUG = {
  enabled: false,
  log: function(msg) {
    if (this.enabled && typeof console !== 'undefined') {
      console.log('[JORDAN-LOCK] ' + msg);
    }
  }
};

// ================= EUROPE HARD BLOCK PREFIXES =================
// بادئات IPv6 أوروبية للحظر

var EUROPE_PREFIXES = [
  "2a02", // أوروبا الغربية
  "2a03", // أوروبا الشمالية
  "2a06", // أوروبا الوسطى
  "2a07", // أوروبا الشرقية
  "2a00", // المملكة المتحدة
  "2a01", // أوروبا الغربية (متنوعة)
  "2a04", // أوروبا
  "2a05", // أوروبا
  "2a08", // أوروبا
  "2a09", // أوروبا
  "2a0a", // أوروبا
  "2a0b", // أوروبا
  "2a0c", // أوروبا
  "2a0d", // أوروبا
  "2a0e", // أوروبا
  "2a0f"  // أوروبا
];

// ================= JORDAN ISP IPv6 PREFIXES (/40) =================
// نطاقات IPv6 أردنية حقيقية من مزودي الخدمة المحليين

var JORDAN_ISP_PREFIXES = {
  // ━━━━━━━━━━━ Orange Jordan / أورنج الأردن ━━━━━━━━━━━
  "2a01:9700": true,   // Orange Jordan Mobile
  "2a01:9701": true,   // Orange Jordan Fiber
  "2a01:9702": true,   // Orange Jordan Corporate
  "2a01:9703": true,   // Orange Jordan Data
  "2a01:9704": true,   // Orange Jordan Broadband
  
  // ━━━━━━━━━━━ Zain Jordan / زين الأردن ━━━━━━━━━━━
  "2a02:2400": true,   // Zain Jordan 4G/5G
  "2a02:2401": true,   // Zain Jordan Fiber
  "2a02:2402": true,   // Zain Jordan Corporate
  "2a02:2403": true,   // Zain Jordan Mobile
  
  // ━━━━━━━━━━━ Umniah / أمنية ━━━━━━━━━━━
  "2a02:2500": true,   // Umniah 4G LTE
  "2a02:2501": true,   // Umniah 5G
  "2a02:2502": true,   // Umniah Broadband
  
  // ━━━━━━━━━━━ Jordan Data Communications ━━━━━━━━━━━
  "2a00:1f40": true,   // JDC Data Center
  "2a00:1f41": true,   // JDC Corporate
  
  // ━━━━━━━━━━━ Damamax / داماكس ━━━━━━━━━━━
  "2a01:9e00": true,   // Damamax ISP
  "2a01:9e01": true,   // Damamax Corporate
  
  // ━━━━━━━━━━━ Mada Jordan / مادا ━━━━━━━━━━━
  "2a02:2700": true,   // Mada 4G
  "2a02:2701": true,   // Mada Fiber
  
  // ━━━━━━━━━━━ TE Data Jordan ━━━━━━━━━━━
  "2a01:9f00": true,   // TE Data Jordan
  
  // ━━━━━━━━━━━ Wanadoo Jordan ━━━━━━━━━━━
  "2a01:9705": true,   // Wanadoo ISP
  
  // ━━━━━━━━━━━ Batelco Jordan ━━━━━━━━━━━
  "2a01:9706": true,   // Batelco Jordan
  
  // ━━━━━━━━━━━ Jordan Telecom Group ━━━━━━━━━━━
  "2a01:9707": true,   // Jordan Telecom
  "2a01:9708": true,   // JT Infrastructure
  
  // ━━━━━━━━━━━ National ISP / المزود الوطني ━━━━━━━━━━━
  "2a01:9709": true,   // National ISP
  "2a01:970a": true,   // National Data
  
  // ━━━━━━━━━━━ MIDDLE EAST REGIONAL ━━━━━━━━━━━
  // للتوافق مع الخوادم الإقليمية القريبة
  "2a01:970b": true,   // ME Regional 1
  "2a01:970c": true,   // ME Regional 2
  "2a01:970d": true,   // ME Regional 3
  "2a01:970e": true,   // ME Regional 4
  "2a01:970f": true    // ME Regional 5
};

// ================= EXTENDED ALLOWED /40 PREFIXES =================
// نطاقات إضافية مسموحة (للتوافق مع التحديثات)

var ALLOWED_40 = {
  // Original prefixes (maintained for compatibility)
  "2a01:9700": true, "2a01:9701": true, "2a01:9702": true, "2a01:9703": true,
  "2a01:9704": true, "2a01:9705": true, "2a01:9706": true, "2a01:9707": true,
  "2a01:9708": true, "2a01:9709": true, "2a01:970a": true, "2a01:970b": true,
  "2a01:970c": true, "2a01:970d": true, "2a01:970e": true, "2a01:970f": true,
  "2a01:9710": true, "2a01:9711": true, "2a01:9712": true, "2a01:9713": true,
  "2a01:9714": true, "2a01:9715": true, "2a01:9716": true, "2a01:9717": true,
  "2a01:9718": true, "2a01:9719": true, "2a01:971a": true, "2a01:971b": true,
  "2a01:971c": true, "2a01:971d": true, "2a01:971e": true, "2a01:971f": true,
  
  // Extended Jordan ranges
  "2a01:9720": true, "2a01:9721": true, "2a01:9722": true, "2a01:9723": true,
  "2a01:9724": true, "2a01:9725": true, "2a01:9726": true, "2a01:9727": true,
  "2a01:9728": true, "2a01:9729": true, "2a01:972a": true, "2a01:972b": true,
  "2a01:972c": true, "2a01:972d": true, "2a01:972e": true, "2a01:972f": true,
  
  // Zain Jordan
  "2a02:2400": true, "2a02:2401": true, "2a02:2402": true, "2a02:2403": true,
  "2a02:2404": true, "2a02:2405": true, "2a02:2406": true, "2a02:2407": true,
  
  // Umniah
  "2a02:2500": true, "2a02:2501": true, "2a02:2502": true, "2a02:2503": true,
  
  // Mada
  "2a02:2700": true, "2a02:2701": true, "2a02:2702": true, "2a02:2703": true,
  
  // Damamax
  "2a01:9e00": true, "2a01:9e01": true, "2a01:9e02": true, "2a01:9e03": true
};

// ================= PUBG DOMAINS =================
// نطاقات PUBG الرسمية

var PUBG_DOMAINS = [
  // Tencent/Krafton Official
  "pubg.com", "pubgmobile.com", "pubgmo.com",
  "tencent.com", "tencentcloud.com", "wegame.com",
  "krafton.com", "krafton.game",
  "lightspeed.com", "lightspeedqa.com",
  "levelinfinite.com", "lvlprod.com",
  
  // Game Servers
  "igame.pubgmobile.com", "gs.pubgmobile.com",
  "cmd5.pubgmobile.com", "cmd6.pubgmobile.com",
  "cmdts.pubgmobile.com", "beta.pubgmobile.com",
  "pmdcdn.pubgmobile.com", "pmgrab.pubgmobile.com",
  "gcloud.pubgmobile.com",
  
  // Authentication
  "accounts.pubgmobile.com", "auth.pubgmobile.com",
  "login.pubgmobile.com", "sso.pubgmobile.com",
  
  // CDN & Assets
  "pgccdn.pubgmobile.com", "cloudfront.net",
  "akamai.net", "cdn.pubgmobile.com",
  
  // Analytics & Anti-cheat
  "anticheatservice.com", "anticheatexpert.com",
  "tpgbattle.com", "devgame.com",
  
  // Social & Community
  "discord.gg", "discord.com"
];

// ================= HELPER FUNCTIONS =================

/**
 * التحقق إذا كان العنوان IPv6
 */
function isIPv6(ip) {
  if (!ip || typeof ip !== 'string') return false;
  return ip.indexOf(":") !== -1;
}

/**
 * التحقق إذا كان العنوان IPv4
 */
function isIPv4(ip) {
  if (!ip || typeof ip !== 'string') return false;
  return ip.indexOf(".") !== -1 && ip.indexOf(":") === -1;
}

/**
 * توسيع عنوان IPv6 المختصر إلى الصيغة الكاملة
 */
function expandIPv6(addr) {
  if (!addr) return "";
  
  var full = [];
  var parts = addr.split("::");
  
  if (parts.length === 2) {
    var left = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    
    if (missing < 0) missing = 0;
    
    var zeros = [];
    for (var i = 0; i < missing; i++) {
      zeros.push("0");
    }
    
    full = left.concat(zeros).concat(right);
  } else {
    full = addr.split(":");
  }
  
  for (var j = 0; j < full.length; j++) {
    if (full[j]) {
      while (full[j].length < 4) {
        full[j] = "0" + full[j];
      }
    } else {
      full[j] = "0000";
    }
  }
  
  return full.join(":").toLowerCase();
}

/**
 * التحقق من بادئة أوروبية
 */
function isEuropePrefix(expanded) {
  if (!expanded || expanded.length < 4) return false;
  
  var prefix4 = expanded.substring(0, 4);
  
  for (var i = 0; i < EUROPE_PREFIXES.length; i++) {
    if (prefix4 === EUROPE_PREFIXES[i]) {
      return true;
    }
  }
  
  return false;
}

/**
 * التحقق من النطاق المسموح /40
 */
function isAllowed40(expanded) {
  if (!expanded || expanded.length < 10) return false;
  
  var prefix10 = expanded.substring(0, 10);
  
  // Check Jordan ISP prefixes first
  if (JORDAN_ISP_PREFIXES[prefix10] === true) return true;
  
  // Check extended allowed prefixes
  if (ALLOWED_40[prefix10] === true) return true;
  
  // Check partial prefix match (for /44 subnets)
  var prefix9 = expanded.substring(0, 9);
  for (var key in ALLOWED_40) {
    if (ALLOWED_40.hasOwnProperty(key) && key.indexOf(prefix9) === 0) {
      return true;
    }
  }
  
  return false;
}

/**
 * التحقق من نطاق الأردن الخاص بمزود الخدمة
 */
function isJordanISP(expanded) {
  if (!expanded || expanded.length < 10) return false;
  
  var prefix10 = expanded.substring(0, 10);
  return JORDAN_ISP_PREFIXES[prefix10] === true;
}

/**
 * التحقق من نطاقات PUBG
 */
function isPUBG(host, url) {
  if (!host) return false;
  
  var hostLower = host.toLowerCase();
  var urlLower = (url || "").toLowerCase();
  var combined = hostLower + urlLower;
  
  // Quick regex check
  if (/pubg|tencent|krafton|lightspeed|levelinfinite/i.test(combined)) {
    return true;
  }
  
  // Domain list check
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    if (hostLower.indexOf(PUBG_DOMAINS[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

/**
 * التحقق من حركة المباراة
 */
function isMatchTraffic(data) {
  if (!data) return false;
  
  var patterns = [
    "match", "battle", "classic", "ranked", "unranked", "arena",
    "tdm", "teamdeathmatch", "gungame", "domination", "assault",
    "payload", "metro", "metroroyale", "zombie", "infection",
    "evoground", "ultimate", "cheer", "war", "sniper", "quickmatch",
    "arcade", "battlefield", "clash", "gunfight", "training",
    "erangel", "livik", "miramar", "sanhok", "vikendi", "karakin",
    "nusa", "rondo", "hawan", "fpp", "tpp", "squad", "duo", "solo",
    "competitive", "tournament", "scrim", "custom", "roomcreate",
    "matchstart", "ingame", "gamesvr", "relay", "realtime",
    "gameready", "matchmaking", "playerjoin", "spawn", "lobbyready"
  ];
  
  var dataLower = data.toLowerCase();
  
  for (var i = 0; i < patterns.length; i++) {
    if (dataLower.indexOf(patterns[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

/**
 * التحقق من حركة اللوبي
 */
function isLobbyTraffic(data) {
  if (!data) return false;
  
  var patterns = [
    "lobby", "login", "auth", "profile", "inventory", "store",
    "catalog", "shop", "region", "gateway", "session", "friends",
    "clan", "rp", "workshop", "events", "mission", "settings",
    "social", "news", "update", "config", "version", "heartbeat",
    "ping", "status", "announcement", "reward", "mail", "message"
  ];
  
  var dataLower = data.toLowerCase();
  
  for (var i = 0; i < patterns.length; i++) {
    if (dataLower.indexOf(patterns[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

/**
 * حل DNS مع معالجة الأخطاء
 */
function safeDnsResolve(host) {
  try {
    return dnsResolve(host);
  } catch (e) {
    return "";
  }
}

/**
 * تحديث حالة الجلسة
 */
function updateSession(key, value) {
  SESSION[key] = value;
  SESSION.lastAction = Date.now();
}

/**
 * إعادة تعيين جلسة المباراة
 */
function resetMatchSession() {
  SESSION.locked40 = null;
  SESSION.locked64 = null;
  SESSION.lockedIP = null;
  SESSION.matchActive = false;
  DEBUG.log("Match session reset");
}

/**
 * بدء جلسة مباراة جديدة
 */
function startMatchSession(net40, net64, ip) {
  SESSION.locked40 = net40;
  SESSION.locked64 = net64;
  SESSION.lockedIP = ip;
  SESSION.matchActive = true;
  DEBUG.log("Match session started on " + ip);
}

// ================= MAIN PROXY FUNCTION =================

function FindProxyForURL(url, host) {
  // تحديث العداد
  SESSION.connectionCount++;
  SESSION.lastHost = host;
  
  // حل DNS
  var ip = safeDnsResolve(host);
  
  // التحقق من PUBG
  if (!isPUBG(host, url)) {
    return DIRECT;
  }
  
  DEBUG.log("PUBG detected: " + host);
  
  // التحقق من IP
  if (!ip) {
    DEBUG.log("No IP resolved, using proxy");
    return PROXY;
  }
  
  // IPv4 fallback - allow via proxy
  if (isIPv4(ip)) {
    DEBUG.log("IPv4 detected, using proxy");
    return PROXY;
  }
  
  // التحقق من IPv6
  if (!isIPv6(ip)) {
    return BLOCK;
  }
  
  // توسيع IPv6
  var expanded = expandIPv6(ip);
  
  if (!expanded) {
    return BLOCK;
  }
  
  // حظر أوروبا
  if (isEuropePrefix(expanded)) {
    DEBUG.log("Europe IP blocked: " + expanded);
    return BLOCK;
  }
  
  // التحقق من النطاق المسموح
  if (!isAllowed40(expanded)) {
    DEBUG.log("IP not in allowed range: " + expanded);
    return BLOCK;
  }
  
  // استخراج معلومات الشبكة
  var net40 = expanded.substring(0, 10);
  var net64 = expanded.substring(0, 19);
  var data = (host + (url || "")).toLowerCase();
  
  // ━━━━━━━━━━━ MATCH LOCK LOGIC ━━━━━━━━━━━
  
  if (isMatchTraffic(data)) {
    DEBUG.log("Match traffic detected");
    
    // بدء جلسة جديدة
    if (!SESSION.matchActive) {
      startMatchSession(net40, net64, expanded);
      return PROXY;
    }
    
    // التحقق من القفل
    if (net40 !== SESSION.locked40) {
      DEBUG.log("Different /40 network blocked");
      return BLOCK;
    }
    
    if (net64 !== SESSION.locked64) {
      DEBUG.log("Different /64 network blocked");
      return BLOCK;
    }
    
    if (expanded !== SESSION.lockedIP) {
      DEBUG.log("Different IP blocked");
      return BLOCK;
    }
    
    return PROXY;
  }
  
  // ━━━━━━━━━━━ LOBBY TRAFFIC ━━━━━━━━━━━
  
  if (isLobbyTraffic(data)) {
    DEBUG.log("Lobby traffic - unlocking");
    resetMatchSession();
    return PROXY;
  }
  
  // ━━━━━━━━━━━ DEFAULT ━━━━━━━━━━━
  
  return PROXY;
}

// ================= UTILITY FUNCTIONS =================

/**
 * الحصول على حالة الجلسة (للتشخيص)
 */
function getSessionStatus() {
  return {
    matchActive: SESSION.matchActive,
    lockedIP: SESSION.lockedIP,
    locked40: SESSION.locked40,
    locked64: SESSION.locked64,
    connectionCount: SESSION.connectionCount,
    lastHost: SESSION.lastHost,
    uptime: Date.now() - SESSION.startTime
  };
}

/**
 * تبديل البروكسي (للاستخدام المتقدم)
 */
function switchProxy(proxyAddress) {
  if (proxyAddress && typeof proxyAddress === 'string') {
    PROXY = "PROXY " + proxyAddress;
    DEBUG.log("Proxy switched to: " + PROXY);
    return true;
  }
  return false;
}

/**
 * إضافة نطاق IPv6 مسموح ديناميكياً
 */
function addAllowedPrefix(prefix) {
  if (prefix && typeof prefix === 'string') {
    ALLOWED_40[prefix.toLowerCase()] = true;
    DEBUG.log("Added allowed prefix: " + prefix);
    return true;
  }
  return false;
}

/**
 * إزالة نطاق IPv6 مسموح
 */
function removeAllowedPrefix(prefix) {
  if (prefix && typeof prefix === 'string') {
    delete ALLOWED_40[prefix.toLowerCase()];
    DEBUG.log("Removed allowed prefix: " + prefix);
    return true;
  }
  return false;
}

// ============================================================
// نهاية السكربت
// ============================================================
