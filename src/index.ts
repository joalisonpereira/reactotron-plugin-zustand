import { type StoreApi } from 'zustand';
import plugin from './plugin';

export interface PluginConfig {
  stores: Array<{
    name: string;
    zustand: StoreApi<unknown>;
  }>;
}

export default function reactotronPluginZustand(config: PluginConfig) {
  return plugin(config);
}
