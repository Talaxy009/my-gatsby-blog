---
title: 利用 gatsby-plugin-use-dark-mode 来添加夜间模式功能
date: '2020-05-01T15:37:09.233Z'
description: '一直以来，夜间模式都是人类眼睛的好朋友，但却常常被忽视。为了推动“夜间模式革命”，为人类带去黑暗，特写此文'
tags: ['Gatsby', '技术']
img: 'img.png'
---

> 一直以来，夜间模式都是人类眼睛的好朋友，但却常常被忽视。为了推动“夜间模式革命”，为人类带去黑暗，特写此文。

## 前言

### 介绍

看完众大佬们的教程后还是选择了直接上插件，毕竟可以省去很多时间和精力（真香）。下文会介绍如何使用 [gatsby-plugin-use-dark-mode](https://www.gatsbyjs.com/plugins/gatsby-plugin-use-dark-mode/)、[use-dark-mode](https://github.com/donavon/use-dark-mode) 以及 [Material-UI](https://mui.com/zh/) 的 Icon 和 Button 组件来制作一个顶级棒的夜间模式 ( •̀ ω •́ )y

### 各组件的作用

- use-dark-mode：接受调用、提供主要的模式切换

- gatsby-plugin-use-dark-mode：注入`noflash.js`来防止刷新时白屏

- gatsby-plugin-material-ui：优化 Material UI 在 Gatsby 中的使用

- Material UI(icons、core)：提供漂亮的按键和图标

## 准备步骤

1. 安装所需插件

    ```shell
    npm install gatsby-plugin-use-dark-mode use-dark-mode
    npm install gatsby-plugin-material-ui @mui/icons-material @mui/styled-engine @emotion/react @emotion/styled
    ```

2. 在 gatsby-config.js 中启用`gatsby-plugin-use-dark-mode`和`gatsby-plugin-material-ui`

    ```js
    module.exports = {
        plugins: [`gatsby-plugin-use-dark-mode`, `gatsby-plugin-material-ui`],
    };
    ```

## 编写一个 js 文件来处理点击事件

use-dark-mode 提供了一个简单的示例来告诉我们如何调用它，如下

```jsx
import React from 'react';
import useDarkMode from 'use-dark-mode';

import Toggle from './Toggle';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);

    return (
        <div>
            <button type="button" onClick={darkMode.disable}>
                ☀
            </button>
            <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
            <button type="button" onClick={darkMode.enable}>
                ☾
            </button>
        </div>
    );
};

export default DarkModeToggle;
```

在这里我不想使用 react-toggle 而是使用 Material UI 的 Icons 和 Button 来显示，所以会有一些修改，主要思路是：

当我点击了右上角的 ☀ ，它会调用夜间模式的插件来实现模式地切换，同时把自己的 ☀ 设置为 ☾ 。这样一来，当我想切换回日间模式时点击的就是 ☾ 了，然后会发生的事同上。这样做能让页面更加的美观简洁（个人认为），也让代码变得更简单些。

将上述想法实现后，我得到了这个：

```jsx
import React from 'react';
import useDarkMode from 'use-dark-mode';
import Sun from '@mui/icons-material/WbSunnyRounded';
import Moon from '@mui/icons-material/ModeNightRounded';
import IconButton from '@mui/material/IconButton';

export default function DarkModeButton() {
    const darkMode = useDarkMode(false);

    return (
        <IconButton type="button" onClick={darkMode.toggle}>
            {darkMode.value ? (
                <Moon style={{color: '#ffb74d'}} />
            ) : (
                <Sun style={{color: '#ff9800'}} />
            )}
        </IconButton>
    );
};
```

如上，一个简单的 Button 就出炉啦～当我们点击它时，它会调用`darkMode.toggle`来切换模式，同时按键的图标也会跟随`darkMode.value`来进行对应的切换。

## 修改 Layout.jsx

现在我们已经有了能调用夜间模式插件的 DarkModeButton.jsx，剩下要做的就是让每个页面都有一个按钮，和让 Material UI 的组件也能切换对应夜间模式的样式，方法是修改上层的 Layout.jsx。

```jsx
import React from 'react';
import useDarkMode from 'use-dark-mode';
import {createTheme, ThemeProvider} from '@mui/material';
import DarkModeButton from './DarkModeButton';

export default function Layout({children}) {
    const darkMode = useDarkMode(false);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode.value ? 'dark' : 'light',
                },
            }),
        [darkMode.value],
    );

    return (
        <ThemeProvider theme={theme}>
            <header style={{display: 'flex', justifyContent: 'space-between'}}>
                {header}
                <DarkMode mode={darkMode}  />
            </header>
            <main>{children}</main>
        </ThemeProvider>
    );
}
```

为了让 Layout 组件来管理 Material UI 的主题，我将 `useDarkMode` 放在 Layout 中了，所以 DarkModeButton 也要跟着修改：

```diff
import React from 'react';
- import useDarkMode from 'use-dark-mode';
import Sun from '@mui/icons-material/WbSunnyRounded';
import Moon from '@mui/icons-material/ModeNightRounded';
import IconButton from '@mui/material/IconButton';

- export default function DarkModeButton() {
+ export default function DarkModeButton({mode}) { 
-   const darkMode = useDarkMode(false);   

    return (
-       <IconButton type="button" onClick={darkMode.toggle}>
+       <IconButton type="button" onClick={mode.toggle}>
-           {darkMode.value ? (
+           {mode.value ? (
                <Moon style={{color: '#ffb74d'}} />
            ) : (
                <Sun style={{color: '#ff9800'}} />
            )}
        </IconButton>
    );
};
```

## 在全局 CSS 文件中添加相关样式

```css
body.light-mode {
    background-color: #fff;
    color: #333;
    transition: background-color 0.3s ease;
}

body.dark-mode {
    background-color: #212121;
    color: #999;
    transition: background-color 0.3s ease;
}

.dark-mode blockquote {
    color: #999;
    border-left: 0.32813rem solid #999;
}
```

以上步骤结束后，你的网页应该能正常的切换日间和夜间模式了～
