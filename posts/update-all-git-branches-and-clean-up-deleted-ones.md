---
title: update all git branches and clean up deleted ones
excerpt: Pulling the latest changes of all local git branches and deleting branches that have been removed from remote.
date: 2022-02-09
tags:
  - til
  - status/done
  - topic/development
  - topic/git
layout: layouts/post.njk
modified: '2022-02-09'
modifiedDateTime: '2022-02-09 13:42'
created: '2022-02-09'
createdDateTime: '2022-02-09 11:18'
---

I used to use [`git-up`](https://github.com/aanand/git-up) to update all my local branches with one command. This made it easier when I needed to sync my PRs with the target branch. No need to switch to the other branch, pull the latest changes, switch back to my PR branch and rebase the changes.

The project is no longer maintained, but since Git 2.9 we can get almost the same functionality using built-in methods.

```bash
git config --global alias.up "\!f() { git pull --all --rebase --autostash; git bclean; }; f"
```

This adds an alias for `up` in your global git configuration. Now, if you run `git up`, it will do:

- `!f(){ .... };f` – This allows us to run arbitrary shell commands with a git alias
- `git pull --all --rebase --autostash` – Pull all branches using rebase and autostash/unstash any local changes you might have
- `git bclean` – Another custom alias to delete local branches where the remote branches were merged or otherwise removed

`git bclean`, `bclean` as in “branch clean” (not the best name, but it works), looks like this

```bash
git config --global alias.bclean "\!f() { git fetch -p; git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D; }; f"
```

It fetches the latest branch information from remote and lists all the branches. If the branch contains `gone` then delete it locally.

Inside your git configuration file, you should now have something like this, and you are ready to use the benefits of `git up`.

```
[alias]
	up = "!f() { git pull --all --rebase --autostash; git bclean; }; f"
	bclean = "!f() { git fetch -p; git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D; }; f"
```
