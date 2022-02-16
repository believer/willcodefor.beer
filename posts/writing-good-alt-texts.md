---
title: writing good alt texts
excerpt: A [study by WebAIM](https://webaim.org/projects/million/) from 2019 found that missing alt-texts is the second most common failure of Accessibility on the web. If you don't provide an alt-text the screen reader would say "Image" or on some devices it might read the filename.
date: 2022-01-28
tags:
  - topic/development
  - topic/accessibility
  - til
  - status/done
  - activity/writing
layout: layouts/post.njk
modified: '2022-02-08'
modifiedDateTime: '2022-02-08 16:32'
created: '2022-01-28'
createdDateTime: '2022-01-28 11:54'
---

A [study by WebAIM](https://webaim.org/projects/million/) from 2019 found that missing alt-texts is the second most common failure of Accessibility on the web. If you don't provide an alt-text the screen reader would say "Image" or on some devices it might read the filename.

Alt-texts aren't only beneficial for screen readers. The text is also displayed when an image isn't able to load. This might happen due to an error or if the user has turned off image loading.

If done well, good alt-texts might also improve your SEO score.

Be specific and concise. Think about what's relevant in the picture, for instance if it's important to convey what color something is or if the image contains a specific person. [Explain in plain words](/posts/explain-in-plain-words).

- **Imagine that you're describing the image to a person over the phone**
- **The recommendation is 125 characters and one sentence or two should be enough.**
- Think about context related to the topic you want to describe. e.g. `alt="Business school professor pointing to a student's computer screen"` instead of `alt="Woman pointing to a person's computer screen"`

Use an empty value, `alt=""`, if an image is decorative or does not contain any valuable information.

Don't add "A photo of..." or "An image of...".

If an alt-text needs to be very long or is complex you might need to include the text somewhere else on the page. [Here are some guidelines for complex images](https://accessibility.psu.edu/images/)

---
- The Big Hack. (2019-10-07). _How to write better alt-text descriptions for accessibility_. [Link](https://bighack.org/how-to-write-better-alt-text-descriptions-for-accessibility/)
- Braden Becker. (2021-07-12). _Image Alt Text: What It Is, How to Write It, and Why It Matters to SEO_. [Link](https://blog.hubspot.com/marketing/image-alt-text)