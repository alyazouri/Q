// ============================================================
//  JORDAN PUBG MOBILE — IPv6/48 STRICT LOCK v7.0
//  IPv6 ONLY — Exact Prefix Lock
//  Match: /64
//  Lobby: /48
//  Only Listed Jordan IPv6 Prefixes Allowed
//  Source: RIPE NCC Official Data (Updated: 2026-02-23)
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// SESSION STATE
// ============================================================
var SESSION = {
  matchNet:  null,
  matchHost: null,
  lobbyNet:  null
};

// ============================================================
// PRIORITY
// ============================================================
var PRIORITY = {

  CRITICAL: /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|wow|cheer|training|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|war|sniper|quickmatch|arcade|battlefield|clash|gunfight|dispatch|ingame|gaming|realtime|gamesvr|gsvoice|relay/i,

  SECURITY:  /anticheat|verify|shield|security|ban|compliance|safeguard|integrity/i,

  LOBBY:     /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|news|patch|update|cdn|asset|config|feedback/i
};

// ============================================================
// EXCLUSIONS
// ============================================================
function isYouTube(h) {
  return shExpMatch(h, "*.youtube.com") ||
         shExpMatch(h, "*.googlevideo.com") ||
         shExpMatch(h, "*.ytimg.com") ||
         shExpMatch(h, "*.youtube-nocookie.com") ||
         shExpMatch(h, "youtu.be");
}

function isGitHub(h) {
  return shExpMatch(h, "github.com") ||
         shExpMatch(h, "*.github.com") ||
         shExpMatch(h, "*.githubusercontent.com") ||
         shExpMatch(h, "*.githubassets.com") ||
         shExpMatch(h, "api.github.com");
}

