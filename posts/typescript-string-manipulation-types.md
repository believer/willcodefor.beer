---
title: typescript string manipulation types
excerpt: In version 4.1 TypeScript added a set of types which can be used for string manipulation. These types are great for remapping string types to other formats.
date: 2022-01-31
tags:
  - topic/development
  - topic/typescript
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-07'
modifiedDateTime: '2022-02-07 09:55'
created: '2022-01-31'
createdDateTime: '2022-01-31 09:23'
---

In version 4.1 TypeScript added a set of types which can be used for string manipulation. These types are great for remapping string types to other formats. The types are:

- `Uppercase<StringType>`
- `Lowercase<StringType>`
- `Capitalize<StringType>`
- `Uncapitalize<StringType>`

These types are **intrinsic**, which means that they are built-in to the compiler and we can't create our own implementation of them.

> **Intrinsic types** and their operations are predefined and always accessible.
> Their implementations are provided by the **TypeScript** compiler.

```typescript
// Creating a uppercase type from another string type
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// type ShoutyGreeting = "HELLO, WORLD"

// Creating a uppercase type with string interpolation
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"

// Creates a union if the property has multiple values
type Keys = 'name' | 'address'
type Getters = `get${Capitalize<Keys>}`
// type Getters = "getName" | "getAddress"

// Can be used with multiple unions
type Keys = 'name' | 'address'
type Accessors = 'get' | 'set'
type Methods = `${Accessors}${Capitalize<Keys>}`
// type Methods = "getName" | "getAddress" | "setName" | "setAddress"
```

---
- Mark Dalgleish. (2022-01-31). [Tweet](https://twitter.com/markdalgleish/status/1487932989539377153)
- TypeScript documentation. (2022-01-31). _Intrinsic String Manipulation Types_. [Link](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types)
- Jose Granja. (2021-01-27). _TypeScript 4.1’s Advanced Mapped Types_. [Link](https://betterprogramming.pub/typescript-4-1s-advanced-mapped-types-eba9a2ba7a9)
- Volodymyr Hudyma. (2021-05-04). _Intrinsic String Manipulation Types In TypeScript_ [Link](https://vhudyma-blog.eu/intrinsic-string-manipulation-types-in-typescript/)