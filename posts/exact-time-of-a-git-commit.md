---
title: exact time of a git commit
excerpt: Yesterday I was combining my blog post and my TIL posts and I wanted to find out the exact time of a git commit. It turns out that it's really easy.
date: 2022-02-24
tags:
  - til
  - topic/git
layout: layouts/post.njk
modified: '2022-02-24'
modifiedDateTime: '2022-02-24 09:41'
created: '2022-02-24'
createdDateTime: '2022-02-24 09:22'
---

Yesterday I was combining my blog post and my TIL posts and I wanted to find out the exact time of a git commit. It turns out that it's really easy. If you hover the date of a commit, you'll see the full date and time.

![exact-commit-time](/assets/exact-commit-time.png)

If you want an even more precise time that includes seconds or if you just want to get the time using the terminal, you can use the following command.

```bash
git show -s --format=%ci <commit-sha>
# 2022-02-23 13:27:44 +0100
```

- `-s`  – Removes the diff
- `--format=%ci`  - Only display the date in an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-like format (use `%cI` if you need strict ISO 8601-format)