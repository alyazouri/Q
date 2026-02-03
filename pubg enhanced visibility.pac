// ============================================================
// GAME BOOSTER ALPHA v2.1 - ENHANCED PLAYER VISIBILITY
// Optimized PAC for PUBG Mobile
// Focus: See MORE Players + Fast Match Performance
// ============================================================

// ================= ADVANCED CONFIGURATION =================
var CONFIG = {
  // Match proxies - sorted by speed (fastest first)
  MATCH_TIER1: "PROXY 46.185.131.218:20001",
  MATCH_TIER2: "PROXY 212.35.66.45:8085",
  MATCH_TIER3: "PROXY 46.185.131.218:443",
  
  // Lobby proxies - optimized pool
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
  DNS_CACHE_TIME: 600000,
  STICKY_SESSION_TIME: 1800000,
  AGGRESSIVE_BLOCK: false  // ✨ تم التعديل: تخفيف الحظر لرؤية المزيد من اللاعبين
};

// ================= JORDAN IP RANGES =================
var JORDAN_RANGES = [
  ["178.77.0.0",  "255.255.0.0"],
  ["46.185.0.0",  "255.255.0.0"],
  ["176.29.0.0",  "255.255.0.0"],
  ["77.245.0.0",  "255.255.0.0"],
  ["176.28.0.0",  "255.255.0.0"],
  ["37.202.0.0",  "255.255.0.0"],
  ["85.159.0.0",  "255.255.0.0"],
  ["93.93.0.0",   "255.255.0.0"],
  ["93.95.0.0",   "255.255.0.0"],
  ["176.57.0.0",  "255.255.0.0"],
  ["37.252.0.0",  "255.255.0.0"],
  ["94.127.0.0",  "255.255.0.0"],
  ["79.134.0.0",  "255.255.0.0"],
  ["79.173.0.0",  "255.255.0.0"],
  ["149.200.0.0", "255.255.0.0"],
  ["188.123.0.0", "255.255.0.0"],
  ["188.247.0.0", "255.255.0.0"]
];

// ================= EUROPE/MIDDLE EAST RANGES =================
// ✨ جديد: نطاقات أوروبا والشرق الأوسط - للسماح برؤية لاعبين من هذه المناطق
var EUROPE_ME_RANGES = [
  // تركيا
  ["88.255.0.0", "255.255.0.0"],
  ["78.186.0.0", "255.255.0.0"],
  ["31.145.0.0", "255.255.0.0"],
  
  // السعودية والخليج
  ["188.221.0.0", "255.255.0.0"],
  ["94.200.0.0", "255.254.0.0"],
  ["82.148.0.0", "255.252.0.0"],
  
  // مصر
  ["156.160.0.0", "255.224.0.0"],
  ["197.32.0.0", "255.224.0.0"],
  
  // أوروبا (نطاقات رئيسية)
  ["80.0.0.0", "255.0.0.0"],
  ["81.0.0.0", "255.0.0.0"],
  ["82.0.0.0", "255.0.0.0"],
  ["83.0.0.0", "255.0.0.0"],
  ["84.0.0.0", "255.0.0.0"],
  ["85.0.0.0", "255.0.0.0"],
  ["86.0.0.0", "255.0.0.0"],
  ["87.0.0.0", "255.0.0.0"],
  ["88.0.0.0", "255.0.0.0"],
  ["89.0.0.0", "255.0.0.0"],
  ["90.0.0.0", "255.0.0.0"],
  ["91.0.0.0", "255.0.0.0"],
  ["92.0.0.0", "255.0.0.0"]
];

