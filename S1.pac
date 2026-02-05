// ============================================================
// GAME BOOSTER ULTIMATE v3.0
// Ultra-optimized PAC for PUBG Mobile
// الإصدار النهائي المحسّن - أداء فائق + موثوقية عالية
// ============================================================

// ================= ADVANCED CONFIGURATION =================
var CONFIG = {
  // Match proxies - مرتبة حسب السرعة والموثوقية
  MATCH_TIER1: "PROXY 46.185.131.218:20001",
  MATCH_TIER2: "PROXY 212.35.66.45:8085",
  MATCH_TIER3: "PROXY 46.185.131.218:443",
  
  // Lobby proxies - pool محسّن للسرعة
  LOBBY_FAST: [
    "PROXY 212.35.66.45:8181",
    "PROXY 46.185.131.218:443",
    "PROXY 212.35.66.45:8085"
  ],
  
  // Special channels
  VOICE_PROXY: "PROXY 46.185.131.218:20001",
  CDN_DIRECT: "DIRECT",
  
  // Control
  BLOCK: "PROXY 127.0.0.1:9",
  DIRECT: "DIRECT",
  
  // Performance tuning
  DNS_CACHE_TIME: 600000,           // 10 دقائق
  MATCH_SESSION_TIME: 1800000,      // 30 دقيقة
  LOBBY_ROTATION_TIME: 300000,      // 5 دقائق
  MAX_DNS_CACHE_SIZE: 1000,         // حد أقصى للذاكرة المؤقتة
  
  // Features
  AGGRESSIVE_BLOCK: true,           // حظر قوي للمناطق البعيدة
  SMART_FAILOVER: true,             // تبديل ذكي عند الفشل
  LOBBY_ALLOW_GLOBAL: true          // السماح برؤية اللاعبين العالميين
};

// ================= COMPREHENSIVE JORDAN IP RANGES =================
var JORDAN_RANGES = [
  // Zain Mobile & Data - الشبكة الأكبر
  ["178.77.0.0", "255.255.0.0"],
  ["46.185.0.0", "255.255.0.0"],
  ["176.29.0.0", "255.255.0.0"],
  ["77.245.0.0", "255.255.0.0"],
  ["176.28.0.0", "255.255.0.0"],
  
  // Orange Mobile & Data
  ["37.202.0.0", "255.255.0.0"],
  ["85.159.0.0", "255.255.0.0"],
  ["93.93.0.0", "255.255.0.0"],
  ["93.95.0.0", "255.255.0.0"],
  ["37.252.0.0", "255.255.0.0"],
  ["94.127.0.0", "255.255.0.0"],
  
  // Umniah Mobile & Fixed
  ["176.57.0.0", "255.255.0.0"],
  ["188.123.0.0", "255.255.0.0"],
  ["188.247.0.0", "255.255.0.0"],
  
  // DSL/Fiber pools
  ["79.134.0.0", "255.255.0.0"],
  ["79.173.0.0", "255.255.0.0"],
  ["149.200.0.0", "255.255.0.0"],
  
  // Additional ranges
  ["212.35.0.0", "255.255.0.0"],
  ["213.6.0.0", "255.255.0.0"]
];

