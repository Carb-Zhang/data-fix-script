import dotenv from 'dotenv';
import { connectMongoDB } from './utils/mongoDB.js';

dotenv.config();

async function runScript(scriptName) {
    const module = await import(`./scripts/${scriptName}/index.js`);
    await module.run();
}

async function main() {
    await connectMongoDB();

    if (process.argv[2]) {
        await runScript(process.argv[2]);
    } else {
        console.log('Please Provide Script Name.');
    }
}

main()
    .then(() => {
        console.log('done');
        process.exit(0);
    })
    .catch((err) => console.log(err));

