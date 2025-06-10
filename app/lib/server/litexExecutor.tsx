import { exec } from 'child_process';
import { writeFileSync } from 'fs';

export function litexExecutor(litexString: string): Promise<string> {
    const tmpFileDir = process.env.LITEX_TMP_DIR + new Date().toISOString()
    writeFileSync(tmpFileDir, litexString, { encoding: 'utf-8' });
    return new Promise((resolve, reject) => {
        exec(process.env.LITEX_DIR + ` -f ` + tmpFileDir, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing command: ${error.message}`);
            } else if (stderr) {
                reject(`Command error output: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}