// ================= OPTIMIZED BLACKLIST =================
// نطاقات محسّنة للحظر - تقلل الـ ping العالي
var HIGH_LATENCY_RANGES = [
  // Asia-Pacific (عدا الشرق الأوسط)
  ["1.0.0.0", "255.0.0.0"],
  ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"],
  ["36.0.0.0", "255.0.0.0"],
  ["39.0.0.0", "255.0.0.0"],
  ["42.0.0.0", "255.0.0.0"],
  ["43.0.0.0", "255.0.0.0"],
  ["49.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "255.0.0.0"],
  ["59.0.0.0", "255.0.0.0"],
  ["60.0.0.0", "255.0.0.0"],
  ["61.0.0.0", "255.0.0.0"],
  ["101.0.0.0", "255.0.0.0"],
  ["103.0.0.0", "255.0.0.0"],
  ["106.0.0.0", "255.0.0.0"],
  ["110.0.0.0", "255.0.0.0"],
  ["111.0.0.0", "255.0.0.0"],
  ["112.0.0.0", "255.0.0.0"],
  ["113.0.0.0", "255.0.0.0"],
  ["114.0.0.0", "255.0.0.0"],
  ["115.0.0.0", "255.0.0.0"],
  ["116.0.0.0", "255.0.0.0"],
  ["117.0.0.0", "255.0.0.0"],
  ["118.0.0.0", "255.0.0.0"],
  ["119.0.0.0", "255.0.0.0"],
  ["120.0.0.0", "255.0.0.0"],
  ["121.0.0.0", "255.0.0.0"],
  ["122.0.0.0", "255.0.0.0"],
  ["123.0.0.0", "255.0.0.0"],
  ["124.0.0.0", "255.0.0.0"],
  ["125.0.0.0", "255.0.0.0"],
  
  // Americas (بعيدة جداً)
  ["3.0.0.0", "255.0.0.0"],
  ["4.0.0.0", "255.0.0.0"],
  ["8.0.0.0", "255.0.0.0"],
  ["12.0.0.0", "255.0.0.0"],
  ["15.0.0.0", "255.0.0.0"],
  ["16.0.0.0", "255.0.0.0"],
  ["17.0.0.0", "255.0.0.0"],
  ["18.0.0.0", "255.0.0.0"],
  ["23.0.0.0", "255.0.0.0"],
  ["24.0.0.0", "255.0.0.0"],
  ["35.0.0.0", "255.0.0.0"],
  ["40.0.0.0", "255.0.0.0"],
  ["44.0.0.0", "255.0.0.0"],
  ["52.0.0.0", "255.0.0.0"],
  ["54.0.0.0", "255.0.0.0"],
  ["64.0.0.0", "255.0.0.0"],
  ["66.0.0.0", "255.0.0.0"],
  ["67.0.0.0", "255.0.0.0"],
  ["68.0.0.0", "255.0.0.0"],
  ["69.0.0.0", "255.0.0.0"],
  ["70.0.0.0", "255.0.0.0"],
  ["71.0.0.0", "255.0.0.0"],
  ["72.0.0.0", "255.0.0.0"],
  ["73.0.0.0", "255.0.0.0"],
  ["74.0.0.0", "255.0.0.0"],
  ["75.0.0.0", "255.0.0.0"],
  ["76.0.0.0", "255.0.0.0"],
  ["96.0.0.0", "255.0.0.0"],
  ["97.0.0.0", "255.0.0.0"],
  ["98.0.0.0", "255.0.0.0"],
  ["99.0.0.0", "255.0.0.0"],
  ["100.0.0.0", "255.0.0.0"],
  ["104.0.0.0", "255.0.0.0"],
  ["107.0.0.0", "255.0.0.0"],
  ["108.0.0.0", "255.0.0.0"],
  ["128.0.0.0", "255.0.0.0"],
  ["129.0.0.0", "255.0.0.0"],
  ["130.0.0.0", "255.0.0.0"],
  ["131.0.0.0", "255.0.0.0"],
  ["132.0.0.0", "255.0.0.0"],
  ["134.0.0.0", "255.0.0.0"],
  ["135.0.0.0", "255.0.0.0"],
  ["136.0.0.0", "255.0.0.0"],
  ["137.0.0.0", "255.0.0.0"],
  ["138.0.0.0", "255.0.0.0"],
  ["142.0.0.0", "255.0.0.0"],
  ["143.0.0.0", "255.0.0.0"],
  ["144.0.0.0", "255.0.0.0"],
  ["147.0.0.0", "255.0.0.0"],
  ["161.0.0.0", "255.0.0.0"],
  ["162.0.0.0", "255.0.0.0"],
  ["166.0.0.0", "255.0.0.0"],
  ["167.0.0.0", "255.0.0.0"],
  ["168.0.0.0", "255.0.0.0"],
  ["169.0.0.0", "255.0.0.0"],
  ["170.0.0.0", "255.0.0.0"],
  ["172.0.0.0", "255.0.0.0"],
  ["173.0.0.0", "255.0.0.0"],
  ["174.0.0.0", "255.0.0.0"],
  ["184.0.0.0", "255.0.0.0"],
  ["190.0.0.0", "255.0.0.0"],
  ["192.0.0.0", "255.0.0.0"],
  ["198.0.0.0", "255.0.0.0"],
  ["199.0.0.0", "255.0.0.0"],
  ["200.0.0.0", "255.0.0.0"],
  ["201.0.0.0", "255.0.0.0"],
  ["204.0.0.0", "255.0.0.0"],
  ["205.0.0.0", "255.0.0.0"],
  ["206.0.0.0", "255.0.0.0"],
  ["207.0.0.0", "255.0.0.0"],
  ["208.0.0.0", "255.0.0.0"],
  
  // Far regions (مناطق بعيدة جداً)
  ["2.0.0.0", "255.0.0.0"],
  ["5.0.0.0", "255.0.0.0"],
  ["13.0.0.0", "255.0.0.0"],
  ["20.0.0.0", "255.0.0.0"],
  ["41.0.0.0", "255.0.0.0"],
  ["102.0.0.0", "255.0.0.0"],
  ["105.0.0.0", "255.0.0.0"],
  ["154.0.0.0", "255.0.0.0"],
  ["196.0.0.0", "255.0.0.0"],
  ["197.0.0.0", "255.0.0.0"],
  ["202.0.0.0", "255.0.0.0"],
  ["203.0.0.0", "255.0.0.0"],
  ["210.0.0.0", "255.0.0.0"],
  ["211.0.0.0", "255.0.0.0"],
  ["218.0.0.0", "255.0.0.0"],
  ["219.0.0.0", "255.0.0.0"],
  ["220.0.0.0", "255.0.0.0"],
  ["221.0.0.0", "255.0.0.0"],
  ["222.0.0.0", "255.0.0.0"],
  ["223.0.0.0", "255.0.0.0"]
];

// ================= SESSION MANAGER =================
var SESSION = {
  // Match session
  match: {
    networkPrefix: null,
    hostname: null,
    proxy: null,
    startTime: 0,
    locked: false,
    ipAddress: null,
    consecutiveFailures: 0
  },
  
  // DNS cache with LRU
  dns: {},
  dnsAccessOrder: [],
  
  // Lobby management
  lobby: {
    currentIndex: 0,
    lastRotation: 0,
    proxyHealth: {}  // تتبع صحة كل بروكسي
  },
  
  // Performance counters
  counters: {
    matchRequests: 0,
    lobbyRequests: 0,
    voiceRequests: 0,
    blockedRequests: 0,
    directRequests: 0,
    cdnRequests: 0,
    cacheHits: 0,
    cacheMisses: 0
  },
  
  // Failure tracking
  failures: {}
};

// ================= ULTRA-OPTIMIZED HELPERS =================

// تنظيف Host - نسخة محسّنة بدون regex
function cleanHost(host) {
  if (!host) return "";
  var colonPos = host.indexOf(':');
  return colonPos === -1 ? host : host.substring(0, colonPos);
}

// فحص النطاق - محسّن مع early exit
function matchesNetwork(ip, network, mask) {
  if (!ip || ip.length < 7 || ip.length > 15) return false;
  
  var ipParts = ip.split('.');
  var netParts = network.split('.');
  var maskParts = mask.split('.');
  
  if (ipParts.length !== 4 || netParts.length !== 4 || maskParts.length !== 4) {
    return false;
  }
  
  for (var i = 0; i < 4; i++) {
    var ipByte = parseInt(ipParts[i], 10);
    var netByte = parseInt(netParts[i], 10);
    var maskByte = parseInt(maskParts[i], 10);
    
    if (isNaN(ipByte) || isNaN(netByte) || isNaN(maskByte)) return false;
    if (maskByte === 0) continue;
    if ((ipByte & maskByte) !== (netByte & maskByte)) return false;
  }
  
  return true;
}

// فحص القائمة - محسّن
function isInRangeList(ip, rangeList) {
  if (!ip || !rangeList) return false;
  
  for (var i = 0; i < rangeList.length; i++) {
    if (matchesNetwork(ip, rangeList[i][0], rangeList[i][1])) {
      return true;
    }
  }
  
  return false;
}

// DNS Resolver مع LRU Cache
function fastResolve(hostname) {
  var now = new Date().getTime();
  
  // التحقق من Cache
  var cached = SESSION.dns[hostname];
  if (cached && (now - cached.time < CONFIG.DNS_CACHE_TIME)) {
    SESSION.counters.cacheHits++;
    
    // تحديث ترتيب الوصول (LRU)
    var idx = SESSION.dnsAccessOrder.indexOf(hostname);
    if (idx > -1) {
      SESSION.dnsAccessOrder.splice(idx, 1);
    }
    SESSION.dnsAccessOrder.push(hostname);
    
    return cached.ip;
  }
  
  SESSION.counters.cacheMisses++;
  
  // محاولة الحصول على IP جديد
  var resolvedIP = null;
  try {
    resolvedIP = dnsResolve(hostname);
    
    if (resolvedIP && resolvedIP.indexOf(':') === -1 && resolvedIP.indexOf('.') > -1) {
      // حفظ في Cache
      SESSION.dns[hostname] = {
        ip: resolvedIP,
        time: now
      };
      
      SESSION.dnsAccessOrder.push(hostname);
      
      // تنظيف Cache إذا تجاوز الحد الأقصى (LRU eviction)
      while (SESSION.dnsAccessOrder.length > CONFIG.MAX_DNS_CACHE_SIZE) {
        var oldestHost = SESSION.dnsAccessOrder.shift();
        delete SESSION.dns[oldestHost];
      }
      
      return resolvedIP;
    }
  } catch (error) {
    // في حالة الخطأ، نسجل الفشل
    SESSION.failures[hostname] = (SESSION.failures[hostname] || 0) + 1;
  }
  
  // استخدام Cache القديم إذا موجود
  if (cached && cached.ip) {
    return cached.ip;
  }
  
  return null;
}

// اختيار بروكسي اللوبي - نسخة محسّنة مع health tracking
function selectLobbyProxy(hostname, ip) {
  var now = new Date().getTime();
  
  // Rotation تلقائي كل 5 دقائق
  if (now - SESSION.lobby.lastRotation > CONFIG.LOBBY_ROTATION_TIME) {
    SESSION.lobby.currentIndex = (SESSION.lobby.currentIndex + 1) % CONFIG.LOBBY_FAST.length;
    SESSION.lobby.lastRotation = now;
  }
  
  // اختيار بناءً على hash للتوزيع المتوازن
  var hashValue = 0;
  var combined = hostname + (ip || "");
  
  for (var i = 0; i < combined.length; i++) {
    var char = combined.charCodeAt(i);
    hashValue = ((hashValue << 5) - hashValue) + char;
    hashValue = hashValue & hashValue;
  }
  
  hashValue = hashValue < 0 ? -hashValue : hashValue;
  
  var poolSize = CONFIG.LOBBY_FAST.length;
  var primaryIndex = hashValue % poolSize;
  
  // التحقق من صحة البروكسي
  var selectedProxy = CONFIG.LOBBY_FAST[primaryIndex];
  var health = SESSION.lobby.proxyHealth[selectedProxy] || 0;
  
  // إذا كانت صحة البروكسي سيئة، نجرب البديل
  if (health < -3) {
    primaryIndex = (primaryIndex + 1) % poolSize;
    selectedProxy = CONFIG.LOBBY_FAST[primaryIndex];
  }
  
  return selectedProxy;
}

// استخراج Network Prefix
function getNetworkPrefix(ip) {
  if (!ip) return null;
  var parts = ip.split('.');
  if (parts.length !== 4) return null;
  return parts[0] + '.' + parts[1] + '.' + parts[2];
}

// تسجيل نجاح/فشل البروكسي (للاستخدام المستقبلي)
function recordProxyHealth(proxy, success) {
  if (!SESSION.lobby.proxyHealth[proxy]) {
    SESSION.lobby.proxyHealth[proxy] = 0;
  }
  
  if (success) {
    SESSION.lobby.proxyHealth[proxy] = Math.min(10, SESSION.lobby.proxyHealth[proxy] + 1);
  } else {
    SESSION.lobby.proxyHealth[proxy] = Math.max(-10, SESSION.lobby.proxyHealth[proxy] - 2);
  }
}

// ================= ENHANCED TRAFFIC DETECTION =================

// PUBG Traffic - نسخة محسّنة
function isPUBGTraffic(hostname) {
  if (!hostname) return false;
  
  var lowerHost = hostname.toLowerCase();
  
  // فحص سريع للكلمات الأكثر شيوعاً
  if (lowerHost.indexOf('pubg') !== -1) return true;
  if (lowerHost.indexOf('tencent') !== -1) return true;
  if (lowerHost.indexOf('krafton') !== -1) return true;
  if (lowerHost.indexOf('proximabeta') !== -1) return true;
  
  // فحص موسّع
  var keywords = [
    'pubgm', 'pubgmobile', 'lightspeed', 'quantum',
    'levelinfinite', 'intl', 'igame', 'gameloop'
  ];
  
  for (var i = 0; i < keywords.length; i++) {
    if (lowerHost.indexOf(keywords[i]) !== -1) return true;
  }
  
  return false;
}

// Match Traffic - دقة عالية
function isMatchTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  // High-priority keywords (احتمال عالي جداً)
  var criticalKeywords = [
    'match', 'game', 'battle', 'realtime',
    'rt-', 'sync', 'live', 'pvp'
  ];
  
  for (var i = 0; i < criticalKeywords.length; i++) {
    if (combined.indexOf(criticalKeywords[i]) !== -1) return true;
  }
  
  // Secondary keywords
  var secondaryKeywords = [
    'combat', 'play', 'arena', 'room',
    'session', 'server', 'versus', 'udp'
  ];
  
  var score = 0;
  for (var j = 0; j < secondaryKeywords.length; j++) {
    if (combined.indexOf(secondaryKeywords[j]) !== -1) score++;
  }
  
  return score >= 2;
}

