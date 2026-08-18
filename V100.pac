// ============================================================
// GAME BOOSTER ALPHA v3.0
// Jordan Network Priority PAC
// IPv4 + IPv6 / ASN-based Network Profiles
// ============================================================

// ============================================================
// CONFIGURATION
// ============================================================

var CONFIG = {

  // ----------------------------------------------------------
  // PROXY POOL
  // ----------------------------------------------------------

  MATCH_TIER1: "PROXY 46.32.102.8:80",

  LOBBY_FAST: [
    "PROXY 46.32.102.8:80",
    "PROXY 176.29.176.46:80",
    "PROXY 77.245.13.126:80"
  ],

  VOICE_PROXY: "PROXY 46.32.102.8:80",

  CDN_DIRECT: "DIRECT",

  DIRECT: "DIRECT",

  BLOCK: "PROXY 127.0.0.1:9",

  // ----------------------------------------------------------
  // SESSION
  // ----------------------------------------------------------

  DNS_CACHE_TIME: 600000,
  STICKY_SESSION_TIME: 1800000,

  // لا تستخدم حظر عالمي واسع.
  // يتم الحظر فقط عندما يكون الطلب PUBG
  // والـIP غير مصنف ضمن الشبكات الأردنية.
  AGGRESSIVE_BLOCK: false,

  // IPv6 مفعّل
  ENABLE_IPV6: true,

  // أولوية الشبكات الأردنية
  JORDAN_ONLY_PRIORITY: true
};


// ============================================================
// JORDAN NETWORK DATABASE
// ============================================================

