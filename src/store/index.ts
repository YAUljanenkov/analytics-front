import type { Stats } from 'src/types';
import { ActionButtonStatus } from '../types';
import { create } from 'zustand';

export type Store = {
    stats: Stats | null;
    status: ActionButtonStatus;
    generatingStatus: ActionButtonStatus;
    setStats: (stats: Stats | null) => void;
    setStatus: (status: ActionButtonStatus) => void;
    setGeneratingStatus: (status: ActionButtonStatus) => void;
};

export const useStore = create<Store>((set) => ({
    stats: null,
    status: ActionButtonStatus.Idle,
    generatingStatus: ActionButtonStatus.Idle,
    setStats: (stats: Stats | null) => set({ stats }),
    setStatus: (status: ActionButtonStatus) => set({ status }),
    setGeneratingStatus: (status: ActionButtonStatus) =>
        set({ generatingStatus: status }),
}));
