// 引入用户集合
const { User } = require('../../model/user');
module.exports = async (req, res) => {
  // 获取要删除的用户id参数
  let id = req.query.id;
  // 根据id删除用户
  await User.findOneAndDelete({ _id: id });
  // 重定向会用户列表
  res.redirect('/admin/user');
};
