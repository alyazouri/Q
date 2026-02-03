// ============================================================
// GAME BOOSTER – PURE JORDAN PATH EDITION v2.2
// مسار أردني نقي 100% مع رؤية كاملة للاعبين الأردنيين
// ============================================================


// ================= CONFIG =================
var CONFIG = {
  // استخدام نفس البروكسي للوبي والماتش لضمان المسار الموحد
  JORDAN_PROXY: "PROXY 46.185.131.218:20001",  // المسار الأردني الرئيسي
  
  UPDATE_PROXY: "PROXY 212.35.66.45:9090",     // التحديثات فقط (معزولة)
  
  DIRECT: "DIRECT",
  BLOCK:  "PROXY 127.0.0.1:9",

  DNS_CACHE_TIME: 600000,
  MATCH_LOCK_TIME: 1800000,
  DECISION_CACHE_SIZE: 300,
  
  // سياسة صارمة: فقط الأردن للعب
  PURE_JORDAN_MODE: true,
  
  USE_ADAPTIVE_LOCK: true,
  USE_DECISION_CACHE: true
};


// ================= JORDAN IP RANGES (COMPLETE) =================
// هذه القوائم محدثة لتشمل جميع نطاقات الـ IP الأردنية المستخدمة في PUBG

var JO8_MAP = new Map([
  [46,1],[176,1],[178,1],[77,1],[37,1],[85,1],[188,1],[93,1],[94,1],[79,1],[149,1]
]);

var JO16 = {
  "46.185":1,"46.184":1,"46.186":1,
  "176.28":1,"176.29":1,"176.57":1,
  "178.77":1,"178.135":1,
  "77.245":1,
  "37.202":1,"37.252":1,
  "85.159":1,
  "188.123":1,"188.124":1,
  "93.94":1,
  "94.125":1,"94.126":1,
  "79.135":1,"79.172":1,
  "149.200":1,"149.202":1
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


// ================= SESSION =================
var SESSION = {
  locked: false,
  net24: null,
  start: 0,
  lockDuration: CONFIG.MATCH_LOCK_TIME,
  dns: {},
  inMatch: false  // علم جديد لمعرفة إذا كنا في مباراة فعلية
};

var DECISION_CACHE = {};
var CACHE_COUNTER = 0;
var LOWER_CACHE = {};


// ================= FAST HELPERS =================
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


// ================= TRAFFIC DETECTION (REFINED) =================

var PUBG_KEYWORDS = [
  'pubg','pubgm','pubgmobile','tencent','krafton',
  'lightspeed','proximabeta','levelinfinite',
  'igame','intl','gameloop'
];

// كلمات المباراة الفعلية (ليس اللوبي)
var MATCH_KEYWORDS = [
  'battle','combat','realtime','udp',
  'gameserver','playserver'
];

// كلمات اللوبي والـ Matchmaking
var LOBBY_KEYWORDS = [
  'lobby','matchmaking','queue','gateway','dispatch',
  'recruit','friend','social','team','squad',
  'invite','clan','guild','party','ready','match',
  'room','session','arena','classic','metro','rank'
];

var VOICE_KEYWORDS = [
  'voice','rtc','webrtc','agora','audio','mic','talk'
];

var UPDATE_KEYWORDS = [
  'update','patch','download','cdn','asset','resource','file','apk','obb'
];

// خدمات ثانوية لا تؤثر على اللعب
var ANALYTICS_KEYWORDS = [
  'analytics','telemetry','crash','log','metric','stat',
  'report','beacon','track'
];

function isPUBG(h){
  return has(h, PUBG_KEYWORDS);
}

function isMatch(u, h){
  var combined = u + h;
  // المباراة الفعلية تحتوي على كلمات محددة مثل battle أو realtime
  return has(combined, MATCH_KEYWORDS);
}

function isLobby(u, h){
  var combined = u + h;
  return has(combined, LOBBY_KEYWORDS);
}

function isVoice(u, h){
  return has(u + h, VOICE_KEYWORDS);
}

function isUpdate(u, h){
  return has(u + h, UPDATE_KEYWORDS);
}

function isAnalytics(u, h){
  return has(u + h, ANALYTICS_KEYWORDS);
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
  }
}


// ================= MAIN ENGINE - PURE JORDAN PATH =================

