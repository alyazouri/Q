// ============================================================
// PUBG JORDAN LOCK - IPv4 + IPv6 SUPPORT
// Enhanced with Jordan ISPs IPv4 Ranges
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  ispNet:   null,
  lobbyNet: null,
  matchNet: null,
  inMatch:  false
};

// ============== IP UTILITIES ==============

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function isIPv4(ip) {
  return ip && /^\d+\.\d+\.\d+\.\d+$/.test(ip);
}

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1) return address;
  var parts = address.split("::");
  var full = [];
  if (parts.length === 2) {
    var left  = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }
  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4) full[j] = "0" + full[j];
  }
  return full.join(":").toLowerCase();
}

// ============== IPv4 RANGE CHECK ==============
// مقارنة نطاقات IPv4 (CIDR-like)
// ipLong يحوّل الـ IP إلى رقم صحيح

function ipToLong(ip) {
  var parts = ip.split(".");
  return ((parseInt(parts[0]) << 24) +
          (parseInt(parts[1]) << 16) +
          (parseInt(parts[2]) << 8) +
           parseInt(parts[3])) >>> 0;
}

function ipInRange(ip, rangeStart, rangeEnd) {
  var long = ipToLong(ip);
  return long >= ipToLong(rangeStart) && long <= ipToLong(rangeEnd);
}

// ============== JORDAN IPv4 RANGES ==============

function isJordanIPv4(ip) {

  // --- Orange Jordan (نجمة) ---
  if (ipInRange(ip, "46.185.0.0",   "46.185.255.255")) return true;
  if (ipInRange(ip, "188.247.0.0",  "188.247.255.255")) return true;
  if (ipInRange(ip, "176.28.0.0",   "176.29.255.255")) return true;
  if (ipInRange(ip, "185.69.4.0",   "185.69.7.255"))   return true;
  if (ipInRange(ip, "212.118.0.0",  "212.118.31.255"))  return true;
  if (ipInRange(ip, "37.35.0.0",    "37.35.127.255"))   return true;
  if (ipInRange(ip, "82.212.64.0",  "82.212.127.255"))  return true;

  // --- Zain Jordan ---
  if (ipInRange(ip, "5.44.240.0",   "5.44.243.255"))   return true;
  if (ipInRange(ip, "37.123.128.0", "37.123.191.255"))  return true;
  if (ipInRange(ip, "185.21.240.0", "185.21.243.255"))  return true;
  if (ipInRange(ip, "185.43.108.0", "185.43.111.255"))  return true;
  if (ipInRange(ip, "91.228.128.0", "91.228.143.255"))  return true;
  if (ipInRange(ip, "31.201.0.0",   "31.201.63.255"))   return true;

  // --- Umniah ---
  if (ipInRange(ip, "178.171.0.0",  "178.171.63.255"))  return true;
  if (ipInRange(ip, "188.247.128.0","188.247.255.255")) return true;
  if (ipInRange(ip, "78.110.96.0",  "78.110.127.255"))  return true;
  if (ipInRange(ip, "94.249.64.0",  "94.249.127.255"))  return true;
  if (ipInRange(ip, "185.109.184.0","185.109.187.255")) return true;

  // --- Jordan Telecom (MyNet / Orange DSL) ---
  if (ipInRange(ip, "212.118.32.0", "212.118.63.255"))  return true;
  if (ipInRange(ip, "80.10.0.0",    "80.10.255.255"))   return true;
  if (ipInRange(ip, "89.186.0.0",   "89.186.31.255"))   return true;

  // --- Damamax / Linkdotnet Jordan ---
  if (ipInRange(ip, "87.236.184.0", "87.236.191.255"))  return true;
  if (ipInRange(ip, "185.131.20.0", "185.131.23.255"))  return true;

  // --- Other Jordan Ranges ---
  if (ipInRange(ip, "92.61.0.0",    "92.61.15.255"))    return true;
  if (ipInRange(ip, "109.110.64.0", "109.110.127.255")) return true;

  return false;
}

// ============== JORDAN IPv6 RANGES ==============