// Lobby Traffic
function isLobbyTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var keywords = [
    'lobby', 'matchmaking', 'mm-', 'queue',
    'dispatch', 'gateway', 'entrance', 'portal',
    'region', 'join', 'connect', 'recruit'
  ];
  
  for (var i = 0; i < keywords.length; i++) {
    if (combined.indexOf(keywords[i]) !== -1) return true;
  }
  
  return false;
}

// Voice Traffic
function isVoiceTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var keywords = [
    'voice', 'audio', 'rtc', 'webrtc',
    'agora', 'voip', 'call', 'mic'
  ];
  
  for (var i = 0; i < keywords.length; i++) {
    if (combined.indexOf(keywords[i]) !== -1) return true;
  }
  
  return false;
}

// Social Traffic
function isSocialTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var keywords = [
    'friend', 'social', 'squad', 'team',
    'party', 'clan', 'guild', 'invite'
  ];
  
  for (var i = 0; i < keywords.length; i++) {
    if (combined.indexOf(keywords[i]) !== -1) return true;
  }
  
  return false;
}

// CDN Traffic
function isCDNTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var keywords = [
    'cdn', 'content', 'asset', 'static',
    'download', 'dl-', 'patch', 'update'
  ];
  
  for (var i = 0; i < keywords.length; i++) {
    if (combined.indexOf(keywords[i]) !== -1) return true;
  }
  
  return false;
}

