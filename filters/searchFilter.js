const elasticlunr = require('elasticlunr')

module.exports = function (collection) {
  var index = elasticlunr(function () {
    this.addField('title')
    this.addField('excerpt')
    this.addField('tags')
    this.addField('content')
    this.setRef('id')
  })

  collection.forEach((page) => {
    // Content without code
    const content = page.template.frontMatter.content.replace(
      /^(?:\ {4}.+\n)+(?!)|^```(?:[^`]+|`(?!``))*```/gim,
      ''
    )

    index.addDoc({
      content,
      excerpt: page.template.frontMatter.data.excerpt,
      id: page.url,
      tags: page.template.frontMatter.data.tags,
      title: page.template.frontMatter.data.title,
    })
  })

  return index.toJSON()
}
