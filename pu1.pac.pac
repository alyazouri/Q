// ============================================================
// PUBG FINAL ULTIMATE FORCED JORDAN LOCK v23
// Lobby  = 3 segments
// Match  = 4 segments
// ISP Lock + Forced Retry
// + Global Country Blocks (Americas, Asia, EU, etc.)
// + STRICT: No fallback — non-Jordan match = BLOCK always
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  ispNet:   null,
  lobbyNet: null,
  matchNet: null,
  inMatch:  false
};

// ================= IPv6 CHECK =================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ================= EXPAND IPv6 (:: support) =================

function expandIPv6(address){
  if (!address || address.indexOf(":") === -1) return address;

  var parts = address.split("::");
  var full  = [];

  if (parts.length === 2){
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j = 0; j < full.length; j++){
    while (full[j].length < 4) full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ================= JORDAN PREFIX CHECK =================
// Orange Jordan AS8376: 2a01:9700::/32  (covers all /48s below)
// Zain JO  AS48832 / Umniah AS39386 / VTEL AS42353 verified prefixes

function isJordan(ip){
  ip = expandIPv6(ip);
  return (
    // Orange Jordan — full /32 covers 3f00–4500 and beyond
    ip.startsWith("2a01:9700:") ||
    // Zain Jordan AS48832
    ip.startsWith("2a05:6a00:") ||
    ip.startsWith("2a05:6a01:") ||
    // Umniah AS39386
    ip.startsWith("2a02:ed0:")  ||
    // VTEL / Damamax AS42353
    ip.startsWith("2a04:1940:") ||
    // Batelco JO / other verified JO allocations
    ip.startsWith("2a06:e880:1:")
  );
}

// ================= BLOCK CHECKS =================

function isBlocked(ip){
  var fullIP = expandIPv6(ip);

  // ===== BLOCK AMERICAS (North + South + Caribbean) =====
  // ARIN / LACNIC global unicast space
  if (
    fullIP.startsWith("2600:")  ||   // ARIN bulk (US/CA)
    fullIP.startsWith("2604:")  ||   // ARIN (US hosting/CDN)
    fullIP.startsWith("2605:")  ||   // ARIN (US)
    fullIP.startsWith("2606:")  ||   // Cloudflare US
    fullIP.startsWith("2607:")  ||   // ARIN (US)
    fullIP.startsWith("2608:")  ||   // ARIN (US)
    fullIP.startsWith("2610:")  ||   // ARIN (US)
    fullIP.startsWith("2620:")  ||   // ARIN (US infra)
    fullIP.startsWith("2001:428:")  ||  // AT&T US
    fullIP.startsWith("2001:4860:") ||  // Google US
    fullIP.startsWith("2800:")  ||   // LACNIC (Latin America)
    fullIP.startsWith("2801:")  ||   // LACNIC
    fullIP.startsWith("2803:")  ||   // LACNIC
    fullIP.startsWith("2804:")  ||   // LACNIC (Brazil)
    fullIP.startsWith("2806:")  ||   // LACNIC (Mexico)
    fullIP.startsWith("2001:1200:") ||  // LACNIC root
    fullIP.startsWith("2001:13c7:") ||  // LACNIC
    fullIP.startsWith("2001:1388:")    // LACNIC
  ) return true;

  // ===== BLOCK ASIA (SEA / KR / JP / CN / IN) =====
  if (
    fullIP.startsWith("2400:")  ||   // APNIC (broad Asia)
    fullIP.startsWith("2401:")  ||   // APNIC (AU/SEA/IN)
    fullIP.startsWith("2402:")  ||   // APNIC (SEA/KR)
    fullIP.startsWith("2403:")  ||   // APNIC
    fullIP.startsWith("2404:")  ||   // APNIC (JP/AU/SEA)
    fullIP.startsWith("2405:")  ||   // APNIC (CN/SEA)
    fullIP.startsWith("2406:")  ||   // APNIC (AU/JP)
    fullIP.startsWith("2407:")  ||   // APNIC (PK/BD) — already blocked before but redundant is fine
    fullIP.startsWith("2408:")  ||   // APNIC (CN)
    fullIP.startsWith("2409:")  ||   // APNIC (CN/IN)
    fullIP.startsWith("240a:")  ||   // APNIC
    fullIP.startsWith("240b:")  ||   // APNIC (IN)
    fullIP.startsWith("240c:")  ||   // APNIC
    fullIP.startsWith("240d:")  ||   // APNIC (CN)
    fullIP.startsWith("240e:")  ||   // APNIC (CN)
    fullIP.startsWith("2001:200:")  ||  // APNIC root / JP
    fullIP.startsWith("2001:4400:") ||  // APNIC
    fullIP.startsWith("2001:df0:")     // APNIC
  ) return true;

  // ===== BLOCK EUROPE (RIPE — non-MENA) =====
  // RIPE space used by EU/RU — keep MENA (2a01:9700 etc.) via isJordan()
  if (
    fullIP.startsWith("2a00:1450:") ||  // Google EU
    fullIP.startsWith("2a00:bdc0:") ||
    fullIP.startsWith("2a00:1388:") ||
    fullIP.startsWith("2a00:1fa0:") ||
    fullIP.startsWith("2a03:")      ||  // Various EU hosters
    fullIP.startsWith("2a04:")      ||  // EU — but NOT 2a04:1940 (VTEL JO) — handled below
    fullIP.startsWith("2a06:")      ||  // EU — but NOT 2a06:e880:1 (JO) — handled below
    fullIP.startsWith("2a07:")      ||  // EU
    fullIP.startsWith("2a08:")      ||  // EU/AF
    fullIP.startsWith("2a09:")      ||  // EU
    fullIP.startsWith("2a0a:")      ||  // EU/RU
    fullIP.startsWith("2a0b:")      ||  // EU
    fullIP.startsWith("2a0c:")      ||  // EU
    fullIP.startsWith("2a0d:")      ||  // EU/RU
    fullIP.startsWith("2a0e:")      ||  // EU
    fullIP.startsWith("2a0f:")      ||  // EU
    fullIP.startsWith("2001:4400:") ||
    fullIP.startsWith("2001:7f8:")     // IX EU
  ) return true;

  // ===== BLOCK IRAN =====
  if (
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:")
  ) return true;

  // ===== BLOCK PAKISTAN =====
  if (fullIP.startsWith("2401:4900:")) return true;

  // ===== BLOCK AFGHANISTAN =====
  if (
    fullIP.startsWith("2400:3c00:") ||
    fullIP.startsWith("2400:4f00:")
  ) return true;

  // ===== BLOCK LIBYA =====
  if (
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:")
  ) return true;

  // ===== BLOCK AFRICA (AFRINIC) =====
  if (fullIP.startsWith("2c0f:")) return true;

  return false;
}

// ================= PUBG DETECTION =================

function isPUBG(h, u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

// ================= MAIN =================

function FindProxyForURL(url, host){

  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ ip = ""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host, url))    return DIRECT;

  // No IP or not IPv6 → block (fail-closed)
  if (!ip || !isIPv6(ip)) return BLOCK;

  var fullIP = expandIPv6(ip);

  // ===== EXCEPTION: Jordan prefixes that share a broader blocked range =====
  // 2a04:1940 (VTEL JO) sits inside the 2a04: EU block → allow explicitly
  // 2a06:e880:1 (JO)    sits inside the 2a06: EU block → allow explicitly
  var isJO = isJordan(fullIP);

  if (!isJO){
    if (isBlocked(fullIP)) return BLOCK;
    // Anything not Jordan and not explicitly blocked → BLOCK (strict mode)
    return BLOCK;
  }

  // ===== IP is Jordanian — proceed with session logic =====

  var parts = fullIP.split(":");
  var isp2  = parts.slice(0, 3).join(":");   // /48 ISP lock
  var net3  = parts.slice(0, 3).join(":");   // lobby lock (3-seg)
  var net4  = parts.slice(0, 4).join(":");   // match lock  (4-seg)

  var data = (host + url).toLowerCase();

  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);

  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);

  // Reset match session when not in match context
  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  // ===== LOBBY =====
  if (isLobby){
    if (!SESSION.ispNet)   SESSION.ispNet   = isp2;
    if (isp2 !== SESSION.ispNet) return BLOCK;

    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;

    return PROXY;
  }

  // ===== MATCH =====
  if (isMatch){

    if (!SESSION.matchNet){
      if (!SESSION.ispNet)   SESSION.ispNet = isp2;
      if (isp2 !== SESSION.ispNet) return BLOCK;

      SESSION.matchNet = net4;
      SESSION.inMatch  = true;
      return PROXY;
    }

    // Strict 4-segment lock — any deviation = hard block
    if (isp2 !== SESSION.ispNet)   return BLOCK;
    if (net4 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // General PUBG traffic (not lobby/match pattern) → proxy through Jordan
  return PROXY;
}
