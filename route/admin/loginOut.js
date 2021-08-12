module.exports = (req, res) => {
  // 删除session
  req.session.destroy(function () {
    // 清楚cookie
    res.clearCookie('connect.sid');
    // 重定向到用户登录页面
    res.redirect('/admin/login');
    // 对公共模板属性 userInfo 清空，如果不清空，userInfo在其他页面还会有残留，导致不安全，导致用户退出登录后，还可以评论
    req.app.locals.userInfo = null;
  });
};
