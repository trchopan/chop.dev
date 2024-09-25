// deno run --allow-net --allow-write docs-to-markdown.ts location link

import * as Colors from 'https://deno.land/std@0.177.0/fmt/colors.ts';
import {normalize} from 'https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/normalize_diacritics/mod.ts';
import {download} from 'https://deno.land/x/download@v2.0.2/mod.ts';
import {extractToml} from 'jsr:@std/front-matter';

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
    const fm = extractToml(outStr);

    let title: string = await normalize(fm.attrs.title);
    title = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const postPath = `${location}/${title}`;
    await Deno.mkdir(postPath, {recursive: true});

    console.log(Colors.yellow('Writing:'), Colors.red(postPath));
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
        await download(image.link, {dir: postPath, file: image.path});
        outStr = outStr.replaceAll(image.link, image.articleReplace);
    }

    outStr = outStr
        // Cleanup the unexpected characters from Docs
        .replaceAll('”', '"')
        .replaceAll('“', '"')
        .replaceAll(' ', ' '); // These are actually 2 diferent character for space

    await Deno.writeTextFile(`${postPath}/index.md`, outStr);
};

if (import.meta.main) {
    downLoadPost(Deno.args[0], Deno.args[1]);
}
