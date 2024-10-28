import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import csvToJson from 'convert-csv-to-json';

export async function parseCsv(filePath, isLengthFixed) {
    if (isLengthFixed) {
        const records = [];
        const parser = createReadStream(filePath).pipe(parse({ columns: true }));
        for await (const record of parser) {
            records.push(record);
        }
        return records;
    }

    const values = csvToJson.getJsonFromCsv('src/scripts/PS-5918/ordersAffectShift20241024.csv');
    return values;
}
