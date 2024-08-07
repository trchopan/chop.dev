// deno run --allow-read --allow-net --allow-run --allow-write docs-to-markdown.ts

import * as Colors from 'https://deno.land/std@0.177.0/fmt/colors.ts';
import yaml from 'https://cdn.skypack.dev/yaml@v2.2.1';
import {normalize} from 'https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/normalize_diacritics/mod.ts';
import {download} from 'https://deno.land/x/download@v2.0.2/mod.ts';

interface PostInfo {
    title: string;
    link: string;
}

interface Posts {
    released: PostInfo[];
    drafts: PostInfo[];
}

const fileContent = await Deno.readTextFile('posts.yaml');
const posts: Posts = yaml.parse(fileContent);

// Download the image link using wget to a pathPrefix
// NOTE: the directory and path must already exist
const downloadLinksToPost = async (link: string, outPath: string) => {
    await download(link, {dir: outPath});
};

const processWithDocsToMarkdown = async (link: string) => {
    const resp = await fetch('https://docs-to-markdown.chop.dev', {
        method: 'POST',
        headers: {accept: 'application/json'},
        body: JSON.stringify({url: link}),
    });
    return resp.text();
};

for (const a of posts.drafts) {
    let outStr = await processWithDocsToMarkdown(a.link);
    console.log('>>>', outStr);

    let title: string = await normalize(a.title);
    title = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    console.log(Colors.yellow('Writing:'), Colors.red(title));
    console.log('Content\n', outStr.slice(0, 500));

    const postPath = `./content/posts/${title}`;
    await Deno.mkdir(postPath, {recursive: true});

    // Download images from googleusercontent
    const downloadImages: string[] = [
        ...(outStr.match(new RegExp(/https.*?googleusercontent.com\/[\/\.?=&\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?ytimg.com\/[\/\.?=&\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?ibb.co\/[\/\.?=&\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?imgur.com\/[\/\.?=&\w_-]*/g)) || []),
    ];
    const downloads = Object.entries(downloadImages).map(([index, link]) => ({
        link,
        path: `${title}-${index}.jpg`,
        articleReplace: `/posts/${title}/${title}-${index}.jpg`,
    }));
    for (const image of downloads) {
        await downloadLinksToPost(image.link, image.path);
        await download(image.link, {dir: postPath, file: image.path});
        outStr = outStr.replaceAll(image.link, image.articleReplace);
    }

    outStr = outStr
        // Cleanup the unexpected characters from Docs
        .replaceAll('”', '"')
        .replaceAll('“', '"')
        .replaceAll(' ', ' '); // These are actually 2 diferent character for space

    await Deno.writeTextFile(`./content/posts/${title}/${title}.md`, outStr);
}
