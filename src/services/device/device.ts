export class Device {
    readonly platform: string = navigator.platform;
    readonly userAgent: string = navigator.userAgent;
    readonly appName: string = navigator.appName;
    readonly browser: { name: string, ver: string } = this.getBrowser();
    readonly screen: { Width: number, Height: number } = { Width: window.innerWidth, Height: window.innerHeight };
    constructor() {
        const
            cssBase = 'font-size:16px;font-weight:700;',
            cssValue = `${cssBase}background:#333;color:#fff`,
            cssKey = `${cssBase}background:#fff;color:#333`;
        console.table({ ViewPort: this.screen });
        console.log(`%c OS: %c ${this.osType} `, cssKey, cssValue);
        console.log(`%c Browser: %c ${this.browser.name} `, cssKey, cssValue);
        console.log(`%c Version: %c ${this.browser.ver} `, cssKey, cssValue);
    }

    // OS Section
    get osType(): string {
        if (this.checkPlatform('Win')) return 'Windows';
        if (this.checkPlatform('Mac')) return 'MacOS';
        if (this.checkPlatform('iP')) return 'i -> Phone/Pad/Pod';
        if (this.checkPlatform('X11')) return 'Unix';
        if (this.checkPlatform('Linux') && !this.checkPlatform('Linux x86_64')) return 'Linux';
        if (this.checkPlatform('Linux x86_64')) return 'Ubuntu';
        return 'Unknown OS';
    }
    // // Width
    get width(): number {
        return this.screen.Width;
    }
    // // Height
    get height(): number {
        return this.screen.Height;
    }

    // Browser Section
    private getBrowser(): { name: string, ver: string } {
        let
            browserName = this.appName,
            fullVersion = '' + parseFloat(navigator.appVersion),
            nameOffset, verOffset;
        const vIdx = {
            key: 'Version',
            off: 8
        }
        const findBrowserMap: { [k: string]: any } = {
            Chrome: null,
            Firefox: null,
            MSIE: null,
            Safari: { vIdx },
            Opera: { vIdx }
        }
        for (const brName in findBrowserMap) {
            if (this.userAgent.includes(brName)) {
                browserName = brName;
                nameOffset = this.userAgent.indexOf(browserName);
                verOffset = this.userAgent.indexOf(findBrowserMap[brName]?.vIdx?.key);
                fullVersion = this.userAgent.substring(nameOffset + brName.length + 1);
                if (verOffset + 1) {
                    fullVersion = this.userAgent.substring(verOffset + findBrowserMap[brName].vIdx.off);
                }
                break;
            }
            nameOffset = this.userAgent.lastIndexOf(' ') + 1;
            verOffset = this.userAgent.lastIndexOf('/');
            if (nameOffset < verOffset) {
                browserName = this.userAgent.substring(nameOffset, verOffset);
                fullVersion = this.userAgent.substring(verOffset + 1);
                if (browserName.toLowerCase() === browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
        }

        if (fullVersion.includes(' ')) fullVersion = fullVersion.slice(0, fullVersion.indexOf(' '));
        return { name: browserName, ver: fullVersion };
    }
    private checkPlatform(str: string): boolean {
        return this.platform.includes(str, 0);
    }
}