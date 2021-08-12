/**
 *
 * 注意：
 *  1，模板文件中外链路径一定要改成请求路径，根/目录为开发静态资源文件配置的根目录，否则当一级路由的名字和静态文件目录下的名字不一样时，将无法访问静态资源文件
 *  2，模板文件中的公共部分抽离出来，放到模板引擎的根目录创建的公共目录文件夹下，在模板引擎中使用{{include './公共文件加/公共代码.art'}}
 *  3，模板渲染 res.render()方法，根目录可以省略，比如：res.render('模板引擎根目录下面的的目录(省略 / )')
 *  4,抽离html骨架，用{{block '待引用的坑'}} {{/block}}，在需要继承骨架的模板中使用{{extend '相对于当前文件加'}}继承骨架，往{{block '骨架中定义的名称'}} 包裹起来和骨架不一样的代码 {{/block}}
 *  5,使用bcrypt哈希加密工具第三方npm包,依赖安装完成,最后关闭cmd窗口,再 npm install bcrypt,所依赖的运行环境: python2.0 版本,所依赖的第三方包为 npm install -g node-grp  ,如果是windows运行环境还依赖,需要用管理员身份 npm install --global --production windows-build-tools
 *  6，安装 windows-build-tools 的时候一定要重新打开命令窗口使用管理员权限安装，安装 bcrypt 也是如此
 *  7，服务器端只关心请求，请求来了就响应，请求没有了就断开连接了，下一次服务器就不认识客户端了，该行为称为‘http无状态性’
 *  8.1，为了解决‘http的无状态性’，cookie在客户端，session在服务器端
 *  8.2，第一次发生请求，客户端发送邮件地址或者密码，服务器端验证请求参数，服务器端生成sessionId，服务器端将sessionId存储在客户端的cookie中
 *  8.3，第二次发送登录请求，客户端自动携带cookie发送请求，服务器端获取cookie中的sessionId并且验明身份，服务器端响应只有用户登录后才能获取的数据
 *  8.4，注意：当拦截所有请求使用session方法时，req对象下自动添加session属性
 *  9，app.use()中间件是有执行顺序的，写在路由后面和前面都会产生不同的效果
 * 10，对于文件上传的表单的数据必须以二进制的方式传递到服务器端，form表单有一个属性为 enctype 把值指定为 multipart/form-data(将表单数据编码成二进制类型)
 *  11， 
// 命令行 打开 mongodb
PS C:\Windows\system32> mongo
// 查看所有数据库
show dbs    
admin         0.000GB
blog          0.000GB
config        0.000GB
local         0.000GB
testStudents  0.000GB
userTest      0.000GB
// 进入到admin 数据库
> use admin
switched to db admin
// 创建 超级管理员
> db.createUser({user:'root',pwd:'root',roles:['root']})
Successfully added user: { "user" : "root", "roles" : [ "root" ] }
// 进入 blog 数据库
> use blog
switched to db blog
// 创建 普通管理员
> db.createUser({user:'ning',pwd:'ning',roles['readWrite']})
2021-08-07T17:57:40.933+0800 E QUERY    [js] SyntaxError: missing : after property id :
@(shell):1:43
> db.createUser({user:'ning',pwd:'ning',roles:['readWrite']})
Successfully added user: { "user" : "ning", "roles" : [ "readWrite" ] }
// 退出
> exit

// 停止 mongodb 服务
PS C:\Windows\system32> net stop mongodb
MongoDB Server 服务正在停止.
MongoDB Server 服务已成功停止。

// 卸载 mongodb 
PS C:\Windows\system32> mongod --remove
2021-08-07T18:02:09.401+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2021-08-07T18:02:09.982+0800 I CONTROL  [main] Trying to remove Windows service 'MongoDB'
2021-08-07T18:02:09.984+0800 I CONTROL  [main] Service 'MongoDB' removed

//  指定mongodb 服务的 日志文件路径 和数据文件路径，并且安装mongodb服务，并且需要用户名和密码才能登录 mongodb数据库
PS C:\Windows\system32> mongod --logpath='C:\Program Files\MongoDB\Server\4.1\log\mongodb.log' --dbpath='C:\Program Files\MongoDB\Server\4.1\data' --install -auth
2021-08-07T18:03:46.379+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'

// 启动 mongodb 服务
PS C:\Windows\system32> net start mongoDb
MongoDB 服务正在启动 ..
MongoDB 服务已经启动成功。




注意： model目录 connect.js 中的数据库连接路径 中不写用户名和密码的话，终端会报错
 MongoError: command find requires authentication



 12，在系统环境变量中 新疆 NODE_ENV 变量，值为 development  app.js中判断是否为 development 
 13，custom-environment-variables.json  config模块需要创建的 文件，用来存储敏感数据，存储到电脑环境变量中，电脑环境变量中需要新建 变量和值，项目启动后会自动读取该文件并且找到环境变量中的值
  14，注意：每次设置完环境变量，需要重新启动服务器
 */

