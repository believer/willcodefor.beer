---
layout: post.njk
title: 'ReScript: Using useReducer in ReasonReact'
excerpt: How to use React's useReducer in ReScript using ReasonReact
date: 2021-01-26
tags:
  - post
  - rescript
  - react
---

React's `useReducer` is great when the states get more complex than a simple
value. ReasonReact `useReducer` is even better with ReScript's [variants](https://rescript-lang.org/docs/manual/latest/variant).

Let's update the code from our [`useState`](/posts/using-usestate-in-reasonreact/)
implementation step by step to use `useReducer`.

```reason
type state = DisplayValue | HideValue

type action = Toggle
```

These types define the state and actions of our reducer. Since we only want to toggle a
value, we'll use a variant for the state with two possible values, `DisplayValue` or
`HideValue`. We then define the actions we can dispatch to update the state. In
this case, we only need one action to `Toggle` the `state`.

```reason
let (state, dispatch) = React.useReducer((state, action) => {
  switch action {
  | Toggle =>
    switch state {
    | DisplayValue => HideValue
    | HideValue => DisplayValue
    }
  }
}, HideValue)
```

We replace the `useState` hook with this `useReducer` hook. The reducer uses [pattern
matching](https://rescript-lang.org/docs/manual/latest/pattern-matching-destructuring#switch-based-on-shape-of-data)
on the action and toggles the state depending on the current state.

The types of
`state` and `dispatch` are inferred from the usage as our `state` type and
`action => unit` respectively.

```reason
<div>
  {switch state {
  | DisplayValue => React.string("The best value")
  | HideValue => React.null
  }}
  <Button onClick={_ => dispatch(Toggle)}> {React.string("Click me")} </Button>
</div>
```

The updated view part uses another pattern match on the `state` to either display
the value or display nothing. The `onClick` function now uses `dispatch` to pass the
`Toggle` action to the reducer.

The complete code would look like this

```reason
type state = DisplayValue | HideValue

type action = Toggle

@react.component
let make = () => {
  let (state, dispatch) = React.useReducer((state, action) => {
    switch action {
    | Toggle =>
      switch state {
      | DisplayValue => HideValue
      | HideValue => DisplayValue
      }
    }
  }, HideValue)

  <div>
    {switch state {
    | DisplayValue => React.string("The best value")
    | HideValue => React.null
    }}
    <Button onClick={_ => dispatch(Toggle)}> {React.string("Click me")} </Button>
  </div>
}
```

This is a simple example that achieves the same thing as our `useState`
component did but in a more complex manner. However, if we wanted to add a dedicated `Display` or
`Hide` action the compiler would be able to help us so that we don't miss
handling any cases in our implementation.