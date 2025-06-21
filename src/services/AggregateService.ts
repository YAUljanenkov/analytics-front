import type { Stats } from 'src/types';
import { ButtonUploadStatus } from '../types';
import { AnalyticsApi } from '../api';

export const AggregateService = {
    loadFile: async (
        file: File,
        onData: (s: Stats) => void,
        setStatus: (s: ButtonUploadStatus) => void
    ) => {
        try {
            setStatus(ButtonUploadStatus.Parsing);
            await AnalyticsApi.loadFile(file, onData);
            setStatus(ButtonUploadStatus.Success);
        } catch {
            setStatus(ButtonUploadStatus.Error);
        }
    },
};
