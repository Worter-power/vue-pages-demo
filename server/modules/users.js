/**
├── modules
    └── users.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的用户数据表模型文件
const Users = Sequelize.import('../schema/users');

class UsersModel {
    /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
    static async createUsers(data) {
        let currrentDate = new Date();
        return await Users.create({
            name: data.name, // 姓名
            gender: data.gender, // 性别
            password: data.password, // 性别
            birth: data.birth, // 出生日期
            desc: data.desc, // 简介
            status: 2,
            createdAt: currrentDate,
            updatedAt: currrentDate,
        })
    }

    /**
     * 查询用户列表
     * @param id  用户id
     * @returns {Promise<Model>}
     */
    static async getUsers() {
        return await Users.findAll()
    }

    /**
     * 查询用户详情数据
     * @param id  name 用户id 
     * @returns {Promise<Model>}
     */
    static async getUsersDetail(id) {
        return await Users.findOne({
            where: {
                id
            },
        })
    }

    /**
     * 通过名字查询用户是否存在
     */
    static async getUsersDetailByname(name) {
        return await Users.findOne({
            where: {
                name
            },
        })
    }
}

module.exports = UsersModel