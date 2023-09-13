# reactotron-plugin

Plugin to monitor states from zustand.

![](./docs/badge-statements.svg) ![](./docs/badge-functions.svg) ![](./docs/badge-lines.svg) ![](./docs/badge-branches.svg)

## Install

```bash
npm i -D reactotron-zustand
```

## Setup

Go to file "Reactotron.config.js" or your config reactotron from project, is similar to this file:

```ts
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'Name Project'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(
    //add this line 🙌
    reactotronZustand({
      stores: [{ name: 'auth', zustand: useAuth }]
    })
  ) // plus some custom made plugin.
  .connect(); // let's connect!
```

## Usage

Install <a href="https://github.com/infinitered/reactotron/blob/master/docs/installing.md" target="_blank">Reactotron Client</a> and add your store observer, using the example `"auth"` or all states using: `"*", "root" , "all"`.

<img width="602" alt="Captura de Tela 2023-06-23 às 00 09 08" src="https://raw.githubusercontent.com/joalisonpereira/reactotron-plugin-zustand/master/docs/tron2.png">

## Credits

Thanks to [aylonmuramatsu](https://github.com/aylonmuramatsu/), for creating the original code base.
