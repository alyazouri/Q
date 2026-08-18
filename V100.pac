// ============================================================
// ALYAZOURI — GAME BOOSTER ALPHA v3.0
// PUBG MOBILE GLOBAL — JORDAN NETWORK ROUTER
// IPv4 + IPv6 + ASN Priority + Proxy Pool
// ============================================================

var CONFIG = {

  // ==========================================================
  // PROXY POOL
  // ==========================================================

  PROXIES: [
    "PROXY 46.32.102.8:80",
    "PROXY 176.29.176.46:80",
    "PROXY 77.245.13.126:80"
  ],

  MATCH_PROXY: "PROXY 46.32.102.8:80",

  VOICE_PROXY: "PROXY 46.32.102.8:80",

  LOBBY_PROXY: "PROXY 176.29.176.46:80",

  FALLBACK_PROXY: "PROXY 77.245.13.126:80",

  DIRECT: "DIRECT",

  BLOCK: "PROXY 127.0.0.1:9",

  // ==========================================================
  // PERFORMANCE
  // ==========================================================

  DNS_CACHE_TIME: 600000,

  STICKY_SESSION_TIME: 1800000,

  ENABLE_IPV4: true,

  ENABLE_IPV6: true,

  ENABLE_JORDAN_ONLY_MODE: true,

  ENABLE_PROXY_FAILOVER: true,

  ENABLE_SESSION_LOCK: true
};


// ============================================================
// JORDAN NETWORK DATABASE
// ============================================================

var JORDAN_NETWORKS = [

  // ==========================================================
  // ZAIN JORDAN
  // ASN 48832
  // ==========================================================

  {
    asn: 48832,

    name: "Zain Jordan",

    country: "JO",

    priority: 100,

    ipv4: [
      "46.32.96.0/19"
    ],

    ipv6: [
      "2a03:6b00::/40",
      "2a03:6b01::/34",
      "2a03:6b01:4000::/34",
      "2a03:6b01:8000::/34",
      "2a03:6b02:2000::/48"
    ]
  },


  // ==========================================================
  // ORANGE JORDAN
  // ASN 8697
  // ==========================================================

  {
    asn: 8697,

    name: "Orange Jordan",

    country: "JO",

    priority: 95,

    ipv4: [
      "212.34.0.0/19"
    ],

    ipv6: []
  },


  // ==========================================================
  // DAMAMAX / NEUTELECOM
  // ASN 47887
  // ==========================================================

  {
    asn: 47887,

    name: "Damamax / Neutelecom",

    country: "JO",

    priority: 85,

    ipv4: [
      "81.28.112.0/20"
    ],

    ipv6: []
  },


  // ==========================================================
  // ZAIN JORDAN
  // ASN 42912
  // ==========================================================

  {
    asn: 42912,

    name: "Zain Jordan",

    country: "JO",

    priority: 100,

    ipv4: [
      "178.77.148.0/24",
      "178.77.149.0/24",
      "178.77.150.0/24",
      "178.77.151.0/24",
      "178.77.154.0/24",
      "178.77.155.0/24"
    ],

    ipv6: []
  }
];


// ============================================================
// SESSION ENGINE
// ============================================================

var SESSION = {

  match: {
    hostname: null,
    ip: null,
    network: null,
    asn: null,
    proxy: null,
    startTime: 0,
    locked: false
  },

  dns: {},

  counters: {
    match: 0,
    lobby: 0,
    voice: 0,
    social: 0,
    cdn: 0,
    direct: 0,
    blocked: 0
  }
};


// ============================================================
// BASIC HELPERS
// ============================================================

function cleanHost(host) {

  if (!host) {
    return "";
  }

  var colon = host.indexOf(":");

  if (colon !== -1) {
    return host.substring(0, colon).toLowerCase();
  }

  return host.toLowerCase();
}


// ============================================================
// IPv4 PARSER
// ============================================================

function ipv4ToInt(ip) {

  var parts = ip.split(".");

  if (parts.length !== 4) {
    return -1;
  }

  var a = parseInt(parts[0], 10);
  var b = parseInt(parts[1], 10);
  var c = parseInt(parts[2], 10);
  var d = parseInt(parts[3], 10);

  if (
    isNaN(a) ||
    isNaN(b) ||
    isNaN(c) ||
    isNaN(d) ||
    a < 0 || a > 255 ||
    b < 0 || b > 255 ||
    c < 0 || c > 255 ||
    d < 0 || d > 255
  ) {
    return -1;
  }

  return (
    ((a << 24) >>> 0) +
    (b << 16) +
    (c << 8) +
    d
  ) >>> 0;
}