// ================= FAR REGIONS (HIGH LATENCY) =================
// ✨ تم التعديل: قائمة أصغر بكثير - فقط المناطق البعيدة حقاً
var FAR_REGIONS = [
  // آسيا (الصين، اليابان، كوريا)
  ["1.0.0.0", "255.0.0.0"],
  ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"],
  ["36.0.0.0", "255.0.0.0"],
  ["42.0.0.0", "255.0.0.0"],
  ["43.0.0.0", "255.0.0.0"],
  ["49.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "255.0.0.0"],
  ["59.0.0.0", "255.0.0.0"],
  ["60.0.0.0", "255.0.0.0"],
  ["61.0.0.0", "255.0.0.0"],
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
  
  // أمريكا
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
  ["70.0.0.0", "255.0.0.0"],
  
  // أستراليا وجنوب شرق آسيا
  ["101.0.0.0", "255.0.0.0"],
  ["103.0.0.0", "255.0.0.0"],
  ["106.0.0.0", "255.0.0.0"],
  ["163.0.0.0", "255.0.0.0"],
  ["180.0.0.0", "255.0.0.0"]
];

// ================= SESSION MANAGER =================
var SESSION = {
  match: {
    networkPrefix: null,
    hostname: null,
    proxy: null,
    startTime: 0,
    locked: false
  },
  
  dns: {},
  
  lobbyIndex: 0,
  lobbyLastSwitch: 0,
  
  counters: {
    matchRequests: 0,
    lobbyRequests: 0,
    blockedRequests: 0,
    directRequests: 0,
    groundRequests: 0,
    recruitRequests: 0
  }
};

// ================= HELPER FUNCTIONS =================

function cleanHost(host) {
  var colonPos = host.indexOf(':');
  if (colonPos === -1) return host;
  return host.substring(0, colonPos);
}

function matchesNetwork(ip, network, mask) {
  if (!ip || ip.length < 7 || ip.length > 15) return false;
  
  var ipBytes = ip.split('.');
  var netBytes = network.split('.');
  var maskBytes = mask.split('.');
  
  for (var i = 0; i < 4; i++) {
    var ipByte = parseInt(ipBytes[i], 10);
    var netByte = parseInt(netBytes[i], 10);
    var maskByte = parseInt(maskBytes[i], 10);
    
    if (maskByte === 0) continue;
    
    if ((ipByte & maskByte) !== (netByte & maskByte)) {
      return false;
    }
  }
  
  return true;
}

function isInRangeList(ip, rangeList) {
  var listLength = rangeList.length;
  
  for (var i = 0; i < listLength; i++) {
    if (matchesNetwork(ip, rangeList[i][0], rangeList[i][1])) {
      return true;
    }
  }
  
  return false;
}

function fastResolve(hostname) {
  var currentTime = new Date().getTime();
  
  var cached = SESSION.dns[hostname];
  if (cached) {
    if (currentTime - cached.time < CONFIG.DNS_CACHE_TIME) {
      return cached.ip;
    }
  }
  
  var resolvedIP = null;
  try {
    resolvedIP = dnsResolve(hostname);
    
    if (resolvedIP && resolvedIP.indexOf(':') === -1 && resolvedIP.indexOf('.') > -1) {
      SESSION.dns[hostname] = {
        ip: resolvedIP,
        time: currentTime
      };
      return resolvedIP;
    }
  } catch (error) {
    // Silent fail
  }
  
  if (cached && cached.ip) {
    return cached.ip;
  }
  
  return null;
}

function selectLobbyProxy(hostname, ip) {
  var hashValue = 0;
  var combined = hostname + ip;
  
  for (var i = 0; i < combined.length; i++) {
    var char = combined.charCodeAt(i);
    hashValue = ((hashValue << 5) - hashValue) + char;
    hashValue = hashValue & hashValue;
  }
  
  if (hashValue < 0) hashValue = -hashValue;
  
  var poolSize = CONFIG.LOBBY_FAST.length;
  var selectedIndex = hashValue % poolSize;
  
  return CONFIG.LOBBY_FAST[selectedIndex];
}

function getNetworkPrefix(ip) {
  var parts = ip.split('.');
  if (parts.length !== 4) return null;
  return parts[0] + '.' + parts[1] + '.' + parts[2];
}

// ================= TRAFFIC DETECTION =================

function isPUBGTraffic(hostname) {
  var keywords = [
    'pubg', 'pubgm', 'pubgmobile',
    'tencent', 'krafton', 'proximabeta',
    'lightspeed', 'quantum', 'levelinfinite',
    'intl', 'igame', 'gameloop'
  ];
  
  var lowerHost = hostname.toLowerCase();
  for (var i = 0; i < keywords.length; i++) {
    if (lowerHost.indexOf(keywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isMatchTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var matchKeywords = [
    'match', 'game', 'battle', 'combat',
    'realtime', 'rt-', 'sync', 'live',
    'play', 'arena', 'room', 'session',
    'udp', 'server', 'pvp', 'versus'
  ];
  
  for (var i = 0; i < matchKeywords.length; i++) {
    if (combined.indexOf(matchKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isLobbyTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var lobbyKeywords = [
    'lobby', 'matchmaking', 'mm-', 'queue',
    'dispatch', 'gateway', 'entrance', 'portal',
    'region', 'join', 'connect', 'recruit',
    'waiting', 'ready', 'prepare'
  ];
  
  for (var i = 0; i < lobbyKeywords.length; i++) {
    if (combined.indexOf(lobbyKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isVoiceTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var voiceKeywords = [
    'voice', 'audio', 'rtc', 'webrtc',
    'agora', 'voip', 'call', 'speak',
    'mic', 'sound', 'talk', 'chat'
  ];
  
  for (var i = 0; i < voiceKeywords.length; i++) {
    if (combined.indexOf(voiceKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isSocialTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var socialKeywords = [
    'friend', 'social', 'squad', 'team',
    'party', 'clan', 'guild', 'group',
    'invite', 'presence', 'status', 'profile',
    'message', 'notification'
  ];
  
  for (var i = 0; i < socialKeywords.length; i++) {
    if (combined.indexOf(socialKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// ✨ جديد: اكتشاف محسّن لترافيك Ground (اللاعبين القريبين)
function isGroundTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var groundKeywords = [
    'ground', 'nearby', 'proximity', 'local',
    'same-area', 'around', 'neighbor', 'near-me',
    'geo', 'location', 'regional'
  ];
  
  for (var i = 0; i < groundKeywords.length; i++) {
    if (combined.indexOf(groundKeywords[i]) !== -1) {
      SESSION.counters.groundRequests++;
      return true;
    }
  }
  
  return false;
}

// ✨ جديد: اكتشاف محسّن لترافيك Recruit (تكوين الفرق)
function isRecruitTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var recruitKeywords = [
    'recruit', 'teamup', 'lfg', 'looking-for',
    'party-find', 'squad-search', 'join-team',
    'team-search', 'player-search', 'find-player'
  ];
  
  for (var i = 0; i < recruitKeywords.length; i++) {
    if (combined.indexOf(recruitKeywords[i]) !== -1) {
      SESSION.counters.recruitRequests++;
      return true;
    }
  }
  
  return false;
}

function isCDNTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var cdnKeywords = [
    'cdn', 'content', 'asset', 'resource',
    'static', 'media', 'download', 'dl-',
    'patch', 'update', 'file', 'data'
  ];
  
  for (var i = 0; i < cdnKeywords.length; i++) {
    if (combined.indexOf(cdnKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isAnalyticsTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var analyticsKeywords = [
    'analytics', 'telemetry', 'metrics',
    'track', 'beacon', 'stats', 'report',
    'log', 'crash', 'error', 'monitor'
  ];
  
  for (var i = 0; i < analyticsKeywords.length; i++) {
    if (combined.indexOf(analyticsKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// ================= MAIN ROUTING ENGINE =================

function FindProxyForURL(url, host) {
  
  // STEP 1: NORMALIZE INPUT
  host = cleanHost(host.toLowerCase());
  
  // STEP 2: FILTER NON-GAME TRAFFIC
  if (!isPUBGTraffic(host)) {
    return CONFIG.DIRECT;
  }
  
  // STEP 3: DNS RESOLUTION
  var ipAddress = fastResolve(host);
  
  if (!ipAddress || ipAddress.indexOf(':') !== -1) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ✨ STEP 4: SMART GEOGRAPHIC FILTERING
  // فقط نحظر المناطق البعيدة جداً (آسيا وأمريكا)
  // نسمح بكل شيء آخر لرؤية المزيد من اللاعبين
  if (isInRangeList(ipAddress, FAR_REGIONS)) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // STEP 5: MATCH TRAFFIC (HIGHEST PRIORITY)
  if (isMatchTraffic(url, host)) {
    SESSION.counters.matchRequests++;
    
    // للماتش، نفضل الأردن لكن نسمح بأوروبا والشرق الأوسط
    var isJordan = isInRangeList(ipAddress, JORDAN_RANGES);
    var isEuropeME = isInRangeList(ipAddress, EUROPE_ME_RANGES);
    
    if (!isJordan && !isEuropeME) {
      // إذا كان بعيد جداً، نحظر
      return CONFIG.BLOCK;
    }
    
    var networkPrefix = getNetworkPrefix(ipAddress);
    var now = new Date().getTime();
    
    if (!SESSION.match.locked) {
      SESSION.match.networkPrefix = networkPrefix;
      SESSION.match.hostname = host;
      SESSION.match.proxy = CONFIG.MATCH_TIER1;
      SESSION.match.startTime = now;
      SESSION.match.locked = true;
      
      // إذا كان أردني، نستخدم البروكسيات المحلية
      if (isJordan) {
        return CONFIG.MATCH_TIER1 + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
      }
      
      // إذا كان أوروبي/خليجي، نعطيه فرصة المرور المباشر أولاً
      return CONFIG.DIRECT + "; " + CONFIG.MATCH_TIER1 + "; " + CONFIG.MATCH_TIER2;
    }
    
    if (host === SESSION.match.hostname && networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    if (networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2;
    }
    
    return CONFIG.BLOCK;
  }
  
  // STEP 6: VOICE TRAFFIC
  if (isVoiceTraffic(url, host)) {
    // الصوت مهم - نسمح بأي منطقة ما عدا البعيدة جداً
    return CONFIG.DIRECT + "; " + CONFIG.VOICE_PROXY;
  }
  
  // إذا كان الماتش مقفل، نتحقق من الوقت
  if (SESSION.match.locked) {
    var timeSinceMatch = new Date().getTime() - SESSION.match.startTime;
    
    if (timeSinceMatch < CONFIG.STICKY_SESSION_TIME) {
      if (isCDNTraffic(url, host)) {
        return CONFIG.CDN_DIRECT;
      }
      
      // نسمح بـ Ground و Recruit حتى أثناء الماتش
      if (isGroundTraffic(url, host) || isRecruitTraffic(url, host)) {
        return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
      }
      
      SESSION.counters.blockedRequests++;
      return CONFIG.BLOCK;
    } else {
      SESSION.match.locked = false;
      SESSION.match.networkPrefix = null;
      SESSION.match.hostname = null;
    }
  }
  
  // ✨ STEP 7: LOBBY TRAFFIC - محسّن لرؤية المزيد من اللاعبين
  if (isLobbyTraffic(url, host)) {
    SESSION.counters.lobbyRequests++;
    
    var selectedProxy = selectLobbyProxy(host, ipAddress);
    
    // للوبي، نسمح بكل المناطق القريبة والمتوسطة
    // الاتصال المباشر أولاً، ثم البروكسيات كاحتياطي
    return CONFIG.DIRECT + "; " + selectedProxy + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // ✨ STEP 8: GROUND TRAFFIC - اللاعبين القريبين
  if (isGroundTraffic(url, host)) {
    // نسمح بالمرور المباشر لرؤية جميع اللاعبين القريبين
    return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // ✨ STEP 9: RECRUIT TRAFFIC - تكوين الفرق
  if (isRecruitTraffic(url, host)) {
    // نسمح بالمرور المباشر لرؤية جميع اللاعبين المتاحين للانضمام
    return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // STEP 10: SOCIAL TRAFFIC
  if (isSocialTraffic(url, host)) {
    // الـ Social يجب أن يكون عالمي
    return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // STEP 11: CDN TRAFFIC
  if (isCDNTraffic(url, host)) {
    return CONFIG.CDN_DIRECT;
  }
  
  // STEP 12: ANALYTICS
  if (isAnalyticsTraffic(url, host)) {
    SESSION.counters.directRequests++;
    return CONFIG.DIRECT;
  }
  
  // STEP 13: JORDAN GENERAL TRAFFIC
  if (isInRangeList(ipAddress, JORDAN_RANGES)) {
    var generalProxy = selectLobbyProxy(host, ipAddress);
    return generalProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.DIRECT;
  }
  
  // ✨ STEP 14: EUROPE/ME GENERAL TRAFFIC
  // نسمح لترافيك أوروبا والشرق الأوسط بالمرور
  if (isInRangeList(ipAddress, EUROPE_ME_RANGES)) {
    return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // STEP 15: DEFAULT - نسمح بالمرور المباشر كتجربة أخيرة
  // بدلاً من الحظر المباشر، هذا يعطي فرصة للاتصالات غير المتوقعة
  SESSION.counters.directRequests++;
  return CONFIG.DIRECT;
}

// ================= SESSION UTILITIES =================

function resetSession() {
  SESSION.match.locked = false;
  SESSION.match.networkPrefix = null;
  SESSION.match.hostname = null;
  SESSION.match.proxy = null;
  SESSION.match.startTime = 0;
}

function getSessionStats() {
  return {
    matchRequests: SESSION.counters.matchRequests,
    lobbyRequests: SESSION.counters.lobbyRequests,
    blockedRequests: SESSION.counters.blockedRequests,
    directRequests: SESSION.counters.directRequests,
    groundRequests: SESSION.counters.groundRequests,
    recruitRequests: SESSION.counters.recruitRequests,
    cacheSize: Object.keys(SESSION.dns).length,
    matchLocked: SESSION.match.locked
  };
}