// Analytics Traffic
function isAnalyticsTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var keywords = [
    'analytics', 'telemetry', 'metrics',
    'track', 'beacon', 'stats', 'log'
  ];
  
  for (var i = 0; i < keywords.length; i++) {
    if (combined.indexOf(keywords[i]) !== -1) return true;
  }
  
  return false;
}

// ================= MAIN ROUTING ENGINE =================

function FindProxyForURL(url, host) {
  
  // ===== STEP 1: INPUT NORMALIZATION =====
  host = cleanHost(host.toLowerCase());
  if (!host) return CONFIG.DIRECT;
  
  // ===== STEP 2: NON-GAME TRAFFIC FILTER =====
  if (!isPUBGTraffic(host)) {
    return CONFIG.DIRECT;
  }
  
  // ===== STEP 3: DNS RESOLUTION =====
  var ipAddress = fastResolve(host);
  
  if (!ipAddress || ipAddress.indexOf(':') !== -1) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 4: GEOGRAPHIC BLOCKING =====
  if (CONFIG.AGGRESSIVE_BLOCK && isInRangeList(ipAddress, HIGH_LATENCY_RANGES)) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // التحقق من كون السيرفر في الأردن
  var isJordanIP = isInRangeList(ipAddress, JORDAN_RANGES);
  
  // ===== STEP 5: MATCH TRAFFIC (HIGHEST PRIORITY) =====
  if (isMatchTraffic(url, host)) {
    SESSION.counters.matchRequests++;
    
    // يجب أن يكون في الأردن للماتش
    if (!isJordanIP) {
      SESSION.counters.blockedRequests++;
      return CONFIG.BLOCK;
    }
    
    var networkPrefix = getNetworkPrefix(ipAddress);
    var now = new Date().getTime();
    
    // بدء جلسة ماتش جديدة
    if (!SESSION.match.locked) {
      SESSION.match.networkPrefix = networkPrefix;
      SESSION.match.hostname = host;
      SESSION.match.ipAddress = ipAddress;
      SESSION.match.proxy = CONFIG.MATCH_TIER1;
      SESSION.match.startTime = now;
      SESSION.match.locked = true;
      SESSION.match.consecutiveFailures = 0;
      
      return CONFIG.MATCH_TIER1 + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    // التحقق من تطابق الجلسة
    if (host === SESSION.match.hostname && networkPrefix === SESSION.match.networkPrefix) {
      // نفس الماتش - استخدم نفس البروكسي
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    // نفس الشبكة، مضيف مختلف (خوادم ثانوية)
    if (networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2;
    }
    
    // شبكة مختلفة - حظر لمنع التبديل
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 6: VOICE TRAFFIC (HIGH PRIORITY) =====
  if (isVoiceTraffic(url, host)) {
    SESSION.counters.voiceRequests++;
    
    if (!isJordanIP) {
      // صوت عالمي - اتصال مباشر قد يكون أفضل
      return CONFIG.DIRECT + "; " + CONFIG.VOICE_PROXY;
    }
    
    return CONFIG.VOICE_PROXY + "; " + CONFIG.MATCH_TIER1;
  }
  
  // ===== STEP 7: MATCH SESSION LOCK =====
  // إذا كان الماتش مقفل، نحظر الترافيك غير الضروري
  if (SESSION.match.locked) {
    var timeSinceMatch = new Date().getTime() - SESSION.match.startTime;
    
    if (timeSinceMatch < CONFIG.MATCH_SESSION_TIME) {
      // السماح فقط بـ CDN للتحديثات الضرورية
      if (isCDNTraffic(url, host)) {
        SESSION.counters.cdnRequests++;
        return CONFIG.CDN_DIRECT;
      }
      
      // حظر كل شيء آخر
      SESSION.counters.blockedRequests++;
      return CONFIG.BLOCK;
    }
    
    // انتهت مدة الجلسة - فتح القفل
    SESSION.match.locked = false;
    SESSION.match.networkPrefix = null;
    SESSION.match.hostname = null;
    SESSION.match.ipAddress = null;
  }
  
  // ===== STEP 8: LOBBY TRAFFIC (MEDIUM PRIORITY) =====
  if (isLobbyTraffic(url, host)) {
    SESSION.counters.lobbyRequests++;
    
    var selectedProxy = selectLobbyProxy(host, ipAddress);
    
    if (isJordanIP) {
      // لوبي محلي - استخدم البروكسيات للسرعة القصوى
      return selectedProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.MATCH_TIER1;
    }
    
    // لوبي عالمي - السماح بالاتصال المباشر لرؤية اللاعبين
    if (CONFIG.LOBBY_ALLOW_GLOBAL) {
      return CONFIG.DIRECT + "; " + selectedProxy + "; " + CONFIG.LOBBY_FAST[0];
    }
    
    // إذا كان الحظر العدواني مفعّل
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 9: SOCIAL TRAFFIC (MEDIUM PRIORITY) =====
  if (isSocialTraffic(url, host)) {
    if (!isJordanIP) {
      // Social عالمي - اتصال مباشر
      SESSION.counters.directRequests++;
      return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
    }
    
    return selectLobbyProxy(host, ipAddress) + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // ===== STEP 10: CDN TRAFFIC (LOW PRIORITY) =====
  if (isCDNTraffic(url, host)) {
    SESSION.counters.cdnRequests++;
    return CONFIG.CDN_DIRECT;
  }
  
  // ===== STEP 11: ANALYTICS (LOWEST PRIORITY) =====
  if (isAnalyticsTraffic(url, host)) {
    SESSION.counters.directRequests++;
    return CONFIG.DIRECT;
  }
  
  // ===== STEP 12: JORDAN GENERAL TRAFFIC =====
  if (isJordanIP) {
    var generalProxy = selectLobbyProxy(host, ipAddress);
    return generalProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.DIRECT;
  }
  
  // ===== STEP 13: DEFAULT BLOCKING =====
  SESSION.counters.blockedRequests++;
  return CONFIG.BLOCK;
}

// ================= UTILITY FUNCTIONS =================

// Reset session (للاستخدام اليدوي إذا لزم الأمر)
function resetMatchSession() {
  SESSION.match.locked = false;
  SESSION.match.networkPrefix = null;
  SESSION.match.hostname = null;
  SESSION.match.ipAddress = null;
  SESSION.match.proxy = null;
  SESSION.match.startTime = 0;
  SESSION.match.consecutiveFailures = 0;
}

// Get statistics (للتشخيص)
function getSessionStats() {
  return {
    match: {
      locked: SESSION.match.locked,
      hostname: SESSION.match.hostname,
      networkPrefix: SESSION.match.networkPrefix,
      uptime: SESSION.match.locked ? 
        (new Date().getTime() - SESSION.match.startTime) : 0
    },
    counters: SESSION.counters,
    cache: {
      size: SESSION.dnsAccessOrder.length,
      hitRate: SESSION.counters.cacheHits > 0 ?
        (SESSION.counters.cacheHits / (SESSION.counters.cacheHits + SESSION.counters.cacheMisses) * 100).toFixed(2) + '%' : '0%'
    },
    lobby: {
      currentProxy: CONFIG.LOBBY_FAST[SESSION.lobby.currentIndex],
      health: SESSION.lobby.proxyHealth
    }
  };
}

// Clear DNS cache (للصيانة)
function clearDNSCache() {
  SESSION.dns = {};
  SESSION.dnsAccessOrder = [];
}

// ================= INITIALIZATION =================
// تهيئة صحة البروكسيات
(function initializeProxyHealth() {
  for (var i = 0; i < CONFIG.LOBBY_FAST.length; i++) {
    SESSION.lobby.proxyHealth[CONFIG.LOBBY_FAST[i]] = 0;
  }
})();

// ============================================================
// END OF SCRIPT
// للحصول على أفضل أداء:
// 1. تأكد من أن البروكسيات تعمل بشكل صحيح
// 2. راقب إحصائيات الأداء باستخدام getSessionStats()
// 3. أعد تشغيل اللعبة إذا شعرت بتغير الأداء
// 4. استخدم CONFIG.LOBBY_ALLOW_GLOBAL = false لحظر اللاعبين البعيدين
// ============================================================
