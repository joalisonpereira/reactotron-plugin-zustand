import Reactotron from 'reactotron-react-js';
import reactotronZustandPlugin from '../../src/index';
import { useCounter } from './store/useCounter';
import { useOtherCounter } from './store/useOtherCounter';

Reactotron.configure({
  name: 'Reactotron Zustand Plugin'
})
  .use(
    reactotronZustandPlugin({
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
