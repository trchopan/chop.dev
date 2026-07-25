import {readdir, readFile} from 'node:fs/promises';
import {dirname, join, posix, relative, resolve} from 'node:path';

const root = resolve('public');
const htmlFiles: string[] = [];
const errors: string[] = [];

async function collect(directory: string): Promise<void> {
    for (const entry of await readdir(directory, {withFileTypes: true})) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) await collect(path);
        else if (entry.name.endsWith('.html')) htmlFiles.push(path);
    }
}

function isExternal(reference: string): boolean {
    return reference.startsWith('#') ||
        /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference);
}

function candidates(reference: string, source: string): string[] {
    const clean = reference.split(/[?#]/, 1)[0];
    const target = clean.startsWith('/')
        ? clean.slice(1)
        : posix.normalize(join(dirname(relative(root, source)), clean));
    const normalized = target.replace(/^\.\//, '');

    if (normalized.endsWith('/')) return [join(root, normalized, 'index.html')];
    return [
        join(root, normalized),
        join(root, normalized, 'index.html'),
        join(root, `${normalized}.html`),
    ];
}

await collect(root);

for (const source of htmlFiles) {
    const html = await readFile(source, 'utf8');
    for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
        const reference = match[1];
        if (isExternal(reference)) continue;
        if (!candidates(reference, source).some((path) => {
            try {
                return Bun.file(path).size > 0;
            } catch {
                return false;
            }
        })) {
            errors.push(`${relative(root, source)} -> ${reference}`);
        }
    }
}

if (errors.length > 0) {
    console.error(`Generated-site link validation failed (${errors.length} broken reference(s))`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log(`Generated-site link validation passed (${htmlFiles.length} HTML files)`);
