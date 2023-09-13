import { describe, it, expect, vi } from 'vitest';
import { createStore } from 'zustand';
import reactotronZustand from '..';

vi.mock('zustand');

describe('Index', () => {
  it('should return reactotron valid config', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const mockReactotron = {};

    const plugin = reactotronZustand({
      stores: [{ name: 'foo', zustand: useFooStore }]
    })(mockReactotron);

    expect(plugin.onCommand).toBeTruthy();

    expect(plugin.features).toBeTruthy();
  });

  it('should monit state values change', () => {
    const stateValuesChangeFn = vi.fn();

    const mockReactotron = vi.fn().mockReturnValue({
      unsubscriptions: [],
      stores: [],
      stateValuesChange: stateValuesChangeFn
    })();

    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin = reactotronZustand({
      stores: [{ name: 'foo', zustand: useFooStore }]
    })(mockReactotron);

    plugin.onCommand({
      type: 'state.values.subscribe',
      payload: { paths: ['foo'] }
    });

    expect(mockReactotron.stores).toHaveLength(1);

    expect(mockReactotron.stores[0].name).toBe('foo');

    expect(stateValuesChangeFn).toHaveBeenCalled();
  });

  it('should monit store reset', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const sendFn = vi.fn();

    const mockReactotron = vi.fn().mockReturnValue({
      unsubscriptions: [],
      stores: [],
      stateValuesChange: vi.fn(),
      send: sendFn
    })();

    const plugin = reactotronZustand({
      stores: [{ name: 'foo', zustand: useFooStore }]
    })(mockReactotron);

    plugin.onCommand({
      type: 'state.values.subscribe',
      payload: { paths: [] }
    });

    expect(sendFn).toHaveBeenCalled();
  });

  it('should monit wildcards subscriptions', () => {
    const mockReactotron = vi.fn().mockReturnValue({
      unsubscriptions: [],
      stores: [],
      stateValuesChange: vi.fn()
    })();

    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin = reactotronZustand({
      stores: [{ name: 'foo', zustand: useFooStore }]
    })(mockReactotron);

    plugin.onCommand({
      type: 'state.values.subscribe',
      payload: { paths: ['*'] }
    });

    useFooStore.setState({ count: Math.random() });
  });
});