// ============================================================
// JORDAN IPv6 PREFIXES (RIPE NCC Official - 2026-02-23)
// All prefixes are /48 blocks for strict matching
// ============================================================
var JORDAN_IPV6_PREFIXES = [
  // ============ Orange Jordan (Jordan Data Communications) ============
  // 2a01:9700::/29 - Orange Jordan Main Allocation (2011-03-09)
  "2a01:9700:0", "2a01:9700:1", "2a01:9700:2", "2a01:9700:3",
  "2a01:9700:4", "2a01:9700:5", "2a01:9700:6", "2a01:9700:7",
  
  // Orange Jordan /48 sub-prefixes (from screenshots & real data)
  "2a01:9700:10", "2a01:9700:11", "2a01:9700:12", "2a01:9700:13",
  "2a01:9700:14", "2a01:9700:15", "2a01:9700:16", "2a01:9700:17",
  "2a01:9700:17", "2a01:9700:18", "2a01:9700:19", "2a01:9700:1a",
  "2a01:9700:1b", "2a01:9700:1c", "2a01:9700:1d", "2a01:9700:1e",
  "2a01:9700:1f",
  
  "2a01:9700:31", "2a01:9700:32", "2a01:9700:33", "2a01:9700:34",
  "2a01:9700:35", "2a01:9700:38", "2a01:9700:39", "2a01:9700:3a",
  "2a01:9700:3b", "2a01:9700:3c", "2a01:9700:3d", "2a01:9700:3e",
  "2a01:9700:3f",
  
  "2a01:9700:40", "2a01:9700:41", "2a01:9700:42", "2a01:9700:43",
  "2a01:9700:44", "2a01:9700:45", "2a01:9700:46", "2a01:9700:47",
  "2a01:9700:48", "2a01:9700:49", "2a01:9700:4a", "2a01:9700:4b",
  "2a01:9700:4c", "2a01:9700:4d", "2a01:9700:4e", "2a01:9700:4f",
  
  "2a01:9700:50", "2a01:9700:51", "2a01:9700:52", "2a01:9700:53",
  "2a01:9700:54", "2a01:9700:55", "2a01:9700:56", "2a01:9700:57",
  "2a01:9700:58", "2a01:9700:59", "2a01:9700:5a", "2a01:9700:5b",
  "2a01:9700:5c", "2a01:9700:5e",
  
  "2a01:9700:60", "2a01:9700:61", "2a01:9700:62", "2a01:9700:63",
  "2a01:9700:64", "2a01:9700:65", "2a01:9700:67", "2a01:9700:68",
  "2a01:9700:69", "2a01:9700:6a", "2a01:9700:6b", "2a01:9700:6c",
  "2a01:9700:6e",
  
  "2a01:9700:70", "2a01:9700:71", "2a01:9700:72", "2a01:9700:73",
  "2a01:9700:74", "2a01:9700:75", "2a01:9700:76", "2a01:9700:7a",
  
  "2a01:9700:80", "2a01:9700:81", "2a01:9700:84", "2a01:9700:85",
  "2a01:9700:86",
  
  "2a01:9700:90", "2a01:9700:91", "2a01:9700:92", "2a01:9700:93",
  "2a01:9700:94",
  
  // ============ Zain Jordan ============
  // 2a03:6b00::/29 - Zain Jordan (2011-04-06)
  "2a03:6b0",    // /48 prefix for 2a03:6b00::/29
  "2a03:6b00", "2a03:6b01", "2a03:6b02", "2a03:6b03",
  "2a03:6b04", "2a03:6b05", "2a03:6b06", "2a03:6b07",
  "2a03:6b02:20", // Specific Zain prefixes
  
  // 2a03:6d00::/32 - Zain Jordan (2011-04-06)
  "2a03:6d0",
  "2a03:6d00",
  
  // ============ Jordan Telecom / Orange Fixed ============
  // 2a00:18d0::/32 - Jordan Telecom (2009-12-22)
  "2a00:18d0",
  
  // 2a00:18d8::/29 - Jordan Telecom (2009-12-23)
  "2a00:18d8", "2a00:18d9", "2a00:18da", "2a00:18db",
  "2a00:18dc", "2a00:18dd", "2a00:18de", "2a00:18df",
  
  // ============ Umniah ============
  // 2a02:9c0::/29 - Umniah (2009-02-04)
  "2a02:9c0", "2a02:9c1", "2a02:9c2", "2a02:9c3",
  "2a02:9c4", "2a02:9c5", "2a02:9c6", "2a02:9c7",
  
  // 2a04:6200::/29 - Umniah (2013-09-05)
  "2a04:620", "2a04:621", "2a04:622", "2a04:623",
  "2a04:624", "2a04:625", "2a04:626", "2a04:627",
  
  // ============ VTEL Jordan ============
  // 2a02:2558::/29 - VTEL (2010-10-05)
  "2a02:2558", "2a02:2559", "2a02:255a", "2a02:255b",
  "2a02:255c", "2a02:255d", "2a02:255e", "2a02:255f",
  
  // 2a02:25d8::/32 - VTEL (2010-10-12)
  "2a02:25d8",
  
  // ============ Other Jordan ISPs ============
  // 2a00:4620::/32 - (2013-02-21)
  "2a00:4620",
  
  // 2a00:76e0::/32 - (2013-04-22)
  "2a00:76e0",
  
  // 2a00:b860::/32 - (2013-07-18)
  "2a00:b860",
  
  // 2a00:caa0::/32 - (2013-08-14)
  "2a00:caa0",
  
  // 2a01:1d0::/29 - (2010-08-24)
  "2a01:1d0", "2a01:1d1", "2a01:1d2", "2a01:1d3",
  "2a01:1d4", "2a01:1d5", "2a01:1d6", "2a01:1d7",
  
  // 2a01:e240::/29 - NEW (2024-09-26)
  "2a01:e240", "2a01:e241", "2a01:e242", "2a01:e243",
  "2a01:e244", "2a01:e245", "2a01:e246", "2a01:e247",
  
  // 2a01:ee40::/29 - NEW (2024-10-14)
  "2a01:ee40", "2a01:ee41", "2a01:ee42", "2a01:ee43",
  "2a01:ee44", "2a01:ee45", "2a01:ee46", "2a01:ee47",
  
  // 2a02:5b60::/32 - (2014-05-13)
  "2a02:5b60",
  
  // 2a02:c040::/29 - (2015-03-26)
  "2a02:c040", "2a02:c041", "2a02:c042", "2a02:c043",
  "2a02:c044", "2a02:c045", "2a02:c046", "2a02:c047",
  
  // 2a02:e680::/29 - (2012-11-21)
  "2a02:e680", "2a02:e681", "2a02:e682", "2a02:e683",
  "2a02:e684", "2a02:e685", "2a02:e686", "2a02:e687",
  
  // 2a02:f0c0::/29 - (2012-12-05)
  "2a02:f0c0", "2a02:f0c1", "2a02:f0c2", "2a02:f0c3",
  "2a02:f0c4", "2a02:f0c5", "2a02:f0c6", "2a02:f0c7",
  
  // 2a03:b640::/32 - (2013-01-03)
  "2a03:b640",
  
  // 2a05:74c0::/29 - (2014-12-02)
  "2a05:74c0", "2a05:74c1", "2a05:74c2", "2a05:74c3",
  "2a05:74c4", "2a05:74c5", "2a05:74c6", "2a05:74c7",
  
  // 2a05:7500::/29 - (2014-12-02)
  "2a05:7500", "2a05:7501", "2a05:7502", "2a05:7503",
  "2a05:7504", "2a05:7505", "2a05:7506", "2a05:7507",
  
  // 2a06:9bc0::/29 - (2021-05-27)
  "2a06:9bc0", "2a06:9bc1", "2a06:9bc2", "2a06:9bc3",
  "2a06:9bc4", "2a06:9bc5", "2a06:9bc6", "2a06:9bc7",
  
  // 2a06:bd80::/29 - NEW (2025-05-21)
  "2a06:bd80", "2a06:bd81", "2a06:bd82", "2a06:bd83",
  "2a06:bd84", "2a06:bd85", "2a06:bd86", "2a06:bd87",
  
  // 2a07:140::/29 - (2016-02-03)
  "2a07:140", "2a07:141", "2a07:142", "2a07:143",
  "2a07:144", "2a07:145", "2a07:146", "2a07:147",
  
  // 2a0a:2740::/29 - (2017-02-28)
  "2a0a:2740", "2a0a:2741", "2a0a:2742", "2a0a:2743",
  "2a0a:2744", "2a0a:2745", "2a0a:2746", "2a0a:2747",
  
  // 2a0c:39c0::/29 - (2018-04-04)
  "2a0c:39c0", "2a0c:39c1", "2a0c:39c2", "2a0c:39c3",
  "2a0c:39c4", "2a0c:39c5", "2a0c:39c6", "2a0c:39c7",
  
  // 2a0d:cf40::/29 - (2021-02-01)
  "2a0d:cf40", "2a0d:cf41", "2a0d:cf42", "2a0d:cf43",
  "2a0d:cf44", "2a0d:cf45", "2a0d:cf46", "2a0d:cf47",
  
  // 2a10:1100::/29 - (2020-02-05)
  "2a10:1100", "2a10:1101", "2a10:1102", "2a10:1103",
  "2a10:1104", "2a10:1105", "2a10:1106", "2a10:1107",
  
  // 2a10:9740::/29 - (2021-02-19)
  "2a10:9740", "2a10:9741", "2a10:9742", "2a10:9743",
  "2a10:9744", "2a10:9745", "2a10:9746", "2a10:9747",
  
  // 2a10:d800::/29 - (2020-10-14)
  "2a10:d800", "2a10:d801", "2a10:d802", "2a10:d803",
  "2a10:d804", "2a10:d805", "2a10:d806", "2a10:d807",
  
  // 2a11:d180::/29 - (2021-09-02)
  "2a11:d180", "2a11:d181", "2a11:d182", "2a11:d183",
  "2a11:d184", "2a11:d185", "2a11:d186", "2a11:d187",
  
  // 2a13:1f00::/29 - (2022-07-04)
  "2a13:1f00", "2a13:1f01", "2a13:1f02", "2a13:1f03",
  "2a13:1f04", "2a13:1f05", "2a13:1f06", "2a13:1f07",
  
  // 2a13:5c00::/29 - (2022-06-10)
  "2a13:5c00", "2a13:5c01", "2a13:5c02", "2a13:5c03",
  "2a13:5c04", "2a13:5c05", "2a13:5c06", "2a13:5c07",
  
  // 2a13:8d40::/29 - (2023-07-10)
  "2a13:8d40", "2a13:8d41", "2a13:8d42", "2a13:8d43",
  "2a13:8d44", "2a13:8d45", "2a13:8d46", "2a13:8d47",
  
  // 2a14:1a40::/29 - (2024-03-12)
  "2a14:1a40", "2a14:1a41", "2a14:1a42", "2a14:1a43",
  "2a14:1a44", "2a14:1a45", "2a14:1a46", "2a14:1a47",
  
  // 2a14:2840::/29 - (2024-03-21)
  "2a14:2840", "2a14:2841", "2a14:2842", "2a14:2843",
  "2a14:2844", "2a14:2845", "2a14:2846", "2a14:2847",
  
  // 2001:32c0::/29 - NEW (2024-09-09)
  "2001:32c0", "2001:32c1", "2001:32c2", "2001:32c3",
  "2001:32c4", "2001:32c5", "2001:32c6", "2001:32c7",
  
  // 2001:67c:2124::/48 - Assigned (2021-05-19)
  "2001:67c:2124"
];

