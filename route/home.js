// 引入express并且创建路由对象
const home = require('express').Router();

// 创建二级路由,博客首页
home.get('/', require('./home/index'));
// 创建博客文章展示列表页面
home.get('/article', require('./home/article'));
// 创建评论提交路由
home.post('/pingluntijiao', require('./home/pingluntijiao'));
module.exports = home;
