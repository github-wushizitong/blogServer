// 引入 文章集合模块
const { Article } = require('../../model/article');
// 引入数据分页 第三方模块
const mongooseSexPage = require('mongoose-sex-page');
module.exports = async (req, res) => {
  let page = req.query.page;
  // 查询数据库中 的文章的所有文档
  let result = await mongooseSexPage(Article)
    .find()
    .page(page)
    .size(2)
    .display(5)
    .populate('author')
    .exec();
  result = JSON.stringify(result);
  result = JSON.parse(result);
  // res.send(result);
  res.render('home/default.art', {
    result: result
  });
};
