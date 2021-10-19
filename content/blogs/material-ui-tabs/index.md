---
title: 利用 Material UI 为 Gatsby 站点增加 Tabs 实现友链功能
date: "2020-03-19T18:14:00.000Z"
description: "好马配好鞍，研究了两天总算是摸清楚了，现将步骤记录在此"
img: "img.png"
---

## 一些有用的资料

[Material UI 官网](https://mui.com/zh/)

[Material UI 的一些 Tabs 样式](https://mui.com/zh/components/tabs/)

[Material UI 的 API](https://mui.com/zh/api/tab/)

## 准备步骤

- 安装 Material UI

```shell
npm install gatsby-plugin-material-ui @material-ui/core
```

- 在 gatsby-config.js 中启用`gatsby-plugin-material-ui`

```js
module.exports = {
  plugins: [`gatsby-plugin-material-ui`]
};
```

值得一提的是`gatsby-plugin-material-ui`是可选插件，其主要作用是优化 Material UI 在 Gatsby 中的使用，之前我一直不知道也没有使用这个插件，导致网站每次载入的时候与 Material UI 相关的组件的样式都要载入好久

## 编写 RouterTabs.js

在/src/components 下新建 RouterTabs.js

```js
import React, { useState } from "react";
import { navigate } from "gatsby";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const RouterTabs = ({ routers = [], currentPage }) => {
  const [index] = useState(routers.findIndex(v => v.link === currentPage));
  return (
    <Tabs
      value={index}
      onChange={(_, value) => navigate(routers[value].link)}
      centered
    >
      {routers.map(router => (
        <Tab label={router.name} key={router.link} />
      ))}
    </Tabs>
  );
};

export default RouterTabs;
```

这段代码利用了 Material UI 来生成 Tabs 和根据 gatsby-config.js 来生成对应的 Tab

## 修改 gatsby-config.js

在 gatsby-config.js 顶部加入以下代码

```js
const friendship = require("./friendship");
require("dotenv").config();
```

在`social`段下方插入以下代码

```js
menuLinks: [
      {
        name: '首页',
        link: '/',
      },
      {
        name: '友情链接',
        link: '/friends/',
      },
    ],
friendship: [...friendship],
```

这些代码会获取根目录下 friendship.js 的数据，以提供给 friends.js 来生成页面，同时 menulink 储存的配置会提供给 RouterTabs.js 来生成对应的 Tab

## 编写 friendship.js

在根目录下新建 friendship.js(一个 push 会对应一个展示出来的友链)

```js
const friendship = [];
const push = (name, url, image = "") => friendship.push({ name, url, image });

push("友链名称", "友链网址", "友链 Logo");
push("友链名称", "友链网址", "友链 Logo");

module.exports = friendship;
```

这个文件主要是为了更方便的存储友链的一些信息

## 编写 friends.js

在/src/pages/下新建 friends.js

```js
import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Image from "gatsby-image";

import Layout from "../components/layout";
import RouterTabs from "../components/RouterTabs";
import SEO from "../components/seo";
import Bio from "../components/bio";

const useStyles = makeStyles({
  friends: {
    margin: "1rem 0 0 0"
  }
});

const FriendPage = props => {
  const { data } = props;
  const classes = useStyles();
  const siteTitle = data.site.siteMetadata.title;

  const avatars = data.avatars.edges.map(avatar => avatar.node);

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="友情链接" />
      <RouterTabs
        routers={data.site.siteMetadata.menuLinks}
        currentPage="/friends/"
      />
      <div className={classes.friends}>
        {data.site.siteMetadata.friendship.map(friend => {
          const image = avatars.find(v =>
            new RegExp(friend.image).test(v.relativePath)
          );
          return (
            <div
              key={friend.name}
              className="friend-card"
              onClick={() => window.open(friend.url)}
            >
              <Image
                alt={props.alt}
                fluid={image.childImageSharp.fluid}
                onKeyDown={() => window.open(friend.url)}
                role="button"
                tabIndex="0"
                style={{
                  flex: 1,
                  maxWidth: 50,
                  borderRadius: "100%"
                }}
                imgStyle={{
                  borderRadius: "50%"
                }}
              />
              <div className="friend-card-content">
                <span>{friend.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default FriendPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
        friendship {
          name
          url
          image
        }
      }
    }
    avatars: allFile(filter: { relativeDirectory: { eq: "friend" } }) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
```

这个文件用于生成友情链接的目录，设置了友链 Logo 保存的路径：`/content/assets/friend/`

## 修改 index.js 文件

在 src/pages 下的 index.js 文件的顶部添加

```js
import RouterTabs from "../components/RouterTabs";
```

`<Bio />`段下方添加以下代码

```js
<RouterTabs routers={data.site.siteMetadata.menuLinks} currentPage="/" />
```

这样便能在 bio 和推文之间给 Tabs 找个位置

至此便已经完成了 80%，剩下的是调整友链页面的布局

## 修改 css 文件

若没有可在 src 中新建一个并在 gatsby-browser.js 中 import

添加以下代码

```css
.friend-card {
  margin-top: 1rem;
  display: flex;
  text-decoration-color: transparent;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.friend-card-content {
  margin-left: 1rem;
}
```

这里是让友链的 Logo 和名字并排显示并隔出一点距离

至此你的网页应该可以完美的显示 Tabs 和友链界面了 (=v=)b

如果还是觉得不够的话？可继续进行如下操作

## 自定义 Tabs 颜色

在文件中增加以下代码

```js
import { withStyles } from "@material-ui/core/styles";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#009ba1" //Tabs 光标颜色 (自行修改，下同)
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles({
  root: {
    textTransform: "none",
    color: "inherit", //未选中 Tab 的颜色
    "&:hover": {
      color: "#009ba1" //鼠标下 Tab 的颜色
    },
    "&$selected": {
      color: "#009ba1" //已选中 Tab 的颜色
    }
  },
  selected: {}
})(props => <Tab disableRipple {...props} />);
```

并将文件内原来的`<Tabs>`改为`<StyledTabs>`；`<Tab>`改为`<StyledTab>`

## 优化 friends 页的顶部

为了让 index 页与 friends 页能有一样的顶部，可进行以下操作

在 friends.js 的`<SEO>`段下方插入`<Bio />`即可

最后为了防止 header 在 friends 页变小，可在 src/components/下的 layout.js 下修改

将

```js
if (location.pathname === rootPath)
```

改为

```js
if (location.pathname === rootPath||location.pathname === `/friends/`)
```

这样便能防止 header 因为不是根目录而变小

## 结语

这次真的是受益匪浅！！！(=v=)b

代码多是从[Edward Elric 大佬](https://github.com/SASUKE40/sasuke40.github.io)和[Himself65 大佬](https://github.com/Himself65/himself65.github.io)贵处搬来再经研究修改后得来的

在研究 Material UI 官网教程的过程也逐步实现了如何进行以下诸如：自定义 Tabs 颜色、Tabs 居中、优化 friends 页顶部等操作，最终完成了一个满意的作品，成就感爆棚！！！

以上
