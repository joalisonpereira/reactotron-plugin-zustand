import { type StoreApi } from 'zustand';
import type Reactotron from 'reactotron-react-js';
import type ReactotronNative from 'reactotron-react-native';

export type ReactotronCore = ReturnType<typeof Reactotron.configure>;

export type ReactotronCoreNative = ReturnType<
  typeof ReactotronNative.configure
>;

export interface PluginConfig {
  stores: Array<{
    name: string;
    store: StoreApi<unknown>;
  }>;
  omitFunctionKeys?: boolean;
}

export interface Subscription {
  name: string;
  store: StoreApi<unknown>;
  unsub: ReturnType<StoreApi<unknown>['subscribe']>;
}

export interface Change {
  path: string;
  value: unknown;
}
