// ============================================================
// ALYAZOURI JORDAN PUBG ROUTE ENGINE v5.0
// ============================================================
// Jordan IPv4 Proxy Routing
// ASN / Prefix Priority
// Sticky Match Route
// Lobby / Match / Voice separation
// ============================================================


// ============================================================
// CONFIG
// ============================================================

var CONFIG = {

    DIRECT: "DIRECT",

    BLOCK: "PROXY 127.0.0.1:9",

    DNS_CACHE_TIME: 600000,

    STICKY_SESSION_TIME: 1800000,

    STICKY_MATCH: true,

    JORDAN_FIRST: true,

    FAIL_OPEN: true
};


// ============================================================
// JORDAN PROXY POOL
// ============================================================
//
// ترتيب الأولوية:
//
// 100 = أعلى
// 95  = عالي
// 90  = متوسط عالي
//
// ملاحظة:
// فتح 443 أو 3389 لا يعني أن الخدمة Proxy.
// لذلك لا يتم استخدامهما هنا بدون إثبات Proxy فعلي.
// ============================================================

var JORDAN_PROXIES = [

    {
        ip: "46.32.102.8",
        port: 80,

        asn: 48832,

        name: "Zain Jordan",

        priority: 100,

        proxy: "PROXY 46.32.102.8:80"
    },

    {
        ip: "176.29.176.46",
        port: 80,

        asn: 48832,

        name: "Zain Jordan",

        priority: 100,

        proxy: "PROXY 176.29.176.46:80"
    },

    {
        ip: "77.245.13.126",
        port: 80,

        asn: 48832,

        name: "Zain Jordan",

        priority: 100,

        proxy: "PROXY 77.245.13.126:80"
    }

];


// ============================================================
// JORDAN NETWORKS
// ============================================================
//
// هذه القائمة للتصنيف فقط.
// لا تفترض أن كل IP داخل CIDR هو Proxy.
// ============================================================

var JORDAN_NETWORKS = [

    // --------------------------------------------------------
    // ZAIN JORDAN
    // --------------------------------------------------------

    {
        asn: 48832,

        name: "Zain Jordan",

        country: "JO",

        priority: 100,

        ipv4: [

            "46.32.96.0/19",

            "77.245.0.0/20",

            "176.29.0.0/16"

        ],

        ipv6: []
    },


    // --------------------------------------------------------
    // ORANGE JORDAN
    // --------------------------------------------------------

    {
        asn: 8697,

        name: "Orange Jordan",

        country: "JO",

        priority: 95,

        ipv4: [

            "212.34.0.0/19",

            "213.139.48.0/24",

            "213.139.49.0/24",

            "213.139.50.0/24",

            "213.139.51.0/24",

            "213.139.52.0/24",

            "213.139.53.0/24",

            "213.139.55.0/24"

        ],

        ipv6: []
    },


    // --------------------------------------------------------
    // UMNIAH
    // --------------------------------------------------------

    {
        asn: 9038,

        name: "Umniah",

        country: "JO",

        priority: 90,

        ipv4: [

            "188.123.160.0/19"

        ],

        ipv6: []
    },


    // --------------------------------------------------------
    // DAMAMAX
    // --------------------------------------------------------

    {
        asn: 47887,

        name: "Damamax",

        country: "JO",

        priority: 85,

        ipv4: [

            "81.28.112.0/20"

        ],

        ipv6: []
    }

];


// ============================================================
// SESSION
// ============================================================

var SESSION = {

    dns: {},

    match: {

        locked: false,

        hostname: null,

        ip: null,

        network: null,

        proxy: null,

        startTime: 0
    },

    counters: {

        match: 0,

        lobby: 0,

        voice: 0,

        jordan: 0,

        foreign: 0,

        direct: 0,

        blocked: 0
    }
};


// ============================================================
// IPV4 CONVERSION
// ============================================================

function ipv4ToInt(ip) {

    var p = ip.split(".");

    if (p.length !== 4) {
        return -1;
    }

    var a = parseInt(p[0], 10);
    var b = parseInt(p[1], 10);
    var c = parseInt(p[2], 10);
    var d = parseInt(p[3], 10);

    if (
        isNaN(a) ||
        isNaN(b) ||
        isNaN(c) ||
        isNaN(d)
    ) {
        return -1;
    }

    if (
        a < 0 || a > 255 ||
        b < 0 || b > 255 ||
        c < 0 || c > 255 ||
        d < 0 || d > 255
    ) {
        return -1;
    }

    return (
        (((a * 256) + b) * 256 + c) * 256 + d
    );
}


