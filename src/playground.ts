import './style/dist/style.css';
// Playground
import { Link } from "@app/shared";
import { ILink } from '@app/shared/components/link/types';

const app = document.getElementById('app');
const data: ILink = {
    href: '/exmples',
    text: 'examples',
};
const args: [ILink, () => void] = [data, () => console.log('clicked')];
app?.append(new Link(...args));