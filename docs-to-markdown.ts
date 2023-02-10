import * as Colors from 'https://deno.land/std@0.177.0/fmt/colors.ts'
import yaml from 'https://cdn.skypack.dev/yaml@v2.2.1'
import {normalize} from 'https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/normalize_diacritics/mod.ts'

interface PostInfo {
    title: string
    link: string
}

interface Posts {
    released: PostInfo[]
    drafts: PostInfo[]
}

const fileContent = await Deno.readTextFile('posts.yaml')
const posts: Posts = yaml.parse(fileContent)

// Download the image link using wget to a pathPrefix
// NOTE: the directory and path must already exist
const downloadLinksToPost = async (link: string, outPath: string) => {
    const process = await Deno.run({
        cmd: ['wget', link, `-O${outPath}`],
        stdout: 'piped',
        stderr: 'piped',
    })
    const outStr = new TextDecoder().decode(await process.output())
    const errStr = new TextDecoder().decode(await process.stderrOutput())
    process.close()
    console.log(outStr, errStr)
}

for (const a of posts.drafts) {
    const process = await Deno.run({
        cmd: ['docs_to_markdown', a.link],
        stdout: 'piped',
        stderr: 'piped',
    })

    const errStr = new TextDecoder().decode(await process.stderrOutput())
    if (errStr) {
        console.log(Colors.red('=== Error processing ==='), a.title)
        console.log(errStr)
        break
    }

    let outStr = new TextDecoder().decode(await process.output())
    process.close()

    let title: String = await normalize(a.title)
    title = title.toLowerCase().replace(/[^a-z0-9]/g, '-')

    console.log(Colors.yellow('Writing:'), Colors.red(title))
    console.log('Content\n', outStr.slice(0, 500))

    const postPath = `./content/posts/${title}`
    await Deno.mkdir(postPath, {recursive: true})

    // Download images from googleusercontent
    const googleImages: string[] = [
        ...(outStr.match(new RegExp(/https.*?googleusercontent.com\/[\w_-]*/g)) || []),
        ...(outStr.match(new RegExp(/https.*?ytimg.com\/[\/\.?=&\w_-]*/g)) || []),
    ]
    const downloads = Object.entries(googleImages).map(([index, link]) => ({
        link,
        path: `${postPath}/${title}-${index}.jpg`,
        articleReplace: `/posts/${title}/${title}-${index}.jpg`,
    }))
    for (const image of downloads) {
        await downloadLinksToPost(image.link, image.path)
        outStr = outStr.replaceAll(image.link, image.articleReplace)
    }

    // Cleanup double quote
    outStr = outStr.replaceAll('”', '"').replaceAll('“', '"')

    await Deno.writeTextFile(`./content/posts/${title}/${title}.md`, outStr)
}
