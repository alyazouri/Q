function FindProxyForURL(url, host) {
  var PROXY = "PROXY 212.35.66.45:20005";

  host = host.toLowerCase();

  if (
    isPubgGlobalHost(host) ||
    isPubgGlobalIP(host) ||
    isJordanianDomain(host) ||
    isJordanianResidentialIP(host)
  ) {
    return PROXY;
  }

  return PROXY;
}

function isPubgGlobalHost(host) {
  var domains = [
    "gpubgm.com",
    ".gpubgm.com",
    "pubgmobile.com",
    ".pubgmobile.com",
    "pubgmobile.live",
    ".pubgmobile.live",
    "igamepubg.com",
    ".igamepubg.com",
    "igamecj.com",
    ".igamecj.com",
    "amsoveasea.com",
    ".amsoveasea.com",
    "tdatamaster.com",
    ".tdatamaster.com",
    "proximabeta.com",
    ".proximabeta.com",
    "levelinfinite.com",
    ".levelinfinite.com",
    "intlgame.com",
    ".intlgame.com",
    "playerinfinite.com",
    ".playerinfinite.com",
    "anticheatexpert.com",
    ".anticheatexpert.com",
    "gcloudcs.com",
    ".gcloudcs.com",
    "gcloud.qq.com",
    ".gcloud.qq.com",
    "kgslb.com",
    ".kgslb.com",
    "tencentgames.com",
    ".tencentgames.com",
    "pubgmcdn.com",
    ".pubgmcdn.com",
    "gtimg.com",
    ".gtimg.com",
    "idosw.com",
    ".idosw.com",
    "lobby.igamecj.com",
    "match.igamecj.com",
    "proximity.igamecj.com",
    "euspeed.igamecj.com",
    "naspeed.igamecj.com",
    "hkspeed.igamecj.com",
    "krspeed.igamecj.com",
    "pay.igamecj.com",
    "file.igamecj.com",
    "public.igamecj.com",
    "intlsdk.igamecj.com",
    "gcloud.igamecj.com",
    "gcloud.download.igamecj.com",
    "gcloud-versvr.igamecj.com",
    "gvoice-config.igamecj.com",
    "cloudctrl.igamecj.com",
    "web.gcloud.igamecj.com",
    "mgl.lobby.igamecj.com",
    "mgl.public.igamecj.com",
    "napubgm.broker.amsoveasea.com",
    "cloud.gsdk.proximabeta.com",
    "sok.proximabeta.com",
    "idcconfig.gcloud.qq.com",
    "de.voice.gcloudcs.com",
    "qos.hk.gcloudcs.com",
    "asia.csoversea.mbgame.anticheatexpert.com",
    "csoversea.mbgame.anticheatexpert.com",
    "down.anticheatexpert.com",
    "tsg.tdatamaster.com",
    "astat.bugly.qcloud.com",
    "bugly.qcloud.com",
    "tencentgames.helpshift.com"
  ];

  var i;
  for (i = 0; i < domains.length; i++) {
    if (dnsDomainIs(host, domains[i]) || shExpMatch(host, "*" + domains[i])) {
      return true;
    }
  }
  return false;
}

function isPubgGlobalIP(host) {
  var ip = resolveIP(host);
  if (!ip) {
    return false;
  }

  var ranges = [
    ["162.62.0.0", "255.255.0.0"],
    ["150.109.0.0", "255.255.0.0"],
    ["129.226.0.0", "255.255.0.0"],
    ["170.106.0.0", "255.255.0.0"],
    ["119.28.0.0", "255.255.0.0"],
    ["101.32.0.0", "255.255.0.0"],
    ["49.51.0.0", "255.255.0.0"],
    ["43.174.0.0", "255.255.0.0"]
  ];

  return inAnyRange(ip, ranges);
}

function isJordanianDomain(host) {
  var domains = [
    ".jo",
    ".com.jo",
    ".net.jo",
    ".org.jo",
    ".gov.jo",
    ".edu.jo",
    ".mil.jo",
    ".sch.jo",
    ".per.jo",
    ".phd.jo",
    "orange.jo",
    "go.com.jo",
    "zain.com",
    "jo.zain.com",
    "umniah.com",
    "damamax.jo",
    "vtel.jo",
    "xol.jo"
  ];

  var i;
  for (i = 0; i < domains.length; i++) {
    if (dnsDomainIs(host, domains[i]) || shExpMatch(host, "*" + domains[i])) {
      return true;
    }
  }
  return false;
}

