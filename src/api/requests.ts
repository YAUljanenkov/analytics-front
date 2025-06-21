import { AGGREGATE_DATA, GENERATE_FILE } from './urls';

export function aggregateData({
    file,
    rows,
}: {
    file: File;
    rows: number;
}): Promise<
    ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>> | undefined
> {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${AGGREGATE_DATA}?rows=${rows}`, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Aggregate fetch failed');
        }
        return response.body?.getReader();
    });
}

export function generateFile(): Promise<string> {
    return fetch(GENERATE_FILE).then((response) => {
        if (!response.ok) {
            throw new Error('Generate fetch failed');
        }
        return response.text();
    });
}
