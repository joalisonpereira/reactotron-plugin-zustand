import { create } from 'zustand';

interface CounterState {
  count: number;
  setCount: (value: number) => void;
  user: any;
}

export const useCounter = create<CounterState>()((set) => ({
  count: 0,
  user: null,
  setCount: (value) => set({ count: value })
}));
