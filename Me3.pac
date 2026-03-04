// ============================================================
//  PUBG MOBILE - Jordan Lobby PAC Script
//  النسخة: 4.0 - IPv6 Jordan Ranges Edition
//  الهدف: لوبي أردني فقط + أقل بنق + IPv6 نطاقات
//  البروكسي: 46.185.131.218:20001
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
//  SESSION STATE
//  نحتفظ بحالة الجلسة لمنع تغيير الشبكة أثناء الماتش
// ============================================================

var SESSION = {
  lobbyNet : null,
  matchNet : null,
  inMatch  : false,
  matchTime: 0
};

var MATCH_TIMEOUT_MS = 40 * 60 * 1000; // 40 دقيقة

// ============================================================
//  IPv6 UTILITIES
// ============================================================

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// توسيع :: إلى العنوان الكامل المكوّن من 8 مجموعات
function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1) return address;

  var parts = address.split("::");
  var full  = [];

  if (parts.length === 2) {
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4) full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// استخراج أول 3 مجموعات كـ "net key" لتثبيت جلسة اللوبي
function getNet3(fullIP) {
  return fullIP.split(":").slice(0, 3).join(":");
}

// استخراج أول 4 مجموعات كـ "net key" لتثبيت جلسة الماتش
function getNet4(fullIP) {
  return fullIP.split(":").slice(0, 4).join(":");
}

// ============================================================
//  JORDAN IPv6 RANGES - نطاقات الأردن الرسمية
//  المصدر: RIPE NCC - مرتبة حسب المزوّد
// ============================================================