// ============================================================
// IPv4 CIDR MATCH
// ============================================================

function ipv4InCIDR(ip, cidr) {

  if (!ip || !cidr) {
    return false;
  }

  var parts = cidr.split("/");

  if (parts.length !== 2) {
    return false;
  }

  var network = ipv4ToInt(parts[0]);

  var target = ipv4ToInt(ip);

  var prefix = parseInt(parts[1], 10);

  if (
    network === -1 ||
    target === -1 ||
    isNaN(prefix) ||
    prefix < 0 ||
    prefix > 32
  ) {
    return false;
  }

  if (prefix === 0) {
    return true;
  }

  var mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;

  return ((target & mask) >>> 0) ===
         ((network & mask) >>> 0);
}


// ============================================================
// IPv6 NORMALIZATION
// ============================================================

function normalizeIPv6(ip) {

  if (!ip || ip.indexOf(":") === -1) {
    return null;
  }

  var zone = ip.indexOf("%");

  if (zone !== -1) {
    ip = ip.substring(0, zone);
  }

  return ip.toLowerCase();
}


// ============================================================
// IPv6 -> 8 GROUPS
// ============================================================

function expandIPv6(ip) {

  ip = normalizeIPv6(ip);

  if (!ip) {
    return null;
  }

  var doubleColon = ip.indexOf("::");

  var left = [];

  var right = [];

  if (doubleColon !== -1) {

    var leftPart = ip.substring(0, doubleColon);

    var rightPart = ip.substring(doubleColon + 2);

    if (leftPart) {
      left = leftPart.split(":");
    }

    if (rightPart) {
      right = rightPart.split(":");
    }

    var missing = 8 - left.length - right.length;

    if (missing < 1) {
      return null;
    }

    var groups = [];

    var i;

    for (i = 0; i < left.length; i++) {
      groups.push(left[i]);
    }

    for (i = 0; i < missing; i++) {
      groups.push("0");
    }

    for (i = 0; i < right.length; i++) {
      groups.push(right[i]);
    }

    return groups;
  }

  var normal = ip.split(":");

  if (normal.length !== 8) {
    return null;
  }

  return normal;
}


// ============================================================
// IPv6 CIDR MATCH
// ============================================================

function ipv6InCIDR(ip, cidr) {

  if (!ip || !cidr) {
    return false;
  }

  var parts = cidr.split("/");

  if (parts.length !== 2) {
    return false;
  }

  var target = expandIPv6(ip);

  var network = expandIPv6(parts[0]);

  var prefix = parseInt(parts[1], 10);

  if (
    !target ||
    !network ||
    isNaN(prefix) ||
    prefix < 0 ||
    prefix > 128
  ) {
    return false;
  }

  var remaining = prefix;

  var i;

  for (i = 0; i < 8; i++) {

    if (remaining <= 0) {
      return true;
    }

    var bits = remaining >= 16 ? 16 : remaining;

    var targetValue =
      parseInt(target[i], 16);

    var networkValue =
      parseInt(network[i], 16);

    if (bits === 16) {

      if (targetValue !== networkValue) {
        return false;
      }

    } else {

      var mask =
        (0xFFFF << (16 - bits)) & 0xFFFF;

      if (
        (targetValue & mask) !==
        (networkValue & mask)
      ) {
        return false;
      }
    }

    remaining -= bits;
  }

  return true;
}


// ============================================================
// FIND JORDAN NETWORK
// ============================================================

function findJordanNetwork(ip) {

  if (!ip) {
    return null;
  }

  var isIPv6 =
    ip.indexOf(":") !== -1;

  var best = null;

  var i;

  for (i = 0; i < JORDAN_NETWORKS.length; i++) {

    var network =
      JORDAN_NETWORKS[i];

    var ranges =
      isIPv6
        ? network.ipv6
        : network.ipv4;

    var j;

    for (j = 0; j < ranges.length; j++) {

      var matched =
        isIPv6
          ? ipv6InCIDR(ip, ranges[j])
          : ipv4InCIDR(ip, ranges[j]);

      if (matched) {

        if (
          best === null ||
          network.priority > best.priority
        ) {

          best = {
            asn: network.asn,
            name: network.name,
            country: network.country,
            priority: network.priority,
            range: ranges[j],
            ipVersion: isIPv6 ? 6 : 4
          };
        }
      }
    }
  }

  return best;
}


