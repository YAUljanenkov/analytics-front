import type { Stats } from 'src/types';
import { ButtonUploadStatus } from '../types';
import { AnalyticsApi } from '../api';

export const AggregateService = {
    loadFile: async (
        file: File,
        onData: (s: Stats) => void,
        setStatus: (s: ButtonUploadStatus) => void
    ) => {
        if (!file.name.includes('.csv')) {
            setStatus(ButtonUploadStatus.Error);
            return;
        }

        try {
            setStatus(ButtonUploadStatus.Parsing);
            await AnalyticsApi.loadFile(file, onData);
            setStatus(ButtonUploadStatus.Success);
        } catch {
            setStatus(ButtonUploadStatus.Error);
        }
    },
};
