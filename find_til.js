const fm = require('front-matter')
const path = require('path')
const { resolve } = require('path')
const { writeFile, readdir, readFile, stat } = require('fs').promises

const formatDate = new Intl.DateTimeFormat('sv-SE')
const formatDateTime = new Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'short',
  timeStyle: 'short',
})

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

const imageExtensions = ['.png', '.jpg']

const obsidianLinkToMarkdownLink =
  (allFilenames) => (match, offset, string) => {
    let title = match.replace(/[\[\]]/g, '')

    if (imageExtensions.some((i) => title.includes(i))) {
      title = title.replace('!', '')
      const [filename] = title.split('.')
      return `![${filename}](/assets/${title})`
    }

    if (title.includes('|')) {
      title = title.split('|')[1]
    }

    if (!allFilenames.includes(title)) {
      return title
    }

    return `[${title}](/posts/${title
      .toLowerCase()
      .replace(/ - /g, ' ')
      .replace(/\s/g, '-')
      .replace(/[*'"]/g, '')})`
  }

const addFileDates =
  ({ mtime, birthtime }) =>
  (match, offset, string) => {
    return `${match}
modified: '${formatDate.format(mtime)}'
modifiedDateTime: '${formatDateTime.format(mtime)}'
created: '${formatDate.format(birthtime)}'
createdDateTime: '${formatDateTime.format(birthtime)}'`
  }

;(async () => {
  let tils = []

  for await (const f of getFiles(
    '/Users/rdag/Library/Mobile Documents/iCloud~md~obsidian/Documents/notes'
  )) {
    const data = await readFile(f, 'utf8')
    const { attributes } = fm(data)

    if (
      attributes.tags &&
      attributes.tags.includes('til') &&
      attributes.title
    ) {
      tils.push(f)
    }
  }

  const allFilenames = tils.map((til) => path.basename(til).replace('.md', ''))
  let redirects = []

  for (const til of tils) {
    const filename = path
      .basename(til)
      .toLowerCase()
      .replace(/ - /g, ' ')
      .replace(/\s/g, '-')
      .replace(/[*']/g, '')

    const data = await readFile(til, 'utf8')
    const metadata = await stat(til)
    const content = data
      .replace(/{{/g, '{% raw %}{{')
      .replace(/}}/g, '}}{% endraw %}')
      .replace(
        /!?\[\[([a-zåäö0-9\s-'.,|]+)\]\]/gi,
        obsidianLinkToMarkdownLink(allFilenames)
      )
      .replace(/^layout\: layouts\/post\.njk$/gim, addFileDates(metadata))

    // Add files for redirects
    redirects.push({
      filename: filename.replace('.md', ''),
      created: metadata.birthtimeMs,
    })

    await writeFile(`./posts/${filename}`, content)
  }

  // Redirects for old blog posts
  const allRedirects = {
    1: '/til/1 /posts/testing-rescript-at-hemnet/',
    2: '/til/2 /posts/lint-html-with-css/',
    3: '/til/3 /posts/close-all-vim-buffers/',
    4: '/til/4 /posts/testing-react-createportal/',
    5: '/til/5 /posts/create-a-rescript-react-component/',
    6: '/til/6 /posts/using-react-components-in-rescript/',
    7: '/til/7 /posts/add-a-third-party-library-to-rescript-project/',
    8: '/til/8 /posts/using-usestate-in-rescript-react/',
    9: '/til/9 /posts/using-usereducer-in-rescript-react/',
    10: '/til/10 /posts/compiler-help-when-updating-variants-in-rescript/',
    11: '/til/11 /posts/using-usecontext-in-rescript-react/',
    12: '/til/12 /posts/connect-to-localstorage-with-functors/',
    13: '/til/13 /posts/rescript-ffi-basics-in-react/',
    14: '/til/14 /posts/how-to-add-tailwind-to-a-rescript-project/',
    15: '/til/15 /posts/safely-position-fixed-content-in-mobile-browsers/',
    27: '/til/27 /posts/save-disk-space-by-deleting-node-modules/',
    28: '/til/28 /posts/cloudflare-www-to-non-www/',
    29: '/til/29 /posts/advent-of-code-2021-day-1/',
  }

  // Create redirects for generate TILs
  redirects.sort((a, b) => a.created - b.created)

  let startFrom = 16

  for (const { filename } of redirects) {
    // Skip ahead because of mix between blog and TIL
    if (startFrom === 27) {
      startFrom = 30
    }

    allRedirects[startFrom] = `/til/${startFrom} /posts/${filename}/`

    startFrom++
  }

  const redirectsFile = Object.values(allRedirects)
    .map((r) => `${r} 301`)
    .join('\n')

  await writeFile('_redirects', redirectsFile)
})()

module.exports = { obsidianLinkToMarkdownLink, addFileDates }
