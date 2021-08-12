module.exports = (req, res) => {
  // 添加一个模板公共属性，用来给用户管理和文章管理按钮添加默认选中状态
  res.render('admin/article-edit.art');
};
