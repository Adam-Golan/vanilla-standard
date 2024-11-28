import { Page } from "@decorators";
import { Dialogs } from "./dialogs/dialogs";
import { Forms } from "./forms/forms";

export const config = new Map<string, typeof Page<any>>([
    ['dialogs', Dialogs],
    ['forms', Forms],
]);