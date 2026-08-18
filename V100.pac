// ============================================================
// GAME BOOSTER ALPHA v4.0
// JORDAN ROUTE + ANTI-JITTER
// IPv4 + IPv6
// Sticky Proxy / Sticky Network / Stable Session
// ============================================================


// ============================================================
// CONFIG
// ============================================================

var CONFIG = {

  // ----------------------------------------------------------
  // PRIMARY PROXY
  // ----------------------------------------------------------
  // استخدم بروكسي واحد ثابت لتقليل تبدل المسار.
  PRIMARY_PROXY:
    "PROXY 46.32.102.8:80",

  // احتياطي فقط إذا فشل الأساسي.
  // لا يتم تدويره أثناء الجلسة بشكل عشوائي.
  BACKUP_PROXY:
    "PROXY 176.29.176.46:80",

  SECONDARY_BACKUP:
    "PROXY 77.245.13.126:80",

  // ----------------------------------------------------------
  // DIRECT
  // ----------------------------------------------------------

  DIRECT:
    "DIRECT",

  // ----------------------------------------------------------
  // BLOCK
  // ----------------------------------------------------------

  BLOCK:
    "PROXY 127.0.0.1:9",

  // ----------------------------------------------------------
  // CACHE
  // ----------------------------------------------------------

  DNS_CACHE_TIME:
    600000,

  // ----------------------------------------------------------
  // STICKY SESSION
  // ----------------------------------------------------------

  STICKY_SESSION_TIME:
    1800000,

  // ----------------------------------------------------------
  // ROUTE MODE
  // ----------------------------------------------------------

  STICKY_PROXY:
    true,

  STICKY_NETWORK:
    true,

  // ----------------------------------------------------------
  // IPV6
  // ----------------------------------------------------------

  ENABLE_IPV6:
    true,

  // ----------------------------------------------------------
  // IMPORTANT
  // ----------------------------------------------------------
  // لا تحظر كل IP غير أردني.
  // لأن PUBG تعتمد على خدمات عالمية.
  ALLOW_GLOBAL_SERVICES:
    true
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

    name:
      "Zain Jordan",

    country:
      "JO",

    priority:
      100,

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

    name:
      "Orange Jordan",

    country:
      "JO",

    priority:
      95,

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

    name:
      "Damamax / Neutelecom",

    country:
      "JO",

    priority:
      85,

    ipv4: [

      "81.28.112.0/20"

    ],

    ipv6: []
  },


  // ==========================================================
  // ZAIN JORDAN ADDITIONAL
  // ==========================================================

  {
    asn: 42912,

    name:
      "Zain Jordan",

    country:
      "JO",

    priority:
      100,

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

  // ----------------------------------------------------------
  // PROXY
  // ----------------------------------------------------------

  proxyLocked:
    false,

  activeProxy:
    null,

  proxyStartTime:
    0,

  // ----------------------------------------------------------
  // NETWORK
  // ----------------------------------------------------------

  networkLocked:
    false,

  network:
    null,

  networkName:
    null,

  networkASN:
    null,

  networkPriority:
    0,

  // ----------------------------------------------------------
  // MATCH
  // ----------------------------------------------------------

  matchLocked:
    false,

  matchHostname:
    null,

  matchNetwork:
    null,

  matchStartTime:
    0,

  // ----------------------------------------------------------
  // DNS CACHE
  // ----------------------------------------------------------

  dns:
    {},

  // ----------------------------------------------------------
  // COUNTERS
  // ----------------------------------------------------------

  counters: {

    match:
      0,

    lobby:
      0,

    jordan:
      0,

    global:
      0,

    ipv4:
      0,

    ipv6:
      0,

    direct:
      0,

    blocked:
      0

  }

};


// ============================================================
// CLEAN HOST
// ============================================================

function cleanHost(host) {

  if (!host) {
    return "";
  }

  var pos =
    host.indexOf(":");

  if (pos === -1) {
    return host;
  }

  return host.substring(
    0,
    pos
  );
}


// ============================================================
// IPv4 CONVERSION
// ============================================================