// ============================================================
// HELPERS
// ============================================================
function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function normalizeIPv6(ip) {
  // Normalize IPv6 for comparison
  if (!ip) return "";
  var ipLow = ip.toLowerCase();
  
  // Handle :: expansion
  if (ipLow.indexOf("::") !== -1) {
    var parts = ipLow.split("::");
    var left = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var zeros = [];
    for (var i = 0; i < 8 - left.length - right.length; i++) {
      zeros.push("0");
    }
    ipLow = left.concat(zeros).concat(right).join(":");
  }
  
  // Pad each segment to 4 chars
  var segments = ipLow.split(":");
  for (var j = 0; j < segments.length; j++) {
    while (segments[j].length < 4) {
      segments[j] = "0" + segments[j];
    }
  }
  return segments.join(":");
}

function getPrefix48(ip) {
  // Extract /48 prefix from IPv6 address
  var normalized = normalizeIPv6(ip);
  if (!normalized) return "";
  
  var parts = normalized.split(":");
  // /48 = first 3 segments (48 bits = 3 x 16 bits)
  return parts[0] + ":" + parts[1] + ":" + parts[2];
}

function getPrefix64(ip) {
  // Extract /64 prefix from IPv6 address
  var normalized = normalizeIPv6(ip);
  if (!normalized) return "";
  
  var parts = normalized.split(":");
  // /64 = first 4 segments
  return parts[0] + ":" + parts[1] + ":" + parts[2] + ":" + parts[3];
}

