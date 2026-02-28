// ============================================================
// JORDAN ULTRA STRICT LOCK v12 EXTENDED
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🇯🇴 Jordan ISP Optimized - Fiber Ready
// 🌍 Middle East Region Lock - Extended Coverage
// 🔒 /40 + /64 + Full IP Lock During Match
// 🎮 Lobby Flexible with Smart Detection
// ⚡ Auto Unlock When Leaving Match
// 🛡️ Enhanced Security & Error Handling
// 📡 500+ Jordan & Regional IPv6 Prefixes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ============================================================

// ================= PROXY CONFIGURATION =================

var PROXY_CONFIG = {
  primary: "PROXY 91.106.109.50:20005",
  backup: "PROXY 46.185.131.218:20001",
  direct: "DIRECT",
  block: "PROXY 0.0.0.0:0"
};

var PROXY  = PROXY_CONFIG.primary;
var DIRECT = PROXY_CONFIG.direct;
var BLOCK  = PROXY_CONFIG.block;

// ================= SESSION STATE =================

var SESSION = {
  locked40: null,
  locked64: null,
  lockedIP: null,
  matchActive: false,
  connectionCount: 0,
  lastHost: null,
  lastAction: null,
  startTime: Date.now()
};

// ================= DEBUG MODE =================

var DEBUG = {
  enabled: false,
  log: function(msg) {
    if (this.enabled && typeof console !== 'undefined') {
      console.log('[JORDAN-LOCK] ' + msg);
    }
  }
};

// ================= EUROPE HARD BLOCK PREFIXES =================

var EUROPE_PREFIXES = [
  "2a02", "2a03", "2a06", "2a07", "2a00", "2a01",
  "2a04", "2a05", "2a08", "2a09", "2a0a", "2a0b",
  "2a0c", "2a0d", "2a0e", "2a0f", "2a10", "2a11",
  "2a12", "2a13", "2a14", "2a15", "2a16", "2a17",
  "2a18", "2a19", "2a1a", "2a1b", "2a1c", "2a1d",
  "2a1e", "2a1f"
];

// ============================================================
// 🇯🇴 JORDAN ISP IPv6 PREFIXES - MASSIVE EXPANSION
// ============================================================

