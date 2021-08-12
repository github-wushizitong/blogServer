// 引入mongoose用来操作mongodb数据库
const mongoose = require('mongoose');

// 引入 config 第三方模块，用来写配置文件
const config = require('config');

// 连接数据库
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    `mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get(
      'db.host'
    )}:${config.get('db.port')}/${config.get('db.name')}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err) => {
    if (err !== null) {
      console.log('数据库连接失败', err);
    }
  });
