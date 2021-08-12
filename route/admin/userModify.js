// 涌入用户合计
const { User } = require('../../model/user');
// 引入bcrypt hash加密第三方模块
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
  // 获取客户端传递过来的的post请求参数
  const { password, username, email, role, state } = req.body;
  // 即将要修改的用户id
  const id = req.query.id;
  // 根据id查询单个用户
  let user = await User.findOne({ _id: id });
  // 使用 bcrypt 拿当前post请求参数中的 密码 和 数据库中加密过的密码进行对比
  let isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // 密码比对成功
    await User.updateOne(
      { _id: id },
      {
        // 如果对象中的属性和值名称相同，可以只写属性或者值
        username,
        email,
        role,
        state
      }
    );
    res.redirect('/admin/user');
  } else {
    // 密码比对失败
    let stringObj = {
      path: '/admin/user-edit',
      err: '密码比对失败，不能进行用户信息修改',
      id
    };
    // 传给 app.js 入口文件中错误处理中间件
    next(JSON.stringify(stringObj));
  }
};