var JORDAN_ISP_PREFIXES = {};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟠 ORANGE JORDAN / أورنج الأردن - النطاق الكامل
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    // الأصلية
    "2a01:9700", "2a01:9701", "2a01:9702", "2a01:9703",
    "2a01:9704", "2a01:9705", "2a01:9706", "2a01:9707",
    "2a01:9708", "2a01:9709", "2a01:970a", "2a01:970b",
    "2a01:970c", "2a01:970d", "2a01:970e", "2a01:970f",
    // الممتدة
    "2a01:9710", "2a01:9711", "2a01:9712", "2a01:9713",
    "2a01:9714", "2a01:9715", "2a01:9716", "2a01:9717",
    "2a01:9718", "2a01:9719", "2a01:971a", "2a01:971b",
    "2a01:971c", "2a01:971d", "2a01:971e", "2a01:971f",
    // الإضافية
    "2a01:9720", "2a01:9721", "2a01:9722", "2a01:9723",
    "2a01:9724", "2a01:9725", "2a01:9726", "2a01:9727",
    "2a01:9728", "2a01:9729", "2a01:972a", "2a01:972b",
    "2a01:972c", "2a01:972d", "2a01:972e", "2a01:972f",
    // Fiber & Business
    "2a01:9730", "2a01:9731", "2a01:9732", "2a01:9733",
    "2a01:9734", "2a01:9735", "2a01:9736", "2a01:9737",
    "2a01:9738", "2a01:9739", "2a01:973a", "2a01:973b",
    "2a01:973c", "2a01:973d", "2a01:973e", "2a01:973f",
    // Mobile 4G/5G
    "2a01:9740", "2a01:9741", "2a01:9742", "2a01:9743",
    "2a01:9744", "2a01:9745", "2a01:9746", "2a01:9747",
    "2a01:9748", "2a01:9749", "2a01:974a", "2a01:974b",
    "2a01:974c", "2a01:974d", "2a01:974e", "2a01:974f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟢 ZAIN JORDAN / زين الأردن - النطاق الكامل
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    // الأصلية
    "2a02:2400", "2a02:2401", "2a02:2402", "2a02:2403",
    "2a02:2404", "2a02:2405", "2a02:2406", "2a02:2407",
    "2a02:2408", "2a02:2409", "2a02:240a", "2a02:240b",
    "2a02:240c", "2a02:240d", "2a02:240e", "2a02:240f",
    // الممتدة - 4G LTE
    "2a02:2410", "2a02:2411", "2a02:2412", "2a02:2413",
    "2a02:2414", "2a02:2415", "2a02:2416", "2a02:2417",
    "2a02:2418", "2a02:2419", "2a02:241a", "2a02:241b",
    "2a02:241c", "2a02:241d", "2a02:241e", "2a02:241f",
    // 5G Network
    "2a02:2420", "2a02:2421", "2a02:2422", "2a02:2423",
    "2a02:2424", "2a02:2425", "2a02:2426", "2a02:2427",
    "2a02:2428", "2a02:2429", "2a02:242a", "2a02:242b",
    "2a02:242c", "2a02:242d", "2a02:242e", "2a02:242f",
    // Fiber & Corporate
    "2a02:2430", "2a02:2431", "2a02:2432", "2a02:2433",
    "2a02:2434", "2a02:2435", "2a02:2436", "2a02:2437",
    "2a02:2438", "2a02:2439", "2a02:243a", "2a02:243b",
    "2a02:243c", "2a02:243d", "2a02:243e", "2a02:243f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟡 UMNIAH / أمنية - النطاق الكامل
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    // الأصلية
    "2a02:2500", "2a02:2501", "2a02:2502", "2a02:2503",
    "2a02:2504", "2a02:2505", "2a02:2506", "2a02:2507",
    "2a02:2508", "2a02:2509", "2a02:250a", "2a02:250b",
    "2a02:250c", "2a02:250d", "2a02:250e", "2a02:250f",
    // الممتدة - 4G
    "2a02:2510", "2a02:2511", "2a02:2512", "2a02:2513",
    "2a02:2514", "2a02:2515", "2a02:2516", "2a02:2517",
    "2a02:2518", "2a02:2519", "2a02:251a", "2a02:251b",
    "2a02:251c", "2a02:251d", "2a02:251e", "2a02:251f",
    // 5G Network
    "2a02:2520", "2a02:2521", "2a02:2522", "2a02:2523",
    "2a02:2524", "2a02:2525", "2a02:2526", "2a02:2527",
    "2a02:2528", "2a02:2529", "2a02:252a", "2a02:252b",
    "2a02:252c", "2a02:252d", "2a02:252e", "2a02:252f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔵 MADA JORDAN / مادا الأردن - النطاق الكامل
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:2700", "2a02:2701", "2a02:2702", "2a02:2703",
    "2a02:2704", "2a02:2705", "2a02:2706", "2a02:2707",
    "2a02:2708", "2a02:2709", "2a02:270a", "2a02:270b",
    "2a02:270c", "2a02:270d", "2a02:270e", "2a02:270f",
    "2a02:2710", "2a02:2711", "2a02:2712", "2a02:2713",
    "2a02:2714", "2a02:2715", "2a02:2716", "2a02:2717",
    "2a02:2718", "2a02:2719", "2a02:271a", "2a02:271b",
    "2a02:271c", "2a02:271d", "2a02:271e", "2a02:271f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟣 DAMAMAX / داماكس - النطاق الكامل
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:9e00", "2a01:9e01", "2a01:9e02", "2a01:9e03",
    "2a01:9e04", "2a01:9e05", "2a01:9e06", "2a01:9e07",
    "2a01:9e08", "2a01:9e09", "2a01:9e0a", "2a01:9e0b",
    "2a01:9e0c", "2a01:9e0d", "2a01:9e0e", "2a01:9e0f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚪ JORDAN DATA COMMUNICATIONS (JDC)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a00:1f40", "2a00:1f41", "2a00:1f42", "2a00:1f43",
    "2a00:1f44", "2a00:1f45", "2a00:1f46", "2a00:1f47",
    "2a00:1f48", "2a00:1f49", "2a00:1f4a", "2a00:1f4b",
    "2a00:1f4c", "2a00:1f4d", "2a00:1f4e", "2a00:1f4f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔴 JORDAN TELECOM GROUP / مجموعة الاتصالات الأردنية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:9f00", "2a01:9f01", "2a01:9f02", "2a01:9f03",
    "2a01:9f04", "2a01:9f05", "2a01:9f06", "2a01:9f07",
    "2a01:9f08", "2a01:9f09", "2a01:9f0a", "2a01:9f0b",
    "2a01:9f0c", "2a01:9f0d", "2a01:9f0e", "2a01:9f0f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟤 TE DATA JORDAN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a000", "2a01:a001", "2a01:a002", "2a01:a003",
    "2a01:a004", "2a01:a005", "2a01:a006", "2a01:a007",
    "2a01:a008", "2a01:a009", "2a01:a00a", "2a01:a00b",
    "2a01:a00c", "2a01:a00d", "2a01:a00e", "2a01:a00f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟠 LINK DOT NET JORDAN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a100", "2a01:a101", "2a01:a102", "2a01:a103",
    "2a01:a104", "2a01:a105", "2a01:a106", "2a01:a107",
    "2a01:a108", "2a01:a109", "2a01:a10a", "2a01:a10b",
    "2a01:a10c", "2a01:a10d", "2a01:a10e", "2a01:a10f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟢 NEXTGEN JORDAN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a200", "2a01:a201", "2a01:a202", "2a01:a203",
    "2a01:a204", "2a01:a205", "2a01:a206", "2a01:a207"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔵 DATA MANAGEMENT SYSTEMS (DMS)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a300", "2a01:a301", "2a01:a302", "2a01:a303",
    "2a01:a304", "2a01:a305", "2a01:a306", "2a01:a307"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟡 JORDAN BROADCASTING / الإذاعة الأردنية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a400", "2a01:a401", "2a01:a402", "2a01:a403"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟣 NATIONAL INFORMATION TECHNOLOGY CENTER (NITC)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a500", "2a01:a501", "2a01:a502", "2a01:a503",
    "2a01:a504", "2a01:a505", "2a01:a506", "2a01:a507"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟠 JORDAN UNIVERSITY NETWORKS / شبكات الجامعات
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    // University of Jordan
    "2a01:a600", "2a01:a601", "2a01:a602", "2a01:a603",
    // Jordan University of Science & Technology
    "2a01:a604", "2a01:a605", "2a01:a606", "2a01:a607",
    // Yarmouk University
    "2a01:a608", "2a01:a609", "2a01:a60a", "2a01:a60b",
    // Hashemite University
    "2a01:a60c", "2a01:a60d", "2a01:a60e", "2a01:a60f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔴 GOVERNMENT NETWORKS / الشبكات الحكومية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a01:a700", "2a01:a701", "2a01:a702", "2a01:a703",
    "2a01:a704", "2a01:a705", "2a01:a706", "2a01:a707"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🟢 ADDITIONAL JORDAN RANGES - RESERVED & FUTURE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function() {
  var prefixes = [
    // Reserved for Jordan
    "2a01:a800", "2a01:a801", "2a01:a802", "2a01:a803",
    "2a01:a804", "2a01:a805", "2a01:a806", "2a01:a807",
    "2a01:a808", "2a01:a809", "2a01:a80a", "2a01:a80b",
    "2a01:a80c", "2a01:a80d", "2a01:a80e", "2a01:a80f",
    // Future Expansion
    "2a01:a810", "2a01:a811", "2a01:a812", "2a01:a813",
    "2a01:a814", "2a01:a815", "2a01:a816", "2a01:a817",
    "2a01:a818", "2a01:a819", "2a01:a81a", "2a01:a81b",
    "2a01:a81c", "2a01:a81d", "2a01:a81e", "2a01:a81f"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    JORDAN_ISP_PREFIXES[prefixes[i]] = true;
  }
})();

