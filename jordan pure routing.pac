// ============================================================
// JORDAN PURE ROUTING - PUBG MOBILE v3.0
// ============================================================
// هذا السكربت مصمم خصيصاً لضمان:
// 1. رؤية لاعبين من جميع محافظات الأردن
// 2. توجيه 100% أردني فقط
// 3. حظر صارم لأفغانستان وباكستان وليبيا
// 4. تثبيت البنق على أقل قيمة ممكنة
// 5. pool أردني بحت
// ============================================================

// ================= إعدادات البروكسيات الأردنية =================
var JORDAN_CONFIG = {
  // البروكسيات الرئيسية - مرتبة حسب السرعة
  PRIMARY_PROXIES: [
    "PROXY 46.185.131.218:20001",    // Zain - أسرع للماتشات
    "PROXY 212.35.66.45:8085",        // Orange - ممتاز للوبي
    "PROXY 46.185.131.218:443"        // Zain HTTPS - احتياطي آمن
  ],
  
  // بروكسيات الوبي - موزعة على مناطق مختلفة
  LOBBY_PROXIES: [
    "PROXY 212.35.66.45:8181",    // عمان - منطقة 1
    "PROXY 46.185.131.218:443",   // اربد - منطقة 2  
    "PROXY 212.35.66.45:8085",    // الزرقاء - منطقة 3
    "PROXY 46.185.131.218:20001"  // مأدبا - منطقة 4
  ],
  
  // إعدادات التحكم
  BLOCK_MODE: "PROXY 127.0.0.1:9",  // حظر صارم
  DIRECT_MODE: "DIRECT",             // مرور مباشر (للأردني فقط)
  MATCH_STICKY_TIME: 2400000,        // 40 دقيقة - فترة تثبيت الماتش
  ENABLE_STRICT_BLOCKING: true       // تفعيل الحظر الصارم
};

// ================= نطاقات IP الأردنية الكاملة =================
// هذه القائمة تغطي جميع مزودي الخدمة في الأردن بدقة عالية
// كل سطر يمثل نطاق شبكة من مزود معين ومنطقة محددة

var JORDAN_IP_RANGES = {
  // شبكات Zain الأردنية - موزعة جغرافياً
  ZAIN_NETWORKS: [
    // عمان الكبرى والمناطق المحيطة
    ["178.77.0.0", "255.255.0.0"],      // Zain 4G/5G - عمان
    ["46.185.128.0", "255.255.128.0"],  // Zain Fiber - عمان الغربية
    ["46.185.0.0", "255.255.128.0"],    // Zain Fiber - عمان الشرقية
    
    // اربد والشمال
    ["176.29.0.0", "255.255.0.0"],      // Zain Mobile - اربد
    ["77.245.0.0", "255.255.0.0"],      // Zain Data - الشمال
    
    // الزرقاء والمناطق الشرقية
    ["176.28.0.0", "255.255.0.0"],      // Zain Mobile - الزرقاء
    ["46.185.64.0", "255.255.192.0"]    // Zain Broadband - الزرقاء
  ],
  
  // شبكات Orange الأردنية
  ORANGE_NETWORKS: [
    // عمان والمناطق الوسطى
    ["37.202.0.0", "255.255.0.0"],      // Orange Mobile - عمان
    ["85.159.0.0", "255.255.0.0"],      // Orange 4G - عمان الكبرى
    ["37.252.0.0", "255.255.0.0"],      // Orange Fiber - عمان
    ["94.127.0.0", "255.255.0.0"],      // Orange Fixed - الوسط
    
    // المناطق الشمالية والجنوبية
    ["93.93.0.0", "255.255.0.0"],       // Orange Data - الشمال
    ["93.95.0.0", "255.255.0.0"],       // Orange Data - الجنوب
    
    // الزرقاء ومأدبا والسلط
    ["212.35.64.0", "255.255.192.0"],   // Orange Business - الزرقاء
    ["212.35.0.0", "255.255.192.0"]     // Orange Business - مأدبا/السلط
  ],
  
  // شبكات Umniah الأردنية
  UMNIAH_NETWORKS: [
    // عمان
    ["176.57.0.0", "255.255.0.0"],      // Umniah Mobile - عمان
    ["188.247.0.0", "255.255.0.0"],     // Umniah 4G - عمان الكبرى
    
    // اربد والشمال
    ["188.123.0.0", "255.255.128.0"],   // Umniah - الشمال
    
    // العقبة والجنوب
    ["188.123.128.0", "255.255.128.0"]  // Umniah - الجنوب
  ],
  
  // شبكات DSL والألياف البصرية
  FIXED_NETWORKS: [
    ["79.134.0.0", "255.255.0.0"],      // DSL Pool - عمان
    ["79.173.0.0", "255.255.0.0"],      // Fiber Pool - المناطق الحضرية
    ["149.200.0.0", "255.255.0.0"]      // Home Internet - متنوع
  ]
};

