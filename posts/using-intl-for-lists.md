---
title: using intl for lists
excerpt: I've been using the amazing Intl API to format dates (DateTimeFormat) to localized formats. Today I learned about another part of the API, ListFormat, which, as the name might suggest, formats lists.
date: 2022-02-02
tags:
  - topic/intl
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-08'
modifiedDateTime: '2022-02-08 16:32'
created: '2022-02-02'
createdDateTime: '2022-02-02 09:07'
---

I've been using the amazing [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API to format dates (`DateTimeFormat`) to localized formats. Today I learned about another part of the API, `ListFormat`, which, as the name might suggest, formats lists.

```javascript
const cats = ['Cat', 'Tiger', 'Lion']
const formatter = new Intl.ListFormat()

console.log(formatter.format(cats))
// "Cat, Tiger and Lion"

console.log(formatter.resolvedOptions())
// { locale: 'en-GB', type: 'conjunction', style: 'long' }
```

`ListFormat` accepts two arguments, `locale` and `options`, and both of them are optional. Using `resolvedOptions()` we can see what the default values. `locale` is based on my system locale.

The `type` option has three possible values and controls the formatting of the message.

- `conjunction`: “and”-based lists (A, B, and C)
- `disjunction`: “or”-based lists (A, B, or C)
- `unit`: “unit”-based lists (1 kg, 4 meters, 10 elephants)

The `style` option also has three possible values, `long`, `short`, and `narrow`, and controls the length of the formatted message. The output differences will vary between locales. When `style` is `short` or `narrow`, `unit` is the only allowed `type` option.

The base English locale, `en`, and the American locale, `en-US` includes an Oxford comma for con-/disjunctions. There's currently [no option](https://github.com/tc39/proposal-intl-list-format/issues/31) to remove it, but you can use the British English locale, `en-GB`, which doesn't include the comma.

Browser support is great, with everything except IE supporting it.

## Examples

```javascript
const cats = ['Cat', 'Tiger', 'Lion']

function formatter(locale, options) {
  return new Intl.ListFormat(locale, options)
}

// Default formatting { style: 'long', type: 'conjunction' }
console.log(formatter().format(cats))
// "Cat, Tiger, and Lion"

// Format using "or" in Swedish
console.log(
  formatter('sv', { style: 'short', type: 'disjunction' }).format(cats)
)
// "Cat, Tiger eller Lion"

// Format using "narrow" style in English
console.log(
	formatter('en', { style: 'narrow', type: 'unit' }).format(cats)
)
// "Cat Tiger Lion"

// Format data containing units
const units = ['1 dl', '4 kg', '10 centimeters']

console.log(
	formatter('en', { style: 'short', type: 'unit' }).format(units)
)
// "1 dl, 4 kg, 10 centimeters"
```

---
- Intl. (2022-02-02). _Intl.ListFormat() constructor_. [Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat)
- Eric Clemmons. (2022-02-01). [Tweet](https://twitter.com/ericclemmons/status/1488558951008509963)
