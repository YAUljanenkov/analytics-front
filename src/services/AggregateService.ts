import type { Stats } from 'src/types';
import { ActionButtonStatus } from '../types';
import { AnalyticsApi } from '../api';

export const AggregateService = {
    loadFile: async (
        file: File,
        onData: (s: Stats) => void,
        setStatus: (s: ActionButtonStatus) => void,
        onSuccess: (s: Stats) => void,
        onError: () => void
    ) => {
        if (!file.name.includes('.csv')) {
            onError();
            setStatus(ActionButtonStatus.Error);
            return;
        }

        try {
            setStatus(ActionButtonStatus.Parsing);
            await AnalyticsApi.loadFile(file, onData, onSuccess);
            setStatus(ActionButtonStatus.Success);
        } catch {
            onError();
            setStatus(ActionButtonStatus.Error);
        }
    },
};
