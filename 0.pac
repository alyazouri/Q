// ══════════════════════════════════════════════════════════════
//  PUBG MOBILE — Jordan Pure Lock  v2.0
//  📅 Updated: 2026-08  |  Season 28+
//  🎯 Jordan ONLY — Pure ISP bitmask — Anti-Drift Engine
//  🔧 Fixed: regex multiline | blockEuropeAsia logic | session
//  🆕 Full Jordanian ISP ranges | IPv4 bitmask | TTL DNS cache
// ══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
//  §1  PROXIES
// ─────────────────────────────────────────────
var MATCH_JO    = "PROXY 46.185.131.218:20001; PROXY 212.35.66.45:20001";
var LOBBY_PROXY = "PROXY 212.35.66.45:8085;    PROXY 46.185.131.218:8085";
var BLOCK       = "PROXY 127.0.0.1:9";
var DIRECT      = "DIRECT";

// ─────────────────────────────────────────────
//  §2  IP → INT + BITMASK ENGINE
// ─────────────────────────────────────────────
function ipToInt(ip) {
  var a = ip.split(".");
  return (((+a[0])<<24)|((+a[1])<<16)|((+a[2])<<8)|(+a[3]))>>>0;
}
function matchMask(n, net, mask) {
  return (n & mask)>>>0 === (net & mask)>>>0;
}
function matchAny(n, tbl) {
  for (var i = 0; i < tbl.length; i++)
    if (matchMask(n, tbl[i][0], tbl[i][1])) return true;
  return false;
}

// ─────────────────────────────────────────────
//  §3  JORDAN PURE IPv4 — نطاقات بيور 100%
//  مصدر: RIPE NCC — AS48832/AS8697/AS9038/AS50670
//  مرتّبة: Zain → Orange/JDC → Umniah → Linkdotnet
//           → Batelco → VTEL → JT → Al Mouakhah → Others
// ─────────────────────────────────────────────

// ══════════════════════════════════════════════
//  ZAIN JORDAN (AS48832) — الأكثر استخداماً في PUBG
// ══════════════════════════════════════════════
var JO_ZAIN = [
  [0x52D44000, 0xFFFFC000],  // 82.212.64.0/18   Core Block الرئيسي
  [0xB01D0000, 0xFFFF0000],  // 176.29.0.0/16    Fixed Broadband
  [0xB01D9800, 0xFFFFFF00],  // 176.29.152.0/24  Game Servers
  [0xB01DFA00, 0xFFFFFF00],  // 176.29.250.0/24  Game Servers 2
  [0xB01C8000, 0xFFFF8000],  // 176.28.128.0/17  Wholesale
  [0xBC7BA000, 0xFFFFE000],  // 188.123.160.0/19 LTE Pool
  [0x25DC7000, 0xFFFFF000],  // 37.220.112.0/20  2023 Block
  [0x5EF90000, 0xFFFF8000],  // 94.249.0.0/17    Data Center
  [0x511C7000, 0xFFFFF000],  // 81.28.112.0/20   Mobile Data
  [0x52D45000, 0xFFFFF000],  // 82.212.80.0/20   2024 Sub-A
  [0x52D46000, 0xFFFFE000],  // 82.212.96.0/19   2024 Sub-B
  [0x52D44000, 0xFFFFF000],  // 82.212.64.0/20   Game Server 1
  [0x52D45400, 0xFFFFFF00],  // 82.212.84.0/24   Game Server 2 ★
  [0x511C7000, 0xFFFFF800],  // 81.28.112.0/21   Mobile Core
  [0x25DC7000, 0xFFFFF800]   // 37.220.112.0/21  New 2024
];

