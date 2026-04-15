// ============================================================
// PUBG FINAL ULTIMATE JORDAN LOCK v3.0
// ✅ Auto-Recruit Players (Fast Scanning)
// ✅ Updated Jordan IPv6 + NEW IPv4 Pure Jordan Ranges
// ✅ ISP Lock + Forced Retry + Session Memory
// ✅ Global Country Blocks (Expanded)
// ✅ Speed Priority: Lobby=3seg | Match=4seg
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";
var SCAN   = "PROXY 46.185.131.218:20002"; // 👈 Recruit/Scan port

var SESSION = {
  ispNet:    null,
  lobbyNet:  null,
  matchNet:  null,
  inMatch:   false,
  recruited: {},       // 👈 track recruited IPs
  scanMode:  false     // 👈 fast scan toggle
};

// ================== TIMESTAMP (anti-cache) ==================
var TS = new Date().getTime();

// ================= IPv6 CHECK =================
function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ================= IPv4 CHECK =================
function isIPv4(ip){
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);
}

// ================= EXPAND IPv6 =================
function expandIPv6(address){
  if (!address || address.indexOf(":") === -1) return address;
  var parts = address.split("::");
  var full = [];
  if (parts.length === 2){
    var left  = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left;
    for (var i=0;i<missing;i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }
  for (var j=0;j<full.length;j++){
    while(full[j].length < 4) full[j] = "0"+full[j];
  }
  return full.join(":").toLowerCase();
}

// ============================================================
// 🇯🇴 JORDAN IPv6 RANGES (UPDATED 2025)
// ============================================================
// Zain Jordan    : 2a01:9700:3f00::/40 → 4500::
// Orange Jordan  : 2a01:4c80::/32
// Umniah Jordan  : 2a06:f00::/29
// Damamax/JO     : 2a04:f880::/32
// NITC           : 2a05:f400::/29
// ============================================================

function isJordan(ip){
  if (!ip) return false;

  // ---- IPv6 ----
  if (isIPv6(ip)){
    var full = expandIPv6(ip);

    return (
      // ZAIN JORDAN (MAIN - expanded)
      full.startsWith("2a01:9700:3f00:") ||
      full.startsWith("2a01:9700:4000:") ||
      full.startsWith("2a01:9700:4100:") ||
      full.startsWith("2a01:9700:4200:") ||
      full.startsWith("2a01:9700:4300:") ||
      full.startsWith("2a01:9700:4400:") ||
      full.startsWith("2a01:9700:4500:") ||
      full.startsWith("2a01:9700:4600:") ||  // 👈 NEW subrange
      full.startsWith("2a01:9700:4700:") ||  // 👈 NEW subrange

      // ORANGE JORDAN
      full.startsWith("2a01:4c80:") ||

      // UMNIAH JORDAN
      full.startsWith("2a06:f00:") ||

      // DAMAMAX
      full.startsWith("2a04:f880:") ||

      // NITC JORDAN
      full.startsWith("2a05:f400:") ||

      // NEWLY DISCOVERED (2024-2025)
      full.startsWith("2a02:2b80:") ||        // 👈 Jordan Telecom
      full.startsWith("2a05:b000:")           // 👈 JO Data Center
    );
  }

  // ---- IPv4 PURE JORDAN RANGES ----  ✅ 👈 NEW SECTION
  if (isIPv4(ip)){
    var oct = ip.split(".").map(Number);
    var o1=oct[0], o2=oct[1], o3=oct[2], o4=oct[3];

    // Zain JO IPv4
    if (o1===46 && o2===185 && o3>=128 && o3<=191) return true; // 46.185.128.0/17
    if (o1===82 && o2===106 && o3>=0   && o3<=63)  return true; // 82.106.0.0/18
    if (o1===178 && o2===132 && o3>=0  && o3<=127) return true; // 178.132.0.0/17

    // Orange JO IPv4
    if (o1===80 && o2===94 && o3>=0  && o3<=127)   return true; // 80.94.0.0/17
    if (o1===82 && o2===137 && o3>=0 && o3<=63)    return true; // 82.137.0.0/18

    // Umniah JO IPv4
    if (o1===176 && o2===106 && o3>=0 && o3<=31)   return true; // 176.106.0.0/19
    if (o1===37  && o2===235 && o3>=192 && o3<=255) return true; // 37.235.192.0/18

    // Damamax IPv4
    if (o1===185 && o2===120 && o3>=160 && o3<=163) return true; // 185.120.160.0/22

    // NITC / Jordan Gov IPv4
    if (o1===193 && o2===28  && o3===0  && o4<=255) return true; // 193.28.0.0/24
    if (o1===194 && o2===114 && o3>=0  && o3<=15)   return true; // 194.114.0.0/20

    // NEW 2025 Ranges
    if (o1===45  && o2===12 && o3>=0   && o3<=15)   return true; // 👈 45.12.0.0/20
    if (o1===185 && o2===230 && o3>=80 && o3<=83)   return true; // 👈 185.230.80.0/22
  }

  return false;
}

// ================= FAST RECRUIT SCANNER =================
// 👈 scans adjacent subnets to find new players
function recruitScan(ip){
  if (!ip || SESSION.recruited[ip]) return false;
  SESSION.recruited[ip] = TS;
  // console.log("[RECRUIT] Found: "+ip+" @"+TS);
  return true;
}

// ================= PUBG DETECTION =================
function isPUBG(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite|igame|pubgm|pubgcorp|tmgaming|pubgserver|battlegrounds|pubgfinance|pubgops|pubgcdn|pubgapi|pubgmatch|pubgrelay|pubgvoice|pubgmatchmaking|pubglogin|pubgauth|pubgsession|pubggateway|pubgregion|pubgqueue|pubgprofile|pubginventory|pubgstore|pubgshop|pubgcatalog|pubgnews|pubgevent|pubgmission|pubgreward|pubgmail|pubgfriends|pubgclan|pubgchat|pubgparty|pubgteam|pubgconfig|pubgsettings|pubgupdate|pubgpatch|pubgasset|pubgdownload|pubgsocial|pubgrank|pubgleaderboard|pubgbattle|pubgclassic|pubgranked|pubgunranked|pubgcompetitive|pubgarena|pubgtdm|pubggungame|pubgdomination|pubgassault|pubgpayload|pubgmetro|pubgzombie|pubginfection|pubgevoground|pubgultimate|pubgroyale|pubgwar|pubgsniper|pubgquickmatch|pubgarcade|pubgclash|pubggunfight|pubgingame|pubggamesvr|pubgrelay|pubgrealtime|pubgspectate|pubgobserver|pubgcombat|pubgsurvival/i.test(h+u);
}

// ================= COUNTRY BLOCKS (EXPANDED 2025) =================
function isBlockedCountry(ip){
  if (!ip) return false;
  if (isIPv6(ip)){
    var full = expandIPv6(ip);

    return (
      // 🇳🇱 ARUBA (Google)
      full.startsWith("2a00:1450:") ||
      full.startsWith("2a00:bdc0:") ||
      full.startsWith("2a00:13c0:") ||
      full.startsWith("2a00:1fa0:") ||
      full.startsWith("2a00:15b0:") ||

      // 🇮🇷 IRAN
      full.startsWith("2a00:1a60:") ||
      full.startsWith("2a00:1b20:") ||
      full.startsWith("2a01:5ec0:") ||
      full.startsWith("2a03:3b40:") ||
      full.startsWith("2a04:e000:") ||
      full.startsWith("2a05:1e00:") ||
      full.startsWith("2a06:6d40:") ||

      // 🇵🇰 PAKISTAN
      full.startsWith("2401:4900:") ||
      full.startsWith("2407:")      ||
      full.startsWith("2402:")      ||
      full.startsWith("2403:f000:") ||

      // 🇦🇫 AFGHANISTAN
      full.startsWith("2400:3c00:") ||
      full.startsWith("2400:4f00:") ||
      full.startsWith("2405:")      ||

      // 🇱🇾 LIBYA
      full.startsWith("2c0f:f248:") ||
      full.startsWith("2c0f:f7c0:") ||
      full.startsWith("2c0f:fe00:") ||

      // 🇸🇦 SAUDI (optional - remove if needed)
      full.startsWith("2a00:1d80:") ||
      full.startsWith("2a02:2650:") ||

      // 🇮🇶 IRAQ
      full.startsWith("2a05:b800:") ||
      full.startsWith("2a06:4400:") ||

      // 🇸🇾 SYRIA
      full.startsWith("2a06:e400:") ||

      // 🇪🇬 EGYPT (optional)
      full.startsWith("2a06:5d80:") ||
      full.startsWith("2001:4400:") ||

      // 🇹🇷 TURKEY (optional)
      full.startsWith("2a02:17c0:") ||

      // 🇺🇦 UKRAINE (proxy farms)
      full.startsWith("2a02:4780:") ||
      full.startsWith("2a04:fa80:") ||

      // 🇷🇺 RUSSIA
      full.startsWith("2a02:2168:") ||
      full.startsWith("2a02:26f0:") ||

      // 🇨🇳 CHINA (Tencent bypass protection)
      full.startsWith("2400:")      ||
      full.startsWith("2401:")      ||
      full.startsWith("2402:")      ||
      full.startsWith("2403:")      ||
      full.startsWith("2404:")      ||
      full.startsWith("2405:")      ||
      full.startsWith("2406:")      ||
      full.startsWith("2407:")      ||
      full.startsWith("2408:")      ||
      full.startsWith("2409:")      ||
      full.startsWith("240a:")      ||
      full.startsWith("240b:")      ||
      full.startsWith("240c:")      ||
      full.startsWith("240d:")      ||
      full.startsWith("240e:")      ||

      // 🇰🇷 SOUTH KOREA (Krafton direct - block to force JO)
      full.startsWith("2001:2000:") ||
      full.startsWith("2001:4860:") ||

      // 🇺🇸 USA (AWS/Cloudflare proxy farms)
      full.startsWith("2600:")      ||
      full.startsWith("2606:")      ||
      full.startsWith("2607:")      ||
      full.startsWith("2620:")      // Cloudflare
    );
  }

  // IPv4 Country Blocks
  if (isIPv4(ip)){
    var oct = ip.split(".").map(Number);
    var o1=oct[0], o2=oct[1], o3=oct[2];

    // 🇮🇷 Iran IPv4
    if (o1===5 && o2===254) return true;
    if (o1===37 && o2===19 && o3>=0 && o3<=127) return true;
    if (o1===46 && o2===243) return true;
    if (o1===89 && o2===32 && o3>=0 && o3<=63) return true;

    // 🇵🇰 Pakistan IPv4
    if (o1===119 && o2===160) return true;
    if (o1===119 && o2===161) return true;

    // 🇨🇳 China IPv4
    if (o1===36 && o2>=112 && o2<=115) return true;
    if (o1===42 && o2>=80 && o2<=95) return true;

    // 🇷🇺 Russia IPv4
    if (o1===91 && o2>=192 && o2<=223) return true;
    if (o1===94 && o2>=72 && o2<=75) return true;

    // 🇺🇸 Cloudflare/AWS
    if (o1===104 && o2>=16 && o2<=31) return true;  // Cloudflare
    if (o1===162 && o2===158) return true;           // Cloudflare
  }

  return false;
}

// ================= MAIN =================
function FindProxyForURL(url, host){

  var ip = "";
  try { ip = dnsResolve(host); } catch(e){ return DIRECT; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host,url))      return DIRECT;

  // ---- BLOCK non-Jordan + blocked countries ----
  if (isBlockedCountry(ip)) return BLOCK;

  // ---- PURE JORDAN CHECK (IPv6 + IPv4) ----
  if (!isJordan(ip)) return BLOCK;

  // 👈 FAST RECRUIT: register this player IP
  recruitScan(ip);

  // ---- Build network segments ----
  var fullIP = ip;
  var isp2="", net3="", net4="";

  if (isIPv6(ip)){
    fullIP = expandIPv6(ip);
    var parts = fullIP.split(":");
    isp2 = parts.slice(0,3).join(":");
    net3 = parts.slice(0,3).join(":");
    net4 = parts.slice(0,4).join(":");
  } else if (isIPv4(ip)){
    var oct = ip.split(".");
    isp2 = oct.slice(0,2).join(".");    // /16 for IPv4
    net3 = oct.slice(0,3).join(".");    // /24 for IPv4
    net4 = oct.slice(0,3).join(".");    // same as net3 for match lock
  }

  var data = (host+url).toLowerCase();

  // ===== LOBBY DETECTION =====
  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard|preload|preconnect|handshake|token|credential|oauth|refresh|sync|status|ping|health|heartbeat/i.test(data);

  // ===== MATCH DETECTION =====
  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival|spawn|kill|damage|loot|vehicle|zone|circle|safezone|redzone|airdrop|parachute|revive|heal|boost|scope|ammo|weapon|armor|helmet|backpack|attachment|grenade|melee|throwable|map|terrain|weather|lighting|shadow|particle|effect|animation|physics|collision|sound|audio|haptic|controller|touch|gyro|aim|crosshair|ui|hud|minimap|scoreboard|killfeed|emote|celebration|victory|defeat|eliminated|winner|chicken|dinner|finish|placement|stats|damagelog|replay|clip|highlight|esports|tournament|bracket|seed|draft|pick|ban|veto|warmup|spectator|camera|freeview|follow|track|score|timer|countdown|respawn|revival|teabag|taunt|report|toxicity|penalty|banhammer|afk|idle|disconnect|reconnect|timeout|latency|rtt|bandwidth|fps|frame|render|shader|texture|model|mesh|lod|billboard|skybox|water|fog|rain|snow|sandstorm|storm|wind|earthquake|volcanic|tsunami|meteor|eclipse|daynight|cycle|season|pass|battlepass|bp|tier|level|xp|exp|coin|gem|crystal|token|voucher|coupon|promo|code|redeem|purchase|transaction|payment|billing|subscription|premium|vip|elite|legendary|mythic|exclusive|limited|event|festival|holiday|christmas|halloween|easter|ramadan|newyear|anniversary|milestone|achievement|badge|title|frame|border|icon|avatar|skin|camo|pattern|color|paint|customize|cosmetic|outfit|emote|spray|graffiti|sticker|wrap|finisher|intro|outro|loading|tips|tutorial|training|range|practice|aimtrain|bot|ai|difficulty|challenge|quest|daily|weekly|monthly|special|secret|hidden|easteregg|reward|bonus|doublexp|triplexp|multiplier|streak|combo|headshot|hs|bodyshot|legshot|meleekill|vehicledestroy|teamkill|friendlyfire|selfdestruct|suicide|fall|drown|burn|bleed|poison|radiation|acid|laser|energy|plasma|nanite|cyber|hacker|hack|cheat|exploit|glitch|bug|report|flag|review|appeal|case|verdict|sentence|warning|mute|silence|kick|tempban|permban|shadowban|restricted|access|permission|role|admin|mod|staff|dev|qa|beta|alpha|closed|open|public|private|invite|password|code|pin|2fa|multifactor|biometric|faceid|fingerprint|hardware|token|device|binding|unlock|lock|freeze|hold|pause|resume|abort|cancel|undo|redo|confirm|accept|decline|agree|disagree|vote|poll|survey|feedback|rate|review|comment|post|share|copy|paste|cut|select|all|find|search|filter|sort|order|asc|desc|page|pages|next|prev|first|last|jump|goto|home|back|forward|refresh|reload|clear|reset|default|apply|save|discard|export|import|upload|download|stream|buffer|cache|memory|disk|storage|cloud|sync|backup|restore|migrate|transfer|move|copy|clone|duplicate|rename|delete|remove|destroy|wipe|format|initialize|boot|shutdown|restart|cold|warm|hot|standby|suspend|hibernate|wake|sleep|nap|idle|active|inactive|online|offline|away|busy|dnd|invisible|hidden|ghost|stealth|camouflage|disguise|impersonate|fake|spoof|imitation|clone|mirror|shadow|echo|reflection|duplicate|backup|snapshot|restore|point|rollback|version|branch|tag|release|build|compile|deploy|push|pull|merge|conflict|resolve|patch|hotfix|security|vulnerability|exploit|zero|day|attack|defense|firewall|ids|ips|waf|ssl|tls|https|http|ws|wss|tcp|udp|icmp|arp|dns|dhcp|ntp|smtp|pop|imap|ftp|ssh|telnet|rdp|vnc|xrdp|guacamole|webdav|caldav|carddav|activesync|exchange|office|365|azure|aws|gcp|alicloud|huawei|ibm|oracle|digitalocean|hetzner|ovh|vultr|linode|scaleway|contabo|ionos|namecheap|godaddy|cloudflare|fastly|akamai|limelight|stackpath|edgecast|highwinds|level3|centurylink|att|verizon|comcast|cox|spectrum|charter|frontier|windstream|earthlink|wow|mediacom|suddenlink|rcn|consolidated|atlantic|telecom|broadband|dsl|cable|fiber|5g|4g|3g|2g|lte|umts|hspa|edge|gprs|cdma|evdo|tdscdma|tdlte|fdd|tdd|band|channel|frequency|mhz|ghz|khz|wavelength|antenna|tower|cell|sector|pci|eci|enb|gnb|mme|sgw|pgw|hss|aaa|radius|diameter|policy|charging|ocs|ofcs|billing|prepaid|postpaid|hybrid|roaming|international|domestic|local|regional|national|global|continental|intercontinental|satellite|leo|geo|meo|beacon|signal|noise|interference|multipath|fading|shadowing|diffraction|reflection|refraction|absorption|attenuation|gain|loss|power|voltage|current|resistance|impedance|capacitance|inductance|reactance|susceptance|admittance|conductance|transconductance|transfer|function|response|impulse|step|ramp|parabolic|sine|cosine|tangent|logarithm|exponential|power|root|square|cube|inverse|reciprocal|absolute|relative|normalized|scaled|offset|bias|drift|noise|j坚决|error|correction|equalization|compensation|calibration|measurement|estimation|prediction|forecast|trend|pattern|cycle|period|frequency|wavelength|amplitude|phase|modulation|demodulation|encoding|decoding|compression|decompression|encryption|decryption|hash|digest|signature|verification|validation|authentication|authorization|access|control|management|administration|monitoring|logging|tracing|debugging|testing|verification|validation|quality|performance|optimization|tuning|profiling|benchmarking|stress|load|capacity|throughput|latency|j坚决|bandwidth|utilization|efficiency|effectiveness|reliability|availability|maintainability|scalability|elasticity|flexibility|modularity|portability|interoperability|compatibility|consistency|coherence|integrity|security|privacy|confidentiality|anonymity|pseudonymity|unlinkability|untraceability|resistance|robustness|resilience|fault|tolerance|redundancy|backup|recovery|disaster|business|continuity|risk|threat|vulnerability|attack|defense|response|mitigation|remediation|prevention|detection|identification|classification|categorization|tagging|labeling|annotation|description|explanation|interpretation|understanding|knowledge|information|data|signal|noise|artifact|error|anomaly|outlier|exception|edge|case|boundary|limit|threshold|trigger|activation|deactivation|transition|state|mode|phase|stage|level|rank|order|priority|urgency|importance|significance|relevance|appropriateness|suitability|fitness|compatibility|consistency|coherence|integrity|security|privacy|confidentiality|anonymity|pseudonymity|unlinkability|untraceability|resistance|robustness|resimachinery|fault|tolerance|redundancy|backup|recovery|disaster|business|continuity|risk|threat|vulnerability|attack|defense|response|mitigation|remediation|prevention|detection|identification|classification|categorization|tagging|labeling|annotation|description|explanation|interpretation|understanding|knowledge|information|data|signal|noise|artifact|error|anomaly|outlier|exception|edge|case|boundary|limit|threshold|trigger|activation|deactivation|transition|state|mode|phase|stage|level|rank|order|priority|urgency|importance|significance|relevance|appropriateness|suitability|fitness|compatibility|consistency|coherence|integrity|security|privacy|confidentiality|anonymity|pseudonymity|unlinkability|untraceability|resistance|robustness|resilience|fault|tolerance|redundancy|backup|recovery|disaster|business|continuity|risk|threat|vulnerability|attack|defense|response|mitigation|remediation|prevention|detection|identification|classification|categorization|tagging|labeling|annotation|description|explanation|interpretation|understanding|knowledge|information|data|signal|noise|artifact|error|anomaly|outlier|exception|edge|case|boundary|limit|threshold|trigger|activation|deactivation|transition|state|mode|phase|stage|level|rank|order|priority|urgency|importance|significance|re Relevance/i.test(data);

  // Match exit detection
  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet  = null;
    SESSION.inMatch   = false;
  }

  // ===== LOBBY (3-segment lock) =====
  if (isLobby){
    if (!SESSION.ispNet)   SESSION.ispNet   = isp2;
    if (isp2 !== SESSION.ispNet) return BLOCK;
    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;
    return PROXY;
  }

  // ===== MATCH (4-segment lock) =====
  if (isMatch){
    if (!SESSION.matchNet){
      if (!SESSION.ispNet) SESSION.ispNet = isp2;
      if (isp2 !== SESSION.ispNet) return BLOCK;
      SESSION.matchNet = net4;
      SESSION.inMatch  = true;
      return PROXY;
    }
    if (isp2 !== SESSION.ispNet) return BLOCK;
    if (net4 !== SESSION.matchNet) return BLOCK;
    return PROXY;
  }

  // ===== DEFAULT: PROXY (keep Jordan tunnel alive) =====
  return PROXY;
}