function isJordanianResidentialIP(host) {
  var ip = resolveIP(host);
  if (!ip) {
    return false;
  }
  return inAnyRange(ip, jordanResidentialRanges());
}

function jordanResidentialRanges() {
  return [
    ["37.202.64.0", "255.255.192.0"],
    ["46.185.128.0", "255.255.128.0"],
    ["79.173.192.0", "255.255.192.0"],
    ["86.108.0.0", "255.255.128.0"],
    ["92.253.0.0", "255.255.128.0"],
    ["94.249.0.0", "255.255.128.0"],
    ["149.200.128.0", "255.255.128.0"],
    ["185.98.220.0", "255.255.252.0"],
    ["194.165.128.0", "255.255.224.0"],
    ["212.34.0.0", "255.255.224.0"],
    ["213.139.32.0", "255.255.224.0"],
    ["213.186.160.0", "255.255.224.0"],
    ["217.23.32.0", "255.255.240.0"],

    ["46.32.96.0", "255.255.224.0"],
    ["77.245.0.0", "255.255.240.0"],
    ["80.90.160.0", "255.255.240.0"],
    ["87.238.128.0", "255.255.248.0"],
    ["94.142.32.0", "255.255.224.0"],
    ["176.28.128.0", "255.255.128.0"],
    ["176.29.0.0", "255.255.0.0"],
    ["185.109.192.0", "255.255.252.0"],
    ["188.247.64.0", "255.255.224.0"],

    ["5.45.128.0", "255.255.240.0"],
    ["5.198.240.0", "255.255.248.0"],
    ["37.44.32.0", "255.255.248.0"],
    ["37.152.0.0", "255.255.248.0"],
    ["37.220.112.0", "255.255.240.0"],
    ["46.23.112.0", "255.255.240.0"],
    ["46.248.192.0", "255.255.224.0"],
    ["85.159.216.0", "255.255.248.0"],
    ["91.106.96.0", "255.255.240.0"],
    ["91.186.224.0", "255.255.224.0"],
    ["92.241.32.0", "255.255.224.0"],
    ["95.172.192.0", "255.255.224.0"],
    ["109.107.224.0", "255.255.224.0"],
    ["141.105.56.0", "255.255.248.0"],
    ["178.238.176.0", "255.255.240.0"],
    ["185.12.244.0", "255.255.252.0"],
    ["185.14.132.0", "255.255.252.0"],
    ["185.19.112.0", "255.255.252.0"],
    ["185.80.24.0", "255.255.252.0"],
    ["185.80.104.0", "255.255.252.0"],
    ["212.35.64.0", "255.255.224.0"],
    ["212.118.0.0", "255.255.224.0"],

    ["81.28.112.0", "255.255.240.0"],
    ["82.212.64.0", "255.255.192.0"],
    ["185.175.248.0", "255.255.252.0"],
    ["188.123.160.0", "255.255.224.0"],

    ["37.123.64.0", "255.255.224.0"],
    ["176.57.0.0", "255.255.224.0"],
    ["176.57.48.0", "255.255.240.0"],
    ["178.77.128.0", "255.255.192.0"],
    ["185.160.236.0", "255.255.252.0"],

    ["62.72.160.0", "255.255.224.0"],
    ["84.18.32.0", "255.255.224.0"],
    ["84.18.64.0", "255.255.224.0"],
    ["81.21.0.0", "255.255.240.0"],
    ["87.236.232.0", "255.255.248.0"],
    ["93.93.144.0", "255.255.248.0"],
    ["93.95.200.0", "255.255.248.0"],
    ["94.127.208.0", "255.255.248.0"],
    ["95.141.208.0", "255.255.240.0"],
    ["109.237.192.0", "255.255.240.0"],
    ["141.0.0.0", "255.255.248.0"],
    ["176.241.64.0", "255.255.248.0"],
    ["178.20.184.0", "255.255.248.0"],
    ["217.29.240.0", "255.255.240.0"],
    ["217.144.0.0", "255.255.240.0"],
    ["5.199.184.0", "255.255.252.0"],
    ["37.17.192.0", "255.255.240.0"],
    ["45.142.196.0", "255.255.252.0"],
    ["79.134.128.0", "255.255.224.0"]
  ];
}

function resolveIP(host) {
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    return host;
  }
  return dnsResolve(host);
}

function inAnyRange(ip, ranges) {
  var i;
  for (i = 0; i < ranges.length; i++) {
    if (isInNet(ip, ranges[i][0], ranges[i][1])) {
      return true;
    }
  }
  return false;
}
