// 引入express框架并且创建路由对象
const admin = require('express').Router();
// 创建二级路由
// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));
// 实现登录逻辑
admin.post('/login', require('./admin/login'));
// 渲染用户列表页面
admin.get('/user', require('./admin/userPage'));
// 实现退出功能
admin.get('/loginout', require('./admin/loginOut'));
// 渲染新增用户页面
admin.get('/user-edit', require('./admin/userEditPage'));
// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/userEdit'));
// 创建修改用户功能路由
admin.post('/user-modify', require('./admin/userModify'));
// 创建删除用户功能路由
admin.get('/user-delete', require('./admin/userDelete'));
// 创建文章管理功能路由
admin.get('/article', require('./admin/article'));
// 创建文章编辑功能路由
admin.get('/article-edit', require('./admin/article-edit'));
// 创建新文章发布的功能路由
admin.post('/article-add', require('./admin/article-add'));
module.exports = admin;
