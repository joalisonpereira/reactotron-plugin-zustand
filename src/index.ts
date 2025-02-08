import deepmerge from 'deepmerge';
import { omitFunctionRecursively } from './utils';
import {
  type ReactotronCore,
  type Change,
  type PluginConfig,
  type Subscription,
  type ReactotronCoreNative
} from './types';

const WILDCARDS = ['*'];

function reactotronPluginZustand({
  stores,
  omitFunctionKeys = false
}: PluginConfig) {
  return (reactotron: ReactotronCore | ReactotronCoreNative) => {
    let subscriptions: Subscription[] = [];

    return {
      onCommand: (command: any) => {
        // Backup state
        if (command?.type === 'state.backup.request') {
          reactotron.send('state.backup.response', {
            state: stores.map((item) => ({
              path: item.name,
              value: omitFunctionRecursively(
                item.store.getState(),
                true // always backup without functions
              )
            }))
          });
        }

        // Restore backup state
        if (command?.type === 'state.restore.request') {
          command.payload.state.forEach((item: Change) => {
            const store = stores.find((sub) => sub.name === item.path)?.store;

            if (store != null) {
              store.setState((state: never) =>
                deepmerge(state, item.value ?? {})
              );
            }
          });
        }

        if (command?.type === 'state.values.subscribe') {
          const subPaths: string[] = command?.payload?.paths;

          // Unsubscribe stores and clean stron state
          if (subPaths.length === 0) {
            subscriptions.forEach((item) => {
              item.unsub();
            });

            reactotron.send('state.values.change', { changes: [] });

            return;
          }

          // Filter monit stores
          const subStores = subPaths.some((item) => WILDCARDS.includes(item))
            ? stores
            : stores.filter((item) => subPaths.includes(item.name));

          const getTronState = () =>
            subStores.map((item) => ({
              path: item.name,
              value: omitFunctionRecursively(
                item.store.getState(),
                omitFunctionKeys
              )
            }));

          // Initialize clean state
          reactotron.send('state.values.change', { changes: getTronState() });

          // Subscribe stores
          subscriptions = subStores.map((item) => {
            return {
              name: item.name,
              store: item.store,
              unsub: item.store.subscribe((changes) => {
                const newState = getTronState().filter(
                  (tStore) => tStore.path !== item.name
                );

                reactotron.send('state.values.change', {
                  changes: newState.concat({
                    path: item.name,
                    value: omitFunctionRecursively(changes, omitFunctionKeys)
                  })
                });
              })
            };
          });
        }
      }
    };
  };
}

export { reactotronPluginZustand as default, WILDCARDS, type PluginConfig };
