import { create } from 'zustand';

interface CounterState {
  count: number;
  setCount: (value: number) => void;
}

export const useCounter = create<CounterState>()((set) => ({
  count: 0,
  setCount: (value) => set({ count: value })
}));
