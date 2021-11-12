---
title: Gatsby 初体验
date: "2020-03-17T15:01:00.000Z"
description: "了不起的盖茨比"
tags: ["技术"]
img: "img.png"
---

用了一个下午终于成功把博客转移到了 Gatsby 上来依靠它生成静态 Html 文件。

第一次接触这类······ ~~嗯？这类东西叫什么？~~ 反正感觉超新鲜！超好用！再也不用每个页面都手敲 html 了

## 一些有用的资料

[Edward Elric 大佬的教程](https://sasuke40.github.io/a-guide-to-building-a-personal-website-with-gatsby/)

[GatsbyJS 的官网教程](https://www.gatsbyjs.com/docs/tutorial/)

## 已经解决的问题

- ~~修改文章 Header 的日期格式让其与首页的一致~~

在/src/pages 下的 index.js 末尾可修改首页的日期格式

在/src/templates 下的 blog-post.js 末尾可修改文章的日期格式

- ~~修改主题色和超链接的字体色~~

在/src/utils 下的 typography.js 可添加 css 样式传递给 Wordpress Theme 来覆盖掉原本的超链接色

在 gatsby-config.js 的 gatsby-plugin-manifest 可修改主题色

- ~~在首页添加组件和 Tab~~

详见[利用 Material UI 为 Gatsby 站点增加 Tabs 并实现友链功能](http://www.snow-mountain.life/material-ui-tabs/)

- ~~修改 Bio 头像大小并解决质量较低的问题~~

将 bio.js 文件中头像的 fixed 样式换成 fluid 即可，具体可参照[官方文档](https://www.gatsbyjs.org/docs/gatsby-image/)

- ~~修改首页文章排列样式~~

- ~~不会 JS~~

## 使用心得

- 执行`gatsby bulid`前最好执行一遍`gatsby clean`清除上次生成的静态文件