function isJordanIPv6(fullIP) {

  // ================== Orange Jordan (AS8376) ==================
  // النطاق الرئيسي: 2a01:9700::/32
  if (
    fullIP.startsWith("2a01:9700:1700:") ||
    fullIP.startsWith("2a01:9700:1c00:") ||
    fullIP.startsWith("2a01:9700:3100:") ||
    fullIP.startsWith("2a01:9700:3200:") ||
    fullIP.startsWith("2a01:9700:3300:") ||
    fullIP.startsWith("2a01:9700:3400:") ||
    fullIP.startsWith("2a01:9700:3500:") ||
    fullIP.startsWith("2a01:9700:3800:") ||
    fullIP.startsWith("2a01:9700:3900:") ||
    fullIP.startsWith("2a01:9700:3a00:") ||
    fullIP.startsWith("2a01:9700:3b00:") ||
    fullIP.startsWith("2a01:9700:3c00:") ||
    fullIP.startsWith("2a01:9700:3d00:") ||
    fullIP.startsWith("2a01:9700:3e00:") ||
    fullIP.startsWith("2a01:9700:3f00:") ||
    fullIP.startsWith("2a01:9700:4000:") ||
    fullIP.startsWith("2a01:9700:4100:") ||
    fullIP.startsWith("2a01:9700:4200:") ||
    fullIP.startsWith("2a01:9700:4300:") ||
    fullIP.startsWith("2a01:9700:4400:") ||
    fullIP.startsWith("2a01:9700:4500:") ||
    fullIP.startsWith("2a01:9700:4600:") ||
    fullIP.startsWith("2a01:9700:4700:") ||
    fullIP.startsWith("2a01:9700:4710:") ||
    fullIP.startsWith("2a01:9700:4800:") ||
    fullIP.startsWith("2a01:9700:4900:") ||
    fullIP.startsWith("2a01:9700:4a00:") ||
    fullIP.startsWith("2a01:9700:4b00:") ||
    fullIP.startsWith("2a01:9700:4d00:") ||
    fullIP.startsWith("2a01:9700:4e00:") ||
    fullIP.startsWith("2a01:9700:4f00:") ||
    fullIP.startsWith("2a01:9700:5000:") ||
    fullIP.startsWith("2a01:9700:5100:") ||
    fullIP.startsWith("2a01:9700:5200:") ||
    fullIP.startsWith("2a01:9700:5300:") ||
    fullIP.startsWith("2a01:9700:5400:") ||
    fullIP.startsWith("2a01:9700:5500:") ||
    fullIP.startsWith("2a01:9700:5600:") ||
    fullIP.startsWith("2a01:9700:5700:") ||
    fullIP.startsWith("2a01:9700:5800:") ||
    fullIP.startsWith("2a01:9700:5900:") ||
    fullIP.startsWith("2a01:9700:5a00:") ||
    fullIP.startsWith("2a01:9700:5b00:") ||
    fullIP.startsWith("2a01:9700:5c00:") ||
    fullIP.startsWith("2a01:9700:5e00:") ||
    fullIP.startsWith("2a01:9700:6000:") ||
    fullIP.startsWith("2a01:9700:6100:") ||
    fullIP.startsWith("2a01:9700:6200:") ||
    fullIP.startsWith("2a01:9700:6300:") ||
    fullIP.startsWith("2a01:9700:6400:") ||
    fullIP.startsWith("2a01:9700:6500:") ||
    fullIP.startsWith("2a01:9700:6700:") ||
    fullIP.startsWith("2a01:9700:6800:") ||
    fullIP.startsWith("2a01:9700:6900:") ||
    fullIP.startsWith("2a01:9700:6a00:") ||
    fullIP.startsWith("2a01:9700:6b00:") ||
    fullIP.startsWith("2a01:9700:6c00:") ||
    fullIP.startsWith("2a01:9700:6e00:") ||
    fullIP.startsWith("2a01:9700:6f00:") ||
    fullIP.startsWith("2a01:9700:7000:") ||
    fullIP.startsWith("2a01:9700:7100:") ||
    fullIP.startsWith("2a01:9700:7200:") ||
    fullIP.startsWith("2a01:9700:7300:") ||
    fullIP.startsWith("2a01:9700:7400:") ||
    fullIP.startsWith("2a01:9700:7500:") ||
    fullIP.startsWith("2a01:9700:7600:") ||
    fullIP.startsWith("2a01:9700:7a00:") ||
    fullIP.startsWith("2a01:9700:8000:") ||
    fullIP.startsWith("2a01:9700:8100:") ||
    fullIP.startsWith("2a01:9700:8400:") ||
    fullIP.startsWith("2a01:9700:8500:") ||
    fullIP.startsWith("2a01:9700:8600:") ||
    fullIP.startsWith("2a01:9700:9000:") ||
    fullIP.startsWith("2a01:9700:9100:") ||
    fullIP.startsWith("2a01:9700:9200:") ||
    fullIP.startsWith("2a01:9700:9300:") ||
    fullIP.startsWith("2a01:9700:9400:")
  ) return true;

  // ================== Jordan Telecom / JT (AS8697) ==================
  // النطاق: 2a00:18d8::/32
  if (
    fullIP.startsWith("2a00:18d8:0040:") ||
    fullIP.startsWith("2a00:18d8:0050:") ||
    fullIP.startsWith("2a00:18d8:0060:") ||
    fullIP.startsWith("2a00:18d8:0070:") ||
    fullIP.startsWith("2a00:18d8:0080:") ||
    fullIP.startsWith("2a00:18d8:0090:") ||
    fullIP.startsWith("2a00:18d8:00c0:") ||
    fullIP.startsWith("2a00:18d8:00d0:") ||
    fullIP.startsWith("2a00:18d8:00e0:") ||
    fullIP.startsWith("2a00:18d8:00f0:") ||
    fullIP.startsWith("2a00:18d8:0100:") ||
    fullIP.startsWith("2a00:18d8:0110:") ||
    fullIP.startsWith("2a00:18d8:0120:") ||
    fullIP.startsWith("2a00:18d8:0130:") ||
    fullIP.startsWith("2a00:18d8:0140:") ||
    fullIP.startsWith("2a00:18d8:0150:")
  ) return true;

  // ================== Zain Jordan (AS48832) ==================
  // النطاق: 2a03:6b01::/32
  if (
    fullIP.startsWith("2a03:6b01:4000:") ||
    fullIP.startsWith("2a03:6b01:4400:") ||
    fullIP.startsWith("2a03:6b01:6000:") ||
    fullIP.startsWith("2a03:6b01:6400:") ||
    fullIP.startsWith("2a03:6b01:8000:")
  ) return true;

  // ================== Umniah (AS47887) ==================
  // النطاق: 2a05:b480::/29
  if (fullIP.startsWith("2a05:b480:")) return true;

  return false;
}

// ============================================================
//  GLOBAL BLOCK RANGES
//  نطاقات معروفة لسيرفرات غير أردنية يجب حجبها
//  لمنع دخول لاعبين من خارج الأردن
// ============================================================

function isGlobalBlock(fullIP) {
  return (
    // Google / GCP
    fullIP.startsWith("2a00:1450:") ||
    // Cloudflare
    fullIP.startsWith("2a06:98c0:") ||
    fullIP.startsWith("2606:4700:") ||
    // Akamai / Linode
    fullIP.startsWith("2400:cb00:") ||
    // AWS / Amazon
    fullIP.startsWith("2600:1f1")   ||
    fullIP.startsWith("2a05:d07")   ||
    // Microsoft / Azure
    fullIP.startsWith("2603:10")    ||
    // سيرفرات آسيا (الصين / هونغ كونغ)
    fullIP.startsWith("2401:4900:") ||
    fullIP.startsWith("2407:")      ||
    // سيرفرات إفريقيا
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:") ||
    // Linode / Akamai (US)
    fullIP.startsWith("2400:3c00:") ||
    fullIP.startsWith("2400:4f00:") ||
    // سيرفرات أخرى معروفة بلوبيات غير أردنية
    fullIP.startsWith("2a00:bdc0:") ||
    fullIP.startsWith("2a00:13c0:") ||
    fullIP.startsWith("2a00:1fa0:") ||
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:")
  );
}

// ============================================================
//  PUBG DETECTION
// ============================================================

function isPUBG(host, url) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|sgame/i.test(host + url);
}

// ============================================================
//  LOBBY vs MATCH CLASSIFICATION
// ============================================================

function isLobbyRequest(data) {
  return /lobby|login|auth|session|gateway|region|matchmak|queue|profile|
          inventory|store|shop|catalog|news|event|mission|reward|mail|
          friends|clan|chat|voice|party|team|config|settings|patch|cdn|
          asset|social|rank|leaderboard/i.test(data);
}

function isMatchRequest(data) {
  return /match|battle|classic|ranked|unranked|competitive|arena|tdm|
          teamdeath|gungame|domination|metro|zombie|infection|evoground|
          royale|war|sniper|quickmatch|arcade|clash|ingame|gamesvr|relay|
          realtime|spectate|combat|survival/i.test(data);
}

// ============================================================
//  MATCH TIMEOUT - إعادة ضبط جلسة الماتش تلقائياً
// ============================================================

function resetMatchIfExpired() {
  if (SESSION.inMatch && SESSION.matchTime > 0) {
    if ((new Date().getTime() - SESSION.matchTime) > MATCH_TIMEOUT_MS) {
      SESSION.matchNet  = null;
      SESSION.inMatch   = false;
      SESSION.matchTime = 0;
    }
  }
}

// ============================================================
//  MAIN PROXY FUNCTION
// ============================================================

function FindProxyForURL(url, host) {

  // --- تجاهل الشبكات المحلية والداخلية ---
  if (isPlainHostName(host)) return DIRECT;

  // --- فقط لـ PUBG ---
  if (!isPUBG(host, url)) return DIRECT;

  // --- حل الـ DNS ---
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // --- إذا لم يُحل الـ DNS → بلوك ---
  if (!ip) return BLOCK;

  // --- إذا جاء IPv4 → مرره مباشرة بدون تدخل ---
  if (!isIPv6(ip)) return DIRECT;

  // --- توسيع العنوان IPv6 ---
  var fullIP = expandIPv6(ip);

  // --- حجب النطاقات العالمية غير الأردنية فوراً ---
  if (isGlobalBlock(fullIP)) return BLOCK;

  // --- إذا لم يكن أردني → بلوك ---
  if (!isJordanIPv6(fullIP)) return BLOCK;

  // --- تحديث حالة الماتش ---
  resetMatchIfExpired();

  var data  = (host + url).toLowerCase();
  var net3  = getNet3(fullIP);
  var net4  = getNet4(fullIP);

  // ==========================================================
  //  LOBBY PHASE → تثبيت اللوبي على شبكة /48 أردنية
  // ==========================================================

  if (isLobbyRequest(data)) {
    // أول ظهور: نحفظ الشبكة كمرجع للجلسة
    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;
    return PROXY;
  }

  // ==========================================================
  //  MATCH PHASE → تثبيت الماتش على شبكة /64 أردنية
  // ==========================================================

  if (isMatchRequest(data)) {

    if (!SESSION.matchNet) {
      // بداية ماتش جديد: نسجّل الشبكة والوقت
      SESSION.matchNet  = net4;
      SESSION.inMatch   = true;
      SESSION.matchTime = new Date().getTime();
      return PROXY;
    }

    // أي طلب من /64 مختلف = لاعب من خارج الشبكة الأردنية → بلوك
    if (net4 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // ==========================================================
  //  GENERAL PUBG TRAFFIC غير مصنّف → نمرره عبر البروكسي
  // ==========================================================

  return PROXY;
}
