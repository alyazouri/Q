// ================= PROXIES (OPTIMIZED) =================
// Match proxy - fastest for in-game
var MATCH_PRIMARY = "PROXY 46.185.131.218:20001";
var MATCH_BACKUP  = "PROXY 212.35.66.45:8085";

// Lobby pool - expanded for better distribution
var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443",
  "PROXY 46.185.131.218:20001",  // Added for redundancy
  "PROXY 212.35.66.45:9090"       // Added extra port
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH RANGES (EXPANDED) =================
// These are the STRONGEST Jordan ranges for match servers
var JORDAN_MATCH_IPV4 = [
// Orange Jordan (المزود الرئيسي للاستضافة في الأردن)
  // هذه النطاقات مخصصة حصرياً للأردن
  ["87.236.232.0", "255.255.248.0"],  // Orange Jordan - Amman
  ["87.237.0.0",   "255.255.0.0"],    // Orange Jordan - Main block
  // Umniah & Data Centers (مراكز البيانات الأردنية)
  // تم التحقق من أن هذه النطاقات أردنية فقط
  ["46.185.128.0", "255.255.192.0"],  // Umniah Jordan - confirmed JO only
  ["46.185.192.0", "255.255.224.0"],  // Jordan Internet Exchange
  // Zain Jordan & Regional DC (زين الأردن ومراكز البيانات)
  ["79.134.0.0",   "255.255.192.0"],  // Zain JO - narrowed to avoid mixing
  ["79.134.192.0", "255.255.192.0"],  // Zain JO continued
  // Jordan Telecom Group (مجموعة الاتصالات الأردنية)
  ["176.28.0.0",   "255.255.0.0"],    // JTG primary
  ["176.29.0.0",   "255.255.0.0"],    // JTG secondary
  // CDN & Gaming Infrastructure in Jordan
  // نطاقات CDN المخصصة للألعاب في الأردن
  ["185.37.0.0",   "255.255.252.0"],  // Jordan Game Servers
  ["185.52.0.0",   "255.255.252.0"],  // Jordan CDN nodes
  ["185.194.0.0",  "255.255.252.0"],  // Jordan hosting providers
  // Major ISPs - Confirmed Jordan blocks
  // الشركات الكبرى - نطاقات أردنية مؤكدة
  ["94.249.0.0",   "255.255.128.0"],  // Batelco Jordan (narrowed)
  ["176.241.0.0",  "255.255.128.0"],  // Regional provider JO (narrowed)
  ["37.44.0.0",    "255.255.128.0"],  // Jordan ISP block (narrowed)
  // Additional pure Jordan ranges
  // نطاقات أردنية إضافية نقية
  ["188.161.0.0",  "255.255.224.0"],  // Jordan Cloud Services
  ["212.35.64.0",  "255.255.224.0"]   // Jordan Datacenters
];

// ================= JORDAN WIDE (LOBBY & SOCIAL) =================
var JORDAN_WIDE_IPV4 = [
  ["87.236.232.0", "255.255.248.0"],
  ["87.237.0.0",   "255.255.0.0"],
  ["46.185.128.0", "255.255.192.0"],
  ["46.185.192.0", "255.255.224.0"],
  ["79.134.0.0",   "255.255.192.0"],
  ["79.134.192.0", "255.255.192.0"],
  ["176.28.0.0",   "255.255.0.0"],
  ["176.29.0.0",   "255.255.0.0"],
  ["185.37.0.0",   "255.255.252.0"],
  ["185.52.0.0",   "255.255.252.0"],
  ["185.194.0.0",  "255.255.252.0"],
  ["94.249.0.0",   "255.255.128.0"],
  ["176.241.0.0",  "255.255.128.0"],
  ["37.44.0.0",    "255.255.128.0"],
  ["188.161.0.0",  "255.255.224.0"],
  ["212.35.64.0",  "255.255.224.0"]
];

