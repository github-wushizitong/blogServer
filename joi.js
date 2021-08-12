// JavaScript最强大的模式描述语言和数据验证器。
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string()
    .required()
    .min(2)
    .max(5)
    .error(new Error('username自定义错误信息，验证失败'))
});
async function fun() {
  try {
    let aaa = await schema.validateAsync({ username: 'aa' });
    console.log(aaa);
  } catch (err) {
    console.log(err);
  }
}
fun();
