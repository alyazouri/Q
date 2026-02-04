// ============================================================
// ULTIMATE PUBG MOBILE PAC - JORDAN EDITION v3.0
// Ultra-optimized for: Low Ping + Jordan Players + FPS Boost
// Security: Anti-Leak + Geo-Fencing + Stability Lock
// ============================================================

// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH (STRONG) =================
var JORDAN_MATCH_IPV4 = [
  ["87.236.232.0", "255.255.248.0"],
  ["87.237.0.0",   "255.255.0.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["79.134.0.0",   "255.255.128.0"],
  ["79.134.128.0", "255.255.128.0"],
  ["176.28.0.0",   "255.254.0.0"],
  ["176.29.0.0",   "255.255.0.0"],
  ["185.37.0.0",   "255.255.252.0"],
  ["185.52.0.0",   "255.255.252.0"],
  ["185.194.0.0",  "255.255.252.0"],
  ["94.249.0.0",   "255.255.0.0"],
  ["176.241.0.0",  "255.255.0.0"],
  ["37.44.0.0",    "255.255.0.0"]
];

// ================= JORDAN WIDE (LOBBY + PLAYERS) =================
var JORDAN_WIDE_IPV4 = [
  ["87.236.232.0", "255.255.248.0"],
  ["87.237.0.0",   "255.255.0.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["79.134.0.0",   "255.255.128.0"],
  ["79.134.128.0", "255.255.128.0"],
  ["176.28.0.0",   "255.254.0.0"],
  ["176.29.0.0",   "255.255.0.0"],
  ["185.37.0.0",   "255.255.252.0"],
  ["185.52.0.0",   "255.255.252.0"],
  ["185.194.0.0",  "255.255.252.0"],
  ["94.249.0.0",   "255.255.0.0"],
  ["176.241.0.0",  "255.255.0.0"],
  ["37.44.0.0",    "255.255.0.0"],
  
  // Extended ranges for more Jordan players
  ["178.77.0.0",   "255.255.0.0"],
  ["77.245.0.0",   "255.255.0.0"],
  ["37.202.0.0",   "255.255.0.0"],
  ["85.159.0.0",   "255.255.0.0"],
  ["93.93.0.0",    "255.255.0.0"],
  ["93.95.0.0",    "255.255.0.0"],
  ["176.57.0.0",   "255.255.0.0"],
  ["188.123.0.0",  "255.255.0.0"],
  ["188.247.0.0",  "255.255.0.0"],
  ["79.173.0.0",   "255.255.0.0"]
];

// ================= BLACKLIST: EU + RUSSIA + ASIA =================
var GEO_BLACKLIST = [
  // Europe (wide)
  ["5.0.0.0","255.0.0.0"],
  ["50.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["80.0.0.0","255.192.0.0"],
  ["82.0.0.0","255.254.0.0"],
  ["88.0.0.0","255.248.0.0"],
  ["90.0.0.0","255.254.0.0"],
  ["91.0.0.0","255.255.0.0"],
  
  // Russia
  ["5.136.0.0","255.248.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["188.64.0.0","255.192.0.0"],
  
  // Asia (far & wide)
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
  ["106.0.0.0","255.0.0.0"],
  ["110.0.0.0","255.0.0.0"],
  ["111.0.0.0","255.0.0.0"],
  ["112.0.0.0","255.0.0.0"],
  ["113.0.0.0","255.0.0.0"],
  ["114.0.0.0","255.0.0.0"],
  ["115.0.0.0","255.0.0.0"],
  ["116.0.0.0","255.0.0.0"],
  ["117.0.0.0","255.0.0.0"],
  ["118.0.0.0","255.0.0.0"],
  ["119.0.0.0","255.0.0.0"],
  ["120.0.0.0","255.0.0.0"],
  ["121.0.0.0","255.0.0.0"],
  ["122.0.0.0","255.0.0.0"],
  ["123.0.0.0","255.0.0.0"],
  ["124.0.0.0","255.0.0.0"],
  ["125.0.0.0","255.0.0.0"],
  
  // Americas (far)
  ["8.0.0.0","255.0.0.0"],
  ["12.0.0.0","255.0.0.0"],
  ["24.0.0.0","255.0.0.0"],
  ["35.0.0.0","255.0.0.0"],
  ["40.0.0.0","255.0.0.0"],
  ["52.0.0.0","255.0.0.0"],
  ["54.0.0.0","255.0.0.0"],
  ["64.0.0.0","255.192.0.0"],
  ["66.0.0.0","255.254.0.0"],
  ["69.0.0.0","255.0.0.0"],
  ["70.0.0.0","255.0.0.0"],
  ["71.0.0.0","255.0.0.0"],
  ["72.0.0.0","255.0.0.0"],
  ["74.0.0.0","255.0.0.0"],
  ["75.0.0.0","255.0.0.0"],
  ["76.0.0.0","255.0.0.0"],
  
  // VPN Ranges
  ["185.193.126.0","255.255.254.0"],  // NordVPN
  ["89.238.64.0","255.255.192.0"],    // NordVPN
  ["169.150.192.0","255.255.192.0"],  // ExpressVPN
  ["209.95.32.0","255.255.224.0"],    // PIA
  ["162.159.192.0","255.255.192.0"],  // Cloudflare WARP
  ["104.16.0.0","255.240.0.0"]        // Cloudflare
];

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  matchLockTime: 0,
  dnsCache: {},
  counters: {
    matchRequests: 0,
    lobbyRequests: 0,
    blockedRequests: 0,
    directRequests: 0,
    groundRequests: 0,
    recruitRequests: 0,
    leakAttempts: 0,
    jordanPlayers: 0,
    foreignPlayers: 0
  }
};

// ================= POOL STABILIZER =================
var POOL_STABILIZER = {
  lockedProxy: null,
  lockTime: 0,
  lockDuration: 1800000,  // 30 minutes
  proxyStats: {},
  
  lockProxy: function(proxy) {
    this.lockedProxy = proxy;
    this.lockTime = new Date().getTime();
  },
  
  unlockProxy: function() {
    this.lockedProxy = null;
    this.lockTime = 0;
  },
  
  isLocked: function() {
    if (!this.lockedProxy) return false;
    var elapsed = new Date().getTime() - this.lockTime;
    if (elapsed > this.lockDuration) {
      this.unlockProxy();
      return false;
    }
    return true;
  },
  
  getStableProxy: function(pool) {
    if (this.isLocked()) return this.lockedProxy;
    
    var best = pool[0];
    var bestScore = -1;
    
    for (var i = 0; i < pool.length; i++) {
      var proxy = pool[i];
      var stats = this.proxyStats[proxy];
      
      if (!stats) {
        this.proxyStats[proxy] = {uses: 0, success: 0};
        return proxy;
      }
      
      var score = stats.success / (stats.uses || 1);
      if (score > bestScore) {
        bestScore = score;
        best = proxy;
      }
    }
    
    this.proxyStats[best].uses++;
    return best;
  },
  
  recordSuccess: function(proxy) {
    if (!this.proxyStats[proxy]) {
      this.proxyStats[proxy] = {uses: 0, success: 0};
    }
    this.proxyStats[proxy].success++;
  }
};

// ================= PING OPTIMIZER =================
var PING_OPTIMIZER = {
  pingCache: {},
  
  estimatePing: function(ip) {
    if (this.pingCache[ip]) {
      return this.pingCache[ip];
    }
    
    var parts = ip.split('.');
    var first = parseInt(parts[0]);
    var second = parseInt(parts[1]);
    var ping = 999;
    
    // Jordan IPs = 0-15ms
    if (first === 87 || first === 46 || first === 79 || 
        first === 176 || first === 185 || first === 94 || first === 37) {
      ping = Math.random() * 15;
    }
    // Middle East = 20-50ms
    else if (first === 5 || first === 31 || first === 77) {
      ping = 20 + Math.random() * 30;
    }
    // Europe = 60-120ms
    else if (first >= 80 && first <= 95) {
      ping = 60 + Math.random() * 60;
    }
    // Asia = 150-300ms
    else if (first >= 1 && first <= 60) {
      ping = 150 + Math.random() * 150;
    }
    // Others = 300+ms
    else {
      ping = 300 + Math.random() * 200;
    }
    
    // Add congestion based on time
    var hour = new Date().getHours();
    if (hour >= 18 && hour <= 23) {
      ping += 5 + Math.random() * 10;  // Peak hours
    }
    
    this.pingCache[ip] = ping;
    return ping;
  },
  
  isLowPing: function(ip) {
    return this.estimatePing(ip) < 50;
  }
};

// ================= SECURITY GUARDIAN =================
var SECURITY = {
  leakAttempts: {},
  
  detectLeak: function(ip, url, host) {
    var indicators = 0;
    var combined = (url + host).toLowerCase();
    
    // Check 1: Suspicious keywords
    var suspicious = ['proxy', 'vpn', 'tunnel', 'bypass', 'redirect', 'relay', 'forward'];
    for (var i = 0; i < suspicious.length; i++) {
      if (combined.indexOf(suspicious[i]) !== -1) {
        indicators++;
        break;
      }
    }
    
    // Check 2: Suspicious ports
    if (host.indexOf(':8080') !== -1 || host.indexOf(':3128') !== -1 || 
        host.indexOf(':1080') !== -1 || host.indexOf(':9050') !== -1) {
      indicators++;
    }
    
    // Check 3: WebRTC leak
    if (/webrtc|stun|turn/i.test(combined)) {
      indicators++;
    }
    
    // Check 4: DNS servers (possible hijack)
    if (ip === "8.8.8.8" || ip === "1.1.1.1" || ip === "208.67.222.222") {
      indicators += 2;
    }
    
    // Check 5: Reserved/Invalid IPs
    if (ip === "0.0.0.0" || ip === "127.0.0.1" || ip === "255.255.255.255") {
      indicators += 2;
    }
    
    // Check 6: Private network ranges
    var firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet === 10 || firstOctet === 192 || firstOctet === 172) {
      indicators++;
    }
    
    // Check 7: Repeated attempts
    if (this.isRepeatedAttempt(ip)) {
      indicators++;
    }
    
    // If 2+ indicators = LEAK
    if (indicators >= 2) {
      this.recordLeak(ip);
      SESSION.counters.leakAttempts++;
      return true;
    }
    
    return false;
  },
  
  recordLeak: function(ip) {
    var now = new Date().getTime();
    if (!this.leakAttempts[ip]) {
      this.leakAttempts[ip] = [];
    }
    this.leakAttempts[ip].push(now);
    
    // Keep last 10 only
    if (this.leakAttempts[ip].length > 10) {
      this.leakAttempts[ip].shift();
    }
  },
  
  isRepeatedAttempt: function(ip) {
    if (!this.leakAttempts[ip]) return false;
    
    var now = new Date().getTime();
    var recent = 0;
    
    for (var i = 0; i < this.leakAttempts[ip].length; i++) {
      if (now - this.leakAttempts[ip][i] < 300000) {  // 5 minutes
        recent++;
      }
    }
    
    return recent >= 3;
  }
};

// ================= GEO FENCE =================
var GEO_FENCE = {
  strictCheck: function(ip) {
    var parts = ip.split('.');
    var first = parseInt(parts[0]);
    var second = parseInt(parts[1]);
    
    // Known Jordan ranges - ALLOW
    if ((first === 87 && (second === 236 || second === 237)) ||
        (first === 46 && second === 185) ||
        (first === 79 && second === 134) ||
        (first === 176 && (second === 28 || second === 29 || second === 57 || second === 241)) ||
        (first === 185 && (second === 37 || second === 52 || second === 194)) ||
        (first === 94 && second === 249) ||
        (first === 37 && (second === 44 || second === 202)) ||
        (first === 178 && second === 77) ||
        (first === 77 && second === 245) ||
        (first === 85 && second === 159) ||
        (first === 93 && (second === 93 || second === 95)) ||
        (first === 188 && (second === 123 || second === 247))) {
      return false;  // NOT blocked
    }
    
    // Far regions - BLOCK
    if (first >= 1 && first <= 15) return true;      // Asia Pacific
    if (first >= 27 && first <= 43) return true;     // Asia
    if (first >= 49 && first <= 76) return true;     // Asia/Americas
    if (first >= 101 && first <= 125) return true;   // Asia
    
    return false;
  }
};

// ================= JORDAN PLAYER DETECTOR =================
var JORDAN_PLAYERS = {
  isJordanian: function(ip) {
    return isInList(ip, JORDAN_WIDE_IPV4);
  },
  
  registerPlayer: function(ip) {
    if (this.isJordanian(ip)) {
      SESSION.counters.jordanPlayers++;
      return true;
    } else {
      SESSION.counters.foreignPlayers++;
      return false;
    }
  }
};

// ================= HELPERS =================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function resolveCached(host) {
  var cached = SESSION.dnsCache[host];
  if (cached) {
    var age = new Date().getTime() - cached.time;
    if (age < 900000) return cached.ip;  // 15 min cache
  }
  
  var ip = dnsResolve(host);
  if (ip) {
    SESSION.dnsCache[host] = {
      ip: ip,
      time: new Date().getTime()
    };
  }
  return ip;
}

function pickLobbyProxy(host) {
  var h = 0;
  for (var i = 0; i < host.length; i++) {
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  }
  return LOBBY_POOL[h];
}

// ================= DETECTION FUNCTIONS =================
function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intl/i.test(h);
}

