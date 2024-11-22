import './style/dist/style.css';
import './utils/stringExtensions';

import { Device, Language, Navigation, setMetaTags, State, setOpenGraphTags } from "@services";
import { Modal, Navbar } from "@app/shared";
import { StateKeys } from '@constants/stateKeys.constant';
import { appConfig } from 'app.config';

class Main {
  // App element.
  app = document.getElementById('app') ?? this.createApp();
  // Services.
  device: Device;
  navigation: Navigation;
  appState: State;
  i18n: Language;

  // Elements.
  constructor() {
    setMetaTags(appConfig.meta);
    if (appConfig.OGCard) setOpenGraphTags(appConfig.OGCard);
    this.appState = new State();
    this.navigation = new Navigation(this.appState, this.app, appConfig.routes);
    this.navigation.importTexts().then(_ => this.init()); // Importing application's texts.
  }

  private createApp(): HTMLDivElement {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.replaceChildren(app);
    return app;
  }

  private init() {
    this.app.append(new Navbar(this.navigation.pages, this.appState));
    this.subscribes();
    this.navigation.fisrtLoad(location.pathname);
  }

  private subscribes(): void {
    const modals: { [key: string]: Modal } = {};
    // Page Navigation.
    this.appState.subscribe(StateKeys.navigate, (page) => this.navigation.loading(page));
    // Load Page.
    this.appState.subscribe(StateKeys.contentReady, _ => this.navigation.showPage());
    // Modals.
    this.appState.subscribe(StateKeys.openModal, (key: string, content) => modals[key] = new Modal(this.app.append, content));
    this.appState.subscribe(StateKeys.closeModal, (key: string) => { modals[key].closeModal(); delete modals[key]; });
  }
}

new Main();