// ══════════════════════════════════════════════
//  ORANGE JO / JDC (AS8697 / AS9038)
// ══════════════════════════════════════════════
var JO_ORANGE = [
  [0x2EB98000, 0xFFFF8000],  // 46.185.128.0/17  Broadband Core ★
  [0x2EB98300, 0xFFFFFF00],  // 46.185.131.0/24  Game Server ★
  [0x566C0000, 0xFFFF8000],  // 86.108.0.0/17    DSL Pool ★
  [0x5CFD0000, 0xFFFF8000],  // 92.253.0.0/17    Business ★
  [0x5CFD3000, 0xFFFFFF00],  // 92.253.48.0/24   DNS Server
  [0x5CFD6000, 0xFFFFFF00],  // 92.253.96.0/24   Game Servers
  [0x5CFD7A00, 0xFFFFFF00],  // 92.253.122.0/24  Match Server ★
  [0x25CA4000, 0xFFFFC000],  // 37.202.64.0/18   JDC Core
  [0xC1BC4000, 0xFFFFE000],  // 193.188.64.0/19  Legacy
  [0xC2A58000, 0xFFFFE000],  // 194.165.128.0/19 PA Block
  [0xD5BAA000, 0xFFFFE000],  // 213.186.160.0/19 Backbone
  [0x5BBAE000, 0xFFFFE000],  // 91.186.224.0/19  Enterprise
  [0xD9170000, 0xFFFFF000],  // 217.23.0.0/20    Peering
  [0x4FADC000, 0xFFFFC000],  // 79.173.192.0/18  Orange Mobile
  [0x2EB98B00, 0xFFFFFF00],  // 46.185.139.0/24  Lobby Server ★
  [0x2EB9A200, 0xFFFFFF00],  // 46.185.162.0/24  DNS Server ★
  [0x2EB9E600, 0xFFFFFF00],  // 46.185.230.0/24  Game Server 2 ★
  [0x5CFD6F00, 0xFFFFFF00],  // 92.253.111.0/24  Mixed Server ★
  [0x5CFD1600, 0xFFFFFF00]   // 92.253.22.0/24   Lobby Mix ★
];

// ══════════════════════════════════════════════
//  UMNIAH (AS50670 / AS41095)
// ══════════════════════════════════════════════
var JO_UMNIAH = [
  [0x2EF8C000, 0xFFFFE000],  // 46.248.192.0/19  Mobile Core
  [0x5CF12000, 0xFFFFE000],  // 92.241.32.0/19   LTE Data
  [0x6D6BE000, 0xFFFFE000],  // 109.107.224.0/19 4G Pool
  [0x052D8000, 0xFFFFF000],  // 5.45.128.0/20    Legacy DSL
  [0x2E177000, 0xFFFFF000],  // 46.23.112.0/20   Fixed
  [0x95C88000, 0xFFFF8000],  // 149.200.128.0/17 Shared Block
  [0xB2EEB000, 0xFFFFF000],  // 178.238.176.0/20 Extended
  [0x2EB78000, 0xFFFF8000],  // 46.183.0.0/17    2024 New
  [0x5FAC0000, 0xFFFFE000],  // 95.172.192.0/19  Extra
  [0x5CF12000, 0xFFFFF000]   // 92.241.32.0/20   Sub
];

// ══════════════════════════════════════════════
//  LINKDOTNET JORDAN
// ══════════════════════════════════════════════
var JO_LINK = [
  [0x2E206000, 0xFFFFE000],  // 46.32.96.0/19    DSL Core
  [0x505AA000, 0xFFFFF000],  // 80.90.160.0/20   Broadband
  [0x5E8E2000, 0xFFFFE000],  // 94.142.32.0/19   Business
  [0x4DF50000, 0xFFFFF000],  // 77.245.0.0/20    Legacy
  [0x505A8000, 0xFFFF8000],  // 80.90.128.0/17   Expanded
  [0x2E204000, 0xFFFFC000]   // 46.32.64.0/18    Additional
];