function isJordanIPv6(ip) {
  if (!isIPv6(ip)) return false;
  
  var prefix48 = getPrefix48(ip);
  if (!prefix48) return false;
  
  var prefixLower = prefix48.toLowerCase();
  
  // Check against all Jordan prefixes
  for (var i = 0; i < JORDAN_IPV6_PREFIXES.length; i++) {
    var allowed = JORDAN_IPV6_PREFIXES[i].toLowerCase();
    if (prefixLower.indexOf(allowed) === 0 || allowed.indexOf(prefixLower.substring(0, allowed.length)) === 0) {
      return true;
    }
  }
  
  return false;
}

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

// ============================================================
// MAIN
// ============================================================
function FindProxyForURL(url, host) {

  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // Local
  if (isPlainHostName(host)) return DIRECT;

  // Exclusions
  if (isYouTube(host)) return DIRECT;
  if (isGitHub(host)) return DIRECT;

  // Non PUBG → Direct
  if (!isPUBG(host, url)) return DIRECT;

  // Block IPv4 - IPv6 ONLY
  if (!ip || !isIPv6(ip)) return BLOCK;

  // Block if not Jordan IPv6
  if (!isJordanIPv6(ip)) return BLOCK;

  var data = (host + url).toLowerCase();

  var isCritical = PRIORITY.CRITICAL.test(data);
  var isSecurity = PRIORITY.SECURITY.test(data);
  var isLobby    = PRIORITY.LOBBY.test(data);

  // ===== MATCH / SECURITY → /64 lock =====
  if (isCritical || isSecurity) {

    var net64 = getPrefix64(ip);

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net64;
      SESSION.matchHost = host;
      return PROXY;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net64 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // ===== LOBBY → /48 lock =====
  if (isLobby) {

    var net48 = getPrefix48(ip);

    if (!SESSION.lobbyNet) {
      SESSION.lobbyNet = net48;
      return PROXY;
    }

    if (net48 !== SESSION.lobbyNet) return BLOCK;

    return PROXY;
  }

  return PROXY;
}
