var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  lobbyNet: null,
  matchNet: null,
  inMatch:  false
};

// ================= PUBG DETECTION =================

function isPUBG(h, u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

// ================= LOBBY DETECTION =================

function isLobbyRequest(data){
  return /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);
}

// ================= MATCH DETECTION =================

function isMatchRequest(data){
  return /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);
}

// ================= JORDAN LOBBY HOSTS =================
// Orange Jordan / Jordan Telecom / Zain فقط

function isJordanLobbyHost(h){
  return (
    // Orange Jordan (AS8376)
    /orange\.jo$/i.test(h)         ||
    /orangejo\.net$/i.test(h)      ||

    // Jordan Telecom / JTC (AS8697)
    /jtc\.jo$/i.test(h)            ||
    /jordantelecom\.jo$/i.test(h)  ||
    /umniah\.com$/i.test(h)        ||

    // Zain Jordan (AS48832)
    /zain\.jo$/i.test(h)           ||

    // بوابات PUBG الإقليمية - الشرق الأوسط / الأردن
    /\bme\b.*\.(pubg|battlegrounds|krafton)\./i.test(h)      ||
    /\bme-prod\b.*\.(pubg|battlegrounds|krafton)\./i.test(h) ||
    /\bjo\b.*\.(pubg|battlegrounds|krafton)\./i.test(h)      ||
    /middleeast.*\.(pubg|krafton)\./i.test(h)                ||

    // Relay / Gateway أردنية
    /relay-me\./i.test(h)  ||
    /relay-jo\./i.test(h)  ||
    /gw-me\./i.test(h)     ||
    /gw-jo\./i.test(h)
  );
}

// ================= JORDAN MATCH HOSTS =================

function isJordanMatchHost(h){
  return (
    /match.*\bme\b/i.test(h)    ||
    /svr.*\bme\b/i.test(h)      ||
    /gamesvr.*\bme\b/i.test(h)  ||
    /battle.*\bme\b/i.test(h)   ||
    /match.*\bjo\b/i.test(h)    ||
    /svr.*\bjo\b/i.test(h)
  );
}

// ================= BLOCK: EUROPE & ASIA HOSTS =================

function isBlockedRegionHost(h){
  return (
    // Europe
    /\b(eu|europe)\b.*\.(pubg|battlegrounds|krafton|tencent)\./i.test(h) ||
    /\.(de|fr|gb|uk|nl|se|pl|ru|it|es|be|at|ch|no|dk|fi)\.(pubg|krafton|tencent)\./i.test(h) ||

    // Asia
    /\b(asia|apac|sea|krjp)\b.*\.(pubg|battlegrounds|krafton|tencent)\./i.test(h) ||
    /\.(cn|jp|kr|in|sg|my|ph|th|id|vn|tw|hk)\.(pubg|krafton|tencent)\./i.test(h)
  );
}

// ================= MAIN =================

function FindProxyForURL(url, host){

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host, url))    return DIRECT;

  var data = (host + url).toLowerCase();

  // حجب أوروبا وآسيا فوراً
  if (isBlockedRegionHost(host)) return BLOCK;

  var isLobby = isLobbyRequest(data);
  var isMatch = isMatchRequest(data);

  // تنظيف SESSION عند الخروج من المباراة
  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  // ===== LOBBY =====
  if (isLobby){
    if (!isJordanLobbyHost(host)) return BLOCK;
    if (!SESSION.lobbyNet) SESSION.lobbyNet = host;
    return PROXY;
  }

  // ===== MATCH =====
  if (isMatch){
    if (!isJordanMatchHost(host) && !isJordanLobbyHost(host)) return BLOCK;
    if (!SESSION.matchNet){
      SESSION.matchNet = host;
      SESSION.inMatch  = true;
      return PROXY;
    }
    if (host !== SESSION.matchNet) return BLOCK;
    return PROXY;
  }

  // طلبات PUBG عامة
  if (isJordanLobbyHost(host) || isJordanMatchHost(host)) return PROXY;

  return BLOCK;
}