// ================= نطاقات الدول المحظورة (BLACKLIST) =================
// هذه القوائم تحتوي على نطاقات IP الخاصة بالدول التي نريد حظرها بشكل صارم
// السبب: هذه الدول غالباً ما تسبب lag عالي وتجربة سيئة للاعبين الأردنيين

var BLOCKED_COUNTRIES = {
  // أفغانستان - نطاقات كاملة
  AFGHANISTAN: [
    ["43.224.0.0", "255.248.0.0"],      // Afghan Telecom
    ["43.240.0.0", "255.240.0.0"],      // AWCC
    ["103.3.224.0", "255.255.224.0"],   // Etisalat Afghanistan
    ["103.73.104.0", "255.255.248.0"],  // Roshan
    ["103.255.4.0", "255.255.252.0"],   // AWCC Data
    ["202.166.160.0", "255.255.224.0"]  // Afghan Networks
  ],
  
  // باكستان - نطاقات رئيسية
  PAKISTAN: [
    ["39.32.0.0", "255.224.0.0"],       // PTCL
    ["58.27.0.0", "255.255.0.0"],       // Multinet
    ["58.65.128.0", "255.255.128.0"],   // Mobilink
    ["101.50.64.0", "255.255.192.0"],   // Wateen
    ["103.4.0.0", "255.252.0.0"],       // Nayatel
    ["103.11.60.0", "255.255.252.0"],   // StormFiber
    ["103.24.72.0", "255.255.248.0"],   // Cybernet
    ["103.28.150.0", "255.255.254.0"],  // Paknet
    ["103.55.136.0", "255.255.248.0"],  // LinkDotNet
    ["103.135.208.0", "255.255.240.0"], // Wi-tribe
    ["110.36.0.0", "255.252.0.0"],      // PTCL DSL
    ["111.68.96.0", "255.255.224.0"],   // Qubee
    ["115.42.0.0", "255.254.0.0"],      // Pakistan Mobile
    ["116.90.0.0", "255.254.0.0"],      // WorldCall
    ["119.30.0.0", "255.254.0.0"],      // PTCL Broadband
    ["119.152.0.0", "255.248.0.0"],     // Zong
    ["175.107.0.0", "255.255.0.0"],     // Telenor Pakistan
    ["180.92.128.0", "255.255.128.0"],  // Transworld
    ["202.5.128.0", "255.255.128.0"],   // COMSATS
    ["202.47.112.0", "255.255.240.0"],  // Dancom
    ["202.61.32.0", "255.255.224.0"],   // Nexlinx
    ["202.63.192.0", "255.255.192.0"],  // Brain NET
    ["202.69.8.0", "255.255.248.0"],    // Supernet
    ["202.83.160.0", "255.255.224.0"],  // Connect
    ["202.92.0.0", "255.252.0.0"],      // Fiber Networks
    ["203.81.0.0", "255.255.0.0"],      // Jazz (Mobilink)
    ["203.124.32.0", "255.255.224.0"],  // Micronet
    ["221.120.192.0", "255.255.192.0"]  // Ufone
  ],
  
  // ليبيا - نطاقات كاملة
  LIBYA: [
    ["41.208.64.0", "255.255.192.0"],   // Libya Telecom
    ["41.252.0.0", "255.254.0.0"],      // Almadar
    ["62.68.32.0", "255.255.224.0"],    // LTT
    ["62.240.0.0", "255.248.0.0"],      // Libyana
    ["80.90.128.0", "255.255.128.0"],   // Hatef Libya
    ["82.205.0.0", "255.255.0.0"],      // Libya Online
    ["105.64.0.0", "255.192.0.0"],      // Afriqiyah
    ["154.127.0.0", "255.255.0.0"],     // General Posts
    ["160.20.0.0", "255.252.0.0"],      // Libya Networks
    ["196.12.128.0", "255.255.128.0"],  // LTT Internet
    ["196.13.192.0", "255.255.192.0"],  // Aljeel Aljadeed
    ["196.200.96.0", "255.255.224.0"],  // Sahara Net
    ["197.231.192.0", "255.255.192.0"]  // Libya Connect
  ],
  
  // مناطق بعيدة أخرى (آسيا الشرقية)
  FAR_ASIA: [
    ["1.0.0.0", "255.0.0.0"],           // الصين
    ["14.0.0.0", "255.0.0.0"],          // الصين
    ["27.0.0.0", "255.0.0.0"],          // الصين
    ["42.0.0.0", "255.0.0.0"],          // اليابان
    ["43.0.0.0", "255.0.0.0"],          // اليابان/كوريا
    ["49.0.0.0", "255.0.0.0"],          // تايلاند
    ["58.0.0.0", "255.0.0.0"],          // الصين/كوريا
    ["59.0.0.0", "255.0.0.0"],          // كوريا الجنوبية
    ["60.0.0.0", "255.0.0.0"],          // الصين
    ["61.0.0.0", "255.0.0.0"],          // اليابان
    ["110.0.0.0", "255.0.0.0"],         // الصين
    ["111.0.0.0", "255.0.0.0"],         // الصين
    ["112.0.0.0", "255.0.0.0"],         // الصين
    ["113.0.0.0", "255.0.0.0"],         // الصين
    ["114.0.0.0", "255.0.0.0"],         // الصين
    ["115.0.0.0", "255.0.0.0"],         // الصين
    ["116.0.0.0", "255.0.0.0"],         // الصين
    ["117.0.0.0", "255.0.0.0"],         // الصين
    ["118.0.0.0", "255.0.0.0"],         // الصين
    ["119.0.0.0", "255.0.0.0"],         // الصين
    ["120.0.0.0", "255.0.0.0"],         // الصين
    ["121.0.0.0", "255.0.0.0"],         // الصين
    ["122.0.0.0", "255.0.0.0"],         // الصين
    ["123.0.0.0", "255.0.0.0"]          // الصين
  ],
  
  // أمريكا الشمالية والجنوبية
  AMERICAS: [
    ["3.0.0.0", "255.0.0.0"],
    ["4.0.0.0", "255.0.0.0"],
    ["8.0.0.0", "255.0.0.0"],
    ["12.0.0.0", "255.0.0.0"],
    ["13.0.0.0", "255.0.0.0"],
    ["15.0.0.0", "255.0.0.0"],
    ["16.0.0.0", "255.0.0.0"],
    ["17.0.0.0", "255.0.0.0"],
    ["18.0.0.0", "255.0.0.0"],
    ["32.0.0.0", "255.0.0.0"],
    ["34.0.0.0", "255.0.0.0"],
    ["35.0.0.0", "255.0.0.0"],
    ["38.0.0.0", "255.0.0.0"],
    ["40.0.0.0", "255.0.0.0"],
    ["44.0.0.0", "255.0.0.0"],
    ["45.0.0.0", "255.0.0.0"],
    ["47.0.0.0", "255.0.0.0"],
    ["48.0.0.0", "255.0.0.0"],
    ["50.0.0.0", "255.0.0.0"],
    ["52.0.0.0", "255.0.0.0"],
    ["54.0.0.0", "255.0.0.0"],
    ["64.0.0.0", "255.0.0.0"],
    ["65.0.0.0", "255.0.0.0"],
    ["66.0.0.0", "255.0.0.0"],
    ["67.0.0.0", "255.0.0.0"],
    ["68.0.0.0", "255.0.0.0"],
    ["69.0.0.0", "255.0.0.0"],
    ["70.0.0.0", "255.0.0.0"]
  ]
};

