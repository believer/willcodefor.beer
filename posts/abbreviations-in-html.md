---
title: abbreviations in html
excerpt: "Abbreviations can be hard to understand. This post uses HTML's abbreviation and definition elements to make texts easier for everyone."
date: 2022-03-12
tags:
  - til
  - topic/html
  - topic/css
layout: layouts/post.njk
modified: '2022-03-14'
modifiedDateTime: '2022-03-14 16:11'
created: '2022-03-12'
createdDateTime: '2022-03-12 10:02'
---

Abbreviations can be hard to understand. Normally, we would write the full meaning followed by the abbreviation inside parentheses the first time it’s being used. After that, we can use only the abbreviation. For example, CSS on Wikipedia:

>**Cascading Style Sheets** (**CSS**) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript - [Wikipedia](https://en.m.wikipedia.org/wiki/CSS)

## Abbreviation element

<dfn id="html"><abbr title="HyperText Markup Language" tabindex="0">HTML</abbr></dfn> has an abbreviation element, `<abbr>`, that helps us reduce the amount of text, but still keep the explanation of the abbreviation.

**Note:** For accessibility reasons, you might still want to spell out the abbreviation in full the first time, but let's look at what we can do.

The `<abbr>` element takes an optional `title` attribute, but we should definitely use it to add the full description. The CSS example would become `<abbr title="Cascading Style Sheets">CSS</abbr>` and the text would look like:

><abbr title="Cascading Style Sheets">CSS</abbr> is a style sheet language used for describing the presentation of a document written in a markup language such as <abbr title="HyperText Markup Language">HTML</abbr>. <abbr title="Cascading Style Sheets">CSS</abbr> is a cornerstone technology of the World Wide Web, alongside <abbr title="HyperText Markup Language">HTML</abbr> and JavaScript

Neat! The default styling adds a dotted line under the abbreviation and if you hover it you'll see a little tooltip with the full description.

## Definition element

If we want to make it even clearer where we first defined the term, we can pair the abbreviation element with the definition element, `<dfn>`. We only need to wrap the `<abbr>` with a `<dfn>`.

```html
<dfn>
  <abbr title="Cascading Style Sheets">CSS</abbr>
</dfn>
```

If we added this to our Wikipedia example, we get:

><dfn><abbr title="Cascading Style Sheets">CSS</abbr></dfn> is a style sheet language used for describing the presentation of a document written in a markup language such as <dfn><abbr title="HyperText Markup Language">HTML</abbr></dfn>. <abbr title="Cascading Style Sheets">CSS</abbr> is a cornerstone technology of the World Wide Web, alongside <abbr title="HyperText Markup Language">HTML</abbr> and JavaScript

The default styling made the first term italic to put more emphasis that this is the first definition of the term.

We can also add an `id` to the definition, which allows us to create links that navigate back to it later on. For example, [this link](#html) will take you to where I defined <abbr title="HyperText Markup Language" tabindex="0">HTML</abbr>.

```html
<!-- Add an ID -->
<dfn id="css">
  <abbr title="Cascading Style Sheets">CSS</abbr>
</dfn>

<!-- Somewhere later -->
<a href="#css">CSS</a>
```

## Mobile and keyboard

This all works well on desktops where users can hover the abbreviation, but not on mobile or for keyboard users. We can fix this by adding a bit of styling and HTML.

```html
<!--
Make the abbreviation element focusable using tabindex
where it's being defined for the first time
-->
<dfn>
  <abbr title="Cascading Style Sheets" tabindex="0">CSS</abbr>
</dfn>
```

```css
/*
Display the abbr title on mobile devices when clicked or when
the user focuses the element.
*/
abbr[title]:focus::after,
abbr[title]:hover::after {
  content: " (" attr(title) ")";
}

@media (min-width: 640px) {
  /* Remove abbr display on larger devices */
  abbr[title]:hover::after {
    content: "";
  }
}
```

><dfn><abbr title="Cascading Style Sheets" tabindex="0">CSS</abbr></dfn> is a style sheet language used for describing the presentation of a document written in a markup language such as <dfn><abbr title="HyperText Markup Language" tabindex="0">HTML</abbr></dfn>. <abbr title="Cascading Style Sheets">CSS</abbr> is a cornerstone technology of the World Wide Web, alongside <abbr title="HyperText Markup Language">HTML</abbr> and JavaScript

If the definition abbreviations above are focused or tapped on mobile, they'll display the full description after the abbreviation: “CSS (Cascading Style Sheets)”.

---
MDN. (2022-03-14). _abbr: The Abbreviation element_. [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr)
MDN. (2022-03-14). _dfn: The Definition element_. [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn)
Ire Aderinokun. (2018-12-20). _Making the abbr element work for touchscreen, keyboard, and mouse_. [Link](https://bitsofco.de/making-abbr-work-for-touchscreen-keyboard-mouse/)
