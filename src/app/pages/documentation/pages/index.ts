import { Dialogs } from "./dialogs/dialogs";
import { Forms } from "./forms/forms";
import { IPage } from "@services/navigation/types";

export const config = new Map<string, IPage>([
    ['dialogs', Dialogs],
    ['forms', Forms],
]);