var JORDAN_NETWORKS = [

  // ==========================================================
  // ZAIN JORDAN
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
  // ZAIN JORDAN - ADDITIONAL PREFIXES
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
// SESSION STATE
// ============================================================

var SESSION = {

  match: {
    network: null,
    networkName: null,
    networkPriority: 0,
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
    jordanRequests: 0,
    nonJordanRequests: 0,
    blockedRequests: 0,
    directRequests: 0,
    ipv4Requests: 0,
    ipv6Requests: 0
  }
};


// ============================================================
// HOST CLEANER
// ============================================================

function cleanHost(host) {

  if (!host) {
    return "";
  }

  var colonPos = host.indexOf(":");

  if (colonPos === -1) {
    return host;
  }

  return host.substring(0, colonPos);
}


// ============================================================
// IPv4 UTILITIES
// ============================================================

function ipv4ToNumber(ip) {

  if (!ip) {
    return null;
  }

  var parts = ip.split(".");

  if (parts.length !== 4) {
    return null;
  }

  var a = parseInt(parts[0], 10);
  var b = parseInt(parts[1], 10);
  var c = parseInt(parts[2], 10);
  var d = parseInt(parts[3], 10);

  if (
    isNaN(a) ||
    isNaN(b) ||
    isNaN(c) ||
    isNaN(d)
  ) {
    return null;
  }

  if (
    a < 0 || a > 255 ||
    b < 0 || b > 255 ||
    c < 0 || c > 255 ||
    d < 0 || d > 255
  ) {
    return null;
  }

  return (
    (((a * 256) + b) * 256 + c) * 256 + d
  );
}


function ipv4CIDRContains(ip, cidr) {

  var slash = cidr.indexOf("/");

  if (slash === -1) {
    return false;
  }

  var network = cidr.substring(0, slash);
  var prefix = parseInt(
    cidr.substring(slash + 1),
    10
  );

  if (
    isNaN(prefix) ||
    prefix < 0 ||
    prefix > 32
  ) {
    return false;
  }

  var ipNumber = ipv4ToNumber(ip);
  var networkNumber = ipv4ToNumber(network);

  if (
    ipNumber === null ||
    networkNumber === null
  ) {
    return false;
  }

  if (prefix === 0) {
    return true;
  }

  var shift = 32 - prefix;

  return (
    Math.floor(ipNumber / Math.pow(2, shift)) ===
    Math.floor(networkNumber / Math.pow(2, shift))
  );
}


// ============================================================
// IPv6 NORMALIZATION
// ============================================================

function normalizeIPv6(ip) {

  if (!ip) {
    return null;
  }

  ip = ip.toLowerCase();

  // Remove IPv4-mapped suffix when possible
  if (ip.indexOf(".") !== -1) {
    return ip;
  }

  return ip;
}


// ============================================================
// IPv6 PREFIX MATCH
// ============================================================

function ipv6PrefixContains(ip, cidr) {

  if (!ip || !cidr) {
    return false;
  }

  ip = normalizeIPv6(ip);

  var slash = cidr.indexOf("/");

  if (slash === -1) {
    return false;
  }

  var network = cidr.substring(0, slash)
    .toLowerCase();

  var prefixLength = parseInt(
    cidr.substring(slash + 1),
    10
  );

  if (
    isNaN(prefixLength) ||
    prefixLength < 0 ||
    prefixLength > 128
  ) {
    return false;
  }

  /*
   * PAC implementations differ in their IPv6 support.
   * Therefore we use hexadecimal prefix comparison.
   */

  var ipParts = ip.split(":");
  var netParts = network.split(":");

  var ipExpanded = [];
  var netExpanded = [];

  var i;

  // Expand IP
  var ipCompression = ip.indexOf("::");

  if (ipCompression !== -1) {

    var ipSides = ip.split("::");

    var left = ipSides[0] ?
      ipSides[0].split(":") : [];

    var right = ipSides[1] ?
      ipSides[1].split(":") : [];

    var missing =
      8 - left.length - right.length;

    ipExpanded = left.slice();

    for (i = 0; i < missing; i++) {
      ipExpanded.push("0");
    }

    ipExpanded = ipExpanded.concat(right);

  } else {

    ipExpanded = ipParts.slice();
  }


  // Expand network
  var netCompression = network.indexOf("::");

  if (netCompression !== -1) {

    var netSides = network.split("::");

    var netLeft = netSides[0] ?
      netSides[0].split(":") : [];

    var netRight = netSides[1] ?
      netSides[1].split(":") : [];

    var netMissing =
      8 - netLeft.length - netRight.length;

    netExpanded = netLeft.slice();

    for (i = 0; i < netMissing; i++) {
      netExpanded.push("0");
    }

    netExpanded = netExpanded.concat(netRight);

  } else {

    netExpanded = netParts.slice();
  }


  while (ipExpanded.length < 8) {
    ipExpanded.push("0");
  }

  while (netExpanded.length < 8) {
    netExpanded.push("0");
  }


  var fullHex = "";

  for (i = 0; i < 8; i++) {

    var ipHex = ipExpanded[i] || "0";
    var netHex = netExpanded[i] || "0";

    ipHex = ("0000" + ipHex).slice(-4);
    netHex = ("0000" + netHex).slice(-4);

    fullHex += ipHex + netHex;
  }


  var bitsRemaining = prefixLength;

  for (i = 0; i < 8; i++) {

    var ipBlock = fullHex.substring(
      i * 8,
      i * 8 + 4
    );

    var netBlock = fullHex.substring(
      i * 8 + 4,
      i * 8 + 8
    );

    var bitsForBlock =
      Math.min(bitsRemaining, 16);

    if (bitsForBlock <= 0) {
      break;
    }

    var ipValue =
      parseInt(ipBlock, 16);

    var netValue =
      parseInt(netBlock, 16);

    var shift =
      16 - bitsForBlock;

    if (
      Math.floor(
        ipValue / Math.pow(2, shift)
      ) !==
      Math.floor(
        netValue / Math.pow(2, shift)
      )
    ) {
      return false;
    }

    bitsRemaining -= bitsForBlock;
  }

  return true;
}


// ============================================================
// JORDAN NETWORK MATCHER
// ============================================================

function findJordanNetwork(ip) {

  if (!ip) {
    return null;
  }

  var isIPv6 =
    ip.indexOf(":") !== -1;

  var bestMatch = null;

  for (
    var i = 0;
    i < JORDAN_NETWORKS.length;
    i++
  ) {

    var network =
      JORDAN_NETWORKS[i];

    var ranges =
      isIPv6 ?
      network.ipv6 :
      network.ipv4;

    for (
      var j = 0;
      j < ranges.length;
      j++
    ) {

      var matched;

      if (isIPv6) {

        matched =
          ipv6PrefixContains(
            ip,
            ranges[j]
          );

      } else {

        matched =
          ipv4CIDRContains(
            ip,
            ranges[j]
          );
      }

      if (matched) {

        if (
          !bestMatch ||
          network.priority >
          bestMatch.priority
        ) {

          bestMatch = {
            asn: network.asn,
            name: network.name,
            country: network.country,
            priority: network.priority,
            cidr: ranges[j],
            ipVersion: isIPv6 ? 6 : 4
          };
        }
      }
    }
  }

  return bestMatch;
}


// ============================================================
// DNS CACHE
// ============================================================

function fastResolve(hostname) {

  var now =
    new Date().getTime();

  var cached =
    SESSION.dns[hostname];

  if (cached) {

    if (
      now - cached.time <
      CONFIG.DNS_CACHE_TIME
    ) {

      return cached.ip;
    }
  }


  var resolvedIP = null;

  try {

    resolvedIP =
      dnsResolve(hostname);

    if (resolvedIP) {

      SESSION.dns[hostname] = {
        ip: resolvedIP,
        time: now
      };

      return resolvedIP;
    }

  } catch (error) {

    // Ignore DNS errors
  }


  if (
    cached &&
    cached.ip
  ) {

    return cached.ip;
  }

  return null;
}


// ============================================================
// PROXY SELECTION
// ============================================================

function selectLobbyProxy(
  hostname,
  ip
) {

  var combined =
    hostname + "|" + ip;

  var hashValue = 0;

  for (
    var i = 0;
    i < combined.length;
    i++
  ) {

    hashValue =
      ((hashValue << 5) -
      hashValue) +
      combined.charCodeAt(i);

    hashValue =
      hashValue & hashValue;
  }

  if (hashValue < 0) {
    hashValue = -hashValue;
  }

  var index =
    hashValue %
    CONFIG.LOBBY_FAST.length;

  return CONFIG.LOBBY_FAST[index];
}


// ============================================================
// PUBG TRAFFIC DETECTION
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

    "intl",
    "igame",
    "gameloop"

  ];

  var lower =
    hostname.toLowerCase();

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      lower.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// MATCH TRAFFIC
// ============================================================

