---
title: _redirects in Cloudflare Pages
excerpt: Cloudflare Pages has support for creating redirects using a _redirects file. This was exactly what I needed to create short URLs for my “Today I Learned” posts.
date: 2022-03-01
tags:
  - til
  - topic/cloudflare
  - status/upnext
layout: layouts/post.njk
modified: '2022-03-01'
modifiedDateTime: '2022-03-01 10:14'
created: '2022-02-28'
createdDateTime: '2022-02-28 16:22'
---

Cloudflare Pages has [support for creating redirects](https://developers.cloudflare.com/pages/platform/redirects/) using a `_redirects` file. This was exactly what I needed to create short URLs for my “Today I Learned” (TIL) posts. It won't be a permanent solution, as a project is **limited to 100 redirects**. We'll see what happens when I reach that amount.

>Netlify also [supports using a `_redirects`](https://docs.netlify.com/routing/redirects/) file. Next.js supports redirects in [the config file](https://nextjs.org/docs/api-reference/next.config.js/redirects).

The format of the file is:

```text
/new-url /old-url status
```

The `status` is optional and defaults to `302` (temporarily moved). I wanted this format for my TILs and to use `301` (permanently moved):

```
/til/1 /posts/testing-rescript-at-hemnet/ 301
```

I generate the TILs from files in my Obsidian vault, so when I update the posts, the redirects file gets updated as well. You can now reach this post by using [/til/43](/til/43).