// ============================================================
// DNS CACHE
// ============================================================

function fastResolve(hostname) {

  var now =
    new Date().getTime();

  var cached =
    SESSION.dns[hostname];

  if (
    cached &&
    now - cached.time <
    CONFIG.DNS_CACHE_TIME
  ) {

    return cached.ip;
  }

  var resolved = null;

  try {

    resolved =
      dnsResolve(hostname);

  } catch (e) {

    resolved = null;
  }

  if (resolved) {

    SESSION.dns[hostname] = {
      ip: resolved,
      time: now
    };

    return resolved;
  }

  if (cached) {
    return cached.ip;
  }

  return null;
}


// ============================================================
// PUBG TRAFFIC
// ============================================================

function isPUBGTraffic(hostname) {

  var keywords = [

    "pubg",
    "pubgm",
    "pubgmobile",

    "tencent",
    "krafton",
    "proximabeta",

    "lightspeed",
    "quantum",

    "levelinfinite",

    "igame",
    "gameloop",

    "intl"

  ];

  var host =
    hostname.toLowerCase();

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      host.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// MATCH DETECTION
// ============================================================

function isMatchTraffic(url, host) {

  var combined =
    (url + host).toLowerCase();

  var keywords = [

    "match",
    "game",
    "battle",
    "combat",

    "realtime",
    "real-time",

    "sync",
    "live",

    "play",
    "arena",

    "room",
    "session",

    "server",
    "pvp",

    "versus",

    "matchmaking"

  ];

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      combined.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// LOBBY
// ============================================================

function isLobbyTraffic(url, host) {

  var combined =
    (url + host).toLowerCase();

  var keywords = [

    "lobby",
    "home",
    "main",

    "matchmaking",
    "queue",

    "dispatch",
    "gateway",
    "portal",

    "join",
    "connect",

    "waiting",
    "ready",

    "room",
    "party",
    "team",

    "profile",
    "account",
    "user",

    "stats",
    "history",

    "rank",
    "achievement",

    "region",
    "country",
    "location",

    "geo",
    "locale"

  ];

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      combined.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// VOICE
// ============================================================

function isVoiceTraffic(url, host) {

  var combined =
    (url + host).toLowerCase();

  var keywords = [

    "voice",
    "audio",
    "rtc",
    "webrtc",

    "agora",
    "voip",

    "mic",
    "sound",
    "talk",
    "chat"

  ];

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      combined.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// SOCIAL
// ============================================================

function isSocialTraffic(url, host) {

  var combined =
    (url + host).toLowerCase();

  var keywords = [

    "friend",
    "social",
    "squad",

    "team",
    "party",
    "clan",

    "guild",
    "group",

    "invite",
    "presence",

    "message",
    "notification"

  ];

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      combined.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// CDN
// ============================================================

function isCDNTraffic(url, host) {

  var combined =
    (url + host).toLowerCase();

  var keywords = [

    "cdn",
    "content",

    "asset",
    "resource",

    "static",
    "media",

    "download",
    "patch",

    "update",
    "file",

    "data"

  ];

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      combined.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// ANALYTICS
// ============================================================

function isAnalyticsTraffic(url, host) {

  var combined =
    (url + host).toLowerCase();

  var keywords = [

    "analytics",
    "telemetry",

    "metrics",
    "track",

    "beacon",
    "report",

    "crash",
    "monitor"

  ];

  var i;

  for (i = 0; i < keywords.length; i++) {

    if (
      combined.indexOf(keywords[i]) !== -1
    ) {
      return true;
    }
  }

  return false;
}


// ============================================================
// PROXY SELECTION
// ============================================================

function selectProxy(network) {

  if (!network) {

    return CONFIG.FALLBACK_PROXY;
  }

  // أعلى أولوية
  if (network.priority >= 100) {

    return CONFIG.MATCH_PROXY;
  }

  // Orange
  if (network.asn === 8697) {

    return CONFIG.LOBBY_PROXY;
  }

  // Damamax
  if (network.asn === 47887) {

    return CONFIG.FALLBACK_PROXY;
  }

  return CONFIG.LOBBY_PROXY;
}


// ============================================================
// PROXY FAILOVER
// ============================================================

function proxyChain(primary) {

  if (!CONFIG.ENABLE_PROXY_FAILOVER) {

    return primary;
  }

  return (
    primary +
    "; " +
    CONFIG.LOBBY_PROXY +
    "; " +
    CONFIG.FALLBACK_PROXY
  );
}


// ============================================================
// SESSION RESET
// ============================================================

function resetMatchSession() {

  SESSION.match.hostname = null;

  SESSION.match.ip = null;

  SESSION.match.network = null;

  SESSION.match.asn = null;

  SESSION.match.proxy = null;

  SESSION.match.startTime = 0;

  SESSION.match.locked = false;
}


// ============================================================
// MAIN PAC ENGINE
// ============================================================

function FindProxyForURL(url, host) {

  // ==========================================================
  // ALWAYS DIRECT
  // ==========================================================

  if (

    shExpMatch(
      host,
      "*.youtube.com"
    ) ||

    shExpMatch(
      host,
      "*.googlevideo.com"
    ) ||

    shExpMatch(
      host,
      "*.youtu.be"
    ) ||

    shExpMatch(
      host,
      "*.github.com"
    ) ||

    shExpMatch(
      host,
      "*.githubusercontent.com"
    )

  ) {

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // NORMALIZE
  // ==========================================================

  host =
    cleanHost(host);


  // ==========================================================
  // NON PUBG
  // ==========================================================

  if (!isPUBGTraffic(host)) {

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // DNS
  // ==========================================================

  var ip =
    fastResolve(host);


  if (!ip) {

    SESSION.counters.blocked++;

    return CONFIG.BLOCK;
  }


  // ==========================================================
  // IPV6 CONTROL
  // ==========================================================

  if (
    ip.indexOf(":") !== -1 &&
    !CONFIG.ENABLE_IPV6
  ) {

    SESSION.counters.blocked++;

    return CONFIG.BLOCK;
  }


  // ==========================================================
  // IPV4 CONTROL
  // ==========================================================

  if (
    ip.indexOf(":") === -1 &&
    !CONFIG.ENABLE_IPV4
  ) {

    SESSION.counters.blocked++;

    return CONFIG.BLOCK;
  }


  // ==========================================================
  // FIND JORDAN ASN / PREFIX
  // ==========================================================

  var jordanNetwork =
    findJordanNetwork(ip);


  // ==========================================================
  // JORDAN ONLY MODE
  // ==========================================================

  if (
    CONFIG.ENABLE_JORDAN_ONLY_MODE &&
    !jordanNetwork
  ) {

    // CDN stays direct
    if (
      isCDNTraffic(url, host)
    ) {

      SESSION.counters.cdn++;

      return CONFIG.DIRECT;
    }

    SESSION.counters.blocked++;

    return CONFIG.BLOCK;
  }


  // ==========================================================
  // MATCH TRAFFIC
  // ==========================================================

  if (
    isMatchTraffic(url, host)
  ) {

    SESSION.counters.match++;


    // يجب أن يكون السيرفر ضمن شبكة أردنية معروفة
    if (!jordanNetwork) {

      SESSION.counters.blocked++;

      return CONFIG.BLOCK;
    }


    var selectedProxy =
      selectProxy(jordanNetwork);


    // أول طلب للمباراة
    if (
      !SESSION.match.locked
    ) {

      SESSION.match.hostname =
        host;

      SESSION.match.ip =
        ip;

      SESSION.match.network =
        jordanNetwork.range;

      SESSION.match.asn =
        jordanNetwork.asn;

      SESSION.match.proxy =
        selectedProxy;

      SESSION.match.startTime =
        new Date().getTime();

      SESSION.match.locked =
        true;

      return proxyChain(
        selectedProxy
      );
    }


    // نفس السيرفر
    if (

      host === SESSION.match.hostname &&

      ip === SESSION.match.ip

    ) {

      return proxyChain(
        SESSION.match.proxy
      );
    }


    // نفس ASN / نفس الشبكة
    if (

      jordanNetwork.asn ===
      SESSION.match.asn

    ) {

      return proxyChain(
        SESSION.match.proxy
      );
    }


    // غير ذلك
    return CONFIG.BLOCK;
  }


  // ==========================================================
  // VOICE
  // ==========================================================

  if (
    isVoiceTraffic(url, host)
  ) {

    SESSION.counters.voice++;

    if (!jordanNetwork) {

      return CONFIG.DIRECT;
    }

    return proxyChain(
      CONFIG.VOICE_PROXY
    );
  }


  // ==========================================================
  // ACTIVE MATCH SESSION
  // ==========================================================

  if (
    SESSION.match.locked
  ) {

    var elapsed =
      new Date().getTime() -
      SESSION.match.startTime;


    if (
      elapsed <
      CONFIG.STICKY_SESSION_TIME
    ) {

      // CDN مباشر
      if (
        isCDNTraffic(url, host)
      ) {

        SESSION.counters.cdn++;

        return CONFIG.DIRECT;
      }


      // Analytics مباشر
      if (
        isAnalyticsTraffic(url, host)
      ) {

        SESSION.counters.direct++;

        return CONFIG.DIRECT;
      }


      // Social
      if (
        isSocialTraffic(url, host)
      ) {

        SESSION.counters.social++;

        return proxyChain(
          SESSION.match.proxy
        );
      }


      // باقي PUBG
      if (jordanNetwork) {

        return proxyChain(
          SESSION.match.proxy
        );
      }

      return CONFIG.BLOCK;

    } else {

      resetMatchSession();
    }
  }


  // ==========================================================
  // LOBBY
  // ==========================================================

  if (
    isLobbyTraffic(url, host)
  ) {

    SESSION.counters.lobby++;


    if (!jordanNetwork) {

      SESSION.counters.blocked++;

      return CONFIG.BLOCK;
    }


    var lobbyProxy =
      selectProxy(
        jordanNetwork
      );


    return proxyChain(
      lobbyProxy
    );
  }


  // ==========================================================
  // SOCIAL
  // ==========================================================

  if (
    isSocialTraffic(url, host)
  ) {

    SESSION.counters.social++;


    if (!jordanNetwork) {

      return CONFIG.BLOCK;
    }


    return proxyChain(
      selectProxy(
        jordanNetwork
      )
    );
  }


  // ==========================================================
  // CDN
  // ==========================================================

  if (
    isCDNTraffic(url, host)
  ) {

    SESSION.counters.cdn++;

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // ANALYTICS
  // ==========================================================

  if (
    isAnalyticsTraffic(url, host)
  ) {

    SESSION.counters.direct++;

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // GENERAL PUBG TRAFFIC
  // ==========================================================

  if (jordanNetwork) {

    return proxyChain(
      selectProxy(
        jordanNetwork
      )
    );
  }


  // ==========================================================
  // DEFAULT
  // ==========================================================

  SESSION.counters.blocked++;

  return CONFIG.BLOCK;
}


// ============================================================
// SESSION RESET
// ============================================================

function resetSession() {

  resetMatchSession();

  SESSION.dns = {};

  SESSION.counters.match = 0;

  SESSION.counters.lobby = 0;

  SESSION.counters.voice = 0;

  SESSION.counters.social = 0;

  SESSION.counters.cdn = 0;

  SESSION.counters.direct = 0;

  SESSION.counters.blocked = 0;
}


// ============================================================
// DEBUG / STATS
// ============================================================

function getSessionStats() {

  return {

    matchRequests:
      SESSION.counters.match,

    lobbyRequests:
      SESSION.counters.lobby,

    voiceRequests:
      SESSION.counters.voice,

    socialRequests:
      SESSION.counters.social,

    cdnRequests:
      SESSION.counters.cdn,

    directRequests:
      SESSION.counters.direct,

    blockedRequests:
      SESSION.counters.blocked,

    cacheSize:
      Object.keys(
        SESSION.dns
      ).length,

    matchLocked:
      SESSION.match.locked,

    matchASN:
      SESSION.match.asn,

    matchNetwork:
      SESSION.match.network,

    matchIP:
      SESSION.match.ip
  };
}
