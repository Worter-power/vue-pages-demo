// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
const Users = Sequelize.import('../schema/users');
// 创建表
// 同步表结构
// Users.sync().then(() => {
//     console.log('users 同步了一个模型')
// }); // 如果表存在 不会刷新结构
Users.sync({ force: true }); // 如果表存在 会删除表重新建表