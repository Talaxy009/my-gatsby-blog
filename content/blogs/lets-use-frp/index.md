---
title: 用 frp 来在 OpenWrt 下实现内网穿透
date: "2020-07-19T19:33:52.588Z"
description: 最近从 PandoraBox 转到 OpenWrt 阵营，无奈原本的 Phddns 无法使用了，今天摸索了下 frp，发现出乎意料的简单！
img: "img.png"
---

最近从 PandoraBox 转到 OpenWrt 阵营，无奈原本的 phddns 无法使用了，今天摸索了下 frp，发现出乎意料的简单！下面以 Windows Server 2016 来作服务端，以 OpenWrt 18.06.8 来作客户端进行演示。

## 写在前面

frp 与普通内网穿透最大的不同是它需要一个有固定外网 IP 的主机或是云服务器（VPS），如果你恰好有那么一个正在挂着博客网站的云服务器，那么它就能派上用场！

## 准备步骤

- 前往[这里](https://github.com/fatedier/frp/releases)分别下载服务端和客户端所需的程序

比如我 VPS 的系统是 Windows、CPU 是 E5，路由器的系统是 OpenWrt、CPU 是 MT7620A，那么我就要下载 windows_amd64 和 linux_mipsle 这两个版本。

- 解压

解压后会发现里面主要分为 frps 和 frpc 两种，前者是给服务端后者是给客户端用的，整理下后分别发送给你的服务端和客户端。

## 把路由器的 Web 管理页放到公网去

### 服务端配置

- 修改服务端的 frps.ini 文件，设置 http 访问端口为 8080：

```ini
# frps.ini
[common]
bind_port = 7000
vhost_http_port = 8080
```

然后在服务端的 Windows 防火墙 里开放 7000 和 8080 端口，另外安全起见建议你在调试结束后修改默认的 7000 端口或添加客户端身份验证。

- 启动 frps：

```powershell
frps -c ./frps.ini
```

出现`start frps success`即说明启动成功。

### 客户端配置

- 修改 frpc.ini 文件，假设 frps 所在的服务器的 IP 为 x.x.x.x，local_port 为本地机器上 Web 服务对应的端口，绑定自定义域名 www.yourdomain.com:

```ini
# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000

[web]
type = http
local_port = 80
custom_domains = www.yourdomain.com
```

- 启动 frpc：

```shell
./frpc -c ./frpc.ini
```

当出现`login to server success`和`start proxy success`时，说明服务端与客户端已成功建立连接，这之后你就能通过访问`http://www.yourdomain.com:8080`访问到内网中路由器的 Web 管理页了。

我把路由器 Web 管理页映射到了[http://router.snow-mountain.life:8080](http://router.snow-mountain.life:8080)

![TopNep](./2020-10-07.png)

frp 能做的事有很多，你可以查看[这里](https://gofrp.org/docs/examples/)学习更多操作。

## 让 frpc 在后台运行

当我们关闭路由器的 ssh 后，frpc 也同时关闭了，为了避免这种尴尬的事情发生，我们可以使用`nohup`来运行 frpc

如果你的路由器没有`nohup`，就去安装它（废话）：

```bash
opkg update
opkg install coreutils-nohup
```

然后执行：

```bash
nohup ./frpc -c ./frpc.ini &
```

之后就能放心的关闭 ssh 了，而输出则会保存在 frpc 相同目录下的 nohup.out 中

如果想结束 frpc 则：

```bash
killall -9 frpc
```

即可

## 使用 openwrt-frpc 和 luci-app-frpc

7 月 21 日更新

在折腾了两天启动脚本想让 frpc 开机自启动无果后，我突然发现了 Github 上早有大佬针对 Openwrt 编写了[openwrt-frpc](https://github.com/kuoruan/openwrt-frp)和[luci-app-frpc](https://github.com/kuoruan/luci-app-frpc)！

立马 Star→ 下载 → 安装 → 体验！

啊，这就是我一直想要的！

具体设置就不介绍了，设置名称跟上面的 frpc.ini 文件里的都是一一对应的，很好上手～
