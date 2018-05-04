const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const router = require('./routes');
const resWrapper = require('./middleware/res-wrapper');
const errorCatch = require('./middleware/error');
const extendCtx = require('./middleware/extend-ctx');

// error handler
onerror(app);

app.use(logger());

// 在中间件的最后捕获错误，并处理错误信息
app.use(errorCatch);

//cors
app.use(cors());

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());

app.use(require('koa-static')(__dirname + '/public'));

// API 文档
if(process.env.NODE_ENV === 'development') app.use(require('koa-static')(__dirname + '/doc'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${Date.now()} - ${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(extendCtx);

// routes
app.use(router.routes());

// wrap res.data
app.use(resWrapper);

// 最后捕获，并 log
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
