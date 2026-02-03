// ============================================================
// GAME BOOSTER – JORDAN POOL ONLY EDITION v2.1
// فرض الاتصال بالسيرفرات الأردنية فقط لجميع عمليات اللعب
// ============================================================


// ================= CONFIG =================
var CONFIG = {
  MATCH_PROXY:  "PROXY 46.185.131.218:20001",  // بروكسي الماتشات - أسرع سيرفر
  LOBBY_PROXY:  "PROXY 212.35.66.45:8181",     // بروكسي اللوبي والاجتماعي
  VOICE_PROXY:  "PROXY 46.185.131.218:20001",  // بروكسي الصوت
  UPDATE_PROXY: "PROXY 212.35.66.45:9090",     // التحديثات فقط
  
  DIRECT: "DIRECT",
  BLOCK:  "PROXY 127.0.0.1:9",

  DNS_CACHE_TIME: 600000,
  MATCH_LOCK_TIME: 1800000,
  DECISION_CACHE_SIZE: 500,
  
  // تفعيل الوضع الصارم: فقط السيرفرات الأردنية
  JORDAN_ONLY_MODE: true,
  
  USE_ADAPTIVE_LOCK: true,
  USE_DECISION_CACHE: true
};


// ================= DATA STRUCTURES =================
var JO8_MAP = new Map([
  [46,1],[176,1],[178,1],[77,1],[37,1],[85,1],[188,1],[93,1],[94,1],[79,1],[149,1]
]);

var JO16 = {
  "46.185":1,"46.184":1,"46.186":1,
  "176.28":1,"176.29":1,"176.57":1,
  "178.77":1,"77.245":1,"37.202":1,"37.252":1,
  "85.159":1,
  "188.123":1,"188.124":1,
  "93.94":1,"94.125":1,"94.126":1,
  "79.135":1,"79.172":1,
  "149.200":1
};

var BLOCK8_MAP = new Map([
  [1,1],[2,1],[5,1],[14,1],[27,1],[31,1],[36,1],[39,1],[42,1],
  [49,1],[51,1],[58,1],[59,1],[60,1],[61,1],
  [78,1],[80,1],[82,1],[83,1],[84,1],[86,1],[87,1],[88,1],
  [90,1],[91,1],[92,1],[95,1],
  [101,1],[103,1],[106,1],[109,1],[110,1],[111,1],
  [112,1],[113,1],[114,1],[115,1],[116,1],[117,1],
  [118,1],[119,1],[120,1],[121,1],[122,1],[123,1],
  [124,1],[125,1],
  [182,1],[183,1],[202,1],[203,1],[210,1],[211,1],
  [218,1],[219,1],[220,1],[221,1],[222,1],[223,1]
]);


// ================= SESSION & CACHE =================
var SESSION = {
  locked: false,
  net24: null,
  start: 0,
  lockDuration: CONFIG.MATCH_LOCK_TIME,
  dns: {}
};

var DECISION_CACHE = {};
var CACHE_COUNTER = 0;
var LOWER_CACHE = {};


// ================= HELPERS =================
function clean(h){
  var colonIndex = h.indexOf(':');
  return colonIndex === -1 ? h : h.substring(0, colonIndex);
}

function p16(ip){
  var firstDot = ip.indexOf('.');
  var secondDot = ip.indexOf('.', firstDot + 1);
  return ip.substring(0, secondDot);
}

function p24(ip){
  var parts = ip.split('.');
  return parts[0] + "." + parts[1] + "." + parts[2];
}

function toLowerCached(str){
  if(!LOWER_CACHE[str]){
    LOWER_CACHE[str] = str.toLowerCase();
  }
  return LOWER_CACHE[str];
}

function isJordan(ip){
  var firstDot = ip.indexOf('.');
  var firstOctet = parseInt(ip.substring(0, firstDot), 10);
  
  if(!JO8_MAP.has(firstOctet)) return false;
  
  var prefix16 = p16(ip);
  return JO16[prefix16] === 1;
}

function isHighLatency(ip){
  var firstDot = ip.indexOf('.');
  var firstOctet = parseInt(ip.substring(0, firstDot), 10);
  return BLOCK8_MAP.has(firstOctet);
}