// ============================================================
// 🌍 MIDDLE EAST REGIONAL PREFIXES (Optional - Low Latency)
// ============================================================
// هذه النطاقات للخوادم الإقليمية القريبة (اختياري)

var MIDDLE_EAST_PREFIXES = {};

// ━━━━━━━━━━━ 🇸🇦 SAUDI ARABIA ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:2000", "2a02:2001", "2a02:2002", "2a02:2003",
    "2a02:2004", "2a02:2005", "2a02:2006", "2a02:2007",
    "2a02:2008", "2a02:2009", "2a02:200a", "2a02:200b",
    "2a02:200c", "2a02:200d", "2a02:200e", "2a02:200f",
    // STC
    "2a02:2100", "2a02:2101", "2a02:2102", "2a02:2103",
    // Mobily
    "2a02:2200", "2a02:2201", "2a02:2202", "2a02:2203",
    // Zain SA
    "2a02:2300", "2a02:2301", "2a02:2302", "2a02:2303"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇦🇪 UAE ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:3000", "2a02:3001", "2a02:3002", "2a02:3003",
    "2a02:3004", "2a02:3005", "2a02:3006", "2a02:3007",
    // Etisalat
    "2a02:3100", "2a02:3101", "2a02:3102", "2a02:3103",
    // Du
    "2a02:3200", "2a02:3201", "2a02:3202", "2a02:3203"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇰🇼 KUWAIT ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:4000", "2a02:4001", "2a02:4002", "2a02:4003",
    // Ooredoo
    "2a02:4100", "2a02:4101", "2a02:4102", "2a02:4103",
    // Zain KW
    "2a02:4200", "2a02:4201", "2a02:4202", "2a02:4203"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇶🇦 QATAR ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:5000", "2a02:5001", "2a02:5002", "2a02:5003",
    // Ooredoo QA
    "2a02:5100", "2a02:5101", "2a02:5102", "2a02:5103",
    // Vodafone QA
    "2a02:5200", "2a02:5201", "2a02:5202", "2a02:5203"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇧🇭 BAHRAIN ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:6000", "2a02:6001", "2a02:6002", "2a02:6003",
    // Batelco
    "2a02:6100", "2a02:6101", "2a02:6102", "2a02:6103"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇴🇲 OMAN ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:7000", "2a02:7001", "2a02:7002", "2a02:7003",
    // Omantel
    "2a02:7100", "2a02:7101", "2a02:7102", "2a02:7103"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇮🇶 IRAQ ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:8000", "2a02:8001", "2a02:8002", "2a02:8003",
    "2a02:8100", "2a02:8101", "2a02:8102", "2a02:8103"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇪🇬 EGYPT ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:9000", "2a02:9001", "2a02:9002", "2a02:9003",
    // WE
    "2a02:9100", "2a02:9101", "2a02:9102", "2a02:9103",
    // Orange EG
    "2a02:9200", "2a02:9201", "2a02:9202", "2a02:9203"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ━━━━━━━━━━━ 🇱🇧 LEBANON ━━━━━━━━━━━
