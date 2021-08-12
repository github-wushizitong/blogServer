module.exports = (req, res, next) => {
  // 如果请求二级路由的地址不是 /login  并且 session 中没有存储客户端 cookie 就重定向到登录页面 /admin/login
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login');
  } else {
    // 如果用户是登录状态并且是一个普通用户
    if (req.session.role === 'normalUser') {
      // 重定向到博客首页，并且return 阻止程序向下执行
      return res.redirect('/home');
    }
    // 否则 交给下一个中间件处理
    next();
  }
};
