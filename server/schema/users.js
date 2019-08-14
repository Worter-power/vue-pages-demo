/**
├── schema
    └── users.js
*/
const moment = require('moment');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        // 数据库自增id 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 用户姓名
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: 'name',
        },
        // 用户密码
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'password',
        },
        // 性别
        gender: {
            type: DataTypes.INTEGER(10), // 1 -男  2 - 女
            allowNull: false,
            field: 'gender'
        },
        // 状态
        status: {
            type: DataTypes.BIGINT, // 1 启用  0  禁用  2 待审核
            allowNull: false,
            field: 'status'
        },
        // 出生日期
        birth: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'birth'
        },
        // 简介
        desc: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'desc'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false // 关闭Sequelize的自动添加timestamp的功能
    })

}