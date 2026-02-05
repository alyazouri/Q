// =====================================================================
// PUBG MOBILE — FINAL PRODUCTION PAC
// Goal: Max players within strong Jordan residential ranges
// =====================================================================

// ===================== UTILS =====================
function normalize(h){ var i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }
function hardDrop(){ return "PROXY 127.0.0.1:9"; }
function subnet24(ip){ return ip.split(".").slice(0,3).join("."); }

// ===================== PUBG IDENT =====================
function isPUBG(host){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|intlgame|battlegrounds/i
    .test(host);
}

// ===================== JORDAN RESIDENTIAL STRONG POOLS =====================
// Fiber + Broadband + Stable residential (no cloud)
function isJordanResidential(ip){
  return (
    // UMNIAH
    isInNet(ip,"46.185.128.0","255.255.192.0") ||
    isInNet(ip,"46.185.192.0","255.255.224.0") ||
    isInNet(ip,"46.248.192.0","255.255.224.0") ||
    isInNet(ip,"92.241.32.0","255.255.240.0") ||

    // ORANGE JORDAN
    isInNet(ip,"212.35.64.0","255.255.240.0") ||
    isInNet(ip,"212.35.80.0","255.255.240.0") ||
    isInNet(ip,"212.34.0.0","255.255.224.0") ||
    isInNet(ip,"213.139.32.0","255.255.224.0") ||

    // ZAIN JORDAN
    isInNet(ip,"79.134.0.0","255.255.192.0") ||
    isInNet(ip,"46.32.96.0","255.255.224.0") ||
    isInNet(ip,"176.29.0.0","255.255.0.0")
  );
}

// ===================== ADVANCED TRAFFIC CLASSIFICATION =====================
// Covers modes, lobby, social, CDN, realtime gameplay
function classifyTraffic(url, host){
  var s=(url+" "+host).toLowerCase();

  // REALTIME MATCH (highest sensitivity)
  if (/match|battle|realtime|sync|tick|frame|state|ingame|action|damage|kill|fire|hit|position|movement|velocity/.test(s))
    return "MATCH";

  // GAME MODES (classic/arena/ranked/custom/etc.)
  if (/classic|erangel|miramar|sanhok|vikendi|livik|payload|arena|tdm|warehouse|ranked|unranked|training|custom|room|scrim/.test(s))
    return "MODE";

  // LOBBY / MATCHMAKING
  if (/lobby|queue|dispatch|gateway|matchmaking|ready|waiting|countdown|warmup/.test(s))
    return "LOBBY";

  // SOCIAL / VOICE
  if (/voice|voip|mic|audio|friend|social|squad|team|clan|chat/.test(s))
    return "SOCIAL";

  // CDN / ASSETS
  if (/cdn|asset|patch|update|download|bundle|pak|obb/.test(s))
    return "CDN";

  return "OTHER";
}

// ===================== MATCH SESSION (LIGHT PINNING) =====================
var MATCH = {
  active:false,
  serverIP:null,
  subnet:null
};

// ===================== MAIN =====================
function FindProxyForURL(url, host){

  host = normalize(host.toLowerCase());

  // Non-PUBG traffic
  if (!isPUBG(host)) return "DIRECT";

  var ip = dnsResolve(host);
  if (!ip || ip.indexOf(":")!==-1) return hardDrop();

  var type = classifyTraffic(url, host);

  // ---- OPEN PATHS (increase matchmaking) ----
  if (type==="LOBBY" || type==="SOCIAL" || type==="CDN" || type==="OTHER"){
    return "DIRECT";
  }

  // ---- MODES (allow entry; match decides) ----
  if (type==="MODE"){
    return "DIRECT";
  }

  // ---- MATCH (Jordan residential only) ----
  if (type==="MATCH"){
    // First packet
    if (!MATCH.active){
      if (!isJordanResidential(ip)) return hardDrop();
      MATCH.active = true;
      MATCH.serverIP = ip;
      MATCH.subnet = subnet24(ip);
      return "DIRECT";
    }
    // Pinning during match
    if (ip !== MATCH.serverIP) return hardDrop();
    if (subnet24(ip) !== MATCH.subnet) return hardDrop();
    return "DIRECT";
  }

  return "DIRECT";
}
// =====================================================================
// END OF FILE
// =====================================================================
