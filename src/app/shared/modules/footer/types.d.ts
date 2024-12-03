import { IAboutTexts } from "@app/pages/about-us/types";
import { ILink } from "../../components/link-based/intefaces";
import { ICardConfig } from "@app/shared/modules/card/lang";
import { IFormBtns, IFormMap } from "@app/shared/modules/form/interfaces";

//  fb = Facebook
//  tw = Twitter
//  ig = Instagram
//  ln = LinkedIn
//  yt = YouTube
//  rd = Reddit
//  pt = Pinterest
//  tb = Tumblr
//  sc = Snapchat
//  tik = TikTok
//  dc = discord
//  tg = telegram
//  wa = whatsapp
//  sk = skype
//  md = medium
//  bl = blogger
//  wp = wordpress
//  gh = github
export type ISocial = 'fb' | 'tw' | 'ig' | 'ln' | 'yt' | 'rd' | 'pt' | 'tb' | 'sc' | 'tik' | 'dc' | 'tg' | 'wa' | 'sk' | 'md' | 'bl' | 'wp' | 'gh';

export interface IFooterConfig {
    about?: { [k: keyof IAboutTexts]: string };
    links?: Pick<ILink, 'href' | 'text'>[];
    contact?: { map: IFormMap, btns: IFormBtns };
    socials?: { [k: ISocial]: string };
    copyrights?: string;
}