function resolve(host){
  var now = Date.now();
  var cached = SESSION.dns[host];
  
  if(cached && now - cached.t < CONFIG.DNS_CACHE_TIME){
    return cached.ip;
  }

  var ip = dnsResolve(host);
  
  if(ip && ip.indexOf(':') === -1){
    SESSION.dns[host] = {ip: ip, t: now};
    return ip;
  }
  
  return cached ? cached.ip : null;
}

function has(text, keywords){
  text = toLowerCached(text);
  
  for(var i = 0; i < keywords.length; i++){
    if(text.indexOf(keywords[i]) !== -1) return true;
  }
  return false;
}


// ================= TRAFFIC DETECTION =================
var PUBG_KEYWORDS = [
  'pubg','pubgm','pubgmobile','tencent','krafton',
  'lightspeed','proximabeta','levelinfinite',
  'igame','intl','gameloop'
];

var MATCH_KEYWORDS = [
  'match','battle','arena','classic','wow','metro',
  'rank','pvp','realtime','udp','server',
  'room','session','combat','play','game'
];

var LOBBY_KEYWORDS = [
  'lobby','matchmaking','queue','gateway','dispatch',
  'recruit','friend','social','team','squad',
  'invite','clan','guild','party','ready'
];

var VOICE_KEYWORDS = [
  'voice','rtc','webrtc','agora','audio','mic'
];

var UPDATE_KEYWORDS = [
  'update','patch','download','cdn','asset','resource','file','apk'
];

// هذه الخدمات يمكن السماح لها بالعمل خارج الأردن لأنها لا تؤثر على اللعب
var SAFE_NON_JORDAN_KEYWORDS = [
  'analytics','telemetry','crash','log','metric',
  'ads','advertisement','banner','promotion'
];

function isPUBG(h){
  return has(h, PUBG_KEYWORDS);
}

function isMatch(u, h){
  return has(u + h, MATCH_KEYWORDS);
}

function isLobby(u, h){
  return has(u + h, LOBBY_KEYWORDS);
}

function isVoice(u, h){
  return has(u + h, VOICE_KEYWORDS);
}

function isUpdate(u, h){
  return has(u + h, UPDATE_KEYWORDS);
}

// فحص جديد: هل هذا اتصال آمن يمكن السماح له خارج الأردن؟
// هذه الاتصالات لا تؤثر على ping أو lag اللعب
function isSafeNonGameplay(u, h){
  return has(u + h, SAFE_NON_JORDAN_KEYWORDS);
}


// ================= ADAPTIVE FEATURES =================
function getAdaptiveLockTime(url){
  if(!CONFIG.USE_ADAPTIVE_LOCK) return CONFIG.MATCH_LOCK_TIME;
  
  var lowerUrl = toLowerCached(url);
  
  if(lowerUrl.indexOf('classic') !== -1) return 2100000;
  if(lowerUrl.indexOf('metro') !== -1 || lowerUrl.indexOf('arena') !== -1) return 900000;
  if(lowerUrl.indexOf('tdm') !== -1 || lowerUrl.indexOf('quick') !== -1) return 480000;
  
  return CONFIG.MATCH_LOCK_TIME;
}

function getCacheKey(url, host, ip){
  return url.substring(0, 60) + '|' + host + '|' + ip;
}

function cacheDecision(key, decision){
  if(!CONFIG.USE_DECISION_CACHE) return;
  
  if(CACHE_COUNTER < CONFIG.DECISION_CACHE_SIZE){
    DECISION_CACHE[key] = decision;
    CACHE_COUNTER++;
  } else if(CACHE_COUNTER === CONFIG.DECISION_CACHE_SIZE){
    var keysToDelete = [];
    var deleteCount = Math.floor(CONFIG.DECISION_CACHE_SIZE / 2);
    
    for(var k in DECISION_CACHE){
      keysToDelete.push(k);
      if(keysToDelete.length >= deleteCount) break;
    }
    
    for(var i = 0; i < keysToDelete.length; i++){
      delete DECISION_CACHE[keysToDelete[i]];
    }
    
    CACHE_COUNTER = CONFIG.DECISION_CACHE_SIZE - deleteCount;
    DECISION_CACHE[key] = decision;
    CACHE_COUNTER++;
  }
}