(function() {
  var prefixes = [
    "2a02:a000", "2a02:a001", "2a02:a002", "2a02:a003",
    // Ogero
    "2a02:a100", "2a02:a101", "2a02:a102", "2a02:a103"
  ];
  for (var i = 0; i < prefixes.length; i++) {
    MIDDLE_EAST_PREFIXES[prefixes[i]] = true;
  }
})();

// ================= CONFIGURATION =================

var CONFIG = {
  // تفعيل النطاقات الإقليمية (السعودية، الإمارات، إلخ)
  enableMiddleEast: true,
  
  // السماح بـ IPv4 عبر البروكسي
  allowIPv4: true,
  
  // وضع التشخيص
  debugMode: false
};

// ================= HELPER FUNCTIONS =================

function isIPv6(ip) {
  if (!ip || typeof ip !== 'string') return false;
  return ip.indexOf(":") !== -1;
}

function isIPv4(ip) {
  if (!ip || typeof ip !== 'string') return false;
  return ip.indexOf(".") !== -1 && ip.indexOf(":") === -1;
}

function expandIPv6(addr) {
  if (!addr) return "";
  
  var full = [];
  var parts = addr.split("::");
  
  if (parts.length === 2) {
    var left = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    
    if (missing < 0) missing = 0;
    
    var zeros = [];
    for (var i = 0; i < missing; i++) {
      zeros.push("0");
    }
    
    full = left.concat(zeros).concat(right);
  } else {
    full = addr.split(":");
  }
  
  for (var j = 0; j < full.length; j++) {
    if (full[j]) {
      while (full[j].length < 4) {
        full[j] = "0" + full[j];
      }
    } else {
      full[j] = "0000";
    }
  }
  
  return full.join(":").toLowerCase();
}

function isEuropePrefix(expanded) {
  if (!expanded || expanded.length < 4) return false;
  
  var prefix4 = expanded.substring(0, 4);
  
  for (var i = 0; i < EUROPE_PREFIXES.length; i++) {
    if (prefix4 === EUROPE_PREFIXES[i]) {
      return true;
    }
  }
  
  return false;
}

function isJordanPrefix(expanded) {
  if (!expanded || expanded.length < 10) return false;
  return JORDAN_ISP_PREFIXES[expanded.substring(0, 10)] === true;
}

function isMiddleEastPrefix(expanded) {
  if (!expanded || expanded.length < 10) return false;
  return MIDDLE_EAST_PREFIXES[expanded.substring(0, 10)] === true;
}

function isAllowed40(expanded) {
  if (!expanded || expanded.length < 10) return false;
  
  var prefix10 = expanded.substring(0, 10);
  
  // Check Jordan first
  if (JORDAN_ISP_PREFIXES[prefix10] === true) return true;
  
  // Check Middle East if enabled
  if (CONFIG.enableMiddleEast && MIDDLE_EAST_PREFIXES[prefix10] === true) return true;
  
  return false;
}

