import { AnalyticsApi } from '../api';
import { ActionButtonStatus } from '../types';
import { saveFile } from '../utils/saveFile';

export const GenerateService = {
    generateFile: async (setStatus: (status: ActionButtonStatus) => void) => {
        try {
            setStatus(ActionButtonStatus.Generating);
            const file = await AnalyticsApi.generateFile();
            saveFile(file);
            setStatus(ActionButtonStatus.Generated);
        } catch {
            setStatus(ActionButtonStatus.Error);
        }
    },
};
