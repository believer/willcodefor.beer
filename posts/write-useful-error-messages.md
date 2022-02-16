---
title: write useful error messages
excerpt: Inform your users what is happening by writing good and useful error messages
date: 2021-06-09
tags:
  - topic/development
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-08'
modifiedDateTime: '2022-02-08 16:32'
created: '2021-06-09'
createdDateTime: '2021-06-09 10:00'
---

Inform your users what is happening by writing good and useful error messages. This will hopefully lead to few support errands in the long run as the user can understand what went wrong.

The **Nielsen Norman Group** [wrote about it](https://www.nngroup.com/articles/improving-dreaded-404-error-message/) in 1998 and summarized it in these three guiding principles:

- [Explain in plain words](/posts/explain-in-plain-words). Avoid technical jargon and error codes
- Tell the user exactly what went wrong. What happened, and why?
- Tell the user how the problem can be fixed. When will it be fixed and How can the user respond to the error?

Use we when the error is on the developer's side, e.g. "We are down for maintenance". Use you when the error is on the user's side, e.g. "Access Denied. You don not have permission to view this page"

Use words like "Page not found. The URL might be incorrect." instead of writing "404 Not found"

We don't always know how long an error will persist. Add links to a status page (if available), to a Twitter acccount, or another way for the user to get in touch if they need to.

---

- Max Rozen. (2021-06-08). "What the Fastly outage can teach us about writing error messages". [Link](https://onlineornot.com/what-fastly-outage-can-teach-about-writing-error-messages)
