---
title: 'GitHub Actions 下恢复文件时间戳'
date: '2023-03-02T20:53:18.539Z'
description: 'Git / GitHub Actions 下的文件会丢失它的时间戳，我们来恢复它'
tags: ['技术']
img: 'img.png'
---

我感觉这是我最短的文章。

我博客的所有“技术”类文章底部都添加了一个标签，用来提醒读者这篇文章最后更新的时间以做参考（本文末尾也会有一个）。正好前段时间我把构建和部署都交给了 GitHub Actions，今天发现这些标签的日期全都变成了打包那天的日期。这是因为这些数据是通过 Markdown 文件的时间戳计算而来的，而 Git 重新拉取（GitHub Actions 每次打包前都会做的事）都会创建新的文件，时间戳也就会变成当天。

在 Linux 下恢复这些时间戳只需要一行指令：

```shell
git ls-files | while read file; do touch -d $(git log -1 --format="@%ct" "$file") "$file"; done
```

它会遍历仓库下的文件，根据文件的 commit 记录获取时间戳，并把这个赋值给文件自身的 ctime、mtime（创建时间、修改时间）。

为了在 GitHub Actions 下生效，将 yml 文件修改一下即可：

```diff
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
+       with:
+         fetch-depth: 0
+
+     - name: Restore file timestamps
+       run: git ls-files | while read file; do touch -d $(git log -1 --format="@%ct" "$file") "$file"; done
```

这里给 __actions/checkout__ 加个 `fetch-depth: 0` 配置是因为 __checkout__ 默认下只会拉取一个 commit 而不是完整的 commit 记录，这会影响我们的操作，把这个配置加上就能拉取整个仓库的记录了，当然速度也就会慢一些。

嗯，就是样！我们下篇废文再见~
