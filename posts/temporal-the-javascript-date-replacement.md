---
title: temporal - the javascript date replacement
excerpt: The current Date implementation in JavaScript has mostly been the same since its inception in 1995. But there's a new API called Temporal in the works (currently stage 3) that aims to fix the issues with Date.
date: 2022-02-25
tags:
  - til
  - topic/development
  - topic/javascript
  - status/done
layout: layouts/post.njk
modified: '2022-02-28'
modifiedDateTime: '2022-02-28 09:43'
created: '2022-02-25'
createdDateTime: '2022-02-25 09:59'
---

The current `Date` implementation in JavaScript has mostly been the same since its inception in 1995. But there's a new API called `Temporal` in the works (currently stage 3) that aims to fix the issues with `Date`.

In 1995, Brendan Eich was tasked with creating the JavaScript language and implement it in Netscape. He had 10 days to complete the task. As date handling is a fundamental part of any programming language, JavaScript of course had to have it. Brendan had orders to “make it like Java” and this is the same API that we're still using today.

Some issues with the `Date` implementation are:

 - Date object is mutable
 - Parsing behavior is unreliable
 - Poor timezone support (only user’s local time and UTC)
 - No support for non-Gregorian calendar

And the core principles of the `Temporal` API are:

- All `Temporal` objects are **immutable**
- Date values can be represented in local calendar systems, but should be convertible to and from the Gregorian calendar
- 24-hour clock time-of-day values
- No [leap seconds](https://en.wikipedia.org/wiki/Leap_second) 

From the extensive [proposal documentation](https://tc39.es/proposal-temporal/docs/index.html) and the [cookbook](https://tc39.es/proposal-temporal/docs/cookbook.html) we can find some nice ways on how the API is going to work. The API is stable and you can expect that no major changes should occur. I encourage you to look at the documentation yourselves, as these are just a few usages. I think the API looks very promising.

## Plain date

```js
const dateTime = Temporal.PlainDateTime.from({
  year: 1995,
  month: 12,
  day: 7,
  hour: 15,
})
// 1995-12-07T15:00:00

const dateTimeWithMinutesAndSeconds = dateTime.with({
  minute: 17,
  second: 19,
})
// 1995-12-07T15:17:19
```

**Note:** These time strings would be usable with the `datetime-local` input that I looked at in [HTML datetime input quirks](/posts/html-datetime-input-quirks).

## Duration

```js
const duration = Temporal.Duration.from({ hours: 130, minutes: 20 })
duration.total({ unit: 'second' })
// 469200

// Durations implement balancing, which means that they don't
// wrap to zero naturally. You might want to have a
// 90 minute duration and not 1 hour and 30 minutes
const duration = Temporal.Duration.from({ seconds: 100 })
// PT100S

// Here we see an example where we balance the duration on the hour value
const duration = Temporal.Duration.from({ minutes: 80, seconds: 90 })
// PT80M90S
duration.round({ largestUnit: 'hour' })
// PT1H21M30S (fully balanced)
```

## Flight arrival/departure

```js
const departure = Temporal.ZonedDateTime.from(
  '2020-03-08T11:55:00+08:00[Asia/Hong_Kong]'
)
const arrival = Temporal.ZonedDateTime.from(
  '2020-03-08T09:50:00-07:00[America/Los_Angeles]'
)

const flightTime = departure.until(arrival).toString()
// PT12H55M

// Or adding a flight time in minutes to the departure time
const departure = Temporal.ZonedDateTime.from(
  '2020-03-08T11:55:00+08:00[Asia/Hong_Kong]'
)
const flightTime = Temporal.Duration.from({ minutes: 775 })

const arrival = departure
  .add(flightTime)
  .withTimeZone('America/Los_Angeles')
  .toString()
// 2020-03-08T09:50:00-07:00[America/Los_Angeles]
```

## Comparing and sorting

```js
// Sorting the breaks from Nordic.js 2019
const nordicjs = Temporal.PlainDateTime.from({
  year: 2019,
  day: 10,
  // Months start with 1, which is different from legacy
  // Date which starts with 0
  month: 10,
})

// .with returns a new Temporal.PlainDate as Temporal is immutable
const a = nordicjs.with({ hour: 10, minute: 55 }) // Break
const b = nordicjs.with({ hour: 9 }) // Registration & Coffee
const c = nordicjs.with({ hour: 12, minute: 25 }) // Lunch

const breaks = [a, b, c]

breaks.sort(Temporal.PlainDateTime.compare).map((b) => b.toString())
// ['2019-10-10T09:00:00', '2019-10-10T10:55:00', '2019-10-10T12:25:00']
```

---
Maggie Pint. (2017-04-09). _Fixing JavaScript Date – Getting Started_. [Link](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/)
ES Proposals. (2022-02-25). _Temporal_. [Link](https://www.proposals.es/proposals/Temporal)
TC39. (2022-02-25). _Temporal_. [Link](https://tc39.es/proposal-temporal/docs/index.html)