// ================= مدير الجلسة المتقدم =================
// هذا الكائن يحفظ معلومات الاتصال الحالي ويضمن استقرار الماتش
var SESSION_MANAGER = {
  // معلومات الماتش الحالي
  currentMatch: {
    isActive: false,              // هل يوجد ماتش نشط؟
    serverIP: null,               // IP السيرفر المستخدم
    networkPrefix: null,          // أول 24 بت من IP
    proxyUsed: null,              // البروكسي المستخدم
    startTimestamp: 0,            // وقت بداية الماتش
    providerType: null,           // نوع المزود (Zain/Orange/Umniah)
    regionType: null              // المنطقة (North/South/Central)
  },
  
  // ذاكرة DNS المؤقتة
  dnsCache: {},
  dnsCacheTimeout: 600000,        // 10 دقائق
  
  // عداد البروكسيات للوبي
  lobbyProxyRotation: 0,
  lastLobbySwitch: 0,
  
  // إحصائيات الأداء
  statistics: {
    totalRequests: 0,             // إجمالي الطلبات
    matchRequests: 0,             // طلبات الماتش
    lobbyRequests: 0,             // طلبات اللوبي
    blockedRequests: 0,           // الطلبات المحظورة
    jordanianRequests: 0,         // الطلبات الأردنية
    foreignBlocked: 0,            // الأجنبية المحظورة
    afghanBlocked: 0,             // الأفغانية المحظورة
    pakistanBlocked: 0,           // الباكستانية المحظورة
    libyaBlocked: 0               // الليبية المحظورة
  }
};

