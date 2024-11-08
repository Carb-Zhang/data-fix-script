// build.js

const { spawn, execSync } = require('child_process');
const exec = (commands) => {
    execSync(commands, { stdio: 'inherit', shell: true });
};

const spawnProcess = (commands) => {
    spawn(commands, { stdio: 'inherit', shell: true });
};

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Which *.ts file you want to build ? (example: src/sample.ts): ', (file) => {
    if (!file) file = 'src/sample.ts';
    console.log(`Starting build file: ${file}`);
    exec(
        `yarn tsc --declaration --outDir ./ --sourceMap false  -t es2018 -m commonjs --esModuleInterop true --noImplicitAny true  ${file}`,
    );

    rl.close();
});
