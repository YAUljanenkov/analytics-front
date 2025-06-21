import type { Stats } from 'src/types';
import { aggregateData } from './requests';

export const AnalyticsApi = {
    loadFile: async (file: File, onData: (data: Stats) => void) => {
        const reader = await aggregateData({
            file,
            rows: 10000,
        });

        const decoder = new TextDecoder();

        if (!reader) {
            throw new Error('Failed to read file');
        }

        while (true) {
            const { done, value } = await reader.read();
            if (value) {
                const parsed = decoder.decode(value, { stream: true });
                parsed
                    .trim()
                    .split('\n')
                    .forEach((line) => {
                        onData(JSON.parse(line));
                    });
            }
            if (done) {
                return;
            }
        }
    },
};
