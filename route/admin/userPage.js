// 引入用户集合
const { User } = require('../../model/user');
module.exports = async (req, res) => {
  // 添加一个模板公共属性，用来给用户管理和文章管理按钮添加默认选中状态
  req.app.locals.currentLink = 'user';
  // 接收客户端传递过来的 当前页 参数
  let { currentPage, pageSize } = req.query;
  if (!currentPage) {
    currentPage = 1;
  }
  pageSize = 10;
  // 查询用户数据的总数
  let count = await User.countDocuments({});
  // 总页数
  let total = Math.ceil(count / pageSize);
  // res.send('总页数是' + total);
  // 页码对应的数据查询开始位置
  let start = (currentPage - 1) * 10;
  let users = await User.find().limit(pageSize).skip(start);
  res.render('admin/user.art', { users, currentPage, total });
};
