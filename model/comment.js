const mongoose = require('mongoose');
// 创建评论集合规则
const commentSchema = new mongoose.Schema({
  // 文章用户id
  loginId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 评论人用户id
  wenZhangId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  // 评论时间
  time: {
    type: Date,
    default: Date.now
  },
  // 评论内容
  content: {
    type: String
  }
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = {
  Comment: Comment
};
