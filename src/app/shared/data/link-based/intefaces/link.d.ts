import { sanitizedObjKeys } from "utils/types";

export interface ILink {
    text: string;
    href: string;
    title?: string;
    img?: string;
}

export type ILinks = (ILink | { [K in Exclude<string, keyof ILink>]: ILinks })[];