const { User } = require('../../model/user');
module.exports = async (req, res) => {
  let { err, id } = req.query;
  if (id) {
    // 为修改用户页面
    // 根据id查找用户
    let user = await User.findOne({ _id: id });
    res.render('admin/user-edit.art', {
      message: err,
      user,
      link: `/admin/user-modify?id=${id}`,
      submit: '修改'
    });
  } else {
    // 为添加用户页面
    res.render('admin/user-edit.art', {
      message: err,
      link: '/admin/user-edit',
      submit: '添加'
    });
  }
};
