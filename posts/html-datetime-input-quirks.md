---
title: html datetime input quirks
excerpt: We wanted to replace a custom-built date range picker with two separate inputs for start and end date. We decided that we should try to use the browser's native <input type="datetime-local">. It does however come with some quirks.
date: 2022-02-18
tags:
  - topic/development
  - til
layout: layouts/post.njk
modified: '2022-02-21'
modifiedDateTime: '2022-02-21 09:48'
created: '2022-02-18'
createdDateTime: '2022-02-18 19:02'
---

We wanted to replace a custom-built date range picker with two separate inputs for start and end date. We decided that we should try to use the browser's native `<input type="datetime-local">`. It does however come with some quirks.

The first one is that input displays the date and time according to the user's locale, but the `value` is always formatted as `YYYY-MM-DDThh:mm`. This means that you might to do some parsing to get the value in the format you want.

The second one was that the maximum year that can be used is 275 760, the upper limit of the [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Luckily, our tests caught the issue. This can be fixed by setting the `max` attribute to `9999-12-31T23:59` which will limit year input to four digits. Try using the inputs below, the first one does not set a max value and the second one does.

---

<div style="display: grid; grid-template-columns: repeat(2, 1fr);grid-gap:32px;">
<input type="datetime-local" style="border: 1px solid #ccc;padding:8px;" />
<input type="datetime-local" max="9999-12-31T23:59" style="border: 1px solid #ccc;padding:8px;" />
</div>

---

**NOTE:** I was unable to reproduce the following issue in CodeSandbox. It might happen due to parsing functions between different formats, which creates an invalid value when the value turns to zero.

The last issue we found was that when the input contains a value and the user inputs a zero (0), the input would completely reset. This might become a UX issue if a user types the date exactly like they would in any other place. The input does not allow zero as a valid value.

We were updating the value `onInput` and we also tried `onChange`, but both of them showed the same behavior. However, if we use `onBlur` we got something that handled the zeros more gracefully. When we used `onBlur` the zero, and the rest of the value, would remain. The part that was zero gets turned into the smallest possible value (1) when the user leaves the field. It's not perfect, but it feels better since it doesn't completely remove the value.

---
- MDN. (2022-02-18). _`<input type="datetime-local">`_. [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
- StackOverflow. (2016-11-24). _Why is the html input type="datetime-local" value of YEAR 7 chars long?_. [Link](https://stackoverflow.com/questions/40754264/why-is-the-html-input-type-datetime-local-value-of-year-7-chars-long) 