function isJordanIPv6(ip) {
  ip = expandIPv6(ip);
  return (
    ip.startsWith("2a01:9700:3f00:") ||
    ip.startsWith("2a01:9700:4000:") ||
    ip.startsWith("2a01:9700:4100:") ||
    ip.startsWith("2a01:9700:4200:") ||
    ip.startsWith("2a01:9700:4300:") ||
    ip.startsWith("2a01:9700:4400:") ||
    ip.startsWith("2a01:9700:4500:") ||
    ip.startsWith("2a02:2e8:")       ||
    ip.startsWith("2a03:6880:")      ||
    ip.startsWith("2a02:fe0:")       ||
    ip.startsWith("2a04:b540:")
  );
}

// ============== MASTER JORDAN CHECK ==============

function isJordan(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return isJordanIPv6(ip);
  if (isIPv4(ip)) return isJordanIPv4(ip);
  return false;
}

// ============== PUBG DETECTION ==============

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proximabeta/i.test(h + u);
}

// ============== COUNTRY BLOCKS (IPv4 + IPv6) ==============

function isBlockedIPv4(ip) {
  // --- Iran ---
  if (ipInRange(ip, "2.144.0.0",   "2.147.255.255"))   return true;
  if (ipInRange(ip, "5.22.0.0",    "5.23.255.255"))     return true;
  if (ipInRange(ip, "37.98.0.0",   "37.99.255.255"))    return true;
  if (ipInRange(ip, "37.156.0.0",  "37.156.255.255"))   return true;
  if (ipInRange(ip, "77.36.0.0",   "77.39.255.255"))    return true;
  if (ipInRange(ip, "78.38.0.0",   "78.39.255.255"))    return true;
  if (ipInRange(ip, "95.38.0.0",   "95.39.255.255"))    return true;
  if (ipInRange(ip, "109.110.0.0", "109.110.63.255"))   return true;
  if (ipInRange(ip, "178.173.0.0", "178.173.255.255"))  return true;
  if (ipInRange(ip, "185.8.232.0", "185.8.235.255"))    return true;

  // --- Pakistan ---
  if (ipInRange(ip, "39.32.0.0",   "39.63.255.255"))   return true;
  if (ipInRange(ip, "39.40.0.0",   "39.49.255.255"))    return true;
  if (ipInRange(ip, "103.25.200.0","103.25.203.255"))   return true;
  if (ipInRange(ip, "103.50.0.0",  "103.50.3.255"))     return true;
  if (ipInRange(ip, "111.68.0.0",  "111.69.255.255"))   return true;
  if (ipInRange(ip, "115.186.0.0", "115.187.255.255"))  return true;
  if (ipInRange(ip, "119.73.0.0",  "119.73.255.255"))   return true;
  if (ipInRange(ip, "175.107.0.0", "175.107.255.255"))  return true;
  if (ipInRange(ip, "202.83.160.0","202.83.191.255"))   return true;
  if (ipInRange(ip, "203.99.128.0","203.99.191.255"))   return true;

  // --- Afghanistan ---
  if (ipInRange(ip, "103.68.16.0", "103.68.19.255"))    return true;
  if (ipInRange(ip, "110.232.0.0", "110.232.63.255"))   return true;
  if (ipInRange(ip, "180.222.128.0","180.222.255.255")) return true;
  if (ipInRange(ip, "202.174.128.0","202.174.159.255")) return true;
  if (ipInRange(ip, "203.112.160.0","203.112.191.255")) return true;

  // --- Libya ---
  if (ipInRange(ip, "41.208.64.0", "41.208.127.255"))   return true;
  if (ipInRange(ip, "41.223.32.0", "41.223.47.255"))    return true;
  if (ipInRange(ip, "196.1.64.0",  "196.1.95.255"))     return true;

  // --- India ---
  if (ipInRange(ip, "103.21.124.0","103.21.127.255"))   return true;
  if (ipInRange(ip, "106.51.0.0",  "106.51.255.255"))   return true;
  if (ipInRange(ip, "110.224.0.0", "110.239.255.255"))  return true;
  if (ipInRange(ip, "182.64.0.0",  "182.79.255.255"))   return true;
  if (ipInRange(ip, "223.176.0.0", "223.191.255.255"))  return true;
  if (ipInRange(ip, "49.32.0.0",   "49.63.255.255"))    return true;

  // --- Iraq ---
  if (ipInRange(ip, "37.236.0.0",  "37.239.255.255"))   return true;
  if (ipInRange(ip, "37.34.0.0",   "37.35.255.255"))    return true;
  if (ipInRange(ip, "46.185.128.0","46.185.255.255"))   return true; // Not Jordan
  if (ipInRange(ip, "78.100.0.0",  "78.100.255.255"))   return true;

  // --- Syria ---
  if (ipInRange(ip, "5.1.0.0",     "5.1.31.255"))       return true;
  if (ipInRange(ip, "31.170.0.0",  "31.170.127.255"))   return true;
  if (ipInRange(ip, "82.137.0.0",  "82.137.191.255"))   return true;
  if (ipInRange(ip, "178.52.0.0",  "178.52.255.255"))   return true;

  // --- Aruba (مزرعات السيرفرات) ---
  if (ipInRange(ip, "188.42.0.0",  "188.42.255.255"))   return true;
  if (ipInRange(ip, "185.180.0.0", "185.180.255.255"))  return true;
  if (ipInRange(ip, "45.89.120.0", "45.89.127.255"))    return true;

  // --- OVH/Hetzner/Data Centers ---
  if (ipInRange(ip, "51.38.0.0",   "51.38.255.255"))    return true;
  if (ipInRange(ip, "51.77.0.0",   "51.77.255.255"))    return true;
  if (ipInRange(ip, "167.114.0.0", "167.114.255.255"))  return true;
  if (ipInRange(ip, "176.9.0.0",   "176.9.255.255"))    return true;

  return false;
}