function FindProxyForURL(url, host){
  
  host = clean(host);
  host = toLowerCached(host);
  
  // السماح للمواقع غير المتعلقة بـ PUBG
  if(!isPUBG(host)) return CONFIG.DIRECT;
  
  var ip = resolve(host);
  if(!ip) return CONFIG.BLOCK;
  
  // فحص الكاش
  if(CONFIG.USE_DECISION_CACHE){
    var cacheKey = getCacheKey(url, host, ip);
    if(DECISION_CACHE[cacheKey]){
      return DECISION_CACHE[cacheKey];
    }
  }
  
  var decision;
  var isJordanIP = isJordan(ip);
  
  // حظر المناطق البعيدة تماماً
  if(isHighLatency(ip)){
    decision = CONFIG.BLOCK;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // التحديثات: معزولة على بروكسي خاص
  if(isUpdate(url, host)){
    decision = CONFIG.UPDATE_PROXY;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // الإحصائيات: نسمح لها بالعمل مباشرة لأنها لا تؤثر
  if(isAnalytics(url, host)){
    decision = CONFIG.DIRECT;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // ═══════════════════════════════════════════════════════════
  // المباراة الفعلية: قفل صارم على سيرفر واحد أردني
  // ═══════════════════════════════════════════════════════════
  if(isMatch(url, host)){
    
    // فقط السيرفرات الأردنية مسموحة للمباريات
    if(!isJordanIP){
      decision = CONFIG.BLOCK;
      cacheDecision(cacheKey, decision);
      return decision;
    }
    
    var net = p24(ip);
    var now = Date.now();
    
    // عند بداية المباراة: نقفل على السيرفر
    if(!SESSION.locked){
      SESSION.locked = true;
      SESSION.inMatch = true;
      SESSION.net24 = net;
      SESSION.start = now;
      SESSION.lockDuration = getAdaptiveLockTime(url);
      
      return CONFIG.JORDAN_PROXY;
    }
    
    // أثناء المباراة: فقط نفس الشبكة
    if(net === SESSION.net24){
      return CONFIG.JORDAN_PROXY;
    }
    
    // منع server hopping
    return CONFIG.BLOCK;
  }
  
  // ═══════════════════════════════════════════════════════════
  // اللوبي والـ Matchmaking: مرونة كاملة للأردن فقط
  // ═══════════════════════════════════════════════════════════
  if(isLobby(url, host)){
    
    // هذا هو المفتاح: نسمح بجميع السيرفرات الأردنية في اللوبي
    // حتى تتمكن اللعبة من رؤية جميع اللاعبين الأردنيين
    if(isJordanIP){
      decision = CONFIG.JORDAN_PROXY;
      cacheDecision(cacheKey, decision);
      return decision;
    }
    
    // فقط السيرفرات غير الأردنية نحظرها
    decision = CONFIG.BLOCK;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // ═══════════════════════════════════════════════════════════
  // الصوت: أردني فقط
  // ═══════════════════════════════════════════════════════════
  if(isVoice(url, host)){
    
    if(isJordanIP){
      decision = CONFIG.JORDAN_PROXY;
      cacheDecision(cacheKey, decision);
      return decision;
    }
    
    decision = CONFIG.BLOCK;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // فك القفل بعد انتهاء المباراة
  if(SESSION.locked){
    var now = Date.now();
    if(now - SESSION.start > SESSION.lockDuration){
      SESSION.locked = false;
      SESSION.inMatch = false;
      SESSION.net24 = null;
    }
  }
  
  // ═══════════════════════════════════════════════════════════
  // باقي traffic من PUBG: أردني فقط
  // ═══════════════════════════════════════════════════════════
  
  if(isJordanIP){
    decision = CONFIG.JORDAN_PROXY;
    cacheDecision(cacheKey, decision);
    return decision;
  }
  
  // أي شيء آخر من PUBG وليس أردني: محظور
  decision = CONFIG.BLOCK;
  cacheDecision(cacheKey, decision);
  return decision;
}


// ================= END OF SCRIPT =================
// PURE JORDAN PATH MODE
// جميع اتصالات PUBG تمر فقط عبر السيرفرات الأردنية
// الاستثناء الوحيد: التحديثات والإحصائيات
