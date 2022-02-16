---
title: strong code-review culture
excerpt: Code reviews are more about transferring knowledge inside a team and coming up with alternate solutions than finding bugs in the code
date: '2021-06-16T13:00'
tags: 
  - topic/code-review
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-07'
modifiedDateTime: '2022-02-07 09:57'
created: '2021-06-16'
createdDateTime: '2021-06-16 13:00'
---

Code reviews are more about transferring knowledge inside a team and coming up with alternate solutions than finding bugs in the code. A strong code review culture will give us better code and better developers.

The why is more important than the how. Take the time to write a thorough PR description that explains the code change. Include documentation and links if they are relevant. You might not stay at the company forever and if you leave the context of the PR leaves with you. If you do stick around, your future self will thank you.

Written communication can often be perceived as negative. Review what you've written before publishing. Try to read it as the the one who will receive the text and try to make it feel as positive as possible. Use the **Socratic method**.

The PR is a discussion. Don't tell the author to do something, ask them about it.

> "Extract this to a service" -> "What do you think about extracting this to a service?"

Conflicts will arise and are not necessarily a bad thing. If we don't agree, be open to discussing the issues and the process.

### What to review

- Think about naming.
  > Naming is hard. Renaming is harder. Spend the time up front. - [@laurieontech](https://twitter.com/laurieontech/status/1402313492162613252)
- Review the complexity and make suggestions for possible improvements.
- Check on test coverage. 100% coverage isn't absolutely necessary, but make sure that we've added tests for the important paths.

Styling is important, but it should, if possible, be solved using automation. Use Rubocop, ESLint, Prettier etc.

---

- Derek Prior. (2015-04-30). "RailsConf 2015 - Implementing a Strong Code-Review Culture". [Link](https://www.youtube.com/watch?v=PJjmw9TRB7s)
