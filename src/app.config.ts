import { GetStarted, Home, Contact, Dialogs, Documentation, Forms } from "@app/pages"
import { IPages, IMetaTags, OGCard } from "@services"

export const appConfig: AppConfig = {
    siteURL: 'https://your-site.com', // Replace with your site's actual URL
    routes: {
        '/': Home,
        '/home': Home,
        '/get-started': GetStarted,
        '/forms': Forms,
        '/docs': Documentation,
        '/dialogs': Dialogs,
        '/contact-us': Contact,
    },
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
    OGCard?: OGCard
}