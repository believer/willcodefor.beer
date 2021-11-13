---
layout: post.njk
title: Save disk space by deleting node_modules
excerpt: 'Reclaim a lot of disk space by deleting node_modules from projects
that you are not actively using'
date: 2021-11-13
tags:
  - post
  - shell
---

I quickly understood that I had forgotten to remove `node_modules` when I wanted to copy my projects
folder to a new computer and the process was going to take multiple hours.
Luckily, [my dotfiles](https://github.com/believer/dotfiles/commit/a440d8abcdb47cf6fe5d9af69519f960f7c96ce0) already contained a command to remove all the `node_modules` folders at once. This time the command saved me ~40 GB.

```bash
# Use the command at you own risk
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```

There's a lot to the command, but here's an explanation of each part to
demystify it.

- `find` - A command that comes built-in with MacOS and Linux.
- `.` - Look from this location
- `-name "node_modules"` - Make sure the last component of the pathname matches `node_modules`
- `-type d` - We are looking for a **directory** (d)
- `-prune` - Stops `find` from descending into the folder, meaning that it won't
  look for `node_modules` inside `node_modules` and so on.
- `-exec rm -rf '{}' +` - Runs the specified command, `rm`, with flags `r` (remove directory) and `f` (do not ask for confirmation no matter what the file permissions are). `'{}'` will be replaced by the pathname that's been found. `+` means that `find` will append all the file paths to a single command instead of running `rm` for each.

If you just want to find `node_modules` folders and display their disk size use
the following command.

```bash
find . -name "node_modules" -type d -prune -print | xargs du -chs
```

> There's also an `npm` command that you can use by running `npx npkill` if you
> don't want to mess with terminal commands.
