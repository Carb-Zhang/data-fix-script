import { fixOrtigasFields } from './fixOrtigasFields.js';
import { fixSMFields } from './fixSMFields.js';

export async function run() {
    // await fixOrtigasFields();
    await fixSMFields();
}