// ============================================================
// CIDR MATCH
// ============================================================

function cidrContainsIPv4(ip, cidr) {

    var parts = cidr.split("/");

    if (parts.length !== 2) {
        return false;
    }

    var ipInt = ipv4ToInt(ip);

    var networkInt = ipv4ToInt(parts[0]);

    var prefix = parseInt(parts[1], 10);

    if (
        ipInt < 0 ||
        networkInt < 0 ||
        isNaN(prefix)
    ) {
        return false;
    }

    if (prefix === 0) {
        return true;
    }

    if (
        prefix < 0 ||
        prefix > 32
    ) {
        return false;
    }

    var mask =
        (0xFFFFFFFF << (32 - prefix)) >>> 0;

    return (
        ((ipInt >>> 0) & mask) ===
        ((networkInt >>> 0) & mask)
    );
}


// ============================================================
// FIND JORDAN ASN
// ============================================================

function findJordanNetwork(ip) {

    for (
        var i = 0;
        i < JORDAN_NETWORKS.length;
        i++
    ) {

        var network =
            JORDAN_NETWORKS[i];

        for (
            var j = 0;
            j < network.ipv4.length;
            j++
        ) {

            if (
                cidrContainsIPv4(
                    ip,
                    network.ipv4[j]
                )
            ) {

                return network;
            }
        }
    }

    return null;
}


// ============================================================
// DNS CACHE
// ============================================================

function resolveHost(host) {

    var now =
        new Date().getTime();

    var cached =
        SESSION.dns[host];

    if (
        cached &&
        now - cached.time <
        CONFIG.DNS_CACHE_TIME
    ) {

        return cached.ip;
    }

    var ip = null;

    try {

        ip = dnsResolve(host);

    } catch (e) {

        ip = null;
    }

    if (
        ip &&
        ip.indexOf(".") !== -1 &&
        ip.indexOf(":") === -1
    ) {

        SESSION.dns[host] = {

            ip: ip,

            time: now
        };

        return ip;
    }

    if (cached) {
        return cached.ip;
    }

    return null;
}


// ============================================================
// HOST NORMALIZATION
// ============================================================

function cleanHost(host) {

    if (!host) {
        return "";
    }

    var pos =
        host.indexOf(":");

    if (pos === -1) {
        return host.toLowerCase();
    }

    return host
        .substring(0, pos)
        .toLowerCase();
}


// ============================================================
// KEYWORD ENGINE
// ============================================================

function containsKeyword(
    text,
    keywords
) {

    text =
        String(text || "")
            .toLowerCase();

    for (
        var i = 0;
        i < keywords.length;
        i++
    ) {

        if (
            text.indexOf(
                keywords[i]
            ) !== -1
        ) {

            return true;
        }
    }

    return false;
}


// ============================================================
// PUBG DOMAINS / KEYWORDS
// ============================================================

var PUBG_KEYWORDS = [

    "pubg",

    "pubgm",

    "pubgmobile",

    "tencent",

    "proximabeta",

    "lightspeed",

    "quantum",

    "krafton",

    "levelinfinite",

    "igame",

    "gameloop"
];


var MATCH_KEYWORDS = [

    "match",

    "battle",

    "combat",

    "realtime",

    "rt-",

    "sync",

    "arena",

    "pvp",

    "versus",

    "session"
];


var LOBBY_KEYWORDS = [

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

    "team"
];


var VOICE_KEYWORDS = [

    "voice",

    "audio",

    "rtc",

    "webrtc",

    "agora",

    "voip",

    "mic",

    "talk"
];


function isPUBGTraffic(host) {

    return containsKeyword(
        host,
        PUBG_KEYWORDS
    );
}


function isMatchTraffic(
    url,
    host
) {

    return containsKeyword(
        url + " " + host,
        MATCH_KEYWORDS
    );
}


function isLobbyTraffic(
    url,
    host
) {

    return containsKeyword(
        url + " " + host,
        LOBBY_KEYWORDS
    );
}


function isVoiceTraffic(
    url,
    host
) {

    return containsKeyword(
        url + " " + host,
        VOICE_KEYWORDS
    );
}


// ============================================================
// DIRECT EXCLUSIONS
// ============================================================

