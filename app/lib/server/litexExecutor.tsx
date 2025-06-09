import { exec } from 'child_process';

export function litexExecutor(litexString: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(process.env.LITEX_DIR + ` -e \"` + litexString + `\"`, (error, stdout, stderr) => {
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