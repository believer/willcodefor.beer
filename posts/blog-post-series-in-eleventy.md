---
title: blog post series in eleventy
excerpt: Posts can get long if you want to explain every part of a subject in one post. I wanted to be able to create short posts and connect them in a series. This would make it more manageable for the readers, but also easy to follow along to the next part.
date: 2022-03-01
tags:
  - til
  - topic/eleventy
  - topic/writing
  - status/done
layout: layouts/post.njk
modified: '2022-03-01'
modifiedDateTime: '2022-03-01 14:04'
created: '2022-03-01'
createdDateTime: '2022-03-01 10:36'
---

Posts can get long if you want to explain every part of a subject in one post. I wanted to be able to create short posts and connect them in a series. This would make it more manageable for the readers, but also easy to follow along to the next part.

I use [Eleventy](https://www.11ty.dev/), a static site generator, to build this website. I couldn't find any guides on how to create a post series, so I created my own way. For starters, I had to create a custom [collection](https://www.11ty.dev/docs/collections/) to gather all posts that are in different series.

```js
// .eleventy.js

// Collect all posts that are part of a series
module.exports = function (config) {
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
}
```

I collect some information for each post that contains `series: <name>` in the frontmatter (the data at the top of a markdown file). This information will be used to sort and render the posts. I collect the posts in an object with series name as the key and an array of posts as the value. Something like this:

```js
{
  rescript: [
    {
      title: 'ReScript: Using useContext in rescript-react',
      date: '2021-01-28 09:02',
      url: '/posts/using-usecontext-in-rescript-react/',
    },
    // more posts here
  ]
}
```

Next, I create a [filter](https://www.11ty.dev/docs/filters/) to find if a post belongs to a series:

```js
// .eleventy.js
// ...

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
```

I sort the posts by date and add a `boolean` value, to indicate if the post is the current page.

To render the series, I combine the custom collection and the filter. I use `nunjucks` as the templating language.

```html
{% raw %}{% set seriesPosts = collections.postSeries | findSeries(series, title) %}
{% if seriesPosts and series %}
  // Render the posts
{% endif %}{% endraw %}
```

I create an inline variable called `seriesPosts` that takes the collection, `postSeries`, and runs the `findSeries` filter on it. The pipe, `|`, means that we pass the data to a filter. If the post is part of a series, we render the list.

Finally, I wanted to keep the series title independent of the `series` name. To handle this, I created another filter where I can keep the titles.

```js
// .eleventy.js
// ...

// Series titles
config.addFilter('seriesName', (series) => {
  const titles = {
    rescript: 'ReScript',
  }

  return titles[series]
})
```

```html
<h2>{% raw %}{{ series | seriesName }}{% endraw %} series</h2>
```