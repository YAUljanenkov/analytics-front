import type { Stats } from 'src/types';
import { ActionButtonStatus } from '../types';
import { AnalyticsApi } from '../api';

export const AggregateService = {
    loadFile: async (
        file: File,
        onData: (s: Stats) => void,
        setStatus: (s: ActionButtonStatus) => void
    ) => {
        if (!file.name.includes('.csv')) {
            setStatus(ActionButtonStatus.Error);
            return;
        }

        try {
            setStatus(ActionButtonStatus.Parsing);
            await AnalyticsApi.loadFile(file, onData);
            setStatus(ActionButtonStatus.Success);
        } catch {
            setStatus(ActionButtonStatus.Error);
        }
    },
};
