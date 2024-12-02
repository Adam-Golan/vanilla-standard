export abstract class Device {

    // Platform Detection
    static get platform(): string {
        const ua = navigator.userAgent;
        if (/Win/.test(ua)) return 'windows';
        if (/Mac/.test(ua)) return 'macos';
        if (/Linux/.test(ua)) return 'linux';
        return 'unknown';
      }

    // OS Detection
    static get os(): string {
        const osMap = new Map([
            ['macos', 'MacOS'],
            ['windows', 'Windows'],
            ['linux', 'Linux'],
            ['android', 'Android'],
            ['iphone', 'iOS'],
            ['ipad', 'iOS']
        ])

        return osMap.get(Device.platform) || 'Unknown OS';
    }

    // Browser Detection
    static get browser(): { name: string; version: string } {
        const ua = navigator.userAgent;
        const browserMap = [
            { name: 'Chrome', regex: /Chrome\/([\d.]+)/ },
            { name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
            { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
            { name: 'Opera', regex: /Opera\/([\d.]+)|OPR\/([\d.]+)/ },
            { name: 'MSIE', regex: /MSIE ([\d.]+)/ },
            { name: 'Edge', regex: /Edg\/([\d.]+)/ },
        ];

        for (const { name, regex } of browserMap) {
            const match = ua.match(regex);
            if (match) return { name, version: match[1] || 'Unknown' };
        }

        return { name: 'Netscape', version: 'Unknown' };
    }

    // Get User Language
    static get lang(): string {
        const primaryLanguage = navigator.language || 'en';
        const twoCharCode = primaryLanguage.split('-')[0];
        return twoCharCode || 'en';
    }
}