import Reactotron from 'reactotron-react-js';
import { useCounter } from './store/useCounter';
import { useOtherCounter } from './store/useOtherCounter';
import reactotronPluginZustand from '../../src';

Reactotron.configure({
  name: 'Reactotron Plugin Zustand'
})
  .use(
    reactotronPluginZustand({
      stores: [
        {
          name: 'useCounter',
          store: useCounter
        },
        {
          name: 'useOtherCounter',
          store: useOtherCounter
        }
      ],
      omitFunctionKeys: true
    })
  )
  .connect();
