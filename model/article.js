// 引入mongoose用来操作数据库
const mongoose = require('mongoose');
// 创建集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: [true, '请填写文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true]
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: Object,
    default: null
  },
  content: {
    type: String
  }
});
// 创建文章集合
const Article = mongoose.model('Article', articleSchema);
// 将集合构造函数作为模块成员进行导出
module.exports = {
  Article
};
