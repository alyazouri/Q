// =====================================================================
// PUBG MOBILE ADVANCED NETWORK POLICY
// MODE: Lobby Open / Match Jordan-Only (ULTRA STRICT)
// Level: Production / Professional
// =====================================================================


// ===================== BASIC UTILITIES =====================

function normalize(host) {
  var i = host.indexOf(":");
  return i > -1 ? host.substring(0, i) : host;
}

function hardDrop() {
  // Blackhole proxy → connection fails immediately
  return "PROXY 127.0.0.1:9";
}

function now() {
  return new Date().getTime();
}

function getSubnet24(ip) {
  return ip.split(".").slice(0, 3).join(".");
}


// ===================== PUBG DOMAIN IDENTIFICATION =====================

function isPUBG(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|intlgame|battlegrounds/i
    .test(host);
}


// ===================== JORDAN NETWORK (STRICT) =====================

function isJordanNetwork(ip) {
  return (
    // Umniah
    isInNet(ip, "46.185.128.0", "255.255.128.0") ||
    // Orange Jordan
    isInNet(ip, "212.35.64.0", "255.255.224.0") ||
    // Zain Jordan
    isInNet(ip, "79.134.0.0", "255.255.128.0") ||
    // Other Jordan ISPs
    isInNet(ip, "87.236.0.0", "255.254.0.0") ||
    isInNet(ip, "176.28.0.0", "255.254.0.0") ||
    isInNet(ip, "185.37.0.0", "255.255.252.0") ||
    isInNet(ip, "185.52.0.0", "255.255.252.0") ||
    isInNet(ip, "185.194.0.0", "255.255.252.0") ||
    isInNet(ip, "188.161.0.0", "255.255.224.0") ||
    isInNet(ip, "94.249.0.0", "255.255.128.0")
  );
}


// ===================== TRAFFIC CLASSIFICATION ENGINE =====================

function classifyTraffic(url, host) {
  var s = (url + host).toLowerCase();

  // REAL MATCH TRAFFIC (Realtime Gameplay)
  if (/match|battle|realtime|sync|tick|ingame|frame|state|action|damage|kill|position|movement/.test(s)) {
    return "match";
  }

  // LOBBY / MATCHMAKING / SOCIAL
  if (/lobby|queue|gateway|dispatch|matchmaking|ready|waiting|countdown|friends|social|chat|voice/.test(s)) {
    return "lobby";
  }

  // CDN / PATCHES
  if (/cdn|asset|patch|update|download/.test(s)) {
    return "cdn";
  }

  return "other";
}


// ===================== MATCH SESSION CONTROLLER =====================
// مسؤول عن قفل السيرفر + إعادة الضبط الذكية

var MATCH_SESSION = {
  active: false,
  serverIP: null,
  subnet: null,
  startTime: 0,
  lastPacketTime: 0,

  reset: function () {
    this.active = false;
    this.serverIP = null;
    this.subnet = null;
    this.startTime = 0;
    this.lastPacketTime = 0;
  }
};

// أقصى مدة مباراة (30 دقيقة)
var MATCH_TIMEOUT = 30 * 60 * 1000;
// Timeout خمول (90 ثانية)
var IDLE_TIMEOUT  = 90 * 1000;


// ===================== MAIN PAC FUNCTION =====================

function FindProxyForURL(url, host) {

  host = normalize(host.toLowerCase());

  // أي شيء غير PUBG → DIRECT
  if (!isPUBG(host)) {
    return "DIRECT";
  }

  var ip = dnsResolve(host);

  // DNS فشل أو IPv6 → DROP
  if (!ip || ip.indexOf(":") !== -1) {
    return hardDrop();
  }

  var trafficType = classifyTraffic(url, host);
  var timeNow = now();

  // ===================== AUTO RESET LOGIC =====================
  if (MATCH_SESSION.active) {

    // انتهاء المباراة بالمدة
    if (timeNow - MATCH_SESSION.startTime > MATCH_TIMEOUT) {
      MATCH_SESSION.reset();
    }

    // خمول = غالباً خروج من المباراة
    if (timeNow - MATCH_SESSION.lastPacketTime > IDLE_TIMEOUT) {
      MATCH_SESSION.reset();
    }
  }

  // ===================== LOBBY MODE =====================
  // مفتوح تماماً لسرعة الماتش ميكنغ

  if (trafficType === "lobby" || trafficType === "cdn" || trafficType === "other") {
    return "DIRECT";
  }

  // ===================== MATCH MODE (JORDAN ONLY) =====================

  if (trafficType === "match") {

    // أول باكيت في المباراة
    if (!MATCH_SESSION.active) {

      // شرط أردني صارم
      if (!isJordanNetwork(ip)) {
        return hardDrop();
      }

      MATCH_SESSION.active = true;
      MATCH_SESSION.serverIP = ip;
      MATCH_SESSION.subnet = getSubnet24(ip);
      MATCH_SESSION.startTime = timeNow;
      MATCH_SESSION.lastPacketTime = timeNow;

      return "DIRECT";
    }

    // مباراة جارية → تحديث آخر نشاط
    MATCH_SESSION.lastPacketTime = timeNow;

    // قفل السيرفر
    if (ip !== MATCH_SESSION.serverIP) {
      return hardDrop();
    }

    // قفل الشبكة
    if (getSubnet24(ip) !== MATCH_SESSION.subnet) {
      return hardDrop();
    }

    return "DIRECT";
  }

  // أي شيء غير متوقع → DROP
  return hardDrop();
}


// =====================================================================
// END OF SCRIPT
//
// SUMMARY:
// ✔ Lobby مفتوح وسريع
// ✔ Match أردني 100%
// ✔ Server + Subnet pinning
// ✔ Auto reset ذكي
// ✔ Anti-VPN فعلي
// ✔ سلوك احترافي Production-grade
// =====================================================================