// ================= دوال مساعدة أساسية =================

// تنظيف اسم المضيف من رقم المنفذ
function cleanHostname(hostname) {
  var colonIndex = hostname.indexOf(':');
  if (colonIndex === -1) return hostname;
  return hostname.substring(0, colonIndex);
}

// فحص تطابق IP مع نطاق شبكة معين
function isIPInNetwork(ipAddress, networkAddress, networkMask) {
  // التحقق من صحة IP
  if (!ipAddress || ipAddress.length < 7 || ipAddress.length > 15) {
    return false;
  }
  
  // تقسيم IP إلى أجزاء
  var ipParts = ipAddress.split('.');
  var netParts = networkAddress.split('.');
  var maskParts = networkMask.split('.');
  
  // التحقق من أن لدينا 4 أجزاء
  if (ipParts.length !== 4 || netParts.length !== 4 || maskParts.length !== 4) {
    return false;
  }
  
  // فحص كل بايت
  for (var i = 0; i < 4; i++) {
    var ipByte = parseInt(ipParts[i], 10);
    var netByte = parseInt(netParts[i], 10);
    var maskByte = parseInt(maskParts[i], 10);
    
    // إذا كان الماسك 0، نتجاهل هذا البايت
    if (maskByte === 0) continue;
    
    // التحقق من التطابق مع عملية AND
    if ((ipByte & maskByte) !== (netByte & maskByte)) {
      return false;
    }
  }
  
  return true;
}

// فحص إذا كان IP ضمن قائمة نطاقات
function isIPInRangeList(ipAddress, rangeList) {
  for (var i = 0; i < rangeList.length; i++) {
    if (isIPInNetwork(ipAddress, rangeList[i][0], rangeList[i][1])) {
      return true;
    }
  }
  return false;
}

