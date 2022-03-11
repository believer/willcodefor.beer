const htmlmin = require('html-minifier')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSEO = require('eleventy-plugin-seo')
const searchFilter = require('./filters/searchFilter')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const mila = require('markdown-it-link-attributes')

const addLeadingZero = (v) => (v < 10 ? `0${v}` : v)

const getDate = (date) => {
  const year = date.getFullYear()
  const month = addLeadingZero(date.getMonth() + 1)
  const day = addLeadingZero(date.getDate())

  return `${year}-${month}-${day}`
}

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
  config.addPassthroughCopy('_redirects')
  config.addWatchTarget('./_tmp/style.css')

  // Date parsing
  config.addFilter('htmlDateString', (dateObj) => getDate(new Date(dateObj)))

  config.addFilter('htmlDateTime', (dateObj) => {
    const date = new Date(dateObj)
    const yearMonthDate = getDate(date)
    const hours = addLeadingZero(date.getHours())
    const minutes = addLeadingZero(date.getMinutes())

    return `${yearMonthDate}T${hours}:${minutes}`
  })

  // Collect all posts that are part of a series
  config.addCollection('postSeries', (collection) => {
    let seriesCollection = {}

    for (const post of collection.getAll()) {
      const { series, createdDateTime: date, title, url } = post.data

      if (series) {
        const seriesPost = { title, date, url }

        if (seriesCollection[series]) {
          seriesCollection[series].push(seriesPost)
        } else {
          seriesCollection[series] = [seriesPost]
        }
      }
    }

    return seriesCollection
  })

  // Find posts in a specific series
  config.addFilter('findSeries', (posts, postSeries, postTitle) => {
    if (postSeries) {
      return posts[postSeries]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((post) => ({
          ...post,
          currentPage: post.title === postTitle,
        }))
    }
  })

  // Series titles
  config.addFilter('seriesName', (series) => {
    const titles = {
      rescript: 'ReScript',
    }

    return titles[series]
  })

  config.addCollection('tagList', (collection) => {
    let tagSet = new Set()

    collection.getAll().forEach((item) => {
      if ('tags' in item.data) {
        for (const tag of item.data.tags) {
          if (['all', 'nav', 'til', 'tagList'].includes(tag)) {
            continue
          }

          tagSet.add(tag)
        }
      }
    })

    return [...tagSet].sort((a, b) => a.localeCompare(b))
  })

  // Calculate days I've owned my keyboard
  config.addShortcode('keyboardDays', function () {
    const keyboardTime =
      new Date().getTime() - new Date('2016-09-21T00:00:00.000Z').getTime()
    const keyboardDays = (keyboardTime / (1000 * 60 * 60 * 24 * 365)).toFixed(2)

    return keyboardDays
  })

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'after',
        class: 'direct-link',
        symbol: '#',
        level: [1, 2, 3, 4],
      }),
      slugify: config.getFilter('slug'),
    })
    .use(mila, {
      matcher(href, config) {
        return href.startsWith('https:')
      },
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    })

  config.setLibrary('md', markdownLibrary)

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
