// =============================
// Accurate PAC – Jordan IPv6
// =============================

var PROXY = "PROXY 91.106.109.50:20005";
var DIRECT = "DIRECT";

// --------------------
// Expand IPv6
// --------------------
function expandIPv6(address) {
    if (!address) return "";
    var fullAddress = "";
    var parts = address.split("::");

    if (parts.length === 2) {
        var left = parts[0] ? parts[0].split(":") : [];
        var right = parts[1] ? parts[1].split(":") : [];
        var missing = 8 - (left.length + right.length);
        var zeros = [];
        for (var i = 0; i < missing; i++) zeros.push("0000");
        fullAddress = left.concat(zeros).concat(right);
    } else {
        fullAddress = address.split(":");
    }

    for (var j = 0; j < fullAddress.length; j++) {
        while (fullAddress[j].length < 4)
            fullAddress[j] = "0" + fullAddress[j];
    }

    return fullAddress.join("").toLowerCase();
}

// --------------------
// IPv6 CIDR match
// --------------------
function matchIPv6CIDR(ip, cidr) {
    var parts = cidr.split("/");
    var network = expandIPv6(parts[0]);
    var bits = parseInt(parts[1]);

    var ipFull = expandIPv6(ip);

    var hexChars = Math.floor(bits / 4);

    return ipFull.substring(0, hexChars) === network.substring(0, hexChars);
}

// --------------------
// Jordan IPv6 ranges
// --------------------
var jordanIPv6 = [
    "2001:32c0::/29",
    "2a01:9700::/29",
    "2a00:18d0::/32",
    "2a02:9c0::/29"
];

// --------------------
// Main PAC function
// --------------------
function FindProxyForURL(url, host) {

    var resolved = dnsResolve(host);

    if (resolved && resolved.indexOf(":") !== -1) {
        for (var i = 0; i < jordanIPv6.length; i++) {
            if (matchIPv6CIDR(resolved, jordanIPv6[i])) {
                return DIRECT;  // Jordan IPv6 → Direct
            }
        }
        return PROXY; // Other IPv6 → Proxy
    }

    if (isInNet(resolved, "10.0.0.0", "255.0.0.0") ||
        isInNet(resolved, "172.16.0.0", "255.240.0.0") ||
        isInNet(resolved, "192.168.0.0", "255.255.0.0")) {
        return DIRECT;
    }

    return PROXY + "; " + DIRECT;
}