// ══════════════════════════════════════════════
//  BATELCO JORDAN
// ══════════════════════════════════════════════
var JO_BATELCO = [
  [0x5B6A6000, 0xFFFFF000],  // 91.106.96.0/20
  [0xD4760000, 0xFFFFE000],  // 212.118.0.0/19
  [0x5B6A4000, 0xFFFF0000],  // 91.106.0.0/16 (expanded)
  [0x25DC7000, 0xFFFFF000]   // 37.220.112.0/20 (shared)
];

// ══════════════════════════════════════════════
//  VTEL JORDAN
// ══════════════════════════════════════════════
var JO_VTEL = [
  [0x3E48A000, 0xFFFFE000],  // 62.72.160.0/19
  [0x3E48A100, 0xFFFFFF00],  // 62.72.161.0/24
  [0x3E48A200, 0xFFFFFF00],  // 62.72.162.0/24
  [0x3E48A500, 0xFFFFFF00],  // 62.72.165.0/24
  [0x3E48A600, 0xFFFFFE00],  // 62.72.166.0/23
  [0x3E48A800, 0xFFFFFC00],  // 62.72.168.0/22
  [0x3E48AE00, 0xFFFFFF00],  // 62.72.174.0/24
  [0x3E48B000, 0xFFFFFF00],  // 62.72.176.0/24
  [0x3E48B300, 0xFFFFFF00],  // 62.72.179.0/24
  [0x3E48B400, 0xFFFFFF00],  // 62.72.180.0/24
  [0x3E48B800, 0xFFFFFC00],  // 62.72.184.0/22
  [0x3E48BF00, 0xFFFFFF00],  // 62.72.191.0/24
  [0x51150000, 0xFFFFF000],  // 81.21.0.0/20
  [0x6DEDC000, 0xFFFFC000],  // 109.237.192.0/18
  [0xB0390000, 0xFFFFE000],  // 176.57.0.0/19
  [0xB24D8000, 0xFFFFC000]   // 178.77.128.0/18
];

// ══════════════════════════════════════════════
//  JORDAN TELECOM PSC (AS8697)
// ══════════════════════════════════════════════
var JO_JT = [
  [0xD4220000, 0xFFFFE000],  // 212.34.0.0/19
  [0xD4234000, 0xFFFFC000],  // 212.35.64.0/18  ★ Game Servers
  [0xD4234200, 0xFFFFFF00],  // 212.35.66.0/24  ★ Match/Lobby ★
  [0xD58B2000, 0xFFFFE000],  // 213.139.32.0/19
  [0xD9900000, 0xFFFFF000],  // 217.144.0.0/20
  [0xD91B2000, 0xFFFFE000],  // 217.27.32.0/19
  [0xD91BD000, 0xFFFFF000]   // 217.29.208.0/20
];

// ══════════════════════════════════════════════
//  AL MOUAKHAH / PETRA NET / OTHERS
// ══════════════════════════════════════════════
var JO_OTHER = [
  [0x2511C000, 0xFFFFF000],  // 37.17.192.0/20   Al Mouakhah
  [0x252C4000, 0xFFFFE000],  // 37.44.32.0/19    Al Mouakhah 2
  [0x257B4000, 0xFFFFE000],  // 37.123.64.0/19   Al Mouakhah 3
  [0x25988000, 0xFFFFF800],  // 37.152.0.0/21    Petra Net
  [0x5F8DD000, 0xFFFFF000],  // 95.141.208.0/20  Petra Net 2
  [0x54122000, 0xFFFFE000],  // 84.18.32.0/19    DC Block
  [0x54124000, 0xFFFFE000],  // 84.18.64.0/19    DC Block 2
  [0x4F868000, 0xFFFFE000],  // 79.134.128.0/19  Extra
  [0x5B6A0000, 0xFFFF0000],  // 91.106.0.0/16    Legacy
  [0xBCF74000, 0xFFFFC000],  // 188.247.64.0/18  Zain shared
  [0xBCF74000, 0xFFFFFC00],  // 188.247.64.0/22  Tight
  [0xBCF74800, 0xFFFFF800],  // 188.247.72.0/21  Extended
  [0xBCF75000, 0xFFFFF800],  // 188.247.80.0/21  Extended 2
  [0xBCF75800, 0xFFFFFC00],  // 188.247.88.0/22  Extended 3
  [0xBCF75C00, 0xFFFFFF00],  // 188.247.92.0/24  Extended 4
  [0x05160000, 0xFFFF0000],  // 5.22.0.0/16      NITC/Academic
  [0x254B9000, 0xFFFFF800],  // 37.75.144.0/21   Jordan Univ
  [0xD4760000, 0xFFFFE000],  // 212.118.0.0/19   Batelco share
  [0xB2EEB000, 0xFFFFF000],  // 178.238.176.0/20 Umniah share
  [0x3E488000, 0xFFFF8000]   // 62.72.0.0/17     VTEL Full
];