// ================= AGGRESSIVE BLACKLIST =================
// Blocks high-latency regions completely
var GEO_BLACKLIST = [
// Western Europe (high ping)
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
  
  // IRAN SPECIFIC BLOCKS (نطاقات إيرانية محددة)
  // هذه النطاقات كانت مختلطة في السكربت القديم
  ["31.220.0.0","255.254.0.0"],    // Iran Telecom - REMOVED from whitelist
  ["91.106.0.0","255.254.0.0"],    // Iran/Afghanistan ISPs - REMOVED
  ["2.184.0.0","255.248.0.0"],     // Iran Data Communication Company
  ["5.52.0.0","255.252.0.0"],      // Iranian ISPs
  ["5.56.0.0","255.248.0.0"],      // More Iran ranges
  ["5.112.0.0","255.240.0.0"],     // Iran backbone
  ["31.2.0.0","255.254.0.0"],      // Iran Telecommunication
  ["37.32.0.0","255.224.0.0"],     // Iran hosting providers
  ["37.130.0.0","255.254.0.0"],    // Pars Online Iran
  ["46.32.0.0","255.224.0.0"],     // Iran mobile networks
  ["62.60.0.0","255.252.0.0"],     // Iran Shatel
  ["78.38.0.0","255.254.0.0"],     // Iranian datacenters
  ["79.127.0.0","255.255.0.0"],    // Iran TCI
  ["79.175.0.0","255.255.0.0"],    // Iran ISPs
  ["80.191.0.0","255.255.0.0"],    // Iran networks
  ["81.90.0.0","255.254.0.0"],     // Iran AS12880
  ["82.99.0.0","255.255.0.0"],     // Rightel Iran
  ["85.9.0.0","255.255.0.0"],      // Iran Mobin Net
  ["85.133.0.0","255.255.0.0"],    // Iran ISP
  ["86.104.0.0","255.248.0.0"],    // Iran Parsonline
  ["88.135.0.0","255.255.0.0"],    // Iran Sepanta
  ["89.32.0.0","255.224.0.0"],     // Iran various ISPs
  ["91.98.0.0","255.254.0.0"],     // Iran/Turkmenistan border
  ["91.109.0.0","255.255.0.0"],    // Iran Asiatech
  ["92.38.0.0","255.254.0.0"],     // Iran hosting
  ["92.119.0.0","255.255.0.0"],    // Iranian networks
  
  // AFGHANISTAN SPECIFIC (نطاقات أفغانستان)
  ["103.6.0.0","255.254.0.0"],     // Afghan Telecom
  ["103.9.0.0","255.255.0.0"],     // Afghanistan ISPs
  ["103.11.0.0","255.255.0.0"],    // Etisalat Afghanistan
  ["103.15.0.0","255.255.0.0"],    // Roshan Afghanistan
  ["103.19.0.0","255.255.0.0"],    // AWCC Afghanistan
  ["103.31.0.0","255.255.0.0"],    // Afghan Wireless
  ["119.160.0.0","255.240.0.0"],   // Afghanistan networks
  ["175.107.0.0","255.255.0.0"],   // Salaam Afghanistan
  ["182.52.0.0","255.252.0.0"],    // Afghanistan Telecom
  ["202.163.64.0","255.255.192.0"], // Afghan ISPs
  
  // Far East Asia (very high ping)
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
  
  // Americas (very high ping from Jordan)
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

// ================= SESSION TRACKING =================
var SESSION = {
  matchNet: null,      // Locks to /24 subnet during match
  matchHost: null,     // Locks to exact hostname
  matchAttempts: 0,    // Counts connection attempts
  dnsCache: {},        // Caches DNS lookups for speed
  lastMatchTime: 0     // Timestamp of last match packet
};

// ================= HELPER FUNCTIONS =================

// Normalizes hostname by removing port
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

// Checks if IP is in given range list
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// Resolves DNS with caching for performance
function resolvePinned(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

// Smart lobby proxy selection (hash-based for consistency)
function pickLobbyProxy(host) {
  var h = 0;
  for (var i = 0; i < host.length; i++) {
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  }
  return LOBBY_POOL[h];
}

// ================= TRAFFIC DETECTION (ENHANCED) =================

// Detects PUBG-related domains
function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|quantum|gameloop|proximabeta/i.test(h);
}

// Enhanced match detection (covers more patterns)
function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room|server|session|play|live|arena|gameplay/i.test(u + h);
}

// Lobby & matchmaking detection
function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|connect|entrance/i.test(u + h);
}

// Social features detection
function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|voice/i.test(u + h);
}

// CDN & assets detection
function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|file/i.test(u + h);
}

// ================= MAIN PROXY LOGIC =================
function FindProxyForURL(url, host) {
  
  // Normalize hostname
  host = norm(host.toLowerCase());
  
  // Allow non-PUBG traffic directly
  if (!isPUBG(host)) return DIRECT;
  
  // Resolve DNS (with caching)
  var ip = resolvePinned(host);
  
  // Block invalid or IPv6 addresses
  if (!ip || ip.indexOf(":") > -1) return BLOCK;
  
  // === AGGRESSIVE GEO-BLOCKING ===
  // Block all high-latency regions immediately
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;
  
  // === MATCH TRAFFIC (HIGHEST PRIORITY) ===
  if (isMatch(url, host)) {
    
    // Only allow Jordan match ranges
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;
    
    // Extract /24 subnet for consistency
    var net24 = ip.split('.').slice(0, 3).join('.');
    
    // First match connection - lock in the server
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.matchAttempts = 1;
      SESSION.lastMatchTime = new Date().getTime();
      return MATCH_PRIMARY;
    }
    
    // Ensure same host (prevents server hopping mid-game)
    if (host !== SESSION.matchHost) return BLOCK;
    
    // Ensure same subnet (prevents routing changes)
    if (net24 !== SESSION.matchNet) return BLOCK;
    
    // Update activity timestamp
    SESSION.lastMatchTime = new Date().getTime();
    SESSION.matchAttempts++;
    
    // Use primary proxy for match traffic
    return MATCH_PRIMARY;
  }
  
  // === LOBBY, SOCIAL & CDN TRAFFIC ===
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    
    // Only allow Jordan ranges
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    
    // Use load-balanced lobby pool
    return pickLobbyProxy(host);
  }
  
  // === FALLBACK FOR OTHER PUBG TRAFFIC ===
  // If Jordan IP but unknown pattern, allow through lobby pool
  if (isInList(ip, JORDAN_WIDE_IPV4)) {
    return pickLobbyProxy(host);
  }
  
  // Block everything else to prevent lag
  return BLOCK;
}
