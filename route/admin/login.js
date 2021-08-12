const { User } = require('../../model/user');
// 引入bcrypt 第三方模块对加密过的密码进行比对
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
  // 入口文件拦截了所有请求，设置了express.urlencoded({extended:true})才能使用req.body
  let { email, password } = req.body;
  if (email.trim().length === 0 || password.trim().length === 0) {
    res.status(400).send({
      status: 400,
      errmessage: '邮件地址或者密码错误'
    });
  }
  let user = await User.findOne({ email: email });
  if (user) {
    // 将客户端传递过来的密码和用户信息中的密码进行比对
    // true 比对成功
    // false 比对失败
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      // 将用户信息存储在session中
      req.session.username = user.username;
      // 将角色信息存储在session中
      req.session.role = user.role;
      // 将数据库查询到的用户存储在 locals 模板公共数据中，这样不管哪个模板都可以使用该公共数据，这里的 app 属性不用导入，因为在 req 对象下就有 app 这个对象
      req.app.locals.userInfo = user;
      // 重定向到用户列表页面
      res.redirect('/admin/user');
    }
  } else {
    res.status(400).send({
      status: 400,
      errmessage: '邮箱或者密码错误'
    });
  }
};