// ================= MAIN ROUTING ENGINE - JORDAN ONLY =================
function FindProxyForURL(url, host){
  
  host = clean(host);
  host = toLowerCached(host);
  
  // السماح للمواقع غير المتعلقة بـ PUBG بالعمل بشكل طبيعي
  if(!isPUBG(host)) return CONFIG.DIRECT;
  
  var ip = resolve(host);
  if(!ip) return CONFIG.BLOCK;
  
  // فحص الكاش للتوفير في العمليات
  if(CONFIG.USE_DECISION_CACHE){
    var cacheKey = getCacheKey(url, host, ip);
    if(DECISION_CACHE[cacheKey]){
      return DECISION_CACHE[cacheKey];
    }
  }
  
  var decision;
  var isJordanIP = isJordan(ip);
  
  // حظر السيرفرات البعيدة مباشرة
  if(isHighLatency(ip)){
    decision = CONFIG.BLOCK;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // التحديثات: نسمح لها بالعمل من أي مكان لأنها ضرورية
  // ولكن نمررها عبر بروكسي خاص لعزلها عن اللعب
  if(isUpdate(url, host)){
    decision = CONFIG.UPDATE_PROXY;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // ═══════════════════════════════════════════════════════════
  // القلب الأساسي: فرض السيرفرات الأردنية للمباريات
  // ═══════════════════════════════════════════════════════════
  if(isMatch(url, host)){
    
    // قاعدة صارمة: المباريات فقط من الأردن
    if(!isJordanIP){
      decision = CONFIG.BLOCK;
      cacheDecision(cacheKey, decision);
      return decision;
    }
    
    var net = p24(ip);
    var now = Date.now();
    
    // قفل السيرفر عند بداية المباراة
    if(!SESSION.locked){
      SESSION.locked = true;
      SESSION.net24 = net;
      SESSION.start = now;
      SESSION.lockDuration = getAdaptiveLockTime(url);
      
      return CONFIG.MATCH_PROXY;
    }
    
    // السماح فقط بنفس الشبكة أثناء المباراة لمنع lag
    if(net === SESSION.net24){
      return CONFIG.MATCH_PROXY;
    }
    
    // حظر أي محاولة للانتقال لشبكة أخرى
    return CONFIG.BLOCK;
  }
  
  // ═══════════════════════════════════════════════════════════
  // اللوبي: فقط السيرفرات الأردنية
  // ═══════════════════════════════════════════════════════════
  if(isLobby(url, host)){
    // في الوضع الصارم، اللوبي يجب أن يكون أردني فقط
    if(CONFIG.JORDAN_ONLY_MODE && !isJordanIP){
      decision = CONFIG.BLOCK;
      cacheDecision(cacheKey, decision);
      return decision;
    }
    
    decision = isJordanIP ? CONFIG.LOBBY_PROXY : CONFIG.BLOCK;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // ═══════════════════════════════════════════════════════════
  // الصوت: فقط السيرفرات الأردنية
  // ═══════════════════════════════════════════════════════════
  if(isVoice(url, host)){
    // الصوت حساس للـ latency، لذلك نفرض الأردن فقط
    if(CONFIG.JORDAN_ONLY_MODE && !isJordanIP){
      decision = CONFIG.BLOCK;
      cacheDecision(cacheKey, decision);
      return decision;
    }
    
    decision = isJordanIP ? CONFIG.VOICE_PROXY : CONFIG.BLOCK;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // فك القفل بعد انتهاء المباراة
  if(SESSION.locked && now - SESSION.start > SESSION.lockDuration){
    SESSION.locked = false;
    SESSION.net24 = null;
  }
  
  // ═══════════════════════════════════════════════════════════
  // السياسة الافتراضية لأي traffic آخر من PUBG
  // ═══════════════════════════════════════════════════════════
  
  // نسمح فقط للاتصالات الآمنة التي لا تؤثر على اللعب
  if(isSafeNonGameplay(url, host)){
    decision = CONFIG.DIRECT;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // كل شيء آخر: إذا كان أردني نسمح، وإلا نحظر
  if(CONFIG.JORDAN_ONLY_MODE){
    decision = isJordanIP ? CONFIG.LOBBY_PROXY : CONFIG.BLOCK;
  } else {
    decision = isJordanIP ? CONFIG.LOBBY_PROXY : CONFIG.DIRECT;
  }
  
  cacheDecision(cacheKey, decision);
  return decision;
}


// ================= END OF SCRIPT =================
// JORDAN ONLY MODE: Activated
// هذا السكربت يفرض الاتصال بالسيرفرات الأردنية فقط لجميع عمليات اللعب
// الاستثناءات الوحيدة: التحديثات والإحصائيات التي لا تؤثر على ping
