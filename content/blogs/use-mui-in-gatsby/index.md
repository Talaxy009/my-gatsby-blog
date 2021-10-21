---
title: '在 Gatsby 中使用 MaterialUI'
date: '2021-10-19T22:05:06.178Z'
description: '记录一下本人在 Gatsby 中使用 Material-UI 时遇到的问题及解决办法'
tags: ["Gatsby", "技术"]
img: 'img.png'
---

## 前言

[Material-UI](https://mui.com/zh/)（后面简称 MUI）是一个很棒的 UI 库，我经常在我的一些项目里用到这个库，但在 Gatsby 中，使用 MUI 还需要一些额外的依赖和操作。以本人的使用经验来看，若不执行这些操作，会导致页面中的 MUI 组件样式加载有 “延迟”，比如在我使用 Button 组件时，刚进入页面时展示的是默认样式的 Button（方正、白色、有边框），过肉眼可观的一段时间后才会变成 MUI 的样式，还有 SVG 图标也是一样，会在一瞬间从大（大概有 96px 那样？）变到你指定的大小，还有种种就不在这里说了。解决方式也很简单，这也是本文下面要说的。

## 使用依赖

### MUI v4

在 MUI v4 中，需要使用 [gatsby-plugin-material-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-material-ui/)，依照文档安装并启用即可解决上述问题。

### MUI v5

到了 MUI v5，从官方的[安装文档](https://mui.com/zh/getting-started/installation/)可以看到，这个版本开始 MUI 需要额外的样式依赖，你可以选择文档中提到的 `@emotion/styled` 或者 `styled-components`，在 gatsby-plugin-material-ui 的这个 [issue](https://github.com/hupe1980/gatsby-plugin-material-ui/issues/70) 里，开发者有提到 MUI v5 不需要再使用这个插件了

![github01](./github01.png)

但后面又改口了 ↓

![github02](./github02.png)

所以现在 gatsby-plugin-material-ui 的开发者们已经开始为 MUI v5 做适配了，不过截至我写这篇文章，这个组件还只支持 `@emotion/styled`，而我是使用 `styled-components` 的，所以下面我分享一下在 Gatsby 中要如何使用依赖 styled-components 的 MUI v5，以便在这个组件适配 styled-components 前能够使用 MUI v5。

根据 MUI 官方的 [styled-components 切换指南](https://next--material-ui-docs.netlify.app/zh/guides/styled-engine/#how-to-switch-to-styled-components)，需要修改 Webpack 的配置文件，否则会出现找不到 @emotion 组件的相关错误，但到了 Gatsby 这里，需要在 `gatsby-node.js` 修改 ↓

```js
exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
  resolve: {
   alias: {
    '@material-ui/styled-engine': '@material-ui/styled-engine-sc', // next 通道安装的应使用此配置
    '@mui/styled-engine': '@mui/styled-engine-sc', // latest 通道安装的应使用此配置
   },
  },
 });
};
```

由于 MUI v5 的 bata 版本（@material-ui/core@next）和 stable 版本（@mui/material）的包名不同，所以需要根据实际情况（你安装的版本）选择上述两种配置中的一种（两种都选也可以），此外，如果你没有安装这些依赖的话（应该不可能），你还需要安装 `gatsby-plugin-styled-components` 和 `babel-plugin-styled-components`

执行完以上步骤后，应该就能舒适地在 Gatsby 中使用依赖 styled-components 的 MUI v5 了，目前为止只执行这些步骤已经能让我的网址正常使用 MUI 组件了，不过我还是会继续关注 gatsby-plugin-material-ui 的开发进度。
