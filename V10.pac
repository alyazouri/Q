// ============================================================
// GAME BOOSTER ALPHA v2.0
// Ultra-optimized PAC for PUBG Mobile
// Focus: Lobby Speed + In-Game Performance
// ============================================================

// ================= ADVANCED CONFIGURATION =================
var CONFIG = {
  // Match proxies - sorted by speed (fastest first)
  MATCH_TIER1: "PROXY 46.185.131.218:20001",    // أسرع - للماتش الحي
  MATCH_TIER2: "PROXY 212.35.66.45:8085",        // احتياطي سريع
  MATCH_TIER3: "PROXY 46.185.131.218:443",       // احتياطي ثانوي
  
  // Lobby proxies - optimized pool
  LOBBY_FAST: [
    "PROXY 212.35.66.45:8181",    // Port 8181 عادة أسرع للويب سوكت
    "PROXY 46.185.131.218:443",   // HTTPS port - استقرار عالي
    "PROXY 212.35.66.45:8085"     // احتياطي
  ],
  
  // Special channels
  VOICE_PROXY: "PROXY 46.185.131.218:20001",     // صوت عالي الجودة
  CDN_DIRECT: "DIRECT",                           // CDN مباشر لأقصى سرعة
  
  // Control
  BLOCK: "PROXY 127.0.0.1:9",
  DIRECT: "DIRECT",
  
  // Performance tuning
  DNS_CACHE_TIME: 600000,        // 10 دقائق
  STICKY_SESSION_TIME: 1800000,  // 30 دقيقة للماتش
  AGGRESSIVE_BLOCK: true          // حظر قوي للمناطق البعيدة
};

// ================= JORDAN IP RANGES (EXPANDED) =================
// هذه النطاقات تشمل جميع مزودي الخدمة الرئيسيين في الأردن
// مما يضمن توجيه صحيح لأي سيرفر محلي
var JORDAN_RANGES = [
  ["178.77.0.0",  "255.255.0.0"],   // Zain Mobile (4G/5G)
  ["46.185.0.0",  "255.255.0.0"],   // Zain Mobile data
  ["176.29.0.0",  "255.255.0.0"],   // Zain Mobile
  ["77.245.0.0",  "255.255.0.0"],   // Zain Mobile
  ["176.28.0.0",  "255.255.0.0"],   // Zain Mobile
  ["37.202.0.0",  "255.255.0.0"],   // Orange Mobile/Data
  ["85.159.0.0",  "255.255.0.0"],   // Orange Mobile/Data
  ["93.93.0.0",   "255.255.0.0"],   // Orange Mobile/Data
  ["93.95.0.0",   "255.255.0.0"],   // Orange Mobile/Data
  ["176.57.0.0",  "255.255.0.0"],    // Umniah Mobile
  ["37.252.0.0",  "255.255.0.0"],   // Orange Fixed/Fiber
  ["94.127.0.0",  "255.255.0.0"],   // Orange Fixed
  ["79.134.0.0",  "255.255.0.0"],   // DSL/Fiber Pools (general)
  ["79.173.0.0",  "255.255.0.0"],   // DSL/Fiber Pools
  ["149.200.0.0", "255.255.0.0"],   // Hosting/Home Pools (often fixed)
  ["188.123.0.0","255.255.0.0"],   // Umniah Fixed
  ["188.247.0.0","255.255.0.0"],    // Umniah

];

