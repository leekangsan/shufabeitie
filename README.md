# 书法碑帖

书法碑帖主要来源于新浪微盘，百度云等网络共享，部分来自新浪博客，网易博客及书法论坛，碑帖说明主要以百度百科为主。

书法碑帖图片都有三种尺寸，一种是碑帖目录下的原尺寸的图片，个别书法长卷有近40M一张图。另二种是在w100和w1000目录下的宽度分别为100像素和1000像素的缩略图，用以在网页上显示查看。如果原图宽度就是小于1000像素的，则w1000目录下的图片实际上就是原图。

本项目基于nodejs/expressjs开发，源码全部开源托管在[github](https://github.com/yuweijun/shufabeitie)上，碑帖介绍说明编辑页面的默认用户名密码可以通过config/users.json配置，密码加密算法为sha1，session-cookie可以通过config/session-config.json配置。

## 安装：

1. 首先图片处理依赖于imagemagick库，先安装好imagemagick。
2. 然后通过以下命令安装`nvm`和`node`，并运行项目。

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
$ nvm install 0.12.2
$ npm install pm2 -g
$ npm install
$ pm2 start processes.json
```

