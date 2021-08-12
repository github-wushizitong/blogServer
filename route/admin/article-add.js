// 引入 formidable 用来解析 二进制请求参数(文件上传相关数据)和普通请求参数
const formidable = require('formidable');
// 引入路径操作模块
const path = require('path');
const { Article } = require('../../model/article');
module.exports = (req, res) => {
  // let formParse = new formidable.IncomingForm();
  // // 配置上传文件的本地保存位置
  // formParse.uploadDir = path.join(
  //   __dirname,
  //   '../',
  //   '../',
  //   'public',
  //   'uploadImg'
  // );
  // // 配置是否保留文件后缀
  // formParse.keepExtensions = true;
  // // 解析表单,fields 对象类型 保存普通表单数据，files 对象类型 保存 和上传文件相关的数据，err 错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err 为null
  // formParse.parse(req, (err, fields, files) => {
  //   res.send(fields);
  // });

  let formParse = new formidable.IncomingForm();
  formParse.uploadDir = path.join(
    __dirname,
    '../',
    '../',
    'public',
    'uploadImg'
  );
  formParse.keepExtensions = true;
  formParse.parse(req, (err, fields, files) => {
    // files 属性path 的当前绝对路径，使用spilt方法 将路径切割，称为服务器端的绝对路径
    // split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。
    files.cover.path = files.cover.path.split('public')[1];
    const { title, author, publishDate, content } = fields;
    const { cover } = files;
    // 数据库中创建文档
    Article.create({
      title,
      author,
      publishDate,
      cover,
      content
    });
    res.redirect('/admin/article');
  });
};