// ================= PRIORITY BLACKLIST =================
// هذه القائمة تحتوي على نطاقات السيرفرات البعيدة التي تسبب ping عالي
// الحظر هنا يجبر اللعبة على استخدام سيرفرات أقرب
var HIGH_LATENCY_RANGES = [
  ["0.0.0.0", "255.0.0.0"],
  ["1.0.0.0", "255.0.0.0"],
  ["2.0.0.0", "255.0.0.0"],
  ["3.0.0.0", "255.0.0.0"],
  ["4.0.0.0", "255.0.0.0"],
  ["5.0.0.0", "255.0.0.0"],
  ["6.0.0.0", "255.0.0.0"],
  ["7.0.0.0", "255.0.0.0"],
  ["8.0.0.0", "255.0.0.0"],
  ["9.0.0.0", "255.0.0.0"],
  ["10.0.0.0", "255.0.0.0"],
  ["11.0.0.0", "255.0.0.0"],
  ["12.0.0.0", "255.0.0.0"],
  ["13.0.0.0", "255.0.0.0"],
  ["14.0.0.0", "255.0.0.0"],
  ["15.0.0.0", "255.0.0.0"],
  ["16.0.0.0", "255.0.0.0"],
  ["17.0.0.0", "255.0.0.0"],
  ["18.0.0.0", "255.0.0.0"],
  ["19.0.0.0", "255.0.0.0"],
  ["20.0.0.0", "255.0.0.0"],
  ["21.0.0.0", "255.0.0.0"],
  ["22.0.0.0", "255.0.0.0"],
  ["23.0.0.0", "255.0.0.0"],
  ["24.0.0.0", "255.0.0.0"],
  ["25.0.0.0", "255.0.0.0"],
  ["26.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"],
  ["28.0.0.0", "255.0.0.0"],
  ["29.0.0.0", "255.0.0.0"],
  ["30.0.0.0", "255.0.0.0"],
  ["31.0.0.0", "255.0.0.0"],
  ["32.0.0.0", "255.0.0.0"],
  ["33.0.0.0", "255.0.0.0"],
  ["34.0.0.0", "255.0.0.0"],
  ["35.0.0.0", "255.0.0.0"],
  ["36.0.0.0", "255.0.0.0"],
  ["37.0.0.0", "255.128.0.0"],
  ["37.128.0.0", "255.192.0.0"],
  ["37.192.0.0", "255.248.0.0"],
  ["37.200.0.0", "255.254.0.0"],
  ["37.203.0.0", "255.255.0.0"],
  ["37.204.0.0", "255.252.0.0"],
  ["37.208.0.0", "255.240.0.0"],
  ["37.224.0.0", "255.240.0.0"],
  ["37.240.0.0", "255.248.0.0"],
  ["37.248.0.0", "255.252.0.0"],
  ["37.253.0.0", "255.255.0.0"],
  ["37.254.0.0", "255.254.0.0"],
  ["38.0.0.0", "255.0.0.0"],
  ["39.0.0.0", "255.0.0.0"],
  ["40.0.0.0", "255.0.0.0"],
  ["41.0.0.0", "255.0.0.0"],
  ["42.0.0.0", "255.0.0.0"],
  ["43.0.0.0", "255.0.0.0"],
  ["44.0.0.0", "255.0.0.0"],
  ["45.0.0.0", "255.0.0.0"],
  ["46.0.0.0", "255.128.0.0"],
  ["46.128.0.0", "255.224.0.0"],
  ["46.160.0.0", "255.240.0.0"],
  ["46.176.0.0", "255.248.0.0"],
  ["46.184.0.0", "255.255.0.0"],
  ["46.186.0.0", "255.254.0.0"],
  ["46.188.0.0", "255.252.0.0"],
  ["46.192.0.0", "255.192.0.0"],
  ["47.0.0.0", "255.0.0.0"],
  ["48.0.0.0", "255.0.0.0"],
  ["49.0.0.0", "255.0.0.0"],
  ["50.0.0.0", "255.0.0.0"],
  ["51.0.0.0", "255.0.0.0"],
  ["52.0.0.0", "255.0.0.0"],
  ["53.0.0.0", "255.0.0.0"],
  ["54.0.0.0", "255.0.0.0"],
  ["55.0.0.0", "255.0.0.0"],
  ["56.0.0.0", "255.0.0.0"],
  ["57.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "255.0.0.0"],
  ["59.0.0.0", "255.0.0.0"],
  ["60.0.0.0", "255.0.0.0"],
  ["61.0.0.0", "255.0.0.0"],
  ["62.0.0.0", "255.0.0.0"],
  ["63.0.0.0", "255.0.0.0"],
  ["64.0.0.0", "255.0.0.0"],
  ["65.0.0.0", "255.0.0.0"],
  ["66.0.0.0", "255.0.0.0"],
  ["67.0.0.0", "255.0.0.0"],
  ["68.0.0.0", "255.0.0.0"],
  ["69.0.0.0", "255.0.0.0"],
  ["70.0.0.0", "255.0.0.0"],
  ["71.0.0.0", "255.0.0.0"],
  ["72.0.0.0", "255.0.0.0"],
  ["73.0.0.0", "255.0.0.0"],
  ["74.0.0.0", "255.0.0.0"],
  ["75.0.0.0", "255.0.0.0"],
  ["76.0.0.0", "255.0.0.0"],
  ["77.0.0.0", "255.128.0.0"],
  ["77.128.0.0", "255.192.0.0"],
  ["77.192.0.0", "255.224.0.0"],
  ["77.224.0.0", "255.240.0.0"],
  ["77.240.0.0", "255.252.0.0"],
  ["77.244.0.0", "255.255.0.0"],
  ["77.246.0.0", "255.254.0.0"],
  ["77.248.0.0", "255.248.0.0"],
  ["78.0.0.0", "255.0.0.0"],
  ["79.0.0.0", "255.128.0.0"],
  ["79.128.0.0", "255.252.0.0"],
  ["79.132.0.0", "255.254.0.0"],
  ["79.135.0.0", "255.255.0.0"],
  ["79.136.0.0", "255.248.0.0"],
  ["79.144.0.0", "255.240.0.0"],
  ["79.160.0.0", "255.240.0.0"],
  ["79.168.0.0", "255.252.0.0"],
  ["79.172.0.0", "255.255.0.0"],
  ["79.174.0.0", "255.254.0.0"],
  ["79.176.0.0", "255.240.0.0"],
  ["79.192.0.0", "255.128.0.0"],
  ["80.0.0.0", "255.0.0.0"],
  ["81.0.0.0", "255.0.0.0"],
  ["82.0.0.0", "255.0.0.0"],
  ["83.0.0.0", "255.0.0.0"],
  ["84.0.0.0", "255.0.0.0"],
  ["85.0.0.0", "255.128.0.0"],
  ["85.128.0.0", "255.240.0.0"],
  ["85.144.0.0", "255.248.0.0"],
  ["85.152.0.0", "255.252.0.0"],
  ["85.156.0.0", "255.254.0.0"],
  ["85.158.0.0", "255.255.0.0"],
  ["85.160.0.0", "255.224.0.0"],
  ["85.192.0.0", "255.192.0.0"],
  ["86.0.0.0", "255.0.0.0"],
  ["87.0.0.0", "255.0.0.0"],
  ["88.0.0.0", "255.0.0.0"],
  ["89.0.0.0", "255.0.0.0"],
  ["90.0.0.0", "255.0.0.0"],
  ["91.0.0.0", "255.0.0.0"],
  ["92.0.0.0", "255.0.0.0"],
  ["93.0.0.0", "255.192.0.0"],
  ["93.64.0.0", "255.240.0.0"],
  ["93.80.0.0", "255.248.0.0"],
  ["93.88.0.0", "255.252.0.0"],
  ["93.92.0.0", "255.255.0.0"],
  ["93.94.0.0", "255.255.0.0"],
  ["93.96.0.0", "255.224.0.0"],
  ["93.128.0.0", "255.128.0.0"],
  ["94.0.0.0", "255.192.0.0"],
  ["94.64.0.0", "255.224.0.0"],
  ["94.96.0.0", "255.240.0.0"],
  ["94.112.0.0", "255.248.0.0"],
  ["94.120.0.0", "255.252.0.0"],
  ["94.124.0.0", "255.254.0.0"],
  ["94.126.0.0", "255.255.0.0"],
  ["94.128.0.0", "255.128.0.0"],
  ["95.0.0.0", "255.0.0.0"],
  ["96.0.0.0", "255.0.0.0"],
  ["97.0.0.0", "255.0.0.0"],
  ["98.0.0.0", "255.0.0.0"],
  ["99.0.0.0", "255.0.0.0"],
  ["100.0.0.0", "255.0.0.0"],
  ["101.0.0.0", "255.0.0.0"],
  ["102.0.0.0", "255.0.0.0"],
  ["103.0.0.0", "255.0.0.0"],
  ["104.0.0.0", "255.0.0.0"],
  ["105.0.0.0", "255.0.0.0"],
  ["106.0.0.0", "255.0.0.0"],
  ["107.0.0.0", "255.0.0.0"],
  ["108.0.0.0", "255.0.0.0"],
  ["109.0.0.0", "255.0.0.0"],
  ["110.0.0.0", "255.0.0.0"],
  ["111.0.0.0", "255.0.0.0"],
  ["112.0.0.0", "255.0.0.0"],
  ["113.0.0.0", "255.0.0.0"],
  ["114.0.0.0", "255.0.0.0"],
  ["115.0.0.0", "255.0.0.0"],
  ["116.0.0.0", "255.0.0.0"],
  ["117.0.0.0", "255.0.0.0"],
  ["118.0.0.0", "255.0.0.0"],
  ["119.0.0.0", "255.0.0.0"],
  ["120.0.0.0", "255.0.0.0"],
  ["121.0.0.0", "255.0.0.0"],
  ["122.0.0.0", "255.0.0.0"],
  ["123.0.0.0", "255.0.0.0"],
  ["124.0.0.0", "255.0.0.0"],
  ["125.0.0.0", "255.0.0.0"],
  ["126.0.0.0", "255.0.0.0"],
  ["127.0.0.0", "255.0.0.0"],
  ["128.0.0.0", "255.0.0.0"],
  ["129.0.0.0", "255.0.0.0"],
  ["130.0.0.0", "255.0.0.0"],
  ["131.0.0.0", "255.0.0.0"],
  ["132.0.0.0", "255.0.0.0"],
  ["133.0.0.0", "255.0.0.0"],
  ["134.0.0.0", "255.0.0.0"],
  ["135.0.0.0", "255.0.0.0"],
  ["136.0.0.0", "255.0.0.0"],
  ["137.0.0.0", "255.0.0.0"],
  ["138.0.0.0", "255.0.0.0"],
  ["139.0.0.0", "255.0.0.0"],
  ["140.0.0.0", "255.0.0.0"],
  ["141.0.0.0", "255.0.0.0"],
  ["142.0.0.0", "255.0.0.0"],
  ["143.0.0.0", "255.0.0.0"],
  ["144.0.0.0", "255.0.0.0"],
  ["145.0.0.0", "255.0.0.0"],
  ["146.0.0.0", "255.0.0.0"],
  ["147.0.0.0", "255.0.0.0"],
  ["148.0.0.0", "255.0.0.0"],
  ["149.0.0.0", "255.128.0.0"],
  ["149.128.0.0", "255.192.0.0"],
  ["149.192.0.0", "255.248.0.0"],
  ["149.201.0.0", "255.255.0.0"],
  ["149.202.0.0", "255.254.0.0"],
  ["149.204.0.0", "255.252.0.0"],
  ["149.208.0.0", "255.240.0.0"],
  ["149.224.0.0", "255.224.0.0"],
  ["150.0.0.0", "255.0.0.0"],
  ["151.0.0.0", "255.0.0.0"],
  ["152.0.0.0", "255.0.0.0"],
  ["153.0.0.0", "255.0.0.0"],
  ["154.0.0.0", "255.0.0.0"],
  ["155.0.0.0", "255.0.0.0"],
  ["156.0.0.0", "255.0.0.0"],
  ["157.0.0.0", "255.0.0.0"],
  ["158.0.0.0", "255.0.0.0"],
  ["159.0.0.0", "255.0.0.0"],
  ["160.0.0.0", "255.0.0.0"],
  ["161.0.0.0", "255.0.0.0"],
  ["162.0.0.0", "255.0.0.0"],
  ["163.0.0.0", "255.0.0.0"],
  ["164.0.0.0", "255.0.0.0"],
  ["165.0.0.0", "255.0.0.0"],
  ["166.0.0.0", "255.0.0.0"],
  ["167.0.0.0", "255.0.0.0"],
  ["168.0.0.0", "255.0.0.0"],
  ["169.0.0.0", "255.0.0.0"],
  ["170.0.0.0", "255.0.0.0"],
  ["171.0.0.0", "255.0.0.0"],
  ["172.0.0.0", "255.0.0.0"],
  ["173.0.0.0", "255.0.0.0"],
  ["174.0.0.0", "255.0.0.0"],
  ["175.0.0.0", "255.0.0.0"],
  ["176.0.0.0", "255.240.0.0"],
  ["176.16.0.0", "255.248.0.0"],
  ["176.24.0.0", "255.252.0.0"],
  ["176.30.0.0", "255.254.0.0"],
  ["176.32.0.0", "255.240.0.0"],
  ["176.48.0.0", "255.248.0.0"],
  ["176.56.0.0", "255.255.0.0"],
  ["176.58.0.0", "255.254.0.0"],
  ["176.60.0.0", "255.252.0.0"],
  ["176.64.0.0", "255.192.0.0"],
  ["176.128.0.0", "255.128.0.0"],
  ["177.0.0.0", "255.0.0.0"],
  ["178.0.0.0", "255.192.0.0"],
  ["178.64.0.0", "255.248.0.0"],
  ["178.72.0.0", "255.252.0.0"],
  ["178.76.0.0", "255.255.0.0"],
  ["178.78.0.0", "255.254.0.0"],
  ["178.80.0.0", "255.240.0.0"],
  ["178.96.0.0", "255.224.0.0"],
  ["178.128.0.0", "255.128.0.0"],
  ["179.0.0.0", "255.0.0.0"],
  ["180.0.0.0", "255.0.0.0"],
  ["181.0.0.0", "255.0.0.0"],
  ["182.0.0.0", "255.0.0.0"],
  ["183.0.0.0", "255.0.0.0"],
  ["184.0.0.0", "255.0.0.0"],
  ["185.0.0.0", "255.0.0.0"],
  ["186.0.0.0", "255.0.0.0"],
  ["187.0.0.0", "255.0.0.0"],
  ["188.0.0.0", "255.192.0.0"],
  ["188.64.0.0", "255.224.0.0"],
  ["188.96.0.0", "255.240.0.0"],
  ["188.112.0.0", "255.248.0.0"],
  ["188.120.0.0", "255.254.0.0"],
  ["188.122.0.0", "255.255.0.0"],
  ["188.124.0.0", "255.252.0.0"],
  ["188.128.0.0", "255.192.0.0"],
  ["188.192.0.0", "255.224.0.0"],
  ["188.224.0.0", "255.240.0.0"],
  ["188.240.0.0", "255.252.0.0"],
  ["188.244.0.0", "255.254.0.0"],
  ["188.246.0.0", "255.255.0.0"],
  ["188.248.0.0", "255.248.0.0"],
  ["189.0.0.0", "255.0.0.0"],
  ["190.0.0.0", "255.0.0.0"],
  ["191.0.0.0", "255.0.0.0"],
  ["192.0.0.0", "255.0.0.0"],
  ["193.0.0.0", "255.0.0.0"],
  ["194.0.0.0", "255.0.0.0"],
  ["195.0.0.0", "255.0.0.0"],
  ["196.0.0.0", "255.0.0.0"],
  ["197.0.0.0", "255.0.0.0"],
  ["198.0.0.0", "255.0.0.0"],
  ["199.0.0.0", "255.0.0.0"],
  ["200.0.0.0", "255.0.0.0"],
  ["201.0.0.0", "255.0.0.0"],
  ["202.0.0.0", "255.0.0.0"],
  ["203.0.0.0", "255.0.0.0"],
  ["204.0.0.0", "255.0.0.0"],
  ["205.0.0.0", "255.0.0.0"],
  ["206.0.0.0", "255.0.0.0"],
  ["207.0.0.0", "255.0.0.0"],
  ["208.0.0.0", "255.0.0.0"],
  ["209.0.0.0", "255.0.0.0"],
  ["210.0.0.0", "255.0.0.0"],
  ["211.0.0.0", "255.0.0.0"],
  ["212.0.0.0", "255.0.0.0"],
  ["213.0.0.0", "255.0.0.0"],
  ["214.0.0.0", "255.0.0.0"],
  ["215.0.0.0", "255.0.0.0"],
  ["216.0.0.0", "255.0.0.0"],
  ["217.0.0.0", "255.0.0.0"],
  ["218.0.0.0", "255.0.0.0"],
  ["219.0.0.0", "255.0.0.0"],
  ["220.0.0.0", "255.0.0.0"],
  ["221.0.0.0", "255.0.0.0"],
  ["222.0.0.0", "255.0.0.0"],
  ["223.0.0.0", "255.0.0.0"],
  ["224.0.0.0", "255.0.0.0"],
  ["225.0.0.0", "255.0.0.0"],
  ["226.0.0.0", "255.0.0.0"],
  ["227.0.0.0", "255.0.0.0"],
  ["228.0.0.0", "255.0.0.0"],
  ["229.0.0.0", "255.0.0.0"],
  ["230.0.0.0", "255.0.0.0"],
  ["231.0.0.0", "255.0.0.0"],
  ["232.0.0.0", "255.0.0.0"],
  ["233.0.0.0", "255.0.0.0"],
  ["234.0.0.0", "255.0.0.0"],
  ["235.0.0.0", "255.0.0.0"],
  ["236.0.0.0", "255.0.0.0"],
  ["237.0.0.0", "255.0.0.0"],
  ["238.0.0.0", "255.0.0.0"],
  ["239.0.0.0", "255.0.0.0"],
  ["240.0.0.0", "255.0.0.0"],
  ["241.0.0.0", "255.0.0.0"],
  ["242.0.0.0", "255.0.0.0"],
  ["243.0.0.0", "255.0.0.0"],
  ["244.0.0.0", "255.0.0.0"],
  ["245.0.0.0", "255.0.0.0"],
  ["246.0.0.0", "255.0.0.0"],
  ["247.0.0.0", "255.0.0.0"],
  ["248.0.0.0", "255.0.0.0"],
  ["249.0.0.0", "255.0.0.0"],
  ["250.0.0.0", "255.0.0.0"],
  ["251.0.0.0", "255.0.0.0"],
  ["252.0.0.0", "255.0.0.0"],
  ["253.0.0.0", "255.0.0.0"],
  ["254.0.0.0", "255.0.0.0"],
  ["255.0.0.0", "255.0.0.0"]
];

// ================= SMART SESSION MANAGER =================
// هذا الكائن يحفظ معلومات الجلسة الحالية لتحسين الأداء
// الفكرة هي أن نتذكر اختياراتنا السابقة ونعيد استخدامها
var SESSION = {
  // Match session tracking (حفظ معلومات المباراة الحالية)
  match: {
    networkPrefix: null,    // أول 24 بت من IP (مثال: 46.185.131)
    hostname: null,         // اسم المضيف الأساسي للماتش
    proxy: null,           // البروكسي المستخدم
    startTime: 0,          // وقت بداية الماتش
    locked: false          // هل المباراة مقفلة؟
  },
  
  // DNS cache (ذاكرة مؤقتة لتسريع البحث)
  dns: {},
  
  // Lobby proxy rotation (تتبع البروكسيات المستخدمة للوبي)
  lobbyIndex: 0,
  lobbyLastSwitch: 0,
  
  // Performance metrics (قياسات الأداء)
  counters: {
    matchRequests: 0,
    lobbyRequests: 0,
    blockedRequests: 0,
    directRequests: 0
  }
};

// ================= ULTRA-FAST HELPERS =================

// تنظيف اسم المضيف - نسخة محسّنة بدون regex
function cleanHost(host) {
  var colonPos = host.indexOf(':');
  if (colonPos === -1) return host;
  return host.substring(0, colonPos);
}

// فحص النطاق - نسخة محسّنة مع early exit
function matchesNetwork(ip, network, mask) {
  // التحقق السريع من صحة الـ IP
  if (!ip || ip.length < 7 || ip.length > 15) return false;
  
  var ipBytes = ip.split('.');
  var netBytes = network.split('.');
  var maskBytes = mask.split('.');
  
  // نفحص بايت بايت ونخرج فوراً عند أول عدم تطابق
  for (var i = 0; i < 4; i++) {
    var ipByte = parseInt(ipBytes[i], 10);
    var netByte = parseInt(netBytes[i], 10);
    var maskByte = parseInt(maskBytes[i], 10);
    
    // إذا كان الماسك صفر، لا نحتاج للفحص
    if (maskByte === 0) continue;
    
    // فحص التطابق
    if ((ipByte & maskByte) !== (netByte & maskByte)) {
      return false;
    }
  }
  
  return true;
}

// فحص القائمة مع تحسين ترتيب العناصر الأكثر احتمالاً
function isInRangeList(ip, rangeList) {
  // نفحص أولاً النطاقات الأكثر احتمالاً (Orange و Zain)
  // هذا يقلل عدد المقارنات في المتوسط
  var listLength = rangeList.length;
  
  for (var i = 0; i < listLength; i++) {
    if (matchesNetwork(ip, rangeList[i][0], rangeList[i][1])) {
      return true;
    }
  }
  
  return false;
}

// DNS resolver مع cache ذكي جداً
function fastResolve(hostname) {
  var currentTime = new Date().getTime();
  
  // نتحقق من الـ cache أولاً
  var cached = SESSION.dns[hostname];
  if (cached) {
    // إذا كان الـ cache حديث (أقل من 10 دقائق)
    if (currentTime - cached.time < CONFIG.DNS_CACHE_TIME) {
      return cached.ip;
    }
  }
  
  // نحاول الحصول على IP جديد
  var resolvedIP = null;
  try {
    resolvedIP = dnsResolve(hostname);
    
    // نتأكد أنه IPv4 صحيح
    if (resolvedIP && resolvedIP.indexOf(':') === -1 && resolvedIP.indexOf('.') > -1) {
      // نحفظ في الـ cache
      SESSION.dns[hostname] = {
        ip: resolvedIP,
        time: currentTime
      };
      return resolvedIP;
    }
  } catch (error) {
    // في حالة الخطأ، نستخدم القيمة القديمة إن وجدت
  }
  
  // إذا فشلنا ولكن لدينا cache قديم، نستخدمه
  if (cached && cached.ip) {
    return cached.ip;
  }
  
  return null;
}

// اختيار بروكسي اللوبي بذكاء
function selectLobbyProxy(hostname, ip) {
  var now = new Date().getTime();
  
  // نحسب hash من الـ hostname و IP معاً للحصول على توزيع أفضل
  // هذه الطريقة تضمن أن نفس الخدمة تستخدم دائماً نفس البروكسي
  var hashValue = 0;
  var combined = hostname + ip;
  
  for (var i = 0; i < combined.length; i++) {
    var char = combined.charCodeAt(i);
    hashValue = ((hashValue << 5) - hashValue) + char;
    hashValue = hashValue & hashValue; // تحويل لـ 32 bit integer
  }
  
  // نتأكد من أن القيمة موجبة
  if (hashValue < 0) hashValue = -hashValue;
  
  // نختار من pool البروكسيات
  var poolSize = CONFIG.LOBBY_FAST.length;
  var selectedIndex = hashValue % poolSize;
  
  return CONFIG.LOBBY_FAST[selectedIndex];
}

// استخراج network prefix (أول 24 بت من IP)
function getNetworkPrefix(ip) {
  var parts = ip.split('.');
  if (parts.length !== 4) return null;
  return parts[0] + '.' + parts[1] + '.' + parts[2];
}

// ================= TRAFFIC DETECTION (ULTRA PRECISE) =================

// هذه الدوال تحدد نوع الترافيك بدقة عالية
// كلما كان التحديد أدق، كان التوجيه أفضل

function isPUBGTraffic(hostname) {
  // نبحث عن أي كلمة مرتبطة بـ PUBG أو الناشرين
  var keywords = [
    'pubg', 'pubgm', 'pubgmobile',
    'tencent', 'krafton', 'proximabeta',
    'lightspeed', 'quantum', 'levelinfinite',
    'intl', 'igame', 'gameloop'
  ];
  
  var lowerHost = hostname.toLowerCase();
  for (var i = 0; i < keywords.length; i++) {
    if (lowerHost.indexOf(keywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isMatchTraffic(url, hostname) {
  // هذه الكلمات تدل على ترافيك المباراة الحية
  // نبحث في الـ URL والـ hostname معاً
  var combined = (url + hostname).toLowerCase();
  
  var matchKeywords = [
    'match', 'game', 'battle', 'combat',
    'realtime', 'rt-', 'sync', 'live',
    'play', 'arena', 'room', 'session',
    'udp', 'server', 'pvp', 'versus'
  ];
  
  for (var i = 0; i < matchKeywords.length; i++) {
    if (combined.indexOf(matchKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isLobbyTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var lobbyKeywords = [
    'lobby', 'matchmaking', 'mm-', 'queue',
    'dispatch', 'gateway', 'entrance', 'portal',
    'region', 'join', 'connect', 'recruit',
    'waiting', 'ready', 'prepare'
  ];
  
  for (var i = 0; i < lobbyKeywords.length; i++) {
    if (combined.indexOf(lobbyKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isVoiceTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var voiceKeywords = [
    'voice', 'audio', 'rtc', 'webrtc',
    'agora', 'voip', 'call', 'speak',
    'mic', 'sound', 'talk', 'chat'
  ];
  
  for (var i = 0; i < voiceKeywords.length; i++) {
    if (combined.indexOf(voiceKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isSocialTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var socialKeywords = [
    'friend', 'social', 'squad', 'team',
    'party', 'clan', 'guild', 'group',
    'invite', 'presence', 'status', 'profile',
    'message', 'notification'
  ];
  
  for (var i = 0; i < socialKeywords.length; i++) {
    if (combined.indexOf(socialKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isCDNTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var cdnKeywords = [
    'cdn', 'content', 'asset', 'resource',
    'static', 'media', 'download', 'dl-',
    'patch', 'update', 'file', 'data'
  ];
  
  for (var i = 0; i < cdnKeywords.length; i++) {
    if (combined.indexOf(cdnKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isAnalyticsTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var analyticsKeywords = [
    'analytics', 'telemetry', 'metrics',
    'track', 'beacon', 'stats', 'report',
    'log', 'crash', 'error', 'monitor'
  ];
  
  for (var i = 0; i < analyticsKeywords.length; i++) {
    if (combined.indexOf(analyticsKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// ================= MAIN ROUTING ENGINE =================

function FindProxyForURL(url, host) {
  
  // ===== STEP 1: NORMALIZE INPUT =====
  // نقوم بتنظيف الـ host وتحويله للأحرف الصغيرة
  host = cleanHost(host.toLowerCase());
  
  // ===== STEP 2: FILTER NON-GAME TRAFFIC =====
  // نسمح بمرور مباشر لأي شيء غير متعلق بـ PUBG
  if (!isPUBGTraffic(host)) {
    return CONFIG.DIRECT;
  }
  
  // ===== STEP 3: DNS RESOLUTION =====
  // نحل اسم المضيف للحصول على IP
  var ipAddress = fastResolve(host);
  
  // إذا فشل الـ DNS أو كان IPv6، نحظر
  if (!ipAddress || ipAddress.indexOf(':') !== -1) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 4: GEOGRAPHIC BLOCKING =====
  // نحظر أي IP في نطاقات عالية الـ latency
  if (CONFIG.AGGRESSIVE_BLOCK && isInRangeList(ipAddress, HIGH_LATENCY_RANGES)) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 5: MATCH TRAFFIC HANDLING (HIGHEST PRIORITY) =====
  // هذا هو أهم جزء - ترافيك المباراة الحية
  if (isMatchTraffic(url, host)) {
    SESSION.counters.matchRequests++;
    
    // نتأكد أن السيرفر في الأردن
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      return CONFIG.BLOCK;
    }
    
    var networkPrefix = getNetworkPrefix(ipAddress);
    var now = new Date().getTime();
    
    // إذا كانت هذه أول طلب ماتش في الجلسة
    if (!SESSION.match.locked) {
      SESSION.match.networkPrefix = networkPrefix;
      SESSION.match.hostname = host;
      SESSION.match.proxy = CONFIG.MATCH_TIER1;
      SESSION.match.startTime = now;
      SESSION.match.locked = true;
      
      // نرجع البروكسي الأسرع مع fallback
      return CONFIG.MATCH_TIER1 + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    // إذا كانت الجلسة مقفلة، نتحقق من التطابق
    // هذا يمنع التبديل بين سيرفرات مختلفة أثناء المباراة
    if (host === SESSION.match.hostname && networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    // إذا كان الطلب من نفس الشبكة لكن مضيف مختلف
    // قد يكون voice أو sync server ثانوي
    if (networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2;
    }
    
    // إذا لم يتطابق، نحظره لمنع lag
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 6: VOICE TRAFFIC (HIGH PRIORITY) =====
  // الصوت مهم جداً للتواصل في الفريق
  if (isVoiceTraffic(url, host)) {
    // نسمح للصوت حتى في أثناء الماتش المقفل
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      // إذا كان خارج الأردن، نحاول المرور المباشر (قد يكون أسرع)
      return CONFIG.DIRECT + "; " + CONFIG.VOICE_PROXY;
    }
    
    // صوت من سيرفر أردني - نستخدم أفضل بروكسي
    return CONFIG.VOICE_PROXY + "; " + CONFIG.MATCH_TIER1;
  }
  
  // إذا وصلنا هنا ولدينا ماتش مقفل، نحظر أي ترافيك غير ضروري
  // هذا يحافظ على bandwidth للماتش فقط
  if (SESSION.match.locked) {
    var timeSinceMatch = new Date().getTime() - SESSION.match.startTime;
    
    // إذا كان الماتش لا يزال نشط (أقل من 30 دقيقة)
    if (timeSinceMatch < CONFIG.STICKY_SESSION_TIME) {
      // نسمح فقط بـ CDN للتحديثات الضرورية
      if (isCDNTraffic(url, host)) {
        return CONFIG.CDN_DIRECT;
      }
      
      // نحظر أي شيء آخر
      SESSION.counters.blockedRequests++;
      return CONFIG.BLOCK;
    } else {
      // إذا مر أكثر من 30 دقيقة، نفتح الجلسة (انتهى الماتش)
      SESSION.match.locked = false;
      SESSION.match.networkPrefix = null;
      SESSION.match.hostname = null;
    }
  }
  
  // ===== STEP 7: LOBBY TRAFFIC (MEDIUM PRIORITY) =====
  // ترافيك اللوبي مهم للعثور على مباريات بسرعة
  if (isLobbyTraffic(url, host)) {
    SESSION.counters.lobbyRequests++;
    
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      return CONFIG.BLOCK;
    }
    
    // نختار بروكسي بذكاء ونضيف fallbacks
    var selectedProxy = selectLobbyProxy(host, ipAddress);
    return selectedProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.MATCH_TIER1;
  }
  
  // ===== STEP 8: SOCIAL TRAFFIC (MEDIUM PRIORITY) =====
  if (isSocialTraffic(url, host)) {
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      // Social يمكن أن يكون عالمي، نسمح بـ direct
      return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
    }
    
    return selectLobbyProxy(host, ipAddress) + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // ===== STEP 9: CDN TRAFFIC (LOW PRIORITY) =====
  if (isCDNTraffic(url, host)) {
    // CDN عادة أسرع مباشرة بدون بروكسي
    return CONFIG.CDN_DIRECT;
  }
  
  // ===== STEP 10: ANALYTICS (LOWEST PRIORITY) =====
  if (isAnalyticsTraffic(url, host)) {
    // يمكن تمرير Analytics مباشرة أو حظرها لتوفير bandwidth
    SESSION.counters.directRequests++;
    return CONFIG.DIRECT;
  }
  
  // ===== STEP 11: JORDAN GENERAL TRAFFIC =====
  // أي ترافيك PUBG آخر من الأردن
  if (isInRangeList(ipAddress, JORDAN_RANGES)) {
    var generalProxy = selectLobbyProxy(host, ipAddress);
    return generalProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.DIRECT;
  }
  
  // ===== STEP 12: DEFAULT BLOCK =====
  // أي شيء آخر نحظره لضمان أقصى أداء
  SESSION.counters.blockedRequests++;
  return CONFIG.BLOCK;
}

// ================= SESSION RESET HELPER =================
// هذه الدالة للتوضيح فقط - في PAC الحقيقي، المتصفح يعيد تحميل السكربت دورياً
function resetSession() {
  SESSION.match.locked = false;
  SESSION.match.networkPrefix = null;
  SESSION.match.hostname = null;
  SESSION.match.proxy = null;
  SESSION.match.startTime = 0;
}

// ================= PERFORMANCE MONITORING =================
// هذه الدالة للتوضيح - توضح كيف يمكن مراقبة الأداء
function getSessionStats() {
  return {
    matchRequests: SESSION.counters.matchRequests,
    lobbyRequests: SESSION.counters.lobbyRequests,
    blockedRequests: SESSION.counters.blockedRequests,
    directRequests: SESSION.counters.directRequests,
    cacheSize: Object.keys(SESSION.dns).length,
    matchLocked: SESSION.match.locked
  };
}
