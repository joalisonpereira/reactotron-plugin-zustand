import { create } from 'zustand';

interface OtherCounterState {
  otherCount: number;
  setOtherCount: (value: number) => void;
}

export const useOtherCounter = create<OtherCounterState>()((set) => ({
  otherCount: 0,
  setOtherCount: (value) => set({ otherCount: value })
}));
