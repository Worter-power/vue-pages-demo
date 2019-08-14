/**
├── controllers
    └── users.js
*/
const UsersModel = require('../modules/users');
const crypto = require('crypto');
const hash = crypto.createHash('md5');
class usersController {
    /**
     * 创建 用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        // console.log(req);
        // 姓名 性别 出生日期  三个为必传参数 -- 可增加对对每个值得校验
        if (req.name && req.gender && req.birth && req.password) {
            try {
                const data = await UsersModel.getUsersDetailByname(req.name);
                if (!data) {
                    let password = req.password.toString();
                    hash.update(password);
                    let parmas = {
                        name: req.name,
                        gender: req.gender,
                        birth: req.birth,
                        password: hash.digest('hex')
                    }
                    const ret = await UsersModel.createUsers(parmas);
                    const result = await UsersModel.getUsersDetail(ret.id);
                    ctx.response.status = 200;
                    ctx.body = {
                        status: 200,
                        code: 'ok',
                        msg: 'Created user success!',
                        data: result
                    }
                } else {
                    ctx.response.status = 200;
                    ctx.body = {
                        status: 412,
                        code: 'error',
                        msg: 'error',
                        data: '用户名重复'
                    }
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    status: 412,
                    code: 412,
                    msg: 'Created user error!',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                status: 416,
                code: 416,
                msg: '参数不齐全',
            }
        }

    }

    /**
     * 用户登陆接口
     * @param {*} ctx 
     */
    static async login(ctx) {
        // // 写入 session数据放在服务器上。
        let req = ctx.request.body;
        // ctx.session.username = req.name;
        // console.log('<<<:', req.name)
        if (req.name) {
            const data = await UsersModel.getUsersDetailByname(req.name);
            let password = req.password.toString();
            hash.update(password);
            let hashPassword = hash.digest('hex');
            if (data.password == hashPassword) {
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    code: 'ok',
                    msg: '验证成功',
                    data: data
                }
            } else {
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    code: 'error',
                    msg: '验证失败',
                    data: '用户名或者密码错误'
                }
            }
        } else {
            ctx.response.status = 412;
            ctx.body = {
                status: 412,
                code: 412,
                msg: '登陆失败',
                data: '登陆失败'
            }
        }
    }

    /**
     * 获取用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        // console.log('>>>:', ctx.session.username)
        let id = ctx.query.id;
        let name = ctx.query.name;
        if (id) {
            try {
                // 查询用户向前
                let data = await UsersModel.getUsersDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    code: 'ok',
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    status: 412,
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        } else if (name) {
            try {
                // 查询用户向前
                let data = await UsersModel.getUsersDetailByname(name);
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    code: 'ok',
                    msg: '查询成功',
                    data: data ? { status: data.status } : null
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    status: 412,
                    code: 412,
                    msg: '查询失败',
                    data: null
                }
            }
        } else {
            try {
                // 查询文章详情模型
                let data = await UsersModel.getUsers();
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    code: 'ok',
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    status: 412,
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }
    }
}

module.exports = usersController