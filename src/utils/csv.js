import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

export async function parseCsv(filePath) {
    const records = [];
    const parser = createReadStream(filePath).pipe(parse({ columns: true }));
    for await (const record of parser) {
        records.push(record);
    }
    return records;
}