// 引入express框架，并且创建服务器对象
const express = require('express');

const path = require('path');
// 引入npm 第三方模块 express-session 用来处理用户和服务器的连接，保证服务器端认识客户端
const expressSession = require('express-session');
// 引入art-template 用来向 express-art-template 模板文件中导入第三方模块的 API
const artTemplate = require('art-template');
// 引入 第三方模块 dateformat 用来处理日期格式
const dateFormat = require('dateformat');

// 引入第三方模块 morgan 中间件函数
const morgan = require('morgan');

// 引入 第三方模块 config 用来写默认环境，开发环境和生产环境的配置文件,需要在主目录下创建 config 文件目录，default.json,development.json,production.json文件
const config = require('config');
// 创建服务器对象
const app = express();
require('./model/connect');
// 拦截所有请求，用express.的方法bodyParser解析post请求参数，false代表用body-parser解析，true代表用qs解析
app.use(express.urlencoded({ extended: false }));
// 拦截所有请求，并且设置session的私钥用来处理客户端发送过来的cookie信息
app.use(
  expressSession({
    secret: 'secret key', //作为服务端生成session的加密字符串，可以随意设置,目的是增加安全性
    resave: false, //强制保存session，及时没有session变化。默认为true，建议设置为false
    saveUninitialized: false, //强制将未初始化的session存储，默认为true（未发送数据也会生成一个session）
    // name: 'session.uid', //设置客户端key名，默认connect.sid
    // 设置cookie 的过期时间，单位为 ms 毫秒
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
// 开放静态资源文件，静态资源的根目录 / 就是 public目录
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

// 判断是否为开发环境 development 环境
if (process.env.NODE_ENV === 'development') {
  // 使用 morgan中间件函数 用来打印到控制台中 客户端发送过来的哪个请求信息
  app.use(morgan('dev'));
  console.log('开发环境');
} else {
  console.log('生产环境');
}

// 配置express的模板引擎和模板后缀
app.engine('art', require('express-art-template'));
//  向 模板文件导入 dateFormat 变量，在模板文件中可以使用该方法
artTemplate.defaults.imports.dateFormat = dateFormat;
// 配置express模板引擎的根目录
app.set('views', path.join(__dirname, 'views'));
// 配置模板引擎的默认后缀名
app.set('views engine', 'art');

// 引入二级路由
const admin = require('./route/admin');
const home = require('./route/home');

// 拦截admin一级路由的所有二级路由请求请求，判断用户的登录状态，判断登录用户是否携带 cookie
app.use('/admin', require('./middleware/loginIntercept'));

// 拦截请求，定义一级路由，并且引入二级路由
app.use('/admin', admin);
app.use('/home', home);

// 错误处理中间件一定要放到最后面
app.use((err, req, res, next) => {
  // 调试JSON报错:  Unexpected token T in JSON at position 0
  console.log(err);
  // JSON.parse()方法必须传入的是 String 类型，否则会报错
  // if (typeof err === String) {
  //   //将字符串格式对象转换为对象类型
  //   let result = JSON.parse(err);
  // }
  let result = JSON.parse(err);

  let params = [];
  for (attr in result) {
    if (attr != 'path') {
      params.push(attr + '=' + result[attr]);
    }
  }
  // 调试
  console.log(params);
  res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
app.listen(80, () => {
  console.log('服务器启动成功');
});
