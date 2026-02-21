/**
 * ════════════════════════════════════════════════════════════════════
 *  BLACKBOX AGENT - PAC Script مُحسّن ومطوّر
 * 专为约旦PUBG游戏优化的智能代理自动配置脚本
 * ════════════════════════════════════════════════════════════════════
 * 
 * المميزات:
 * ✓ تحسينات الأداء (ذاكرة مؤقتة محسّنة، فحص أسرع)
 * ✓ معالجة أخطاء شاملة
 * ✓ دعم IPv6/IPv4 ذكي
 * ✓ تسجيل متقدم للتصحيح
 * ✓ تخصيص دقيق لحركة المرور
 */

(function() {
    "use strict";

    // ═══════════════════════════════════════════════════════════════════
    //  الإعدادات الأساسية - CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════
    
    const CONFIG = {
        // خوادم البروكسي الأساسية
        MATCH_PROXY: {
            host: "46.185.131.218",
            port: 20001,
            protocol: "PROXY"
        },
        
        // خوادم اللوبي (متوازنة)
        LOBBY_POOL: [
            { host: "212.35.66.45", port: 8085, protocol: "PROXY" },
            { host: "212.35.66.45", port: 8181, protocol: "PROXY" },
            { host: "46.185.131.218", port: 443, protocol: "PROXY" }
        ],
        
        // إعدادات الأداء
        CACHE_ENABLED: true,
        CACHE_TTL: 300000, // 5 دقائق بالمللي ثانية
        
        // إعدادات الأمان
        BLOCK_LOCALHOST: true,
        BLOCK_INVALID_IP: true,
        
        // مستوى التسجيل (0=إيقاف, 1=أخطاء, 2=تحذيرات, 3=معلومات)
        LOG_LEVEL: 1
    };

    // ═══════════════════════════════════════════════════════════════════
    //  نطاقات IP - IP RANGES (CIDR Notation)
    // ═══════════════════════════════════════════════════════════════════
    
    // نطاقات المباريات (مطلوبة بدقة عالية)
    const JORDAN_MATCH_RANGES = [
        // Orange Fixed/Fiber
        { network: "37.252.0.0", mask: "255.255.0.0" },
        { network: "94.127.0.0", mask: "255.255.0.0" },
        
        // Zain Mobile (4G/5G)
        { network: "178.77.0.0", mask: "255.255.0.0" },
        { network: "176.29.0.0", mask: "255.255.0.0" },
        { network: "176.28.0.0", mask: "255.255.0.0" },
        
        // Orange Mobile/Data
        { network: "37.202.0.0", mask: "255.255.0.0" },
        { network: "93.93.0.0", mask: "255.255.0.0" },
        { network: "93.95.0.0", mask: "255.255.0.0" },
        
        // Umniah Mobile
        { network: "176.57.0.0", mask: "255.255.0.0" },
        
        // نطاقات إضافية للمباريات
        { network: "149.200.128.0", mask: "255.255.128.0" },
        { network: "79.173.192.0", mask: "255.255.192.0" },
        { network: "80.90.160.0", mask: "255.255.240.0" },
        { network: "77.245.0.0", mask: "255.255.240.0" },
        { network: "79.134.128.0", mask: "255.255.224.0" },
        { network: "46.185.128.0", mask: "255.255.128.0" },
        { network: "2.59.52.0", mask: "255.255.252.0" }
    ];

    // نطاقات اللوبي (أوسع لتشمل جميع الخدمات)
    const JORDAN_LOBBY_RANGES = [
        ...JORDAN_MATCH_RANGES,
        
        // نطاقات إضافية للخدمات العامة
        { network: "149.200.0.0", mask: "255.255.128.0" },
        { network: "79.173.0.0", mask: "255.255.192.0" },
        { network: "80.90.0.0", mask: "255.255.240.0" },
        { network: "77.245.0.0", mask: "255.255.240.0" },
        { network: "79.134.0.0", mask: "255.255.224.0" },
        { network: "46.185.0.0", mask: "255.255.128.0" },
        { network: "2.59.0.0", mask: "255.255.252.0" }
    ];

    // قائمة الحظر الجغرافي (أوروبا + روسيا + آسيا)
    const GEO_BLACKLIST = [
        // أوروبا
        { network: "5.0.0.0", mask: "255.0.0.0" },
        { network: "50.0.0.0", mask: "255.0.0.0" },
        { network: "51.0.0.0", mask: "255.0.0.0" },
        
        // روسيا
        { network: "5.136.0.0", mask: "255.248.0.0" },
        { network: "31.128.0.0", mask: "255.192.0.0" },
        { network: "46.16.0.0", mask: "255.240.0.0" },
        { network: "95.24.0.0", mask: "255.248.0.0" },
        { network: "178.64.0.0", mask: "255.192.0.0" },
        
        // آسيا
        { network: "1.0.0.0", mask: "255.0.0.0" },
        { network: "14.0.0.0", mask: "255.0.0.0" },
        { network: "27.0.0.0", mask: "255.0.0.0" },
        { network: "36.0.0.0", mask: "255.0.0.0" },
        { network: "39.0.0.0", mask: "255.0.0.0" },
        { network: "42.0.0.0", mask: "255.0.0.0" },
        { network: "49.0.0.0", mask: "255.0.0.0" },
        { network: "58.0.0.0", mask: "255.0.0.0" },
        { network: "59.0.0.0", mask: "255.0.0.0" },
        { network: "60.0.0.0", mask: "255.0.0.0" }
    ];

    // ═══════════════════════════════════════════════════════════════════
    //  الجلسة والجلسة المؤقتة - SESSION & CACHE
    // ═══════════════════════════════════════════════════════════════════
    
    const SESSION = {
        matchNetwork: null,
        matchHost: null,
        matchTimestamp: null,
        dnsCache: new Map(),
        ipCache: new Map()
    };

    // ═══════════════════════════════════════════════════════════════════
    //  أدوات مساعدة - UTILITIES
    // ═══════════════════════════════════════════════════════════════════
    
    /**
     * تسجيل الرسائل مع مستويات مختلفة
     */
    function log(level, message, data = null) {
        if (level <= CONFIG.LOG_LEVEL) {
            const prefix = {
                0: "❌ [ERROR]",
                1: "⚠️  [WARNING]",
                2: "ℹ️  [INFO]",
                3: "🔍 [DEBUG]"
            }[level] || "[LOG]";
            
            let logMessage = `${prefix} ${message}`;
            if (data) {
                logMessage += ` ${JSON.stringify(data)}`;
            }
            
            // استخدام console.warn للتميز
            if (level <= 1) {
                console.warn(logMessage);
            } else {
                console.log(logMessage);
            }
        }
    }

    /**
     * تنظيف عنوان URL والحصول على المضيف
     */
    function extractHost(url) {
        try {
            // إزالة البروتوكول
            let host = url.replace(/^https?:\/\//i, "");
            
            // إزالة المسار والاستعلام
            const questionMarkIndex = host.indexOf("?");
            const hashIndex = host.indexOf("#");
            let endIndex = host.length;
            
            if (questionMarkIndex !== -1) {
                endIndex = Math.min(endIndex, questionMarkIndex);
            }
            if (hashIndex !== -1) {
                endIndex = Math.min(endIndex, hashIndex);
            }
            
            host = host.substring(0, endIndex);
            
            // إزالة المنفذ إذا كان قياسياً
            const portMatch = host.match(/:(\d+)$/);
            if (portMatch) {
                const port = parseInt(portMatch[1], 10);
                if ((port === 80 && url.startsWith("http://")) || 
                    (port === 443 && url.startsWith("https://"))) {
                    host = host.substring(0, host.length - portMatch[0].length);
                }
            }
            
            // إزالة slash البداية
            host = host.replace(/^\/+/, "");
            
            return host.toLowerCase().trim();
        } catch (error) {
            log(1, "فشل في استخراج المضيف", { url, error: error.message });
            return url;
        }
    }

    /**
     * التحقق من صحة عنوان IPv4
     */
    function isValidIPv4(ip) {
        if (!ip || typeof ip !== "string") return false;
        
        const parts = ip.split(".");
        if (parts.length !== 4) return false;
        
        for (let part of parts) {
            const num = parseInt(part, 10);
            if (isNaN(num) || num < 0 || num > 255) return false;
            if (!/^\d+$/.test(part)) return false;
        }
        
        return true;
    }

    /**
     * تحويل IP إلى عدد صحيح للتسريع
     */
    function ipToLong(ip) {
        if (!isValidIPv4(ip)) return -1;
        
        return ip.split(".").reduce((acc, octet) => {
            return (acc << 8) + parseInt(octet, 10);
        }, 0) >>> 0; // تحويل إلى unsigned
    }

    /**
     * التحقق مما إذا كان IP ضمن نطاق CIDR
     */
    function isInCIDR(ip, network, mask) {
        if (!isValidIPv4(ip) || !isValidIPv4(network) || !isValidIPv4(mask)) {
            return false;
        }

        const ipLong = ipToLong(ip);
        const networkLong = ipToLong(network);
        const maskLong = ipToLong(mask);

        // التحقق من صحة الشبكة
        if ((networkLong & maskLong) !== networkLong) {
            log(3, "عنوان شبكة غير صالح", { network, mask });
            return false;
        }

        return (ipLong & maskLong) === networkLong;
    }

    /**
     * التحقق مما إذا كان IP ضمن قائمة من النطاقات
     */
    function isInIPRanges(ip, ranges) {
        if (!ip || !ranges || ranges.length === 0) return false;
        
        for (const range of ranges) {
            if (isInCIDR(ip, range.network, range.mask)) {
                log(3, "IP موجود في النطاق", { ip, network: range.network });
                return true;
            }
        }
        
        return false;
    }

    /**
     * حل DNS مع التخزين المؤقت
     */
    function resolveDNS(host) {
        if (!CONFIG.CACHE_ENABLED) {
            return dnsResolve(host);
        }

        // التحقق من الذاكرة المؤقتة
        const cached = SESSION.dnsCache.get(host);
        if (cached) {
            const now = Date.now();
            if (now - cached.timestamp < CONFIG.CACHE_TTL) {
                log(3, "DNS من الذاكرة المؤقتة", { host, ip: cached.ip });
                return cached.ip;
            } else {
                // إزالة الإدخال المنتهي
                SESSION.dnsCache.delete(host);
            }
        }

        // حل DNS جديد
        const ip = dnsResolve(host);
        if (ip) {
            SESSION.dnsCache.set(host, {
                ip: ip,
                timestamp: Date.now()
            });
            log(3, "DNS تم حله", { host, ip });
        }

        return ip;
    }

    /**
     * اختيار خادم بروكسي من المجموعة بالتوازن
     */
    function selectLobbyProxy(host) {
        if (!host || CONFIG.LOBBY_POOL.length === 0) {
            log(1, "لا توجد خوادم لوبي متاحة");
            return "DIRECT";
        }

        // حساب hash للاتساق
        let hash = 0;
        for (let i = 0; i < host.length; i++) {
            hash = ((hash << 5) - hash) + host.charCodeAt(i);
            hash = hash & hash; // تحويل إلى integer
        }
        
        const index = Math.abs(hash) % CONFIG.LOBBY_POOL.length;
        const selected = CONFIG.LOBBY_POOL[index];
        
        log(3, "تم اختيار خادم اللوبي", { host, index, proxy: selected });
        
        return `${selected.protocol} ${selected.host}:${selected.port}`;
    }

    /**
     * الحصول على عنوان IP مع التخزين المؤقت
     */
    function getResolvedIP(host) {
        if (!CONFIG.CACHE_ENABLED) {
            return resolveDNS(host);
        }

        const cached = SESSION.ipCache.get(host);
        if (cached) {
            const now = Date.now();
            if (now - cached.timestamp < CONFIG.CACHE_TTL) {
                return cached.ip;
            } else {
                SESSION.ipCache.delete(host);
            }
        }

        const ip = resolveDNS(host);
        if (ip) {
            SESSION.ipCache.set(host, {
                ip: ip,
                timestamp: Date.now()
            });
        }

        return ip;
    }

    // ═══════════════════════════════════════════════════════════════════
    //  فئات الكشف - DETECTION CLASSES
    // ═══════════════════════════════════════════════════════════════════
    
    /**
     * أنماط الكشف عن أنواع حركة المرور
     */
    const DETECTION_PATTERNS = {
        // PUBG identifiers
        PUBG: /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|battlegrounds/i,
        
        // Match server patterns
        MATCH: /match|battle|game|combat|realtime|sync|udp|tick|room|server|host/i,
        
        // Lobby/matchmaking patterns
        LOBBY: /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|auth|login/i,
        
        // Social features
        SOCIAL: /friend|invite|squad|team|party|clan|presence|social|chat|message/i,
        
        // CDN and content delivery
        CDN: /cdn|asset|resource|patch|update|media|content|download|static|file/i,
        
        // Analytics and telemetry
        TELEMETRY: /analytics|stats|telemetry|metric|track|event|log|monitor/i,
        
        // Payment and store
        PAYMENT: /pay|purchase|store|shop|item|inventory|coin|uc|bp|point/i
    };

    /**
     * التحقق مما إذا كان المضيف مرتبط بـ PUBG
     */
    function isPUBGHost(host) {
        return DETECTION_PATTERNS.PUBG.test(host);
    }

    /**
     * تصنيف نوع حركة المرور
     */
    function classifyTraffic(url, host) {
        const combined = `${url} ${host}`;
        
        if (DETECTION_PATTERNS.MATCH.test(combined)) {
            return "MATCH";
        }
        if (DETECTION_PATTERNS.LOBBY.test(combined)) {
            return "LOBBY";
        }
        if (DETECTION_PATTERNS.SOCIAL.test(combined)) {
            return "SOCIAL";
        }
        if (DETECTION_PATTERNS.CDN.test(combined)) {
            return "CDN";
        }
        if (DETECTION_PATTERNS.PAYMENT.test(combined)) {
            return "PAYMENT";
        }
        if (DETECTION_PATTERNS.TELEMETRY.test(combined)) {
            return "TELEMETRY";
        }
        
        return "UNKNOWN";
    }

    // ═══════════════════════════════════════════════════════════════════
    //  المنطق الرئيسي - MAIN LOGIC
    // ═══════════════════════════════════════════════════════════════════
/**
 * التحقق من جلسة المباريات
 */
function validateMatchSession(ip, host) {
    // التحقق من انتهاء صلاحية الجلسة (30 ثانية)
    const SESSION_TIMEOUT = 30000;
    const now = Date.now();
    
    if (SESSION.matchTimestamp && (now - SESSION.matchTimestamp) > SESSION_TIMEOUT) {
        log(2, "انتهت صلاحية جلسة المباريات", { 
            age: now - SESSION.matchTimestamp,
            timeout: SESSION_TIMEOUT 
        });
        SESSION.matchNetwork = null;
        SESSION.matchHost = null;
        SESSION.matchTimestamp = null;
        return false;
    }
    
    // التحقق من تطابق المضيف
    if (SESSION.matchHost && SESSION.matchHost !== host) {
        log(1, "المضيف لا يتطابق مع جلسة المباريات", { 
            current: host, 
            session: SESSION.matchHost 
        });
        return false;
    }
    
    // التحقق من تطابق الشبكة
    if (SESSION.matchNetwork) {
        const currentNetwork = ip.split('.').slice(0, 3).join('.');
        if (currentNetwork !== SESSION.matchNetwork) {
            log(1, "الشبكة لا تتطابق مع جلسة المباريات", { 
                current: currentNetwork, 
                session: SESSION.matchNetwork 
            });
            return false;
        }
    }
    
    return true;
}

/**
 * إنشاء جلسة مباريات جديدة
 */
function createMatchSession(ip, host) {
    const network = ip.split('.').slice(0, 3).join('.');
    
    SESSION.matchNetwork = network;
    SESSION.matchHost = host;
    SESSION.matchTimestamp = Date.now();
    
    log(2, "تم إنشاء جلسة مباريات جديدة", { network, host });
}

/**
 * التحقق من الحظر الجغرافي
 */
function isGeoBlocked(ip) {
    if (!ip || !isValidIPv4(ip)) {
        log(2, "IP غير صالح للتحقق الجغرافي", { ip });
        return CONFIG.BLOCK_INVALID_IP;
    }
    
    const blocked = isInIPRanges(ip, GEO_BLACKLIST);
    if (blocked) {
        log(2, "IP محظور جغرافياً", { ip });
    }
    return blocked;
}

/**
 * التحقق من عناوين IP المحلية والمحجوبة
 */
function isBlockedIP(ip) {
    if (!ip) return true;
    
    // التحقق من IPv6
    if (ip.indexOf(":") !== -1) {
        log(2, "IPv6 غير مدعوم، يتم الحظر", { ip });
        return true;
    }
    
    // التحقق من العناوين المحلية
    const localPatterns = [
        /^127\./,           // localhost
        /^10\./,            // Private network
        /^192\.168\./,      // Private network
        /^172\.(1[6-9]|2\d|3[0-1])\./,  // Private network
        /^0\./,             // Broadcast
        /^169\.254\./,      // Link-local
        /^224\./,           // Multicast
        /^255\./            // Broadcast
    ];
    
    for (const pattern of localPatterns) {
        if (pattern.test(ip)) {
            log(2, "عنوان IP محلي أو خاص", { ip });
            return true;
        }
    }
    
    // الحظر الصريح
    const BLOCKED_IPS = [
        "127.0.0.1",
        "0.0.0.0",
        "255.255.255.255"
    ];
    
    if (BLOCKED_IPS.includes(ip)) {
        log(2, "عنوان IP محظور صراحةً", { ip });
        return true;
    }
    
    return false;
}

/**
 * الحصول على نوع البروكسي المناسب
 */
function getProxyType(trafficType, ip, host) {
    switch (trafficType) {
        case "MATCH":
            // المباريات تتطلب بروكسي قوي ومحدد
            if (!isInIPRanges(ip, JORDAN_MATCH_RANGES)) {
                log(1, "IP المباريات غير موجود في النطاقات المسموحة", { ip });
                return "BLOCK";
            }
            
            // التحقق من جلسة المباريات
            if (!validateMatchSession(ip, host)) {
                createMatchSession(ip, host);
            }
            
            return CONFIG.MATCH_PROXY.protocol + " " + 
                   CONFIG.MATCH_PROXY.host + ":" + 
                   CONFIG.MATCH_PROXY.port;
        
        case "LOBBY":
        case "SOCIAL":
        case "CDN":
        case "PAYMENT":
        case "TELEMETRY":
            // الخدمات الأخرى تستخدم بروكسي اللوبي
            if (!isInIPRanges(ip, JORDAN_LOBBY_RANGES)) {
                log(1, "IP الخدمات غير موجود في نطاقات الأردن", { ip, trafficType });
                return "BLOCK";
            }
            return selectLobbyProxy(host);
        
        default:
            // حركة المرور غير المعروفة
            log(2, "نوع حركة مرور غير معروف، استخدام DIRECT", { 
                trafficType, 
                url, 
                host 
            });
            return "DIRECT";
    }
}

/**
 * الدالة الرئيسية - FindProxyForURL
 */
function FindProxyForURL(url, host) {
    try {
        // 1. استخراج وتنظيف المضيف
        host = extractHost(host);
        
        if (!host || host.length === 0) {
            log(1, "مضيف فارغ أو غير صالح", { url });
            return "DIRECT";
        }
        
        // 2. التحقق من PUBG
        if (!isPUBGHost(host)) {
            log(3, "المضيف ليس من PUBG، تخطي", { host });
            return "DIRECT";
        }
        
        log(2, "تم اكتشاف عميل PUBG", { host });
        
        // 3. حل DNS
        const ip = getResolvedIP(host);
        
        if (!ip) {
            log(1, "فشل في حل DNS", { host });
            return "BLOCK";
        }
        
        // 4. التحقق من صحة IP
        if (!isValidIPv4(ip)) {
            log(1, "عنوان IP غير صالح", { ip, host });
            return "BLOCK";
        }
        
        // 5. التحقق من الحظر
        if (isBlockedIP(ip)) {
            log(1, "IP محظور", { ip, host });
            return "BLOCK";
        }
        
        if (isGeoBlocked(ip)) {
            log(1, "IP محظور جغرافياً", { ip, host });
            return "BLOCK";
        }
        
        // 6. تصنيف حركة المرور
        const trafficType = classifyTraffic(url, host);
        log(3, "تم تصنيف حركة المرور", { trafficType, host });
        
        // 7. الحصول على البروكسي المناسب
        const proxy = getProxyType(trafficType, ip, host);
        
        log(2, "تم تحديد البروكسي", { 
            host, 
            trafficType, 
            ip, 
            proxy 
        });
        
        return proxy;
        
    } catch (error) {
        log(0, "خطأ في الدالة الرئيسية", { 
            error: error.message, 
            stack: error.stack 
        });
        
        // في حالة الخطأ، استخدم DIRECT للتوافق
        return "DIRECT";
    }
}

// ═══════════════════════════════════════════════════════════════════
//  معلومات التصحيح (للاختبار)
// ═══════════════════════════════════════════════════════════════════

/**
 * دالة مساعدة لعرض حالة الجلسة
 */
function getSessionStatus() {
    return {
        matchNetwork: SESSION.matchNetwork,
        matchHost: SESSION.matchHost,
        matchAge: SESSION.matchTimestamp ? 
            Date.now() - SESSION.matchTimestamp : null,
        dnsCacheSize: SESSION.dnsCache.size,
        ipCacheSize: SESSION.ipCache.size
    };
}

/**
 * دالة لتنظيف الذاكرة المؤقتة
 */
function clearCache() {
    SESSION.dnsCache.clear();
    SESSION.ipCache.clear();
    SESSION.matchNetwork = null;
    SESSION.matchHost = null;
    SESSION.matchTimestamp = null;
    log(2, "تم تنظيف الذاكرة المؤقتة");
}

/**
 * دالة للتحقق من صحة الإعدادات
 */
function validateConfig() {
    const errors = [];
    
    if (!CONFIG.MATCH_PROXY.host || !CONFIG.MATCH_PROXY.port) {
        errors.push("إعدادات بروكسي المباريات غير صالحة");
    }
    
    if (!CONFIG.LOBBY_POOL || CONFIG.LOBBY_POOL.length === 0) {
        errors.push("قائمة خوادم اللوبي فارغة");
    }
    
    if (JORDAN_MATCH_RANGES.length === 0) {
        errors.push("قائمة نطاقات المباريات فارغة");
    }
    
    if (errors.length > 0) {
        log(0, "فشل في التحقق من الإعدادات", { errors });
        return false;
    }
    
    log(2, "تم التحقق من الإعدادات بنجاح");
    return true;
}

// ═══════════════════════════════════════════════════════════════════
//  اختبارات الوحدة - UNIT TESTS (للاختبار فقط)
// ═══════════════════════════════════════════════════════════════════

function runTests() {
    console.log("🧪 بدء تشغيل الاختبارات...");
    
    const tests = [
        {
            name: "اختبار صحة IPv4",
            test: () => {
                return isValidIPv4("192.168.1.1") === true &&
                       isValidIPv4("256.1.1.1") === false &&
                       isValidIPv4("abc.def.ghi.jkl") === false;
            }
        },
        {
            name: "اختبار CIDR",
            test: () => {
                return isInCIDR("192.168.1.100", "192.168.0.0", "255.255.0.0") === true &&
                       isInCIDR("10.0.1.100", "192.168.0.0", "255.255.0.0") === false;
            }
        },
        {
            name: "اختبار استخراج المضيف",
            test: () => {
                return extractHost("https://pubg.com/api/match") === "pubg.com" &&
                       extractHost("http://server.region.com:8080/path") === "server.region.com";
            }
        },
        {
            name: "اختبار تصنيف حركة المرور",
            test: () => {
                return classifyTraffic("/match/join", "pubg-match.com") === "MATCH" &&
                       classifyTraffic("/lobby/queue", "pubg.com") === "LOBBY";
            }
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const testCase of tests) {
        try {
            if (testCase.test()) {
                console.log(`✅ ${testCase.name}: نجح`);
                passed++;
            } else {
                console.log(`❌ ${testCase.name}: فشل`);
                failed++;
            }
        } catch (error) {
            console.log(`❌ ${testCase.name}: خطأ - ${error.message}`);
            failed++;
        }
    }
    
    console.log(`\n📊 نتائج الاختبارات: ${passed} نجح, ${failed} فشل`);
    
    return failed === 0;
}

// ═══════════════════════════════════════════════════════════════════
//  التصدير والاستخدام
// ═══════════════════════════════════════════════════════════════════

// التحقق من صحة الإعدادات عند التحميل
if (typeof validateConfig === "function") {
    validateConfig();
}

// تصدير الدوال المساعدة للاستخدام الخارجي
if (typeof window !== "undefined") {
    window.__BLACKBOX_PAC__ = {
        getSessionStatus,
        clearCache,
        validateConfig,
        runTests,
        config: CONFIG,
        version: "2.0.0"
    };
}

// ═══════════════════════════════════════════════════════════════════
//  نهاية السكربت
// ═══════════════════════════════════════════════════════════════════
