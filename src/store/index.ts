import type { Stats } from 'src/types';
import { ActionButtonStatus, type ProcessedItem } from '../types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Store {
    stats: Stats | null;
    status: ActionButtonStatus;
    generatingStatus: ActionButtonStatus;
    setStats: (stats: Stats | null) => void;
    setStatus: (status: ActionButtonStatus) => void;
    setGeneratingStatus: (status: ActionButtonStatus) => void;
}

export interface PersistStore {
    processed: ProcessedItem[];
    setProcessed: (item: ProcessedItem) => void;
    clearProcessed: () => void;
}

export const useStore = create<Store>((set) => ({
    stats: null,
    status: ActionButtonStatus.Idle,
    generatingStatus: ActionButtonStatus.Idle,
    setStats: (stats: Stats | null) => set({ stats }),
    setStatus: (status: ActionButtonStatus) => set({ status }),
    setGeneratingStatus: (status: ActionButtonStatus) =>
        set({ generatingStatus: status }),
}));

export const usePersistStore = create(
    persist<PersistStore>(
        (set, get) => ({
            processed: [],
            setProcessed: (item) =>
                set({ processed: [item, ...get().processed] }),
            clearProcessed: () => set({ processed: [] }),
        }),
        {
            storage: createJSONStorage(() => localStorage),
            name: 'processedItems',
        }
    )
);
