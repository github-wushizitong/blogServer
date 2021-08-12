const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
  let id = req.query.id;
  // 通过文章id查询文章详情集合
  let article = await Article.findOne({ _id: id }).populate('author');
  article = JSON.stringify(article);
  article = JSON.parse(article);
  // 通过文章id查询文章评论集合
  let pingLunJiHe = await Comment.find({ wenZhangId: id }).populate('loginId');
  pingLunJiHe = JSON.stringify(pingLunJiHe);
  pingLunJiHe = JSON.parse(pingLunJiHe);
  // res.send(pingLunJiHe);

  res.render('home/article.art', {
    article: article,
    pingLunJiHe: pingLunJiHe
  });
};
