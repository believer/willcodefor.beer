---
title: rewriting git commit history
excerpt: If you want to fix a commit inside a PR you can use Git rebasing and the easiest way to do it is using an interactive rebase
date: 2021-06-09
tags:
  - topic/git
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-07'
modifiedDateTime: '2022-02-07 09:57'
created: '2021-06-09'
createdDateTime: '2021-06-09 10:00'
---

If you want to fix a commit inside a PR you can use Git rebasing and the easiest way to do it is using an interactive rebase. Let's say you have three commits:

- Commit A (sha: 123)
- Commit B (sha: 456)
- Commit C (sha: 789)

Now you want to change _Commit B_. Start by finding its SHA ID using `git log`, in this example we've called it `456`.

Run `git rebase -i 456^` to start an interactive rebase. Note the `^` at the end which **includes the commit in question in the rebase**

You'll be presented with a Vim buffer that would look something like:

```md
pick 456 Commit B
pick 789 Commit C

# Commands
# p, pick <commit> = use commit
# e, edit <commit> = use commit, but stop for amending
# ...
```

Notice the _edit_ command, which is exactly what we want. Alter the line for _Commit B_ with the edit command instead of the pick command.

```md
edit 456 Commit B
pick 789 Commit C
```

After saving, you'll be taken back in time to _Commit B_ where you can make the changes you set out to do.

Once your done with the changes, run `git rebase --continue` to take you back to the present.

If you would run `git log` at this point you would notice that the commit SHAs for Commit B and Commit C have changed. This happened be we altered history using with our rebase. To update our PR we need to do a force push, `git push -f`

Only do this in pull requests, don't alter your commits on you default branch.

---

- Johnny Ji. (2021-06-08). _Engineering Culture: Keeping a Clean Commit History_. [Link](https://johnnyisji.medium.com/engineering-culture-keeping-a-clean-commit-history-453f950c1f2d)