// ══════════════════════════════════════════════
//  185.x.x.x JORDANIAN BLOCKS (مرخّصة RIPE لأردنيين)
// ══════════════════════════════════════════════
var JO_185 = [
  [0xB90A8000, 0xFFFFFC00],  // 185.10.128.0/22
  [0xB90CC000, 0xFFFFFC00],  // 185.12.192.0/22
  [0xB90E8000, 0xFFFFFC00],  // 185.14.128.0/22
  [0xB9138000, 0xFFFFFC00],  // 185.19.128.0/22
  [0xB9180000, 0xFFFFFC00],  // 185.24.128.0/22
  [0xB921C000, 0xFFFFFC00],  // 185.33.28.0/22
  [0xB9398000, 0xFFFFFC00],  // 185.57.128.0/22
  [0xB9500000, 0xFFFFFC00],  // 185.80.0.0/22
  [0xB9506800, 0xFFFFFC00],  // 185.80.104.0/22
  [0xB9604400, 0xFFFFFC00],  // 185.96.68.0/22
  [0xB96D7800, 0xFFFFFC00],  // 185.109.120.0/22
  [0xB96DC000, 0xFFFFFC00],  // 185.109.192.0/22
  [0xB9872800, 0xFFFFFC00],  // 185.135.40.0/22
  [0xB98BC000, 0xFFFFFC00],  // 185.139.192.0/22
  [0xB99FA000, 0xFFFFFC00],  // 185.159.160.0/22
  [0xB9A0EC00, 0xFFFFFC00],  // 185.160.236.0/22
  [0xB9AD3900, 0xFFFFFF00],  // 185.173.57.0/24
  [0xB9B0F800, 0xFFFFFC00],  // 185.176.248.0/22
  [0xB9B42C00, 0xFFFFFC00],  // 185.180.44.0/22
  [0xB9B68800, 0xFFFFFC00],  // 185.182.136.0/22
  [0xB9C1B000, 0xFFFFFC00],  // 185.193.176.0/22
  [0xB9C5B000, 0xFFFFFC00],  // 185.197.176.0/22
  [0xB9C88000, 0xFFFFFC00],  // 185.200.128.0/22
  [0xB9EAE000, 0xFFFFFC00],  // 185.234.224.0/22
  [0xB9FD7000, 0xFFFFFC00],  // 185.253.112.0/22
  [0xB9271000, 0xFFFFFC00],  // 185.39.16.0/22
  [0xB9280000, 0xFFFFFC00],  // 185.40.0.0/22
  [0xB92B2000, 0xFFFFFC00],  // 185.43.144.0/22
  [0xB9340000, 0xFFFFFC00],  // 185.52.0.0/22
  [0xB9394000, 0xFFFFFC00],  // 185.57.64.0/22
  [0xB93E8000, 0xFFFFFC00],  // 185.62.128.0/22
  [0xB9440000, 0xFFFFFC00],  // 185.68.0.0/22
  [0xB9558000, 0xFFFFFC00],  // 185.85.128.0/22
  [0xB9631000, 0xFFFFFC00]   // 185.99.16.0/22
];

