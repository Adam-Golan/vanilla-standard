import { GetStarted, Home, ContactUs, AboutUs } from "@app/pages"
import { IFooterConfig } from "@app/shared/modules/footer/types";
import type { IMetaTags, OGCard} from "@services"
import type { IPage, IPages } from "@services/navigation/types";

export const appConfig: AppConfig = {
    siteURL: 'https://your-site.com', // Replace with your site's actual URL
    routes: new Map<string, IPage>([
        ['/home', Home],
        ['/get-started', GetStarted],
        ['/about-us', AboutUs],
        ['/contact-us', ContactUs],
    ]),
    meta: {
        description: "Welcome to Vanilla, a fast and reliable web development frame.",
        keywords: "Vanilla, framework, fast development",
        author: "Adam Golan"
    }
}

interface AppConfig {
    siteURL: string;
    routes: IPages,
    meta: IMetaTags,
    OGCard?: OGCard,
    footer?: IFooterConfig
}