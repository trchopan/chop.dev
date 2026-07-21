import {readdir, readFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';

const args = Bun.argv.slice(2);
const directoryArg = args.find((arg) => !arg.startsWith('--'));
const allowMissingImages = args.includes('--allow-missing-images');

if (!directoryArg) {
    console.error('Usage: bun run scripts/validate-slides.ts <slide-directory> [--allow-missing-images]');
    process.exit(1);
}

const directory = resolve(directoryArg);
const indexPath = join(directory, 'index.md');

const errors: string[] = [];
const warnings: string[] = [];

let index: string;
try {
    index = await readFile(indexPath, 'utf8');
} catch {
    console.error(`Missing slide file: ${indexPath}`);
    process.exit(1);
}

if (!index.startsWith('+++\n')) {
    errors.push('index.md must start with TOML front matter using +++');
}

const frontMatterEnd = index.indexOf('\n+++', 4);
if (frontMatterEnd === -1) {
    errors.push('index.md has no closing TOML front matter delimiter');
}

for (const field of ['title', 'author', 'summary', 'date', 'draft']) {
    if (!new RegExp(`^${field}\\s*=`, 'm').test(index.slice(0, Math.max(frontMatterEnd, 0)))) {
        errors.push(`front matter is missing \'${field}\'`);
    }
}

const slides = index
    .slice(Math.max(frontMatterEnd + 4, 0))
    .split(/^---\s*$/m)
    .map((slide) => slide.trim())
    .filter(Boolean);

if (slides.length === 0) {
    errors.push('index.md contains no slides');
}

const promptCount = (index.match(/\*\*AI Image Prompt:\*\*/g) ?? []).length;
if (promptCount !== slides.length) {
    errors.push(`expected one AI Image Prompt per slide, found ${promptCount} for ${slides.length} slides`);
}

const imageReferences = [
    ...Array.from(index.matchAll(/data-background-image="(\.[^"]+)"/g), (match) => match[1]),
    ...Array.from(index.matchAll(/!\[[^\]]*\]\((\.[^)]+)\)/g), (match) => match[1]),
];

const uniqueImageReferences = [...new Set(imageReferences)];
const files = new Set(await readdir(directory));
for (const reference of uniqueImageReferences) {
    const filename = reference.replace(/^\.\//, '').split(/[?#]/, 1)[0];
    if (!files.has(filename)) {
        if (allowMissingImages) {
            warnings.push(`missing image (allowed): ${filename}`);
        } else {
            errors.push(`missing image: ${filename}`);
        }
    }
}

const externalReferences = Array.from(index.matchAll(/(?:data-background-image|src)=['"](https?:\/\/[^'"]+)/g));
if (externalReferences.length > 0) {
    warnings.push(`found ${externalReferences.length} external image reference(s)`);
}

if (errors.length > 0) {
    console.error(`Slide validation failed: ${directory}`);
    for (const error of errors) console.error(`- ${error}`);
    for (const warning of warnings) console.warn(`- warning: ${warning}`);
    process.exit(1);
}

console.log(`Slide validation passed: ${directory}`);
console.log(`- slides: ${slides.length}`);
console.log(`- image references: ${uniqueImageReferences.length}`);
for (const warning of warnings) console.warn(`- warning: ${warning}`);