// ══════════════════════════════════════════════
//  JORDAN IPv6 PREFIXES
// ══════════════════════════════════════════════
var JO_IPV6 = [
  "2a00:18d0",  // Zain Primary
  "2a00:18d8",  // Zain Secondary
  "2a04:b200",  // Zain 2024
  "2a01:9700",  // Orange Primary
  "2a05:74c0",  // Orange Business
  "2a04:2e00",  // Orange 2024
  "2a02:c040",  // Umniah Primary
  "2a06:8ec0",  // Umniah 2024
  "2a0c:b580",  // Umniah 2025
  "2a0a:e500",  // Linkdotnet
  "2001:41f0"   // Academic/Gov
];

// ─────────────────────────────────────────────
//  §4  FAST-PATH: سيرفرات PUBG الأردنية المعروفة
//  مرتّبة: الأكثر ظهوراً في جلسات المباراة أولاً
// ─────────────────────────────────────────────
var KNOWN_JO = [
  "92.253.122",  // Orange — Match Server ★
  "82.212.84",   // Zain   — Game Server 1 ★
  "82.212.85",   // Zain   — Game Server 2
  "176.29.153",  // Zain   — Fixed Match
  "46.185.131",  // Orange — Game Server ★
  "46.185.139",  // Orange — Lobby Server ★
  "46.185.162",  // Orange — DNS/Server
  "46.185.230",  // Orange — Game Server 2
  "92.253.48",   // Orange — DNS
  "92.253.111",  // Orange — Mixed Server
  "92.253.22",   // Orange — Lobby Mix
  "212.35.66",   // JT     — Match/Lobby ★
  "86.108.",     // Orange — DSL Servers
  "94.249.",     // Zain   — DC Servers
  "176.29.1",    // Zain   — Fixed Broad
  "176.28.",     // Zain   — Wholesale
  "81.28.11",    // Zain   — Mobile
  "37.220.121"   // Zain   — 2024 Servers
];

// ─────────────────────────────────────────────
//  §5  EXPLICIT BLOCK — Far Regions (bitmask)
//  Asia-Pacific + Europe + Americas edges
// ─────────────────────────────────────────────
var FAR_MASKS = [
  // Asia-Pacific
  [0x12A30000, 0xFFFF0000],  // 18.163.0.0/16  AWS HK
  [0x0DE40000, 0xFFFF0000],  // 13.228.0.0/16  AWS SGP
  [0x2FF50000, 0xFFFF0000],  // 47.245.0.0/16  ALI SGP
  [0x2B840000, 0xFFFF0000],  // 43.132.0.0/16  TC HK
  [0xAF290000, 0xFFFF0000],  // 175.41.0.0/16  AWS SGP2
  [0x77510000, 0xFFFF0000],  // 119.81.0.0/16  IBM SGP
  [0x78640000, 0xFFFF0000],  // 120.76.0.0/16  ALI SH
  [0x34440000, 0xFFFF0000],  // 52.68.0.0/16   AWS JP
  // Europe
  [0x1299B000, 0xFFFF0000],  // 18.185.0.0/16  AWS EU-W
  [0x03780000, 0xFFFF0000],  // 3.120.0.0/16   AWS EU-C
  [0x12C20000, 0xFFFF0000],  // 18.194.0.0/16  AWS EU-F
  [0x03400000, 0xFFFF0000],  // 3.64.0.0/16    AWS EU-C2
  [0x34720000, 0xFFFF0000],  // 52.114.0.0/16  MSFT EU
  // Americas
  [0x36DA0000, 0xFFFF0000],  // 54.218.0.0/16  AWS US-W
  [0x22D00000, 0xFFFF0000],  // 34.208.0.0/16  AWS US-W2
  [0x12ED0000, 0xFFFF0000],  // 18.237.0.0/16  AWS US-W3
  [0x2C240000, 0xFFFF0000],  // 44.36.0.0/16   AWS US-E2
  [0x36C80000, 0xFFFF0000]   // 54.200.0.0/16  AWS US-W4
];

