// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const session = require('koa-session');
const logger = require('koa-logger');
const static = require('koa-static');
var debug = require('debug')('demo:server');
var http = require('http');
const path = require('path');

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);
// 跨域设置 解决options请求
app.use(async(ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
// middlewares
// 处理请求借口信息设置
// app.use(koaBody())
app.use(koaBody({
    patchNode: false, // 将请求体打到原生 node.js 的ctx.req中
    patchKoa: true, // 将请求体打到 koa 的 ctx.request 中
    jsonLimit: '1mb', // JSON 数据体的大小限制
    formLimit: '56kb', // 限制表单请求体的大小
    textLimit: "56kb", // 限制 text body 的大小
    encoding: 'utf-8', //表单的默认编码 默认值 utf-8 gzip
    multipart: true, //  是否支持 multipart-formdate 的表单 支持文件上传
    urlencoded: true, // 是否支持 urlencoded 的表单
    text: true, // 是否解析 text/plain 的表单
    json: true, // 是否解析 json 请求体
    jsonStrict: true, // 是否使用 json 严格模式，true 会只处理数组和对象
    formidable: { // 配置更多的关于 multipart 的选项
        maxFields: 1000, // 限制字段的数量
        maxFieldsSize: 2 * 1024 * 1024, // 限制字段的最大大小
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        multipart: true, // 是否支持多文件上传
        onFileBegin: (name, file) => { // 文件上传前的设置
            console.log(`file upload name: ${name}`);
            console.log('file upload file: ', file);
        },
    },
    stict: false, // 严格模式,启用后不会解析  GET, HEAD, DELETE  请求  默认值 true
    onError: function(res) {
        console.log('koaBody error:', res)
    }
}));
// session数据放在服务器上。
// app.keys = ['this is a mis']; //我理解为一个加密的密钥
// app.use(session({
//     key: 'koa:sess', //cookie key (default is koa:sess)
//     maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
//     overwrite: true, //是否可以overwrite    (默认default true)
//     httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
//     signed: true, //签名默认true
//     rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
//     renew: false, //(boolean) renew session when session is nearly expired,
// }, app));

// cookie 中间件

app.use(async(ctx, next) => {
    console.log('----------------------------------------------');
    console.log(ctx)
    if (ctx.path === '/api/login') {
        console.log('写入cookie');
        ctx.cookies.set(
            'cid',
            'ddddd', //可替换为token
            {
                domain: ctx.header.origin || ctx.host, // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                maxAge: 10 * 60 * 1000, // cookie有效时长
                expires: new Date('2019-05-29'), // cookie失效时间
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            }
        )
    } else {
        console.log(ctx.cookies.get("cid"));
    }
    console.log('----------------------------------------------');
    await next();
})

app.use(json());
app.use(logger());
// 静态资源 // 配置静态web服务的中间件
app.use(static(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
// var AipFaceClient = require("baidu-aip-sdk").face;
// var APP_ID = "16283081";
// var API_KEY = "a7rmAbwl78ns82uLW8Qr2ojm";
// var SECRET_KEY = "zuKZnBdDZW4rVjcWMqagVw6n9UnbYG8G";

// // // 新建一个对象，建议只保存一个对象调用服务接口
// var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
// console.log(client)

/**
 * Get port from environment and store in Express.
 */
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

// 监听端口
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('---------------------------------------------------------------------------------------------------');
console.log('App started in port 3000!');
console.log('File Upload address:', path.join(__dirname, 'public/upload/'));
console.log('---------------------------------------------------------------------------------------------------');