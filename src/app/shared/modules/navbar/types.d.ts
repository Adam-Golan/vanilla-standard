import type { MenuExtender } from "@app/shared";
import { ILink } from "@app/shared/components/link/types";

export type ILinks = (ILink | { [K in Exclude<string, keyof ILink>]: ILinks })[];
export type MenuItem = Link | MenuExtender<MenuItem>;