// ─────────────────────────────────────────────
//  §6  SESSION STATE
// ─────────────────────────────────────────────
var SESSION = {
  state:        0,     // 0=IDLE 1=LOCKED
  lockedIP:     null,  // IP مقفول
  lockedNet:    null,  // /24 prefix
  lockedProxy:  null,  // بروكسي مقفول
  ispA:         -1,    // ISP octet A
  ispB:         -1,    // ISP octet B
  ispC:         -1,    // ISP octet C
  failCount:    0,     // عداد الفشل
  lastActivity: 0,     // وقت آخر نشاط
  dnsCache:     {},    // DNS cache
  dnsTTL:       {}     // DNS TTL
};

// ─────────────────────────────────────────────
//  §7  SETTINGS
// ─────────────────────────────────────────────
var SESSION_TTL_MS = 90000;   // 90 ثانية — انتهاء الجلسة
var DNS_TTL_MS     = 30000;   // 30 ثانية — TTL للـ DNS
var MAX_FAIL       = 5;       // حد الفشل قبل إعادة التهيئة
var ISP_B_TOLERANCE = 5;      // تحمّل ±5 في Octet-B (anti-drift)

// ─────────────────────────────────────────────
//  §8  HELPERS
// ─────────────────────────────────────────────
function nowMs() {
  try { return Date.now ? Date.now() : 0; } catch(e) { return 0; }
}

function norm(h) {
  var c = 0, last = -1;
  for (var i = 0; i < h.length; i++) {
    if (h[i] === ":") { c++; last = i; }
  }
  return (c === 1) ? h.substring(0, last) : h;
}

function isIPv4(s) { return /^(\d{1,3}\.){3}\d{1,3}$/.test(s); }
function isIPv6(s) { return s.indexOf(":") !== -1; }

function isPrivate(ip) {
  if (!isIPv4(ip)) return false;
  return isInNet(ip,"10.0.0.0","255.0.0.0")    ||
         isInNet(ip,"172.16.0.0","255.240.0.0") ||
         isInNet(ip,"192.168.0.0","255.255.0.0")||
         isInNet(ip,"127.0.0.0","255.0.0.0")    ||
         isInNet(ip,"169.254.0.0","255.255.0.0");
}

// DNS آمن مع TTL Cache
function resolveIPv4(host) {
  var t = nowMs();
  if (SESSION.dnsCache[host] && SESSION.dnsTTL[host] > t)
    return SESSION.dnsCache[host];
  try {
    var ip = dnsResolve(host);
    if (ip && isIPv4(ip) && !isPrivate(ip)) {
      SESSION.dnsCache[host] = ip;
      SESSION.dnsTTL[host]   = t + DNS_TTL_MS;
      return ip;
    }
  } catch(e) {}
  return null;
}

// net24: أول 3 أوكتيت
function net24(ip) {
  return ip.split(".").slice(0, 3).join(".");
}

// ─────────────────────────────────────────────
//  §9  GEO CLASSIFIERS
// ─────────────────────────────────────────────
function isIPv6JO(ip) {
  var low = ip.toLowerCase();
  for (var i = 0; i < JO_IPV6.length; i++)
    if (low.indexOf(JO_IPV6[i]) === 0) return true;
  return false;
}

// Jordan Match: نطاقات ضيّقة — للمباراة فقط
function isJordanMatch(ip) {
  if (!ip || !isIPv4(ip)) return false;
  var n = ipToInt(ip);
  return matchAny(n, JO_ZAIN)   ||
         matchAny(n, JO_ORANGE) ||
         matchAny(n, JO_UMNIAH) ||
         matchAny(n, JO_LINK)   ||
         matchAny(n, JO_JT)     ||
         matchAny(n, JO_BATELCO)||
         matchAny(n, JO_VTEL)   ||
         matchAny(n, JO_OTHER)  ||
         matchAny(n, JO_185);
}

