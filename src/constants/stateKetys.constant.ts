const StateKeys = {
    lang: 'language',
    nav: 'navigation',
    device: 'device',
    // Events.
    // // Page.
    stateNavigate: 'stateNavigate',
    pageContentLoaded: 'pageContentLoaded',
    // // Dialogs.
    openModal: 'openModal',
    closeModal: 'closeModal',
    openDialog: 'openDialog',
    closeDialog: 'closeDialog',
} as const;


export {StateKeys}