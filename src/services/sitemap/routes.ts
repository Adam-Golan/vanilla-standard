import { Home, Contact, Dialogs, Documentation, Forms, GetStarted } from "@app/pages";
import { IPages } from "@services/navigation/navigation";

export const siteRoutes: IPages = {
    '/': Home,
    '/home': Home,
    '/get-started': GetStarted,
    '/forms': Forms,
    '/docs': Documentation,
    '/dialogs': Dialogs,
    '/contact-us': Contact,
}