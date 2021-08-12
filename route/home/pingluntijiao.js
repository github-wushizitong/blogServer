// 导入 评论 集合
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
  const { content, loginId, wenZhangId } = req.body;
  await Comment.create({
    loginId: loginId,
    wenZhangId: wenZhangId,
    content: content,
    time: new Date()
  });
  res.redirect('/home/article?id=' + wenZhangId);
};
