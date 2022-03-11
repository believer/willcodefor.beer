---
title: structure of CSS
excerpt: "I tend to forget the names of a CSS rule's parts. By writing this I hope I will remember better. Or at least have a place to go when I forget again. This was originally posted on my devlog"
date: 2022-03-11
tags:
  - til
  - topic/CSS
  - status/done
layout: layouts/post.njk
modified: '2022-03-11'
modifiedDateTime: '2022-03-11 15:05'
created: '2022-03-11'
createdDateTime: '2022-03-11 14:08'
---

I tend to forget the names of a <dfn><abbr title="Cascading Style Sheets">CSS</abbr></dfn> rule's parts. By writing this I hope I will remember better. Or at least have a place to go when I forget again. This was originally posted on [my devlog](https://devlog.willcodefor.beer/pages/structure-of-css/).

The basic blocks of CSS are properties and values. 

- **Properties** are human-readable identifiers that describe _what_ is being styled.
- **Values** indicate _how_ to style that property.

When these are paired together they create a **CSS declaration**.

```css
/*
Property: color
Value: red

Together they form a CSS declaration.
*/
color: red;
```

CSS declarations are found within **CSS declaration blocks**. When CSS declaration blocks are paired with **selectors** (or a list of selectors) they produce **CSS rulesets** (or CSS rules).

```css
/*
p is a selector. Together with the CSS
declaration block it creates a CSS rule.
*/
p {
  /* Multiple declarations form a CSS declaration block */
  background-color: black;
  color: white;
}

```

---
- MDN. _How CSS is structured_. [Link](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured)