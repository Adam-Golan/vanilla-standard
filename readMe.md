# Vanilla Framework

**Not a framework, but a frame to work with.**

Vanilla is a lightweight, modular, and dynamic framework designed to prioritize simplicity, flexibility, and scalability. It empowers developers to build robust web applications with a clear distinction between **Pages**, **Modules**, and **Components**.

With its intuitive structure, comprehensive Navigation service acting as a dual-layered router, and a suite of dynamic features, Vanilla provides the perfect balance between minimalism and functionality.

At its core, Vanilla strives for efficiency and reusability, enabling developers to **code once** and deploy seamlessly across the application.

Whether you’re starting small or scaling big, Vanilla is your trusted frame to work with.

**Vanilla, code once.**

## Run Locally

Clone the project

```bash
  git clone https://github.com/Adam-Golan/vanilla-site.git
```

Go to the project directory
```bash
  cd site
```

Initiate project
```bash
  npm run initiate
```

Initiate git
```bash
  npm run git_init
```

Start developing
```bash
  npm run dev
```

Use [playground](./src/playground.ts) if you want to experiment
```bash
  npm run playground
```

## !!!ATTENTION!!!

Sitemap script requires the following libraries to be global on your machine:

- url
- path
- fs

## Roadmap

- Services - Navigation -> Fix back & forth, and rewrite JSDoc.
- Next: Dialogs.
- Create submodules -> Utils, core(decorators), services (extras), shared.

## Done!

- Base classes done.
- Services - Device, metaTags, OG, sitemap, State.
- Shared Modules: Card, Form, Hero, Table, Footer.
- Shared Components: Adder, Avatar, Badge, Collapsible, Fluid, Loader, Progress, Rating, Soon, Tester, Toast, Tooltip, Top.
