---
title: react import differences
excerpt: There are a bunch of ways to import React. Below are all the valid formats of importing `useState` from React. 
date: '2022-01-27T15:01'
tags:
  - topic/react
  - topic/development
  - til
  - status/done
  - activity/writing
layout: layouts/post.njk
modified: '2022-02-07'
modifiedDateTime: '2022-02-07 09:56'
created: '2022-01-27'
createdDateTime: '2022-01-27 15:01'
---

There are a bunch of ways to import React. Below are all the valid formats of importing `useState` from React. They have all been used at different times throughout the history of React. Read Kent C. Dodds's blog post below if you want to read a great summary of the differences.

```js
// global
window.React.useState()

// CommonJS
const React = require('react')
React.useState()

// ESModules default import
import React from 'react'
React.useState()

// ESModules named import
import { useState } from 'react'
useState()

// ESModules namespace import
import * as React from 'react'
React.useState()
```

Since React 17 was released we don't need to import React explicitly because of the new JSX transform. This means that only the final two formats above are needed today.

I would recommend using the last format, the namespaced import, with some of the benefits being

No need to update the import every time we need something else, like `useEffect` or `useReducer`.

Namespaced versions of the hooks are immediately obvious where they came from. Maybe you are also importing a custom `useState` hook. Down the line it will be easier to maintain because you don't need to look up which of the hooks you have imported.

```js
import * as React from 'react'
import Auth from './auth'

React.useState()
Auth.useState()
```

To make it easier to type I would recommend adding a snippet for it in your IDE.

---

- Kent C. Dodds. _Importing React Through the Ages_. [Link](https://epicreact.dev/importing-react-through-the-ages/)
- React. 2020-02-22. _The React team's recommendation_. [Link](https://github.com/facebook/react/pull/18102)
- Michael Jackson. 2021-11-02. [Tweet](https://twitter.com/mjackson/status/1455320815361167362)
- Dan Abramov. 2020-09-23. [Tweet](https://twitter.com/dan_abramov/status/1308739731551858689)