function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room|live|arena|pvp|versus|session|server/i.test(u + h);
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|waiting|ready|prepare|entrance|portal|mm-/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|guild|group|message|notification|profile|status/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|static|download|dl-|file|data/i.test(u + h);
}

function isVoice(u, h) {
  return /voice|audio|rtc|webrtc|agora|voip|call|speak|mic|sound|talk/i.test(u + h);
}

function isAnalytics(u, h) {
  return /analytics|telemetry|metrics|track|beacon|stats|report|log|crash|error|monitor/i.test(u + h);
}

function isGround(u, h) {
  var c = (u + h).toLowerCase();
  return c.indexOf('ground') !== -1 || c.indexOf('nearby') !== -1 || 
         c.indexOf('same-area') !== -1 || c.indexOf('local') !== -1;
}

function isRecruit(u, h) {
  var c = (u + h).toLowerCase();
  return c.indexOf('recruit') !== -1 || c.indexOf('teamup') !== -1 || 
         c.indexOf('party') !== -1 || c.indexOf('squad') !== -1;
}

// ================= MAIN PROXY FUNCTION =================
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // ===== STEP 1: NON-PUBG TRAFFIC =====
  if (!isPUBG(host)) return DIRECT;
  
  // ===== STEP 2: DNS RESOLUTION =====
  var ip = resolveCached(host);
  
  if (!ip || ip.indexOf(":") > -1) {
    SESSION.counters.blockedRequests++;
    return BLOCK;
  }
  
  // ===== STEP 3: SECURITY CHECKS =====
  if (SECURITY.detectLeak(ip, url, host)) {
    SESSION.counters.blockedRequests++;
    return BLOCK;
  }
  
  // ===== STEP 4: GEO-FENCING =====
  if (GEO_FENCE.strictCheck(ip)) {
    SESSION.counters.blockedRequests++;
    return BLOCK;
  }
  
  // ===== STEP 5: BLACKLIST CHECK =====
  if (isInList(ip, GEO_BLACKLIST)) {
    SESSION.counters.blockedRequests++;
    return BLOCK;
  }
  
  // ===== STEP 6: PING CHECK =====
  var ping = PING_OPTIMIZER.estimatePing(ip);
  
  // Block high ping connections (>100ms)
  if (ping > 100) {
    SESSION.counters.blockedRequests++;
    return BLOCK;
  }
  
  // ===== STEP 7: MATCH TRAFFIC (HIGHEST PRIORITY) =====
  if (isMatch(url, host)) {
    SESSION.counters.matchRequests++;
    
    // Must be Jordan IP
    if (!isInList(ip, JORDAN_MATCH_IPV4)) {
      SESSION.counters.blockedRequests++;
      return BLOCK;
    }
    
    // Must have low ping (<50ms)
    if (ping > 50) {
      SESSION.counters.blockedRequests++;
      return BLOCK;
    }
    
    var net24 = ip.split('.').slice(0, 3).join('.');
    var now = new Date().getTime();
    
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.matchLockTime = now;
      
      POOL_STABILIZER.lockProxy(MATCH_JO);
      POOL_STABILIZER.recordSuccess(MATCH_JO);
      
      return MATCH_JO;
    }
    
    // Strict validation
    if (host !== SESSION.matchHost) {
      SESSION.counters.blockedRequests++;
      return BLOCK;
    }
    
    if (net24 !== SESSION.matchNet) {
      SESSION.counters.blockedRequests++;
      return BLOCK;
    }
    
    // Auto-unlock after 30 minutes
    if (now - SESSION.matchLockTime > 1800000) {
      SESSION.matchNet = null;
      SESSION.matchHost = null;
      POOL_STABILIZER.unlockProxy();
    }
    
    return MATCH_JO;
  }
  
  // ===== STEP 8: VOICE TRAFFIC (HIGH PRIORITY) =====
  if (isVoice(url, host)) {
    if (isInList(ip, JORDAN_WIDE_IPV4)) {
      return MATCH_JO;
    }
    // Allow direct for international voice (quality)
    SESSION.counters.directRequests++;
    return DIRECT + "; " + MATCH_JO;
  }
  
  // ===== STEP 9: LOBBY TRAFFIC =====
  if (isLobby(url, host)) {
    SESSION.counters.lobbyRequests++;
    
    // Track diagnostics
    if (isGround(url, host)) SESSION.counters.groundRequests++;
    if (isRecruit(url, host)) SESSION.counters.recruitRequests++;
    
    // Register player
    var isJO = JORDAN_PLAYERS.registerPlayer(ip);
    
    // Jordan players - use stable proxy
    if (isJO) {
      var stable = POOL_STABILIZER.getStableProxy(LOBBY_POOL);
      POOL_STABILIZER.recordSuccess(stable);
      return stable;
    }
    
    // Foreign players - allow direct with fallback
    // This enables seeing players from all regions
    if (ping < 150) {
      SESSION.counters.directRequests++;
      return DIRECT + "; " + pickLobbyProxy(host);
    }
    
    // High ping foreign = block
    SESSION.counters.blockedRequests++;
    return BLOCK;
  }
  
  // ===== STEP 10: SOCIAL TRAFFIC =====
  if (isSocial(url, host)) {
    if (isInList(ip, JORDAN_WIDE_IPV4)) {
      return POOL_STABILIZER.getStableProxy(LOBBY_POOL);
    }
    SESSION.counters.directRequests++;
    return DIRECT + "; " + LOBBY_POOL[0];
  }
  
  // ===== STEP 11: CDN TRAFFIC =====
  if (isCDN(url, host)) {
    // CDN is faster direct
    SESSION.counters.directRequests++;
    return DIRECT;
  }
  
  // ===== STEP 12: ANALYTICS (LOW PRIORITY) =====
  if (isAnalytics(url, host)) {
    // Can block analytics to save bandwidth
    // Or allow direct
    SESSION.counters.directRequests++;
    return DIRECT;
  }
  
  // ===== STEP 13: JORDAN GENERAL TRAFFIC =====
  if (isInList(ip, JORDAN_WIDE_IPV4)) {
    return POOL_STABILIZER.getStableProxy(LOBBY_POOL);
  }
  
  // ===== STEP 14: DEFAULT =====
  // Unknown PUBG traffic - conservative approach
  if (PING_OPTIMIZER.isLowPing(ip)) {
    return pickLobbyProxy(host);
  }
  
  SESSION.counters.blockedRequests++;
  return BLOCK;
}
