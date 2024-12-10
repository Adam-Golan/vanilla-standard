import { rmSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Remove git directories & files.
['.git', '.gitmodules', 'src/style/.git', 'src/utils/.git'].forEach(path => {
    try {
        rmSync(join(__dirname, path), { recursive: true, force: true });
    } catch (err) {
        console.error(err);
    }
});

const packagePath = join(__dirname, 'package.json');
const fileOpts = { encoding: 'utf8' };
const packageFile = JSON.parse(await readFileSync(packagePath, fileOpts));
['initiate', 'postinstall'].forEach(key => delete packageFile?.scripts[key]);
await writeFileSync(packagePath, JSON.stringify(packageFile), fileOpts);

// Remove this file.
rmSync('./initiator.mjs');