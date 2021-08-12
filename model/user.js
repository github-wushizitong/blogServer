// 引入mongoose用来操作mongodb数据库
const mongoose = require('mongoose');
// 引入 brcypt 第三方模块，对数据进行加密
const bcrypt = require('bcrypt');
// 引入第三方模块 joi  JavaScript最强大的模式描述语言和数据验证器。
const Joi = require('joi');
// 创建集合规则
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    // 是否对这个属性创建唯一索引,唯一的索引确保索引字段不存储重复值：即对索引字段执行唯一性。
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    default: 0
  }
});
// 创建集合并且引入规则
let User = mongoose.model('User', userSchema);
function userJoi(userInfo) {
  // 定义验证规则
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(20)
      .required()
      .error(new Error('用户名不符合要求')),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required()
      .error(new Error('邮箱不符合要求')),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .error(new Error('密码不符合要求')),
    role: Joi.string()
      .valid('normalUser', 'administrators')
      .error(new Error('角色不符合要求')),
    state: Joi.number().valid(0, 1).error(new Error('状态不符合要求'))
  });

  // 使用 joi 第三方模块验证用户信息
  return schema.validateAsync(userInfo);
}
// async function userCreate() {
//   // 用bcrypt 第三方模块生成随机字符串
//   const salt = await bcrypt.genSalt(10);
//   // 对 123123 该密码进行hash加密处理
//   const bcryptData = await bcrypt.hash('123123', salt);
//   // 创建一个文档
//   User.create({
//     username: 'ning',
//     email: 'ning@123.com',
//     password: bcryptData,
//     role: '都少辉',
//     state: 0
//   });
// }
// userCreate();
module.exports = { User, userJoi };