function isAlwaysDirect(host) {

    return (

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
    );
}


// ============================================================
// PROXY SELECTOR
// ============================================================
//
// يختار أعلى Priority.
// إذا تساوت الأولوية يستخدم hash ثابت
// حتى لا يغير Proxy باستمرار.
// ============================================================

function selectJordanProxy(
    host,
    ip
) {

    if (
        JORDAN_PROXIES.length === 0
    ) {

        return CONFIG.DIRECT;
    }

    var best =
        JORDAN_PROXIES[0];

    for (
        var i = 1;
        i < JORDAN_PROXIES.length;
        i++
    ) {

        if (
            JORDAN_PROXIES[i].priority >
            best.priority
        ) {

            best =
                JORDAN_PROXIES[i];
        }
    }

    return best.proxy;
}


// ============================================================
// MAIN PAC FUNCTION
// ============================================================

function FindProxyForURL(
    url,
    host
) {

    host =
        cleanHost(host);


    // ========================================================
    // ALWAYS DIRECT
    // ========================================================

    if (
        isAlwaysDirect(host)
    ) {

        return CONFIG.DIRECT;
    }


    // ========================================================
    // NON-PUBG
    // ========================================================

    if (
        !isPUBGTraffic(host)
    ) {

        return CONFIG.DIRECT;
    }


    // ========================================================
    // DNS
    // ========================================================

    var ip =
        resolveHost(host);


    if (!ip) {

        SESSION.counters.direct++;

        return CONFIG.FAIL_OPEN
            ? CONFIG.DIRECT
            : CONFIG.BLOCK;
    }


    // ========================================================
    // JORDAN DESTINATION DETECTION
    // ========================================================

    var jordanNetwork =
        findJordanNetwork(ip);

    var isJordan =
        jordanNetwork !== null;


    if (isJordan) {

        SESSION.counters.jordan++;

    } else {

        SESSION.counters.foreign++;
    }


    // ========================================================
    // MATCH
    // ========================================================

    if (
        isMatchTraffic(
            url,
            host
        )
    ) {

        SESSION.counters.match++;


        // ----------------------------------------------------
        // JORDAN MATCH
        // ----------------------------------------------------

        if (isJordan) {

            if (
                !SESSION.match.locked
            ) {

                SESSION.match.locked =
                    true;

                SESSION.match.hostname =
                    host;

                SESSION.match.ip =
                    ip;

                SESSION.match.network =
                    jordanNetwork.name;

                SESSION.match.proxy =
                    selectJordanProxy(
                        host,
                        ip
                    );

                SESSION.match.startTime =
                    new Date().getTime();
            }


            return (
                SESSION.match.proxy +
                "; " +
                CONFIG.DIRECT
            );
        }


        // ----------------------------------------------------
        // NON-JORDAN MATCH
        // ----------------------------------------------------

        return CONFIG.DIRECT;
    }


    // ========================================================
    // VOICE
    // ========================================================

    if (
        isVoiceTraffic(
            url,
            host
        )
    ) {

        SESSION.counters.voice++;


        if (isJordan) {

            return (
                selectJordanProxy(
                    host,
                    ip
                ) +
                "; " +
                CONFIG.DIRECT
            );
        }


        return CONFIG.DIRECT;
    }


    // ========================================================
    // LOBBY
    // ========================================================

    if (
        isLobbyTraffic(
            url,
            host
        )
    ) {

        SESSION.counters.lobby++;


        if (isJordan) {

            return (
                selectJordanProxy(
                    host,
                    ip
                ) +
                "; " +
                CONFIG.DIRECT
            );
        }


        return CONFIG.DIRECT;
    }


    // ========================================================
    // GENERAL PUBG
    // ========================================================

    if (isJordan) {

        return (
            selectJordanProxy(
                host,
                ip
            ) +
            "; " +
            CONFIG.DIRECT
        );
    }


    // ========================================================
    // DEFAULT
    // ========================================================

    SESSION.counters.direct++;

    return CONFIG.DIRECT;
}


// ============================================================
// SESSION RESET
// ============================================================

function resetSession() {

    SESSION.match.locked = false;

    SESSION.match.hostname = null;

    SESSION.match.ip = null;

    SESSION.match.network = null;

    SESSION.match.proxy = null;

    SESSION.match.startTime = 0;
}


// ============================================================
// END
// ============================================================
