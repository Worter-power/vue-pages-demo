const router = require('koa-router')();
const UsersController = require('../controllers/users');

router.prefix('/api')

// 创建用户接口（路由）
router.post('/users', UsersController.create);

// 获取用户详情接口（路由）
router.get('/users', UsersController.detail);

// 登陆接口
router.post('/login', UsersController.login);

module.exports = router