function isMatchTraffic(
  url,
  hostname
) {

  var combined =
    (
      url +
      hostname
    ).toLowerCase();

  var keywords = [

    "match",
    "battle",
    "combat",
    "realtime",
    "rt-",
    "sync",
    "live",
    "arena",
    "room",
    "session",
    "pvp",
    "versus"

  ];

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      combined.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// LOBBY TRAFFIC
// ============================================================

function isLobbyTraffic(
  url,
  hostname
) {

  var combined =
    (
      url +
      hostname
    ).toLowerCase();

  var keywords = [

    "lobby",
    "home",
    "main",

    "matchmaking",
    "queue",
    "mm-",

    "dispatch",
    "gateway",
    "portal",

    "join",
    "connect",
    "recruit",

    "waiting",
    "ready",
    "prepare",

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

    "settings",
    "config",
    "option",

    "location",
    "region",
    "country",
    "server",
    "zone",
    "area",

    "geo",
    "timezone",
    "locale"

  ];

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      combined.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// VOICE TRAFFIC
// ============================================================

function isVoiceTraffic(
  url,
  hostname
) {

  var combined =
    (
      url +
      hostname
    ).toLowerCase();

  var keywords = [

    "voice",
    "audio",
    "rtc",
    "webrtc",
    "agora",
    "voip",
    "call",
    "speak",
    "mic",
    "sound",
    "talk",
    "chat"

  ];

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      combined.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// SOCIAL TRAFFIC
// ============================================================

function isSocialTraffic(
  url,
  hostname
) {

  var combined =
    (
      url +
      hostname
    ).toLowerCase();

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
    "status",
    "profile",
    "message",
    "notification"

  ];

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      combined.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// CDN TRAFFIC
// ============================================================

function isCDNTraffic(
  url,
  hostname
) {

  var combined =
    (
      url +
      hostname
    ).toLowerCase();

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

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      combined.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// ANALYTICS
// ============================================================

function isAnalyticsTraffic(
  url,
  hostname
) {

  var combined =
    (
      url +
      hostname
    ).toLowerCase();

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

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      combined.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// MAIN PAC ROUTER
// ============================================================

function FindProxyForURL(
  url,
  host
) {

  // ----------------------------------------------------------
  // ALWAYS DIRECT
  // ----------------------------------------------------------

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


  // ----------------------------------------------------------
  // NORMALIZE
  // ----------------------------------------------------------

  host =
    cleanHost(
      host.toLowerCase()
    );


  // ----------------------------------------------------------
  // NON PUBG
  // ----------------------------------------------------------

  if (
    !isPUBGTraffic(host)
  ) {

    SESSION.counters.directRequests++;

    return CONFIG.DIRECT;
  }


  // ----------------------------------------------------------
  // DNS
  // ----------------------------------------------------------

  var ipAddress =
    fastResolve(host);


  if (!ipAddress) {

    SESSION.counters.blockedRequests++;

    return CONFIG.BLOCK;
  }


  // ----------------------------------------------------------
  // IP VERSION
  // ----------------------------------------------------------

  if (
    ipAddress.indexOf(":") !== -1
  ) {

    SESSION.counters.ipv6Requests++;

  } else {

    SESSION.counters.ipv4Requests++;
  }


  // ----------------------------------------------------------
  // JORDAN NETWORK IDENTIFICATION
  // ----------------------------------------------------------

  var jordanNetwork =
    findJordanNetwork(
      ipAddress
    );


  // ----------------------------------------------------------
  // JORDAN TRAFFIC
  // ----------------------------------------------------------

  if (jordanNetwork) {

    SESSION.counters.jordanRequests++;

  } else {

    SESSION.counters.nonJordanRequests++;
  }


  // ==========================================================
  // MATCH TRAFFIC
  // ==========================================================

  if (
    isMatchTraffic(
      url,
      host
    )
  ) {

    SESSION.counters.matchRequests++;


    // --------------------------------------------------------
    // Jordan match endpoint
    // --------------------------------------------------------

    if (jordanNetwork) {

      var networkName =
        jordanNetwork.name;

      var networkPriority =
        jordanNetwork.priority;


      // First match request
      if (
        !SESSION.match.locked
      ) {

        SESSION.match.network =
          jordanNetwork.cidr;

        SESSION.match.networkName =
          networkName;

        SESSION.match.networkPriority =
          networkPriority;

        SESSION.match.hostname =
          host;

        SESSION.match.proxy =
          CONFIG.MATCH_TIER1;

        SESSION.match.startTime =
          new Date().getTime();

        SESSION.match.locked =
          true;


        return (
          CONFIG.MATCH_TIER1 +
          "; " +
          CONFIG.LOBBY_FAST[0]
        );
      }


      // Same network
      if (
        jordanNetwork.cidr ===
        SESSION.match.network
      ) {

        return (
          SESSION.match.proxy +
          "; " +
          CONFIG.MATCH_TIER1
        );
      }


      // Higher priority Jordan network
      if (
        jordanNetwork.priority >
        SESSION.match.networkPriority
      ) {

        SESSION.match.network =
          jordanNetwork.cidr;

        SESSION.match.networkName =
          jordanNetwork.name;

        SESSION.match.networkPriority =
          jordanNetwork.priority;

        return (
          CONFIG.MATCH_TIER1 +
          "; " +
          CONFIG.LOBBY_FAST[0]
        );
      }


      return CONFIG.MATCH_TIER1;
    }


    // --------------------------------------------------------
    // Non-Jordan match endpoint
    // --------------------------------------------------------

    /*
     * لا نحاول تحويل كل سيرفر عالمي إلى الأردن
     * لأن ذلك قد يكسر الاتصال بالمباراة.
     */

    if (
      CONFIG.JORDAN_ONLY_PRIORITY
    ) {

      return CONFIG.DIRECT;
    }

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // VOICE
  // ==========================================================

  if (
    isVoiceTraffic(
      url,
      host
    )
  ) {

    if (jordanNetwork) {

      return (
        CONFIG.VOICE_PROXY +
        "; " +
        CONFIG.MATCH_TIER1
      );
    }

    return CONFIG.DIRECT;
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

      if (
        isCDNTraffic(
          url,
          host
        )
      ) {

        return CONFIG.CDN_DIRECT;
      }


      if (
        isAnalyticsTraffic(
          url,
          host
        )
      ) {

        return CONFIG.DIRECT;
      }
    }


    // Session expired

    SESSION.match.locked =
      false;

    SESSION.match.network =
      null;

    SESSION.match.networkName =
      null;

    SESSION.match.networkPriority =
      0;

    SESSION.match.hostname =
      null;

    SESSION.match.proxy =
      null;

    SESSION.match.startTime =
      0;
  }


  // ==========================================================
  // LOBBY
  // ==========================================================

  if (
    isLobbyTraffic(
      url,
      host
    )
  ) {

    SESSION.counters.lobbyRequests++;


    if (jordanNetwork) {

      var lobbyProxy =
        selectLobbyProxy(
          host,
          ipAddress
        );


      return (
        lobbyProxy +
        "; " +
        CONFIG.LOBBY_FAST[0] +
        "; " +
        CONFIG.MATCH_TIER1
      );
    }


    /*
     * الخدمات العالمية المطلوبة للوبي
     * تبقى DIRECT بدل كسر matchmaking.
     */

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // SOCIAL
  // ==========================================================

  if (
    isSocialTraffic(
      url,
      host
    )
  ) {

    if (jordanNetwork) {

      return (
        selectLobbyProxy(
          host,
          ipAddress
        ) +
        "; " +
        CONFIG.LOBBY_FAST[0]
      );
    }

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // CDN
  // ==========================================================

  if (
    isCDNTraffic(
      url,
      host
    )
  ) {

    return CONFIG.CDN_DIRECT;
  }


  // ==========================================================
  // ANALYTICS
  // ==========================================================

  if (
    isAnalyticsTraffic(
      url,
      host
    )
  ) {

    SESSION.counters.directRequests++;

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // GENERAL PUBG JORDAN TRAFFIC
  // ==========================================================

  if (jordanNetwork) {

    return (
      selectLobbyProxy(
        host,
        ipAddress
      ) +
      "; " +
      CONFIG.LOBBY_FAST[0] +
      "; " +
      CONFIG.DIRECT
    );
  }


  // ==========================================================
  // DEFAULT
  // ==========================================================

  return CONFIG.DIRECT;
}


// ============================================================
// SESSION RESET
// ============================================================

function resetSession() {

  SESSION.match.locked =
    false;

  SESSION.match.network =
    null;

  SESSION.match.networkName =
    null;

  SESSION.match.networkPriority =
    0;

  SESSION.match.hostname =
    null;

  SESSION.match.proxy =
    null;

  SESSION.match.startTime =
    0;
}


// ============================================================
// DEBUG / STATS
// ============================================================

function getSessionStats() {

  return {

    matchRequests:
      SESSION.counters.matchRequests,

    lobbyRequests:
      SESSION.counters.lobbyRequests,

    jordanRequests:
      SESSION.counters.jordanRequests,

    nonJordanRequests:
      SESSION.counters.nonJordanRequests,

    blockedRequests:
      SESSION.counters.blockedRequests,

    directRequests:
      SESSION.counters.directRequests,

    ipv4Requests:
      SESSION.counters.ipv4Requests,

    ipv6Requests:
      SESSION.counters.ipv6Requests,

    dnsCacheSize:
      Object.keys(
        SESSION.dns
      ).length,

    matchLocked:
      SESSION.match.locked,

    matchNetwork:
      SESSION.match.network,

    matchNetworkName:
      SESSION.match.networkName
  };
}
