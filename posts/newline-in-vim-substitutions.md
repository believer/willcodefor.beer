---
title: newline in vim substitutions
excerpt: When doing substitutions in vim use \r instead of \n
date: 2022-01-26
tags:
  - activity/learning
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-08'
modifiedDateTime: '2022-02-08 16:04'
created: '2022-01-26'
createdDateTime: '2022-01-26 17:45'
---

When doing substitutions in vim use `\r` instead of `\n`. `\n` inserts a null character in the text while `\r` will match a carriage return.

If you are _searching_ for a newline, you'd still use `\n`.

---
StackOverFlow. (2008-09-16). [Link](https://stackoverflow.com/questions/71323/how-to-replace-a-character-by-a-newline-in-vim)