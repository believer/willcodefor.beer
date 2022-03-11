---
title: migrating from jest to vitest
excerpt:   During a recent hack day at work, I wanted to explore if it would be possible for us to migrate our Jest tests to Vitest. We only have 77 tests as the project is new. It turned out to be very straight-forward and I was able to migrate all tests in a day.
date: 2022-03-10
tags:
  - til
  - topic/jest
  - topic/vitest
layout: layouts/post.njk
modified: '2022-03-11'
modifiedDateTime: '2022-03-11 15:08'
created: '2022-03-10'
createdDateTime: '2022-03-10 12:55'
---

During a recent hack day at work, I wanted to explore if it would be possible for us to migrate our Jest tests to Vitest. We only have 77 tests as the project is new. It turned out to be very straight-forward and I was able to migrate all tests in a day.

[Vitest](https://vitest.dev/ "https://vitest.dev/") is a new testing framework powered by [Vite](https://vitejs.dev/ "https://vitejs.dev/"). It's built by the Vue core team, but works with most of the big frameworks. Vitest provides Jest compatible APIs, which means migrations should be easy. It also has built in assertions for both `Chai` and `Jasmine` (which Jest uses).

The day before my experiment, the Vitest team removed the “in development and not stable” message from their GitHub. This means they've come to a point where they think the framework is stable and usable in production projects. All the functionality seems to be in place from my testing. One tiny issue is that I got Vue prop warnings in the console, even though the props seem to be fine.

## Speed

While doing some naive tests, our test suite in Vitest ran 52% faster than it would in Jest, 13.997 seconds compared to 6.76 seconds. This was only a simple test, but an indication that Vitest is much faster.

## Coverage

We have a script that automatically updates our coverage thresholds. If a <dfn><abbr title="Pull request">PR</abbr></dfn> falls below the thresholds, we can fail the tests in <dfn><abbr title="Continuous Integration">CI</abbr></dfn>. Vitest uses [c8](https://github.com/bcoe/c8) to create coverage statistics, but currently `c8` doesn't support Vue files, which means that our stats were way off. This is our only stopper in merging the new tests, but there's a [PR that fixes this](https://github.com/bcoe/c8/pull/357) which we hope will be merged soon.

## Examples

Here are some examples of code before and after migration.

```ts
// Before, using Jest
jest.mock('@/utils/campaign', () => ({
  ...jest.requireActual<any>('@/utils/campaign'),
  campaign: {
    loadClients: jest.fn(),
  },
}))

// After, using Vitest
vi.mock('@/utils/campaign', async () => ({
  ...(await vi.importActual<any>('@/utils/campaign')),
  campaign: {
    loadClients: vi.fn(),
  },
}))
```

Since Vitest includes Jest compatible APIs, we mostly had to exchange `jest` with `vi`. The biggest difference in this case is where we import the actual utilities. We need to import them asynchronously because Vitest is <dfn><abbr title="ECMAScript Modules">ESM</abbr></dfn> first.

```ts
// Before, using Jest
;(campaignUtils.loadClients as jest.Mock).mockResolvedValue([
  { name: 'advertiser' },
])

// After, using Vitest
import { SpyInstanceFn } from 'vitest'

;(campaignUtils.loadClients as SpyInstanceFn).mockResolvedValue([
  { name: 'advertiser' },
])
```

Unlike Jest, Vitest doesn't include global values by default. However, we turned them on to ease migration. Since we don't have access to globals we need to import `SpyInstanceFn` when we are casting a mocked function to a spy.

To include the globals add the following in `vite.config.ts` and `tsconfig.json` (if you are using TypeScript)

```json
// vite.config.ts
export default defineConfig({
	// ../
	test: {
		globals: true,
	},
});

// tsconfig.json
{
	"compilerOptions": {
		"types": ["vitest/globals"],
	}
}
```