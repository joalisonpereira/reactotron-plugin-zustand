import { describe, it, expect, vi } from 'vitest';
import { createStore } from 'zustand';
import reactotronZustand from '..';

vi.mock('zustand');

describe('Index', () => {
  const mockReactotron = vi.fn().mockReturnValue({
    onCommand: vi.fn(),
    send: vi.fn(),
    features: {}
  });

  it('should return reactotron valid config', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin = reactotronZustand({
      stores: [{ name: 'foo', store: useFooStore }]
    })(mockReactotron());

    expect(plugin.onCommand).toBeTruthy();
  });

  it('should monit state values change', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin: any = reactotronZustand({
      stores: [{ name: 'foo', store: useFooStore }]
    })(mockReactotron());

    plugin.onCommand({
      type: 'state.values.subscribe',
      payload: { paths: ['foo'] }
    });
  });

  it('should monit state values change with wildcards', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin: any = reactotronZustand({
      stores: [{ name: 'foo', store: useFooStore }]
    })(mockReactotron());

    plugin.onCommand({
      type: 'state.values.subscribe',
      payload: { paths: ['*'] }
    });
  });

  it('should call persist snapshot functions', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin: any = reactotronZustand({
      stores: [{ name: 'foo', store: useFooStore }]
    })(mockReactotron());

    plugin.onCommand({
      type: 'state.backup.request'
    });

    const backup = { count: 1 };

    plugin.onCommand({
      type: 'state.restore.request',
      payload: {
        state: [{ path: 'foo', value: backup }]
      }
    });

    expect(backup).toEqual(useFooStore.getState());
  });

  it('should call clear functions', () => {
    const useFooStore = createStore(() => ({ count: 0 }));

    const plugin: any = reactotronZustand({
      stores: [{ name: 'foo', store: useFooStore }]
    })(mockReactotron());

    plugin.onCommand({
      type: 'state.values.subscribe',
      payload: { paths: [] }
    });
  });
});
