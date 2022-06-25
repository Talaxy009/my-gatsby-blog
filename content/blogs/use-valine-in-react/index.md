---
title: React 下 Valine 的封装与使用
date: '2022-05-15T11:02:38.254Z'
description: '告别第三方库，自己封装，直接使用'
tags: ['技术']
img: 'img.png'
---

## 写在前面

我的博客一直使用 [Valine](https://valine.js.org/) 来作为外挂的评论系统，因此使用一个第三方组件是十分省时省力的，但是最近因为一些原因我决定自己封装一个组件来使用，结果工作要比想象中的简单。

## 为什么要自己封装？

自己封装的原因有两个：**一是**我使用的 gatsby-plugin-valine 已经两年未再更新，其过时的 Valine 依赖会导致项目中存在不安全的代码，最近 Valine 就连续修补了几个 XSS 漏洞，及时更新到最新的依赖是很重要的。**二是**由于这些组件会对 Valine 进行一次封装，所以他们一般都会有一个 React 依赖，这就导致我们一个项目中同时有两个 React 依赖，这对洁癖的人来说不太友好。

这样看来自己封装的一个组件还是蛮有必要的，这能去除一些冗余的依赖，排除掉由于过时依赖带来的漏洞，并且能带来一点控制的自由。

## 怎么封装？

封装的组件主要负责这些工作：

1. 创建 `ref` 绑定给 `div` 元素
2. 合并默认配置和组件 `props` 中的配置
3. 将配置连同 `ref` 传递给 Valine 来创建实例
4. 若配置改变，则重新创建实例

这些都可以用 React Hooks 的 `useRef` 和 `useEffect` 来实现，代码如下：

```jsx
import React from 'react';

// 创建一个 config 对象，也可以直接导入一个配置文件
const config = {
    appId: 'xxxx',
    appKey: 'xxxx',
};

// 动态导入 Valine 并创建实例
const buildValine = async (options) => {
    const RealValine = await (await import('valine')).default;
    new RealValine(options);
};

// 这里只暴露了 path 参数传递给 Valine，其它配置可以根据需要修改代码
export default function Valine({path = '', ...others}) {
    // 创建一个 ref 对象，用于绑定 `div` 元素
    const ref = React.useRef(null);

    React.useEffect(() => {
        // 当 ref 对象存在且不在 SSR 环境时，调用 buildValine
        if (typeof window !== 'undefined' && ref.current) {
            buildValine({
                el: ref.current,
                path,
                ...config,
            });
        }
    }, [path, config, ref]);

    return <div ref={ref} {...others} />;
}
```

值得一提的是：这里对 `window` 进行判断且对 Valine 进行动态导入是因为 Valine 的代码中使用到了 `window` 对象，在服务端里这个对象是不存在的，如果不进行判断和动态导入会导致 SSR 项目出现报错。

## 如何使用？

使用方法同第三方依赖差不多，将上面代码保存为 `Valine.jsx`，在合适的地方添加下面两行代码即可使用：

```jsx
import Valine from './Valine';
<Valine path="/">
```

如此就大功告成了，代码也是根据我的个人需要编写，因此相对简陋（不过这也算是乐趣之一吧）。
