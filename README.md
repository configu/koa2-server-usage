## intruduction
**中间层、node server 项目示例**

## script

### 安装
```
yarn
```
### 本地开发
```
npm run dev

```

### 预览
```
npm run pre-prd
```
## db
`routes/project.js` 默认未启用（注释了），需要你连接 mysql 数据库。在 `config/dev.config.js` 下改 mysql 的对应配置即可。
## 开发规范
### 分层
开始一个新的模块，一般分几步：
1. 创建路由，比如为 user，即目录下创建 `routes/user.js`
2. 创建 route 对应的 controller 层，这里负责写代码逻辑，一些异步操作。
3. 如果涉及到数据库操作的，创建好数据库后，需要在 `db/schemas` 通过 sequelize 定义模型。
4. sequelize 是我们采用的 mysql orm，简化一些数据库操作。`db/sequelize.js` 会把 schemas 下的所有文件统一导入，并挂到 models 上导出，所以如果你创建了一个文件名为 user 的 schemas，只需要 `const models = require('db/sequelize')`，通过 models.user 即可获取对应的 model。
5. models.user 通常在 `db/models` 使用。该目录下的文件是定义与数据库交互的操作、逻辑，即写一些 sequelize 的语句。
6. 最后在 controller 中调用 model 的方法。controller 是业务逻辑，跟 models 作区分，可能是几个 model 操作的组合。一般参数的处理，也放到 controller 层。

大概分 routes，controller，schemas，models 四个目录，没有 autoload 机制，分成这么多目录写起来很麻烦，这个在后续的规划中。

### eslint

代码规范没有做强制校验，不过推荐编辑器安装插件，自己做排查。比如 vscode 安装 eslint 插件，vim 安装 syntastic，全局装一下 eslint。

默认采用 eslint:recommended 的拓展 rules，即 eslint 推荐的。缩进为两个空格，其他有问题的改 rules 即可。

### 返回格式
按照对接后端的格式。比如：
```js
{
  data: {},
  errmsg: '',
  errno: 0
}
```
### 错误处理

不是特别严重的错误信息，即不需要返回 500 的，我们会在 router 之前的中间件 catch 错误（`middleware/error.js`），然后做不同的处理，根据错误类型的分类、等级，去决定返回 200，302，还是 500。 500 的注意打印日志。

利用 koa 中间件的特性，我们把 controller 里有问题，需要返回前端错误信息的，都通过 `throw new TypeError`抛出，然后在 `error.js` 去 catch，统一设置错误信息返回。即`ctx.body = { errmsg: '', errno: ''}`

### 错误信息

错误信息分类，在 `common/error.js` 下，规范参照文件内部。基本就是设置 errmsg, 和 errno。这两个参数可以 new Error 的传入，errno 注意设置默认值，不同的 error 要按规范区分，通常为五位数。

比如 ` ValidatorError`，属于参数校验错误，`throw new ValidatorError('xx 参数格式错误')`，middleware-error 中去判断 error 类型，返回 status 和 body。

### validator 默认支持的校验
目录： `common/validator.js` 可拓展。
```js
{
  accepted: ':attribute必须是可接受的.',
  alpha: ':attribute只能包含字母.',
  alpha_dash: ':attribute只能包含字母,连字符和下划线.',
  alpha_num: ':attribute只能包含字母和数字.',
  between: ':attribute的(大小,长度等)只能在:min和:max之间.',
  confirmed: ':attribute确认不一致.',
  email: ':attribute格式不正确.',
  date: ':attribute日期格式错误.',
  def: ':attribute属性错误.',
  digits: ':attribute必须是:digits位小数.',
  different: ':attribute和:different必须不同.',
  in: '选择的:attribute无效',
  integer: ':attribute必须是一个整数.',
  min: [Object],
  max: [Object],
  not_in: '所选的:attribute无效.',
  numeric: ':attribute必须是一个数字.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute不能为空.',
  required_if: '当:other是:value时,:attribute不能为空.',
  same: ':attribute和:same必须一致.',
  size: [Object],
  string: ':attribute必须是一个字符串.',
  url: ':attribute格式不正确.',
  regex: ':attribute格式不正确.',
}
```
### 目录结构
```
├── config // 配置文件
│   ├── dev.config.js
│   ├── index.js
│   └── pro.config.js
├── control.sh
├── controller // 业务逻辑，接口逻辑
│   └── ufactory.js
├── db // 数据库
│   └── models // model 定义
│   |    └── ufactory.js // 数据库操作实例
│   └── schemas // 表结构定义
│   │    └── uconfig.js
│   ├── mongodb.js
│   ├── redis.js
│   └── sequelize.js
├── package.json
├── pm2.json
├── public // 静态资源
│   ├── javascripts
│   │   └── parser.js
│   └── stylesheets
│       └── style.css
├── routes // 路由
│   ├── index.js
│   └── ufactory.js
├── views // 页面
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
└── yarn.lock
```


### 接口文档
使用的 apidoc 生成接口文档页面，需要在 `controller` 下的对应方法前加上注释，格式参照文档或者其他方法。

更新完接口注释后，通过 `npm run docs` 生成静态资源，然后 `npm run deploy:docs` 推送到开发机上。

本地访问：http://localhost:3008/apidoc/
注意：
- `/apidoc` 的目录是不提交的，仅在开发环境使用。
- apidoc 的静态资源推到开发机器上（web 容器），访问即可。