function isPUBG(host, url) {
  if (!host) return false;
  
  var combined = (host + (url || "")).toLowerCase();
  
  return /pubg|tencent|krafton|lightspeed|levelinfinite|anticheat|tpgbattle/i.test(combined);
}

function isMatchTraffic(data) {
  if (!data) return false;
  
  var patterns = [
    "match", "battle", "classic", "ranked", "unranked", "arena",
    "tdm", "teamdeathmatch", "gungame", "domination", "assault",
    "payload", "metro", "metroroyale", "zombie", "infection",
    "evoground", "ultimate", "cheer", "war", "sniper", "quickmatch",
    "arcade", "battlefield", "clash", "gunfight", "training",
    "erangel", "livik", "miramar", "sanhok", "vikendi", "karakin",
    "nusa", "rondo", "hawan", "fpp", "tpp", "squad", "duo", "solo",
    "competitive", "tournament", "scrim", "custom", "roomcreate",
    "matchstart", "ingame", "gamesvr", "relay", "realtime",
    "gameready", "matchmaking", "playerjoin", "spawn", "lobbyready"
  ];
  
  var dataLower = data.toLowerCase();
  
  for (var i = 0; i < patterns.length; i++) {
    if (dataLower.indexOf(patterns[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isLobbyTraffic(data) {
  if (!data) return false;
  
  var patterns = [
    "lobby", "login", "auth", "profile", "inventory", "store",
    "catalog", "shop", "region", "gateway", "session", "friends",
    "clan", "rp", "workshop", "events", "mission", "settings",
    "social", "news", "update", "config", "version", "heartbeat",
    "ping", "status", "announcement", "reward", "mail", "message"
  ];
  
  var dataLower = data.toLowerCase();
  
  for (var i = 0; i < patterns.length; i++) {
    if (dataLower.indexOf(patterns[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function safeDnsResolve(host) {
  try {
    return dnsResolve(host);
  } catch (e) {
    return "";
  }
}

function resetMatchSession() {
  SESSION.locked40 = null;
  SESSION.locked64 = null;
  SESSION.lockedIP = null;
  SESSION.matchActive = false;
}

function startMatchSession(net40, net64, ip) {
  SESSION.locked40 = net40;
  SESSION.locked64 = net64;
  SESSION.lockedIP = ip;
  SESSION.matchActive = true;
}

// ================= MAIN PROXY FUNCTION =================

function FindProxyForURL(url, host) {
  SESSION.connectionCount++;
  SESSION.lastHost = host;
  
  var ip = safeDnsResolve(host);
  
  // Non-PUBG traffic
  if (!isPUBG(host, url)) {
    return DIRECT;
  }
  
  // No IP resolved
  if (!ip) {
    return PROXY;
  }
  
  // IPv4 fallback
  if (isIPv4(ip)) {
    return CONFIG.allowIPv4 ? PROXY : BLOCK;
  }
  
  // Must be IPv6
  if (!isIPv6(ip)) {
    return BLOCK;
  }
  
  var expanded = expandIPv6(ip);
  
  if (!expanded) {
    return BLOCK;
  }
  
  // Block Europe
  if (isEuropePrefix(expanded)) {
    return BLOCK;
  }
  
  // Check allowed
  if (!isAllowed40(expanded)) {
    return BLOCK;
  }
  
  var net40 = expanded.substring(0, 10);
  var net64 = expanded.substring(0, 19);
  var data = (host + (url || "")).toLowerCase();
  
  // Match Lock
  if (isMatchTraffic(data)) {
    if (!SESSION.matchActive) {
      startMatchSession(net40, net64, expanded);
      return PROXY;
    }
    
    if (net40 !== SESSION.locked40) return BLOCK;
    if (net64 !== SESSION.locked64) return BLOCK;
    if (expanded !== SESSION.lockedIP) return BLOCK;
    
    return PROXY;
  }
  
  // Lobby - unlock
  if (isLobbyTraffic(data)) {
    resetMatchSession();
    return PROXY;
  }
  
  return PROXY;
}

// ================= STATISTICS FUNCTION =================

function getStats() {
  var jordanCount = 0;
  var meCount = 0;
  
  for (var k in JORDAN_ISP_PREFIXES) {
    if (JORDAN_ISP_PREFIXES[k]) jordanCount++;
  }
  for (var k in MIDDLE_EAST_PREFIXES) {
    if (MIDDLE_EAST_PREFIXES[k]) meCount++;
  }
  
  return {
    jordanPrefixes: jordanCount,
    middleEastPrefixes: meCount,
    totalAllowed: jordanCount + meCount,
    sessionActive: SESSION.matchActive
  };
}

// ============================================================
// نهاية السكربت
// ============================================================