// Jordan Wide: شامل — للوبي والعام
function isJordanWide(ip) {
  return isJordanMatch(ip);  // نفس النطاقات — كلها أردنية بيور
}

// Far Region Block
function isFarRegion(ip) {
  if (!ip || !isIPv4(ip)) return false;
  return matchAny(ipToInt(ip), FAR_MASKS);
}

// Fast-Path: سيرفرات معروفة
function isKnownJO(h) {
  for (var i = 0; i < KNOWN_JO.length; i++)
    if (h.indexOf(KNOWN_JO[i]) !== -1) return true;
  return false;
}

// ─────────────────────────────────────────────
//  §10  PUBG DETECTOR — Season 28+
// ─────────────────────────────────────────────
function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|bgmi|igamecj|igamepubg|proximabeta|krafton|lightspeed|levelinfinite|vnggames|garena|tencent|tencentyun|qcloud|myqcloud|tencentcs|gcloud|wechatgame|intlgame|gcloudsdk/.test(h);
}

// ─────────────────────────────────────────────
//  §11  TRAFFIC DETECTORS
// ─────────────────────────────────────────────
function isMatch(u, h) {
  var s = (u + h).toLowerCase();
  return /match|battle|game|combat|realtime|sync|tick|udp|room|gs\.|gss|gameserver|frame|node|shard|zone|scene|instance|arena|tdm|payload|metro|royale|classic|ranked|custom/.test(s);
}

function isLobby(u, h) {
  var s = (u + h).toLowerCase();
  return /lobby|matchmak|queue|dispatch|gateway|region|join|recruit|squad|party|invite|rank|rating|mmr|pool|slot|clan|social|chat|voice|friend|team/.test(s);
}

function isCDN(u, h) {
  var s = (u + h).toLowerCase();
  return /cdn|asset|resource|patch|update|media|content|bundle|pak|obb|manifest|version|config|download/.test(s);
}

// ─────────────────────────────────────────────
//  §12  SESSION MANAGER
// ─────────────────────────────────────────────
function resetSession() {
  SESSION.state        = 0;
  SESSION.lockedIP     = null;
  SESSION.lockedNet    = null;
  SESSION.lockedProxy  = null;
  SESSION.ispA         = -1;
  SESSION.ispB         = -1;
  SESSION.ispC         = -1;
  SESSION.failCount    = 0;
  SESSION.lastActivity = 0;
}

function checkExpiry(t) {
  if (SESSION.state === 1 && SESSION.lastActivity > 0) {
    if (t - SESSION.lastActivity > SESSION_TTL_MS) resetSession();
    if (SESSION.failCount >= MAX_FAIL) resetSession();
  }
}

// ISP anti-drift: ±5 في octet B
function ispDrift(a, b, c) {
  if (SESSION.ispA === -1) return false;  // لم يُثبَّت بعد
  return a === SESSION.ispA &&
         Math.abs(b - SESSION.ispB) <= ISP_B_TOLERANCE;
}

// قفل الجلسة
function lockSession(ip, proxy) {
  var p = ip.split(".");
  SESSION.state        = 1;
  SESSION.lockedIP     = ip;
  SESSION.lockedNet    = net24(ip);
  SESSION.lockedProxy  = proxy;
  SESSION.ispA         = +p[0];
  SESSION.ispB         = +p[1];
  SESSION.ispC         = +p[2];
  SESSION.failCount    = 0;
}

