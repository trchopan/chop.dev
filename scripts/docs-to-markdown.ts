// bun run scripts/docs-to-markdown.ts location link
// Ex: bun run scripts/docs-to-markdown.ts content/posts https://docs.google.com/document/d/<id>

import {mkdir} from 'node:fs/promises';

const normalize = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replaceAll('đ', 'd')
        .replaceAll('Đ', 'D');

const downloadGDocsToMarkdown = async (link: string) => {
    const resp = await fetch('https://docs-to-markdown.chop.dev', {
        method: 'POST',
        headers: {accept: 'application/json'},
        body: JSON.stringify({url: link}),
    });
    return resp.text();
};

const downLoadPost = async (location: string, link: string) => {
    let outStr = await downloadGDocsToMarkdown(link);
    const titleMatch = outStr.match(/^title\s*=\s*"([^"]+)"/m);
    if (!titleMatch) {
        throw new Error('The converted document does not contain a title');
    }

    let title = normalize(titleMatch[1]);
    title = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const postPath = `${location}/${title}`;
    await mkdir(postPath, {recursive: true});

    console.log('Writing:', postPath);
    console.log('Content\n', outStr.slice(0, 500));

    // match images
    const foundImages: string[] = [
        ...(outStr.match(new RegExp(/https.*?googleusercontent.com\/[\/\.?=&\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?ytimg.com\/[\/\.?=&\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?ibb.co\/[\/\.?=&\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?imgur.com\/[\/\.?=&\w_-]*/g)) || []),
    ];
    const downloads = Object.entries(foundImages).map(([index, link]) => ({
        link,
        path: `${title}-${index}.jpg`,
        articleReplace: `./${title}-${index}.jpg`,
    }));
    for (const image of downloads) {
        const response = await fetch(image.link);
        if (!response.ok) {
            throw new Error(`Failed to download ${image.link}: ${response.status}`);
        }
        await Bun.write(`${postPath}/${image.path}`, await response.arrayBuffer());
        outStr = outStr.replaceAll(image.link, image.articleReplace);
    }

    outStr = outStr
        // Cleanup the unexpected characters from Docs
        .replaceAll('”', '"')
        .replaceAll('“', '"')
        .replaceAll(' ', ' '); // These are actually 2 diferent character for space

    await Bun.write(`${postPath}/index.md`, outStr);
};

if (import.meta.main) {
    const [location, link] = Bun.argv.slice(2);
    if (!location || !link) {
        throw new Error('Usage: bun run scripts/docs-to-markdown.ts <location> <link>');
    }
    await downLoadPost(location, link);
}
