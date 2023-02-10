import * as Colors from 'https://deno.land/std@0.177.0/fmt/colors.ts'
import * as path from 'https://deno.land/std@0.97.0/path/mod.ts'
import _ from 'https://cdn.skypack.dev/lodash@v4.17.15'

// # #/bin/bash
// #
// # cd public/posts
// #
// # for i in $(find . -type f -regex ".*[jpg,png]" -not -regex ".*tmp.*");
// # do
// #   bname=$(basename "${i}" ".${i##*.}")
// #   outname="tmp_$bname.jpg"
// #   vipsthumbnail -s "1024x>" -o "tmp_%s.jpg[Q=85]" $i;
// #   mv $outname $i
// # done;

async function getNames(currentPath: string) {
    const names: string[] = []

    for await (const dirEntry of Deno.readDir(currentPath)) {
        const entryPath = `${currentPath}/${dirEntry.name}`
        names.push(entryPath)

        if (dirEntry.isDirectory) {
            names.push(await getNames(entryPath))
        }
    }

    return names
}

const process = async (path: string) => {
    const process = await Deno.run({
        cmd: ['vipsthumbnail', '-s', '1024x>', '-o', '%s_tmp.jpg[Q=75]', path],
        stdout: 'piped',
        stderr: 'piped',
    })
    const errStr = new TextDecoder().decode(await process.stderrOutput())
    process.close()
    if (errStr) {
        console.log('Error processing image', path)
        console.log(errStr)
    }
}

const filepaths = await getNames('public/ox-hugo')
const orgFiles = filepaths.filter(x => !x.includes('_tmp'))

const queue = orgFiles.map(x => process(x))
for (const chunk of _.chunk(queue, 10)) {
    await Promise.all(chunk)
}

const replaceList: {convertedPath: string; originPath: string}[] = await Promise.all(
    orgFiles.map(path.parse).map(async origin => {
        const converted = Object.assign({}, origin, {
            base: origin.name + '_tmp' + '.jpg',
            ext: '.jpg',
            name: origin.name + '_tmp',
        })

        const originPath = path.format(origin)
        const originStat = await Deno.stat(originPath)
        const convertedPath = path.format(converted)
        const convertedStat = await Deno.stat(convertedPath)

        console.log(Colors.blue('Origin'), originPath)
        console.log(Colors.red('Converted'), convertedPath)
        console.log(
            Colors.green('Size'),
            convertedStat.size,
            originStat.size,
            Colors.green('Change'),
            convertedStat.size / originStat.size
        )

        console.log('---')

        return {
            convertedPath,
            originPath,
        }
    })
)

await Promise.all(
    replaceList.map(async ({convertedPath, originPath}) => {
        await Deno.copyFile(convertedPath, originPath)
        await Deno.remove(convertedPath)
    })
)