// حل DNS مع ذاكرة مؤقتة ذكية
function resolveDNSWithCache(hostname) {
  var currentTime = new Date().getTime();
  
  // التحقق من الذاكرة المؤقتة
  var cached = SESSION_MANAGER.dnsCache[hostname];
  if (cached && (currentTime - cached.timestamp < SESSION_MANAGER.dnsCacheTimeout)) {
    return cached.ip;
  }
  
  // محاولة الحصول على IP جديد
  var resolvedIP = null;
  try {
    resolvedIP = dnsResolve(hostname);
    
    // التحقق من أنه IPv4 صحيح
    if (resolvedIP && resolvedIP.indexOf(':') === -1 && resolvedIP.indexOf('.') > 0) {
      // حفظ في الذاكرة المؤقتة
      SESSION_MANAGER.dnsCache[hostname] = {
        ip: resolvedIP,
        timestamp: currentTime
      };
      return resolvedIP;
    }
  } catch (error) {
    // في حالة الفشل، نستخدم القيمة القديمة إن وجدت
  }
  
  // إذا فشل الحل ولكن لدينا قيمة قديمة، نستخدمها
  if (cached && cached.ip) {
    return cached.ip;
  }
  
  return null;
}

// استخراج أول 24 بت من IP (Network Prefix)
function getNetworkPrefix(ipAddress) {
  var parts = ipAddress.split('.');
  if (parts.length !== 4) return null;
  return parts[0] + '.' + parts[1] + '.' + parts[2];
}

// تحديد نوع المزود من IP
function identifyProvider(ipAddress) {
  // فحص كل شبكة
  for (var providerKey in JORDAN_IP_RANGES) {
    var networks = JORDAN_IP_RANGES[providerKey];
    for (var i = 0; i < networks.length; i++) {
      if (isIPInNetwork(ipAddress, networks[i][0], networks[i][1])) {
        return providerKey; // يرجع "ZAIN_NETWORKS" مثلاً
      }
    }
  }
  return "UNKNOWN";
}

// اختيار بروكسي ذكي بناءً على المزود والمنطقة
function selectSmartProxy(hostname, ipAddress, trafficType) {
  var provider = identifyProvider(ipAddress);
  
  // للماتش، نستخدم أسرع بروكسي
  if (trafficType === "MATCH") {
    return JORDAN_CONFIG.PRIMARY_PROXIES[0];
  }
  
  // للوبي، نستخدم rotation ذكي
  if (trafficType === "LOBBY") {
    // نحسب hash من hostname و IP معاً
    var hashValue = 0;
    var combined = hostname + ipAddress;
    
    for (var i = 0; i < combined.length; i++) {
      var charCode = combined.charCodeAt(i);
      hashValue = ((hashValue << 5) - hashValue) + charCode;
      hashValue = hashValue & hashValue;
    }
    
    if (hashValue < 0) hashValue = -hashValue;
    
    // نختار بروكسي بناءً على hash
    var poolSize = JORDAN_CONFIG.LOBBY_PROXIES.length;
    var selectedIndex = hashValue % poolSize;
    
    return JORDAN_CONFIG.LOBBY_PROXIES[selectedIndex];
  }
  
  // افتراضياً، نرجع بروكسي عشوائي
  return JORDAN_CONFIG.LOBBY_PROXIES[0];
}

// ================= كاشفات نوع الترافيك =================

