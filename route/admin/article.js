// 引入 文章列表集合
const { Article } = require('../../model/article');
// 引入mongoose-sex-page 用来数据分页
const mongooseSexPage = require('mongoose-sex-page');
module.exports = async (req, res) => {
  let crrentPage = req.query.page;
  // 添加一个模板公共属性，用来给用户管理和文章管理按钮添加默认选中状态
  req.app.locals.currentLink = 'article';
  // 使用数据分页 mongooseSexPage 查询 Article 集合中所有的文档,populate()方法 是多集合关联查询
  // let articles = await Article.find().populate('author');
  let articles = await mongooseSexPage(Article)
    .find()
    .page(crrentPage)
    .size(2)
    .display(5)
    .populate('author')
    .exec();

  //解决使用populate()方法，app.js 文件中错误处理中间件的报错： Maximum call stack size exceeded ，SyntaxError: Unexpected token R in JSON at position 0
  articles = JSON.stringify(articles);
  articles = JSON.parse(articles);

  // 渲染并且响应article模板，注意 article 上一个数组， render() 方法第二个参数是一个对象
  res.render('admin/article.art', { articles });
  // res.send(articles);
};
