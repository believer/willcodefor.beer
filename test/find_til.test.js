const { obsidianLinkToMarkdownLink, addFileDates } = require('../find_til')
import { beforeEach, afterEach, vi, describe, expect, test } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('#obsidianLinkToMarkdownLink', () => {
  test('returns title if link is not a file, i.e. not a page', () => {
    expect(obsidianLinkToMarkdownLink([])('[[Link]]')).toEqual('Link')
  })

  test('returns link to page', () => {
    expect(obsidianLinkToMarkdownLink(['Link'])('[[Link]]')).toEqual(
      '[Link](/posts/link)'
    )
  })

  test('fixes the url', () => {
    expect(
      obsidianLinkToMarkdownLink(["Test's are nice*"])("[[Test's are nice*]]")
    ).toEqual("[Test's are nice*](/posts/tests-are-nice)")
  })

  test('handles links with quotation marks', () => {
    expect(
      obsidianLinkToMarkdownLink(['Test "Parkinsons" law'])(
        '[[Test "Parkinsons" law]]'
      )
    ).toEqual('[Test "Parkinsons" law](/posts/test-parkinsons-law)')
  })

  test('handles links without page', () => {
    expect(
      obsidianLinkToMarkdownLink([])("[[Parkinsons lag|Parkinson's law]]")
    ).toEqual("Parkinson's law")
  })

  test('handles aliased links with page', () => {
    expect(
      obsidianLinkToMarkdownLink(["Parkinson's law"])(
        "[[Parkinsons lag|Parkinson's law]]"
      )
    ).toEqual("[Parkinson's law](/posts/parkinsons-law)")
  })

  test('handles images', () => {
    expect(obsidianLinkToMarkdownLink([])('![[image.png]]')).toEqual(
      '![image](/assets/image.png)'
    )
  })
})

describe('#addFileDates', () => {
  test('add modified and created times to frontmatter', () => {
    const date = new Date(2022, 0, 31, 13, 45)
    vi.setSystemTime(date)

    expect(
      addFileDates({ mtime: new Date(), birthtime: new Date() })(
        'layout: layouts/post.njk'
      )
    ).toEqual(`layout: layouts/post.njk
modified: '2022-01-31'
modifiedDateTime: '2022-01-31 13:45'
created: '2022-01-31'
createdDateTime: '2022-01-31 13:45'`)
  })
})