function ipv4ToNumber(ip) {

  if (!ip) {
    return null;
  }

  var p =
    ip.split(".");

  if (p.length !== 4) {
    return null;
  }

  var a =
    parseInt(p[0], 10);

  var b =
    parseInt(p[1], 10);

  var c =
    parseInt(p[2], 10);

  var d =
    parseInt(p[3], 10);

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


// ============================================================
// IPv4 CIDR MATCH
// ============================================================

function ipv4CIDRContains(
  ip,
  cidr
) {

  var slash =
    cidr.indexOf("/");

  if (slash === -1) {
    return false;
  }

  var network =
    cidr.substring(
      0,
      slash
    );

  var prefix =
    parseInt(
      cidr.substring(
        slash + 1
      ),
      10
    );

  if (
    isNaN(prefix) ||
    prefix < 0 ||
    prefix > 32
  ) {
    return false;
  }

  var ipNum =
    ipv4ToNumber(ip);

  var netNum =
    ipv4ToNumber(network);

  if (
    ipNum === null ||
    netNum === null
  ) {
    return false;
  }

  if (prefix === 0) {
    return true;
  }

  var divisor =
    Math.pow(
      2,
      32 - prefix
    );

  return (
    Math.floor(
      ipNum / divisor
    ) ===
    Math.floor(
      netNum / divisor
    )
  );
}


// ============================================================
// IPv6 PREFIX MATCH
// ============================================================

function ipv6PrefixContains(
  ip,
  cidr
) {

  if (
    !ip ||
    !cidr
  ) {
    return false;
  }

  var slash =
    cidr.indexOf("/");

  if (slash === -1) {
    return false;
  }

  var network =
    cidr.substring(
      0,
      slash
    ).toLowerCase();

  var prefix =
    parseInt(
      cidr.substring(
        slash + 1
      ),
      10
    );

  if (
    isNaN(prefix) ||
    prefix < 0 ||
    prefix > 128
  ) {
    return false;
  }

  /*
   * PAC engines have inconsistent IPv6 support.
   * This implementation performs prefix comparison
   * using hexadecimal groups.
   */

  function expandIPv6(
    address
  ) {

    address =
      address.toLowerCase();

    var parts =
      address.split("::");

    var result = [];

    if (parts.length === 2) {

      var left =
        parts[0] ?
        parts[0].split(":") :
        [];

      var right =
        parts[1] ?
        parts[1].split(":") :
        [];

      var missing =
        8 -
        left.length -
        right.length;

      var i;

      for (
        i = 0;
        i < left.length;
        i++
      ) {
        result.push(
          left[i]
        );
      }

      for (
        i = 0;
        i < missing;
        i++
      ) {
        result.push(
          "0"
        );
      }

      for (
        i = 0;
        i < right.length;
        i++
      ) {
        result.push(
          right[i]
        );
      }

    } else {

      result =
        address.split(":");
    }

    while (
      result.length < 8
    ) {
      result.push("0");
    }

    return result;
  }


  var ipParts =
    expandIPv6(ip);

  var netParts =
    expandIPv6(network);

  var remaining =
    prefix;

  for (
    var i = 0;
    i < 8;
    i++
  ) {

    if (remaining <= 0) {
      return true;
    }

    var bits =
      Math.min(
        remaining,
        16
      );

    var ipValue =
      parseInt(
        ipParts[i] || "0",
        16
      );

    var netValue =
      parseInt(
        netParts[i] || "0",
        16
      );

    var divisor =
      Math.pow(
        2,
        16 - bits
      );

    if (
      Math.floor(
        ipValue / divisor
      ) !==
      Math.floor(
        netValue / divisor
      )
    ) {

      return false;
    }

    remaining -= bits;
  }

  return true;
}


// ============================================================
// FIND JORDAN NETWORK
// ============================================================

function findJordanNetwork(
  ip
) {

  if (!ip) {
    return null;
  }

  var ipv6 =
    ip.indexOf(":") !== -1;

  var best =
    null;

  for (
    var i = 0;
    i < JORDAN_NETWORKS.length;
    i++
  ) {

    var network =
      JORDAN_NETWORKS[i];

    var ranges =
      ipv6 ?
      network.ipv6 :
      network.ipv4;

    for (
      var j = 0;
      j < ranges.length;
      j++
    ) {

      var match;

      if (ipv6) {

        match =
          ipv6PrefixContains(
            ip,
            ranges[j]
          );

      } else {

        match =
          ipv4CIDRContains(
            ip,
            ranges[j]
          );
      }

      if (match) {

        if (
          !best ||
          network.priority >
          best.priority
        ) {

          best = {

            asn:
              network.asn,

            name:
              network.name,

            country:
              network.country,

            priority:
              network.priority,

            cidr:
              ranges[j],

            ipVersion:
              ipv6 ?
              6 :
              4
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

function fastResolve(
  hostname
) {

  var now =
    new Date().getTime();

  var cached =
    SESSION.dns[hostname];

  if (cached) {

    if (
      now -
      cached.time <
      CONFIG.DNS_CACHE_TIME
    ) {

      return cached.ip;
    }
  }

  var ip =
    null;

  try {

    ip =
      dnsResolve(
        hostname
      );

  } catch (e) {

    ip =
      null;
  }


  if (ip) {

    SESSION.dns[hostname] = {

      ip:
        ip,

      time:
        now
    };

    return ip;
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
// PUBG DETECTION
// ============================================================

function isPUBGTraffic(
  hostname
) {

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
    "gameloop"

  ];

  var h =
    hostname.toLowerCase();

  for (
    var i = 0;
    i < keywords.length;
    i++
  ) {

    if (
      h.indexOf(
        keywords[i]
      ) !== -1
    ) {

      return true;
    }
  }

  return false;
}


// ============================================================
// MATCH DETECTION
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
    "arena",
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
// LOBBY DETECTION
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
    "rank",
    "region",
    "country",
    "zone",
    "area"

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
// VOICE
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
    "mic",
    "talk"

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
// CDN
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
    "asset",
    "static",
    "media",
    "download",
    "patch",
    "update",
    "resource"

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
// STICKY PROXY
// ============================================================

function getStickyProxy() {

  if (
    SESSION.proxyLocked &&
    SESSION.activeProxy
  ) {

    return SESSION.activeProxy;
  }


  SESSION.activeProxy =
    CONFIG.PRIMARY_PROXY;

  SESSION.proxyLocked =
    true;

  SESSION.proxyStartTime =
    new Date().getTime();


  return SESSION.activeProxy;
}


// ============================================================
// STICKY NETWORK
// ============================================================

function lockJordanNetwork(
  network
) {

  if (!network) {
    return;
  }

  if (
    !SESSION.networkLocked
  ) {

    SESSION.networkLocked =
      true;

    SESSION.network =
      network.cidr;

    SESSION.networkName =
      network.name;

    SESSION.networkASN =
      network.asn;

    SESSION.networkPriority =
      network.priority;

    return;
  }


  /*
   * لا نبدل الشبكة أثناء الجلسة
   * إلا إذا كانت الشبكة الجديدة أعلى أولوية بشكل واضح.
   */

  if (
    network.priority >
    SESSION.networkPriority
  ) {

    SESSION.network =
      network.cidr;

    SESSION.networkName =
      network.name;

    SESSION.networkASN =
      network.asn;

    SESSION.networkPriority =
      network.priority;
  }
}


// ============================================================
// SESSION RESET
// ============================================================

function resetSession() {

  SESSION.proxyLocked =
    false;

  SESSION.activeProxy =
    null;

  SESSION.proxyStartTime =
    0;

  SESSION.networkLocked =
    false;

  SESSION.network =
    null;

  SESSION.networkName =
    null;

  SESSION.networkASN =
    null;

  SESSION.networkPriority =
    0;

  SESSION.matchLocked =
    false;

  SESSION.matchHostname =
    null;

  SESSION.matchNetwork =
    null;

  SESSION.matchStartTime =
    0;
}


// ============================================================
// MAIN ROUTER
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

    SESSION.counters.direct++;

    return CONFIG.DIRECT;
  }


  // ----------------------------------------------------------
  // DNS
  // ----------------------------------------------------------

  var ip =
    fastResolve(host);


  if (!ip) {

    SESSION.counters.blocked++;

    return CONFIG.BLOCK;
  }


  // ----------------------------------------------------------
  // IPv4 / IPv6
  // ----------------------------------------------------------

  if (
    ip.indexOf(":") !== -1
  ) {

    SESSION.counters.ipv6++;

    if (
      !CONFIG.ENABLE_IPV6
    ) {

      return CONFIG.DIRECT;
    }

  } else {

    SESSION.counters.ipv4++;
  }


  // ----------------------------------------------------------
  // JORDAN IDENTIFICATION
  // ----------------------------------------------------------

  var jordan =
    findJordanNetwork(ip);


  if (jordan) {

    SESSION.counters.jordan++;

    lockJordanNetwork(
      jordan
    );

  } else {

    SESSION.counters.global++;
  }


  // ==========================================================
  // MATCH
  // ==========================================================

  if (
    isMatchTraffic(
      url,
      host
    )
  ) {

    SESSION.counters.match++;


    // --------------------------------------------------------
    // Jordan endpoint
    // --------------------------------------------------------

    if (jordan) {

      if (
        !SESSION.matchLocked
      ) {

        SESSION.matchLocked =
          true;

        SESSION.matchHostname =
          host;

        SESSION.matchNetwork =
          jordan.cidr;

        SESSION.matchStartTime =
          new Date().getTime();
      }


      /*
       * أهم نقطة في Anti-Jitter:
       *
       * نفس البروكسي طوال الجلسة.
       * لا rotation.
       * لا hash.
       * لا تبديل بين ثلاثة مسارات.
       */

      return getStickyProxy();
    }


    // --------------------------------------------------------
    // Global endpoint
    // --------------------------------------------------------

    /*
     * لا نحاول إجبار سيرفر عالمي على IP أردني.
     * هذا قد يؤدي إلى فشل الاتصال.
     */

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

    if (jordan) {

      return getStickyProxy();
    }

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // ACTIVE MATCH
  // ==========================================================

  if (
    SESSION.matchLocked
  ) {

    var elapsed =
      new Date().getTime() -
      SESSION.matchStartTime;


    if (
      elapsed <
      CONFIG.STICKY_SESSION_TIME
    ) {

      // CDN لا يحتاج proxy
      if (
        isCDNTraffic(
          url,
          host
        )
      ) {

        return CONFIG.DIRECT;
      }


      // Analytics لا نحتاج أن نمرره بالبروكسي
      if (
        isAnalyticsTraffic(
          url,
          host
        )
      ) {

        return CONFIG.DIRECT;
      }


      // Jordan PUBG traffic
      if (jordan) {

        return getStickyProxy();
      }


      // Global required service
      if (
        CONFIG.ALLOW_GLOBAL_SERVICES
      ) {

        return CONFIG.DIRECT;
      }
    }


    // Session expired
    resetSession();
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

    SESSION.counters.lobby++;


    if (jordan) {

      return getStickyProxy();
    }


    /*
     * عدم إجبار خدمات matchmaking العالمية
     * على Proxy أردني.
     */

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

    return CONFIG.DIRECT;
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

    SESSION.counters.direct++;

    return CONFIG.DIRECT;
  }


  // ==========================================================
  // GENERAL JORDAN PUBG TRAFFIC
  // ==========================================================

  if (jordan) {

    return getStickyProxy();
  }


  // ==========================================================
  // GLOBAL PUBG TRAFFIC
  // ==========================================================

  return CONFIG.DIRECT;
}


// ============================================================
// DEBUG STATS
// ============================================================

function getSessionStats() {

  return {

    activeProxy:
      SESSION.activeProxy,

    proxyLocked:
      SESSION.proxyLocked,

    network:
      SESSION.network,

    networkName:
      SESSION.networkName,

    networkASN:
      SESSION.networkASN,

    networkPriority:
      SESSION.networkPriority,

    matchLocked:
      SESSION.matchLocked,

    matchNetwork:
      SESSION.matchNetwork,

    matchHostname:
      SESSION.matchHostname,

    matchRequests:
      SESSION.counters.match,

    lobbyRequests:
      SESSION.counters.lobby,

    jordanRequests:
      SESSION.counters.jordan,

    globalRequests:
      SESSION.counters.global,

    ipv4Requests:
      SESSION.counters.ipv4,

    ipv6Requests:
      SESSION.counters.ipv6,

    directRequests:
      SESSION.counters.direct,

    blockedRequests:
      SESSION.counters.blocked,

    dnsCacheSize:
      Object.keys(
        SESSION.dns
      ).length
  };
}
