import type { Stats } from 'src/types';
import { ButtonUploadStatus } from '../types';
import { create } from 'zustand';

export const useStore = create((set, ...stateTools) => ({
    stats: null as Stats | null,
    status: ButtonUploadStatus.Idle,
    setStats: (stats: Stats | null) => set({ stats }),
    setStatus: (status: ButtonUploadStatus) => set({ status }),
}));

export type Store = ReturnType<typeof useStore.getState>;
