# reactotron-plugin-zustand

Plugin to monitor states from zustand.

![](./docs/badge-statements.svg) ![](./docs/badge-functions.svg) ![](./docs/badge-lines.svg) ![](./docs/badge-branches.svg)

## Install

```bash
npm i -D reactotron-plugin-zustand
```

## Setup

Go to file "Reactotron.config.ts" or your config reactotron from project, is similar to this file:

```ts
import reactotronZustand from 'reactotron-plugin-zustand';

Reactotron.configure({ name: 'Project name' })
  .use(
    //add this line 🙌
    reactotronZustand({ stores: [{ name: 'auth', store: useAuth }] })
  )
  .connect();
```

## Usage

Install [Reactotron Client](https://github.com/infinitered/reactotron/tree/master) and add your store observer, using the example `"auth"` or all states using: `"*"`.

<img width="602" alt="Captura de Tela 2023-06-23 às 00 09 08" src="https://raw.githubusercontent.com/joalisonpereira/reactotron-plugin-zustand/master/docs/tron2.png">

## Updates V2

- Enable snapshot functions
- Code improvements
