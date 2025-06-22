import type { Stats } from 'src/types';
import { aggregateData, generateFile } from './requests';

export const AnalyticsApi = {
    loadFile: async (
        file: File,
        onData: (data: Stats) => void,
        onSuccess: (data: Stats) => void
    ) => {
        const reader = await aggregateData({
            file,
            rows: 10000,
        });

        const decoder = new TextDecoder();
        let last: Stats | null = null;

        if (!reader) {
            throw new Error('Failed to read file');
        }

        while (true) {
            const { done, value } = await reader.read();
            if (value) {
                const parsed = decoder
                    .decode(value, { stream: true })
                    .trim()
                    .split('\n');
                parsed.forEach((line) => {
                    const parsedLine = JSON.parse(line);
                    onData(parsedLine);
                    last = parsedLine;
                });
            }
            if (done) {
                if (last) {
                    onSuccess(last);
                }
                return;
            }
        }
    },

    generateFile: async (): Promise<File> => {
        const content = await generateFile();
        const blob = new Blob([content], { type: 'text/csv' });
        return new File([blob], 'generated.csv', { type: 'text/csv' });
    },
};