// ─────────────────────────────────────────────
//  §13  FindProxyForURL — نقطة الدخول
// ─────────────────────────────────────────────
function FindProxyForURL(url, host) {
  host = norm((host || url || "").toLowerCase());

  // ══════════════════════════════════════════
  // [1]  CDN → DIRECT (قبل أي فحص)
  // ══════════════════════════════════════════
  if (isCDN(url, host)) return DIRECT;

  // ══════════════════════════════════════════
  // [2]  غير PUBG → DIRECT
  // ══════════════════════════════════════════
  if (!isPUBG(host)) return DIRECT;

  // ══════════════════════════════════════════
  // [3]  Host محلي بدون نقطة → BLOCK
  // ══════════════════════════════════════════
  if (isPlainHostName(host)) return BLOCK;

  // ══════════════════════════════════════════
  // [4]  Fast-Path: سيرفرات أردنية معروفة
  //      (بدون DNS — أسرع وأدق)
  // ══════════════════════════════════════════
  if (isKnownJO(host)) {
    var t0 = nowMs();
    SESSION.lastActivity = t0;
    if (isMatch(url, host)) {
      if (SESSION.state === 0) lockSession("0.0.0.0", MATCH_JO);
      return MATCH_JO;
    }
    return LOBBY_PROXY;
  }

  // ══════════════════════════════════════════
  // [5]  Resolve IPv4
  // ══════════════════════════════════════════
  var ip = resolveIPv4(host);

  // فشل DNS أو IPv6 → BLOCK للمباراة / LOBBY للباقي
  if (!ip) {
    if (isMatch(url, host)) return BLOCK;
    return LOBBY_PROXY;
  }

  // IPv6 → فحص prefix
  if (isIPv6(ip)) {
    if (isIPv6JO(ip)) return isMatch(url,host) ? MATCH_JO : LOBBY_PROXY;
    return BLOCK;
  }

  var t = nowMs();
  SESSION.lastActivity = t;
  checkExpiry(t);

  // ══════════════════════════════════════════
  // [6]  Far Region Block
  // ══════════════════════════════════════════
  if (isFarRegion(ip)) return BLOCK;

  // ══════════════════════════════════════════
  // [7]  MATCH TRAFFIC — قفل ISP صارم
  // ══════════════════════════════════════════
  if (isMatch(url, host)) {

    // ليس أردنياً بيور → BLOCK
    if (!isJordanMatch(ip)) {
      SESSION.failCount++;
      return BLOCK;
    }

    var net = net24(ip);
    var p   = ip.split(".");
    var a   = +p[0], b = +p[1], c = +p[2];

    // جلسة جديدة → اقفل
    if (SESSION.state === 0) {
      lockSession(ip, MATCH_JO);
      return MATCH_JO;
    }

    // نفس الـ IP المقفول → قبول مباشر
    if (ip === SESSION.lockedIP) {
      SESSION.failCount = 0;
      return SESSION.lockedProxy;
    }

    // نفس الـ /24 → قبول (server hot-swap)
    if (net === SESSION.lockedNet) {
      SESSION.lockedIP  = ip;
      SESSION.failCount = 0;
      return SESSION.lockedProxy;
    }

    // نفس ISP (anti-drift ±5 octet B) → قبول محدود
    if (ispDrift(a, b, c)) {
      SESSION.lockedNet = net;
      SESSION.lockedIP  = ip;
      SESSION.failCount = 0;
      return SESSION.lockedProxy;
    }

    // شبكة مختلفة + ISP مختلف → BLOCK
    SESSION.failCount++;
    return BLOCK;
  }

  // ══════════════════════════════════════════
  // [8]  LOBBY / SOCIAL
  // ══════════════════════════════════════════
  if (isLobby(url, host)) {
    if (!isJordanWide(ip)) return BLOCK;
    return LOBBY_PROXY;
  }

  // ══════════════════════════════════════════
  // [9]  PUBG عام غير مصنَّف
  // ══════════════════════════════════════════
  if (isJordanWide(ip)) return LOBBY_PROXY;
  return BLOCK;
}
