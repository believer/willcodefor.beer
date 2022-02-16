const htmlmin = require('html-minifier')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSEO = require('eleventy-plugin-seo')
const searchFilter = require('./filters/searchFilter')

const addLeadingZero = (v) => (v < 10 ? `0${v}` : v)

module.exports = function (config) {
  config.addPlugin(pluginRss)
  config.addPlugin(syntaxHighlight)
  config.addPlugin(pluginSEO, {
    title: 'Rickard Natt och Dag',
    description:
      'I am a developer from Sweden. I enjoy making user-friendly websites and creating tools that make life easier for other developers.',
    url: 'https://willcodefor.beer',
    author: 'Rickard Natt och Dag',
    twitter: 'rnattochdag',
    image: '/assets/ogimage.png',
    options: {
      imageWithBaseUrl: true,
    },
  })

  config.setUseGitIgnore(false)

  config.addPassthroughCopy('assets')
  config.addPassthroughCopy('css')
  config.addWatchTarget('./_tmp/style.css')

  config.addShortcode('version', function () {
    return String(Date.now())
  })

  config.addFilter('htmlDateString', (dateObj) => {
    const date = new Date(dateObj)
    return `${date.getFullYear()}-${addLeadingZero(
      date.getMonth() + 1
    )}-${addLeadingZero(date.getDate())}`
  })

  config.addFilter('noPostTag', (tags) => tags.filter((t) => t !== 'post'))

  config.addCollection('tagList', (collection) => {
    let tagSet = new Set()

    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false
          }

          return true
        })

        for (const tag of tags) {
          tagSet.add(tag)
        }
      }
    })

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet]
  })

  // Calculate days I've owned my keyboard
  config.addShortcode('keyboardDays', function () {
    const keyboardTime =
      new Date().getTime() - new Date('2016-09-21T00:00:00.000Z').getTime()
    const keyboardDays = (keyboardTime / (1000 * 60 * 60 * 24 * 365)).toFixed(2)

    return keyboardDays
  })

  // Minify HTML
  config.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.NODE_ENV === 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  // Add reading time calculation
  config.addFilter('readingTime', (content) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length

    return `${Math.ceil((words / wordsPerMinute).toFixed(2))} min read`
  })

  // Filter out the latest three latest posts
  config.addFilter('latestPosts', (posts) => posts.slice(0, 4))

  config.addFilter('latestTil', (posts) => posts.slice(0, 10))

  config.addFilter('search', searchFilter)
  config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob('./posts/*.md')]
  })
}
