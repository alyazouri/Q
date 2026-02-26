// =============================================================
// PUBG MOBILE — Jordan + Limited Saudi Final Stable
// Strict Allowlist — No Wide Ranges — Daily Stable Mode
// =============================================================

// ================= PROXIES =================
var MATCH_JO    = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 212.35.66.45:8085";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= SETTINGS =================
var MAX_ISP = 2;
var CLUSTER_RANGE = 0;   // /24 Strict
var MAX_SHIFT_B = 5;     // Tight geo lock

// ================= SESSION =================
var SESSION = {
  ispList: [],
  lockedIP: null
};

// ================= HELPERS =================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isIP(h) {
  return /^\d+\.\d+\.\d+\.\d+$/.test(h);
}

function isPUBG(h) {
  return /(pubg|tencent|krafton|lightspeed|levelinfinite|igamecj|proxima)/i.test(h);
}

function isMatch(u, h) {
  return /(match|battle|game|combat|
           realtime|udp|tick|
           gameserver|gs[0-9]|
           arena|tdm|payload|
           metro|royale|classic|
           ranked|custom|esport)/i.test(u + h);
}

function isLobby(u, h) {
  return /(lobby|matchmaking|queue|
           gateway|party|squad|
           clan|social|chat|voice|
           event|season|profile|
           store|inventory)/i.test(u + h);
}

// ================= ALLOW JORDAN + LIMITED SAUDI =================
function allowJordanSaudi(ip) {

  // ===== Jordan (أكثر النطاقات استقراراً) =====
  if (isInNet(ip, "82.212.0.0",  "255.255.0.0")) return true;
  if (isInNet(ip, "92.253.0.0",  "255.255.128.0")) return true;
  if (isInNet(ip, "37.76.0.0",   "255.255.0.0")) return true;
  if (isInNet(ip, "109.224.0.0", "255.255.0.0")) return true;
  if (isInNet(ip, "188.161.0.0", "255.255.0.0")) return true;
  if (isInNet(ip, "46.185.0.0",  "255.255.0.0")) return true;

  // ===== Saudi (محدود جداً لتقليل التداخل) =====
  if (isInNet(ip, "94.97.0.0",   "255.255.0.0")) return true;
  if (isInNet(ip, "5.38.0.0",    "255.255.0.0")) return true;

  return false;
}

// ================= ISP CONTROL =================
function ispMatch(a, b, c) {
  for (var i = 0; i < SESSION.ispList.length; i++) {
    var e = SESSION.ispList[i];
    if (e[0] === a &&
        Math.abs(e[1] - b) <= MAX_SHIFT_B &&
        Math.abs(e[2] - c) <= CLUSTER_RANGE)
      return true;
  }
  return false;
}

function learnISP(a, b, c) {
  if (SESSION.ispList.length >= MAX_ISP) return false;
  SESSION.ispList.push([a, b, c]);
  return true;
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  if (!isPUBG(host))
      return DIRECT;

  if (!isIP(host))
      return BLOCK;

  var p = host.split(".");
  var a = parseInt(p[0]);
  var b = parseInt(p[1]);
  var c = parseInt(p[2]);
  var fullIP = host;

  // 🔒 Allowlist Only
  if (!allowJordanSaudi(fullIP))
      return BLOCK;

  // ================= MATCH =================
  if (isMatch(url, host)) {

      if (!SESSION.lockedIP) {

          if (!learnISP(a, b, c))
              return BLOCK;

          SESSION.lockedIP = fullIP;
          return MATCH_JO;
      }

      // Anti-Fallback
      if (fullIP !== SESSION.lockedIP)
          return BLOCK;

      // Anti-Drift
      if (!ispMatch(a, b, c))
          return BLOCK;

      return MATCH_JO;
  }

  // ================= LOBBY =================
  if (isLobby(url, host))
      return LOBBY_PROXY;

  return BLOCK;
}