function isBlockedIPv6(ip) {
  ip = expandIPv6(ip);
  // Aruba
  if (ip.startsWith("2a00:1450:") || ip.startsWith("2a00:bdc0:") ||
      ip.startsWith("2a00:13c0:") || ip.startsWith("2a00:1fa0:")) return true;
  // Iran
  if (ip.startsWith("2a00:1a60:") || ip.startsWith("2a00:1b20:") ||
      ip.startsWith("2a01:5ec0:") || ip.startsWith("2a03:3b40:")) return true;
  // Pakistan
  if (ip.startsWith("2401:4900:") || ip.startsWith("2407:")) return true;
  // Afghanistan
  if (ip.startsWith("2400:3c00:") || ip.startsWith("2400:4f00:")) return true;
  // Libya
  if (ip.startsWith("2c0f:f248:") || ip.startsWith("2c0f:f7c0:")) return true;
  return false;
}

function isBlocked(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return isBlockedIPv6(ip);
  if (isIPv4(ip)) return isBlockedIPv4(ip);
  return false;
}

// ============== LOBBY / MATCH DETECTION ==============

function getIPSegment(ip, depth) {
  if (isIPv6(ip)) {
    var eip = expandIPv6(ip).split(":");
    return eip.slice(0, depth).join(":");
  }
  if (isIPv4(ip)) {
    var parts = ip.split(".");
    return parts.slice(0, depth).join(".");
  }
  return "";
}

// ============== MAIN ==============

function FindProxyForURL(url, host) {

  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host, url))    return DIRECT;

  // لا يوجد IP -> محاولة عبر البروكسي مباشرة
  if (!ip) return PROXY;

  // --- الدول المحظورة ---
  if (isBlocked(ip)) return BLOCK;

  // --- الأردن فقط ---
  if (!isJordan(ip)) return BLOCK;

  var data = (host + url).toLowerCase();

  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);

  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);

  // --- ISP & Segment Tracking ---
  var depth = isIPv6(ip) ? 3 : 2;
  var ispSeg   = getIPSegment(ip, depth);
  var lobbySeg = getIPSegment(ip, isIPv6(ip) ? 3 : 2);
  var matchSeg = getIPSegment(ip, isIPv6(ip) ? 4 : 3);

  if (!isMatch && SESSION.inMatch) {
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  // --- LOBBY ---
  if (isLobby) {
    if (!SESSION.ispNet) SESSION.ispNet = ispSeg;
    if (ispSeg !== SESSION.ispNet) return BLOCK;
    if (!SESSION.lobbyNet) SESSION.lobbyNet = lobbySeg;
    return PROXY;
  }

  // --- MATCH ---
  if (isMatch) {
    if (!SESSION.matchNet) {
      if (!SESSION.ispNet) SESSION.ispNet = ispSeg;
      if (ispSeg !== SESSION.ispNet) return BLOCK;
      SESSION.matchNet = matchSeg;
      SESSION.inMatch  = true;
      return PROXY;
    }
    if (ispSeg !== SESSION.ispNet)  return BLOCK;
    if (matchSeg !== SESSION.matchNet) return BLOCK;
    return PROXY;
  }

  return PROXY;
}
