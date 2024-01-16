import { useCounter } from './store/useCounter';
import { useOtherCounter } from './store/useOtherCounter';

function App() {
  const { count, setCount } = useCounter();

  const { otherCount, setOtherCount } = useOtherCounter();

  return (
    <>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        <b style={{ margin: '0 8px', fontSize: 16 }}>Count: {count}</b>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setOtherCount(otherCount - 1)}>-</button>
        <b style={{ margin: '0 8px', fontSize: 16 }}>
          Other count: {otherCount}
        </b>
        <button onClick={() => setOtherCount(otherCount + 1)}>+</button>
      </div>
    </>
  );
}

export default App;
