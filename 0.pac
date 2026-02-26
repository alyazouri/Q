// =============================================================
// PUBG MOBILE — Jordan + Saudi Final Clean
// Explicit Europe/Asia Block + Stable Daily Mode
// =============================================================

// ================= PROXIES =================
var MATCH_JO   = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 212.35.66.45:8085";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= SETTINGS (ثابتة) =================
var MAX_ISP = 2;
var CLUSTER_RANGE = 0;  // /24 Strict
var MAX_SHIFT_B = 5;

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
  return /(pubg|tencent|krafton|
           lightspeed|levelinfinite|
           igamecj|proxima)/i.test(h);
}

function isMatch(u, h) {
  return /(match|battle|game|combat|
           realtime|udp|gameserver|
           arena|tdm|payload|
           metro|royale|classic|
           ranked|custom)/i.test(u + h);
}

function isLobby(u, h) {
  return /(lobby|matchmaking|queue|
           gateway|party|squad|
           clan|social|chat|voice)/i.test(u + h);
}

// ================= EXPLICIT EUROPE/ASIA BLOCK =================
function blockEuropeAsia(a) {

  // Asia major blocks
  if (a >= 1 && a <= 126) return true;

  // Europe common
  if (a >= 176 && a <= 195) return true;
  if (a >= 77 && a <= 95) return true;

  return false;
}

// ================= ALLOW JORDAN + SAUDI =================
function allowJordanSaudi(a) {

  // Jordan
  if (a === 37 || a === 46 ||
      a === 82 || a === 92 ||
      a === 109 || a === 176 ||
      a === 178 || a === 185 ||
      a === 188 || a === 212)
      return true;

  // Saudi
  if (a === 5 || a === 15 ||
      a === 31 || a === 51 ||
      a === 78 || a === 94)
      return true;

  return false;
}

// ================= ISP CHECK =================
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

  if (SESSION.ispList.length >= MAX_ISP)
      return false;

  SESSION.ispList.push([a, b, c]);
  return true;
}

// =============================================================
// MAIN
// =============================================================
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

  // 🚫 Explicit Europe/Asia Kill
  if (blockEuropeAsia(a))
      return BLOCK;

  // ✅ Allow only Jordan + Saudi
  if (!allowJordanSaudi(a))
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

      if (!ispMatch(a, b, c))
          return BLOCK;

      return MATCH_JO;
  }

  // ================= LOBBY =================
  if (isLobby(url, host))
      return LOBBY_PROXY;

  return BLOCK;
}
