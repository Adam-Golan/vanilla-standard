import './style/dist/style.css';
import './utils/stringExtensions';

import { PageBase } from "@decorators";
import { Device, Language, Navigation, State } from "@services";
import { StateKeys } from "@services/state/config";
import { Loader, Modal, Navbar } from "@app/shared";

class Main {
  // App element.
  app = document.getElementById('app') ?? this.createApp();
  // Services.
  device = new Device();
  navigator = new Navigation();
  appState = new State();
  i18n = new Language();

  // Elements.
  loader = new Loader();
  loadingPage: PageBase<any>;
  constructor() {
    setTimeout(() => {
      this.setData();
      this.init();
    });
  }

  private createApp(): HTMLDivElement {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.replaceChildren(app);
    return app;
  }

  private setData(): void {
    this.appState.setData(StateKeys.lang, this.i18n);
    this.appState.setData(StateKeys.nav, this.navigator);
    this.appState.setData(StateKeys.device, this.device);
  }

  private init() {
    this.app.append(new Navbar(this.appState));
    this.subscribes();
    this.loadIt();
  }

  private loadIt(): void {
    this.app?.children.length > 1
      ? this.app?.replaceChild(this.loader, this.loadingPage)
      : this.app?.append(this.loader);
    this.loadingPage = new (this.navigator.getPage())(this.appState);
  }

  private navigation(page: string): void {
    if (this.navigator.pathname.includes(page)) return;
    this.navigator.getClickedPage(page);
    this.loadIt();
  }

  private subscribes(): void {
    const modals: { [key: string]: Modal } = {};
    // Page Navigation.
    this.appState.subscribe(StateKeys.stateNavigate, this.navigation.bind(this));
    // Load Page.
    this.appState.subscribe(StateKeys.pageContentLoaded, _ => this.app?.replaceChild(this.loadingPage, this.loader));
    // Modals.
    this.appState.subscribe(StateKeys.openModal, (key: string, content) => modals[key] = new Modal(this.app.append, content));
    this.appState.subscribe(StateKeys.closeModal, (key: string) => { modals[key].closeModal(); delete modals[key]; });
  }
}

new Main();