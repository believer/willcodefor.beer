---
title: use valueAs* on inputs
excerpt: If you want to get the value of an input as a number or a date you can easily parse the value of a type="text" input
date: '2021-11-10T13:37'
tags:
  - topic/learning
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-08'
modifiedDateTime: '2022-02-08 16:32'
created: '2021-11-10'
createdDateTime: '2021-11-10 13:37'
---

If you want to get the value of an input as a number or a date you can easily parse the value of a `type="text"` input. However, there's an easier solution by using `valueAsNumber` or `valueAsDate`. The attributes are only available for certain input types. The attributes return `NaN` if not available or if the value is invalid.

Browser support is great, `valueAsNumber` is supported by all browsers (even IE) and `valueAsDate` is supported by all browsers except IE.

```js
// This will always return NaN since valueAsNumber
// is not available on text inputs
<input type="text" onChange={e => console.log(e.target.valueAsNumber)} />

// Return the value as an integer or a float
// depending on the input's step attribute
<input type="number" onChange={e => console.log(e.target.valueAsNumber)} />

// Return the date as a UNIX timestamp, i.e. new Date().getTime()
<input type="date" onChange={e => console.log(e.target.valueAsNumber)} />

// Return the date as a JS Date object
<input type="date" onChange={e => console.log(e.target.valueAsDate)} />
```

---

- MDN. (2021-11-10). HTMLInputElement. [Link](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
- Can I Use. (2021-11-10). HTMLInputElement API: valueAsNumber. [Link](https://caniuse.com/mdn-api_htmlinputelement_valueasnumber)
