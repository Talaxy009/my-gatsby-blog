---
title: 动手编译适合自己路由器的 ipk
date: "2020-03-22T18:11:00.000Z"
description: "编译 MiniEAP 来使用 GZHU 校园网，同时与 Mentohust 做对比"
img: "img.png"
---

## 编译（以交叉编译为例）

### 若第一次编译还需以下步骤

- 安装相关依赖库

```shell
sudo apt-get update
sudo apt-get install git-core build-essential libssl-dev libncurses5-dev unzip gawk
sudo apt-get install subversion mercurial
```

- 安装 C 编译环境

```shell
sudo apt-get install ccache
```

- 下载您设备对应的 SDK
  [OpenWRT SDK](https://downloads.openwrt.org/) / [PandoraBox SDK](http://downloads.pangubox.com:6380/pandorabox/)

- 解压 SDK

```shell
tar xjf (SDK 包名)
```

### 开始编译

- 定位到 SDK 目录 (即解压出来的文件夹)

```shell
cd /sdk 目录
```

- 克隆 git

```shell
git clone https://github.com/ysc3839/openwrt-minieap.git -b gzhu package/minieap
```

此处使用的源并非是 MiniEAP 的官方源，而是[ysc3839 大佬的项目](https://github.com/ysc3839/openwrt-minieap)，区别在于大佬加入了 GZHU 的特定字段，具体可以看[这里](https://github.com/ysc3839/openwrt-minieap/blob/gzhu/patches/006-minieap-gzhu.patch)

- 选择要编译的包

```shell
make menuconfig # 依次选择 "Network" "minieap" "save" "OK" 然后一直"Exit"回到控制台
```

- 开始编译

```shell
make package/minieap/compile V=s
```

ipk 文件就在 `bin/packages/(处理器架构)/base/` 中

### 编译 luci-proto-minieap

为了能直观的使用 MiniEAP 我们还需要编译对应的 luci

方法些许不同

- 定位到 SDK 目录

```shell
cd /sdk 目录
```

- 安装 luci feed

```shell
./scripts/feeds update luci
./scripts/feeds install -a
```

- 克隆 git

```shell
git clone https://github.com/ysc3839/luci-proto-minieap.git package/luci-proto-minieap
```

- 选择要编译的包

```shell
make menuconfig # 依次选择 "LuCI" "Protocols" "luci-proto-minieap" "save" "OK" 然后一直"Exit"回到控制台
```

- 开始编译

```shell
make package/luci-proto-minieap/compile V=s
```

同样在 `/bin/` 中的某个文件夹里就能找到啦

## MiniEAP 与 Mentohust 的对比

- 首先直观看上去第一眼，MiniEAP 的安装包要比 Mentohust 小很多

- MiniEAP 的设置在路由器的 `接口` 设置中，这意味着它可以随路由器自启而无需其他设置

具体使用情况还有待返校才能发现（QAQ 我想返校昂）

## 如何使用 MiniEAP（8 月 30 日更新）

- 在 `网络->接口` 中，确认 wan 口协议为 `DHCP 客户端`
- 添加一个接口为 `eth0.2` 协议为 `MiniEAP 客户端` 的接口，并输入账号和密码，将数据包插件设为 `rjv3`
- 在 `RJv3 插件设置` 中将 `DHCP 方式` 设置为 `禁用` 以外的方式
- 保存并应用

我之前就因为不知如何使用 MiniEAP 而想当然的直接修改 wan 口协议了，导致出现 “ipv4 地址获取错误”

至于 `DHCP 方式` 我尝试过 `禁用` 以外的所有方式都是 OK 的（ GZHU 校园网环境下）
