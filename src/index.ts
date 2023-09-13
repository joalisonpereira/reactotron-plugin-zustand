// import Reactotron from 'reactotron-react-native';
import { type StoreApi } from 'zustand';
import plugin from './plugin';

export interface PluginConfig {
  stores: Array<{
    name: string;
    zustand: StoreApi<unknown>;
  }>;
}

export default function reactotronZustand(config: PluginConfig) {
  return plugin(config);
}

// Reactotron.configure({
//   name: 'Name Project'
// })
//   .useReactNative()
//   .use((p) => {})
//   .connect();
