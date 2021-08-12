// 引入用户集合规则
const { User, userJoi } = require('../../model/user');
// 引入 bcrypt 第三方模块对密码进行hash加密
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
  // 添加一个模板公共属性，用来给用户管理和文章管理按钮添加默认选中状态
  req.app.locals.currentLink = 'user';
  try {
    await userJoi(req.body);
  } catch (err) {
    // 重定向到新增用户页面，并且携带查询字符串参数发送get请求，因为 redirect() 方法中有end()方法的处理，所以需要添加 return 避免影响后面的 send() 或者 end() 方法
    // return res.redirect(`/admin/user-edit?err=${err.message}`);
    // 优化过的代码
    // 把错误信息交给错误处理中间件处理
    // stringIfy 方法将对象类型转换为字符串对象格式
    // 传给 app.js 入口文件中错误处理中间件
    return next(
      JSON.stringify({ path: '/admin/user-edit', message: err.message })
    );
  }
  // 查询数据库中，有没有相同的邮箱，如果有，就重定向到新增用户页面 并且添加错误信息参数
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // return res.redirect('/admin/user-edit?err=用户邮箱已经注册');
    // 优化过的代码
    // 把错误信息交给错误处理中间件处理
    // stringIfy 方法将对象类型转换为字符串对象格式
    return next(
      JSON.stringify({ path: '/admin/user-edit', message: '用户邮箱已经注册' })
    );
  }
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 对密码进行加密处理
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换psot请求发送过来的密码
  req.body.password = password;
  // 将用户信息添加到数据库中
  await User.create(req.body);
  // 重定向到用户列表页面
  res.redirect('/admin/user');
};
