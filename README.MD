# reactotron-zustand-plugin

Plugin to monitor states from zustand.

How install a project:

```
npm i reactotron-zustand-plugin --save

or

yarn add reactotron-zustand-plugin
```

How use?
Go to file "Reactotron.config.js" or your config reactotron from project, is similar to this file:

```ts
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: "Name Project",
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(
    //add this line 🙌
    reactotronZustand({
      stores: [
        { name: "app", zustand: useApp },
        { name: "authentication", zustand: useAuth },
      ],
    })
  ) // plus some custom made plugin.
  .connect(); // let's connect!
```

In case , i use two stores: "useApp" and "useAuth", each your stores should has fields "name" & "zustand"

name = name of store, this is show on reactotron

zustand = your store

<img width="727" alt="Captura de Tela 2023-06-22 às 23 59 47" src="https://github.com/joalisonpereira/reactotron-zustand-plugin/docs/tron1">

Don't forget to add the observers!

<img width="602" alt="Captura de Tela 2023-06-23 às 00 09 08" src="https://github.com/joalisonpereira/reactotron-zustand-plugin/docs/tron2">

You can watch states by individual or all state using: "\*", "root" , "all"
