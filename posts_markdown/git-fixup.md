---
layout: post
title: "git fixup"
date: "2020-02-09"
category: tips
tags: [git]
---

Git is a great tool, one that (when commits are created correctly) makes PRs
easier to review and even makes life easier for developers in the future who
might need to investigate your code. This isn't a post about what makes a good
commit but generally you want to avoid things like "fixed typo" or "removed
comment", these are of no use to anyone. But say you realise you need to make a
change that's relevant to a commit that's a few commits down in your log, like
this:

```
e8e6ecb (HEAD -> master) Change relevant to commit B
01d71d1 commit C
064b768 commit B
7519200 commit A
```

If those latest changes were instead better suited to go with commit C then you
could've added it to the commit with `git add <files> &&  commit -v --no-edit
--amend` which will add it to your previous commit without seeing if you want to
amend the commit message.

But in this scenario how would you go about adding your changes to a commit
which was created earlier? Let's walk through it.

Instead of creating a new commit like I have done above, you would stage all
your changes with the usual `git add` then use `git log --oneline` to find the
SHA of the commit you want to add it to, which in this case for commit B is
`064b768`. Armed with this information you issue this command `git commit
--fixup=064b768`. If you run `git log --oneline` now you will see something like
this.

```sh
b7f5c4b (HEAD -> master) fixup! commit B
01d71d1 commit C
064b768 commit B
7519200 commit A
```

Git has gone ahead and created our commit for us. Notice how the commit message
starts with `fixup!` followed by the message of the commit you want to merge it
into? `fixup!` tells git we want to merge these changes into another commit, and
the string afterwards is used to find the commit in question. Now if you run
`git rebase -i --autosquash origin/master` (which will rebase all the commits
that are different from master AKA all of your new commits) you will be
presented with something that looks like this in your text editor (usually vim):

```
pick 7519200 commit A
pick 064b768 commit B
fixup b7f5c4b fixup! commit B
pick 01d71d1 commit C

# Rebase c5b2c02dcf..01d71d1 onto c5b2c02dcf (4 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
```

As you can see git has moved your commit into the necessary place and changed
the action from `pick` to `fixup`. If you now save and exit this rebase screen,
check your commits with `git log --oneline`, you should see this

```
beef890 commit C
48f10b8 commit B
7519200 commit A
```

Nice and clean, goodbye random commit hello deliciously tidy commit history. If
you were to inspect commit B with `git diff 48f10b8^!` you would find your new
changes sitting in there with all the original changes.

The `--autosquash` option in the rebase command from earlier just moves commits
that begin with `fixup` or `squash` around so they are in the right place based
on the commit message, i.e. below the commit you want them folded into. Instead
of having to supply that option all the time why not just enable it by default?
Run this to enable autosquash globally `git config --global --add
rebase.autosquash true`. Next time you just need to run `git rebase -i
origin/master`.

