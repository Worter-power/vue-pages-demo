# vue-pages-demo

## 概述
采用koa2，vue全家桶实现全栈项目。
...

## 初始化项目依赖

npm install

## 启动后台

npm run start

## 启动前端

npm run dev

## mysql 数据库配置

./server/config/config.js
``` javascript
    module.exports = {
        database: 'xxxx', // 使用哪个数据库
        username: 'xxxx', // 用户名
        password: 'xxxx', // 口令
        host: 'x.x.x.x', // 主机名
        port: 3306 // 端口号，MySQL默认3306
    };
```