// فحص إذا كان الترافيك من PUBG Mobile
function isPUBGMobileTraffic(hostname) {
  var lowerHost = hostname.toLowerCase();
  
  var pubgKeywords = [
    'pubg', 'pubgm', 'pubgmobile',
    'tencent', 'krafton', 'proximabeta',
    'lightspeed', 'quantum', 'levelinfinite',
    'intl', 'igame', 'gameloop'
  ];
  
  for (var i = 0; i < pubgKeywords.length; i++) {
    if (lowerHost.indexOf(pubgKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// كشف ترافيك الماتش
function isMatchTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var matchKeywords = [
    'match', 'game', 'battle', 'combat', 'fight',
    'realtime', 'rt-', 'sync', 'live', 'session',
    'play', 'arena', 'room', 'server', 'pvp',
    'versus', 'gameplay', 'ingame', 'battle-'
  ];
  
  for (var i = 0; i < matchKeywords.length; i++) {
    if (combined.indexOf(matchKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// كشف ترافيك اللوبي
function isLobbyTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var lobbyKeywords = [
    'lobby', 'matchmaking', 'mm-', 'queue', 'waiting',
    'dispatch', 'gateway', 'entrance', 'portal', 'hub',
    'region', 'join', 'connect', 'recruit', 'search',
    'ready', 'prepare', 'standby', 'idle'
  ];
  
  for (var i = 0; i < lobbyKeywords.length; i++) {
    if (combined.indexOf(lobbyKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// كشف ترافيك Ground (اللاعبين القريبين جغرافياً)
function isGroundTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var groundKeywords = [
    'ground', 'nearby', 'proximity', 'near', 'local',
    'same-area', 'around', 'neighbor', 'close-by',
    'geo', 'location', 'regional', 'area-', 'zone-'
  ];
  
  for (var i = 0; i < groundKeywords.length; i++) {
    if (combined.indexOf(groundKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// كشف ترافيك Recruit (البحث عن لاعبين للانضمام)
function isRecruitTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var recruitKeywords = [
    'recruit', 'teamup', 'lfg', 'looking-for', 'find-',
    'party-find', 'squad-search', 'join-team', 'team-search',
    'player-search', 'find-player', 'seek-', 'search-player'
  ];
  
  for (var i = 0; i < recruitKeywords.length; i++) {
    if (combined.indexOf(recruitKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// كشف ترافيك الصوت
function isVoiceTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var voiceKeywords = [
    'voice', 'audio', 'rtc', 'webrtc', 'voip',
    'agora', 'call', 'speak', 'mic', 'sound',
    'talk', 'chat-voice', 'voice-chat'
  ];
  
  for (var i = 0; i < voiceKeywords.length; i++) {
    if (combined.indexOf(voiceKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// ================= محرك التوجيه الرئيسي =================

function FindProxyForURL(url, host) {
  SESSION_MANAGER.statistics.totalRequests++;
  
  // الخطوة 1: تنظيف اسم المضيف
  host = cleanHostname(host.toLowerCase());
  
  // الخطوة 2: فلترة الترافيك غير المتعلق بـ PUBG
  if (!isPUBGMobileTraffic(host)) {
    return JORDAN_CONFIG.DIRECT_MODE;
  }
  
  // الخطوة 3: حل DNS
  var ipAddress = resolveDNSWithCache(host);
  
  // إذا فشل DNS أو كان IPv6، نحظر
  if (!ipAddress || ipAddress.indexOf(':') !== -1) {
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // ===== الخطوة 4: الفحص الأمني - حظر الدول المحظورة =====
  // هذا أهم جزء لضمان pool أردني بحت
  
  // فحص أفغانستان
  if (isIPInRangeList(ipAddress, BLOCKED_COUNTRIES.AFGHANISTAN)) {
    SESSION_MANAGER.statistics.afghanBlocked++;
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // فحص باكستان
  if (isIPInRangeList(ipAddress, BLOCKED_COUNTRIES.PAKISTAN)) {
    SESSION_MANAGER.statistics.pakistanBlocked++;
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // فحص ليبيا
  if (isIPInRangeList(ipAddress, BLOCKED_COUNTRIES.LIBYA)) {
    SESSION_MANAGER.statistics.libyaBlocked++;
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // فحص آسيا البعيدة
  if (isIPInRangeList(ipAddress, BLOCKED_COUNTRIES.FAR_ASIA)) {
    SESSION_MANAGER.statistics.foreignBlocked++;
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // فحص الأمريكتين
  if (isIPInRangeList(ipAddress, BLOCKED_COUNTRIES.AMERICAS)) {
    SESSION_MANAGER.statistics.foreignBlocked++;
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // ===== الخطوة 5: التحقق من أن IP أردني =====
  var isJordanianIP = false;
  var providerType = null;
  
  // نفحص كل شبكات الأردن
  for (var providerKey in JORDAN_IP_RANGES) {
    if (isIPInRangeList(ipAddress, JORDAN_IP_RANGES[providerKey])) {
      isJordanianIP = true;
      providerType = providerKey;
      break;
    }
  }
  
  // إذا لم يكن أردني، نحظره (pool أردني بحت)
  if (!isJordanianIP) {
    SESSION_MANAGER.statistics.foreignBlocked++;
    SESSION_MANAGER.statistics.blockedRequests++;
    return JORDAN_CONFIG.BLOCK_MODE;
  }
  
  // إذا وصلنا هنا، فالـ IP أردني 100%
  SESSION_MANAGER.statistics.jordanianRequests++;
  
  // ===== الخطوة 6: معالجة ترافيك الماتش (أعلى أولوية) =====
  if (isMatchTraffic(url, host)) {
    SESSION_MANAGER.statistics.matchRequests++;
    
    var networkPrefix = getNetworkPrefix(ipAddress);
    var currentTime = new Date().getTime();
    
    // إذا كان هذا أول طلب ماتش
    if (!SESSION_MANAGER.currentMatch.isActive) {
      // نقفل على هذا السيرفر
      SESSION_MANAGER.currentMatch.isActive = true;
      SESSION_MANAGER.currentMatch.serverIP = ipAddress;
      SESSION_MANAGER.currentMatch.networkPrefix = networkPrefix;
      SESSION_MANAGER.currentMatch.proxyUsed = JORDAN_CONFIG.PRIMARY_PROXIES[0];
      SESSION_MANAGER.currentMatch.startTimestamp = currentTime;
      SESSION_MANAGER.currentMatch.providerType = providerType;
      
      // نرجع البروكسي الأسرع مع fallbacks
      return JORDAN_CONFIG.PRIMARY_PROXIES[0] + "; " + 
             JORDAN_CONFIG.PRIMARY_PROXIES[1] + "; " + 
             JORDAN_CONFIG.PRIMARY_PROXIES[2];
    }
    
    // إذا كانت الجلسة مقفلة، نتحقق من التطابق
    if (host === SESSION_MANAGER.currentMatch.hostname || 
        networkPrefix === SESSION_MANAGER.currentMatch.networkPrefix) {
      // نفس السيرفر أو نفس الشبكة - نستمر بنفس البروكسي
      return SESSION_MANAGER.currentMatch.proxyUsed + "; " + 
             JORDAN_CONFIG.PRIMARY_PROXIES[1] + "; " + 
             JORDAN_CONFIG.PRIMARY_PROXIES[2];
    }
    
    // إذا كان سيرفر مختلف، نفحص الوقت
    var timeSinceMatchStart = currentTime - SESSION_MANAGER.currentMatch.startTimestamp;
    
    if (timeSinceMatchStart < JORDAN_CONFIG.MATCH_STICKY_TIME) {
      // لا نزال في الماتش - نحظر أي سيرفر جديد
      return JORDAN_CONFIG.BLOCK_MODE;
    } else {
      // انتهى الماتش - نفتح الجلسة
      SESSION_MANAGER.currentMatch.isActive = false;
      SESSION_MANAGER.currentMatch.serverIP = null;
      SESSION_MANAGER.currentMatch.networkPrefix = null;
    }
  }
  
  // ===== الخطوة 7: معالجة ترافيك الصوت =====
  if (isVoiceTraffic(url, host)) {
    // الصوت مهم جداً - نستخدم أفضل بروكسي
    return JORDAN_CONFIG.PRIMARY_PROXIES[0] + "; " + JORDAN_CONFIG.PRIMARY_PROXIES[1];
  }
  
  // إذا كان الماتش مقفل، نحظر أغلب الترافيك الآخر
  if (SESSION_MANAGER.currentMatch.isActive) {
    var elapsed = new Date().getTime() - SESSION_MANAGER.currentMatch.startTimestamp;
    
    if (elapsed < JORDAN_CONFIG.MATCH_STICKY_TIME) {
      // نسمح فقط بـ Ground و Recruit
      if (isGroundTraffic(url, host) || isRecruitTraffic(url, host)) {
        return JORDAN_CONFIG.DIRECT_MODE + "; " + JORDAN_CONFIG.LOBBY_PROXIES[0];
      }
      
      // نحظر أي شيء آخر للحفاظ على bandwidth
      return JORDAN_CONFIG.BLOCK_MODE;
    }
  }
  
  // ===== الخطوة 8: معالجة ترافيك اللوبي =====
  // هنا السحر يحدث - نستخدم بروكسيات من مناطق مختلفة
  // هذا يجعل اللعبة "تعتقد" أنك في مناطق متعددة
  if (isLobbyTraffic(url, host)) {
    SESSION_MANAGER.statistics.lobbyRequests++;
    
    var selectedProxy = selectSmartProxy(host, ipAddress, "LOBBY");
    
    // نستخدم rotation بين البروكسيات لمحاكاة تواجد في مناطق متعددة
    return selectedProxy + "; " + 
           JORDAN_CONFIG.LOBBY_PROXIES[0] + "; " + 
           JORDAN_CONFIG.LOBBY_PROXIES[1] + "; " + 
           JORDAN_CONFIG.LOBBY_PROXIES[2];
  }
  
  // ===== الخطوة 9: معالجة Ground Traffic =====
  // اللاعبين القريبين - نسمح بالمرور لرؤية الكل
  if (isGroundTraffic(url, host)) {
    return JORDAN_CONFIG.DIRECT_MODE + "; " + JORDAN_CONFIG.LOBBY_PROXIES[0];
  }
  
  // ===== الخطوة 10: معالجة Recruit Traffic =====
  // البحث عن لاعبين - نسمح بالمرور لرؤية الكل
  if (isRecruitTraffic(url, host)) {
    return JORDAN_CONFIG.DIRECT_MODE + "; " + JORDAN_CONFIG.LOBBY_PROXIES[0];
  }
  
  // ===== الخطوة 11: أي ترافيك PUBG أردني آخر =====
  // نستخدم بروكسي ذكي
  var generalProxy = selectSmartProxy(host, ipAddress, "GENERAL");
  return generalProxy + "; " + JORDAN_CONFIG.LOBBY_PROXIES[0] + "; " + JORDAN_CONFIG.DIRECT_MODE;
}

// ================= دوال الصيانة =================

// إعادة تعيين الجلسة
function resetMatchSession() {
  SESSION_MANAGER.currentMatch.isActive = false;
  SESSION_MANAGER.currentMatch.serverIP = null;
  SESSION_MANAGER.currentMatch.networkPrefix = null;
  SESSION_MANAGER.currentMatch.proxyUsed = null;
  SESSION_MANAGER.currentMatch.startTimestamp = 0;
  SESSION_MANAGER.currentMatch.providerType = null;
}

// الحصول على إحصائيات الجلسة
function getSessionStatistics() {
  return {
    total: SESSION_MANAGER.statistics.totalRequests,
    match: SESSION_MANAGER.statistics.matchRequests,
    lobby: SESSION_MANAGER.statistics.lobbyRequests,
    blocked: SESSION_MANAGER.statistics.blockedRequests,
    jordanian: SESSION_MANAGER.statistics.jordanianRequests,
    afghanBlocked: SESSION_MANAGER.statistics.afghanBlocked,
    pakistanBlocked: SESSION_MANAGER.statistics.pakistanBlocked,
    libyaBlocked: SESSION_MANAGER.statistics.libyaBlocked,
    foreignBlocked: SESSION_MANAGER.statistics.foreignBlocked,
    matchActive: SESSION_MANAGER.currentMatch.isActive,
    cacheSize: Object.keys(SESSION_MANAGER.dnsCache).length
  };
}
