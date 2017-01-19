'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const serve = require('koa-static');
const session = require('koa-generic-session');
const convert = require('koa-convert');
const passport = require('koa-passport');
const CSRF = require('koa-csrf').default;
const nunjucks = require('nunjucks');
const controller = require('./controller');
const mysql = require('mysql');
const db_config = require('./db_config');

const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

nunjucks.configure('views', {
    throwOnUndefined: true,
    watch: true,
    noCache: true
});

app.use(views(__dirname + '/views', {
    map: {
        html: 'nunjucks'
    }
}));

app.use(serve(__dirname + '/static'));

app.use(bodyParser());

app.keys = ['secret111'];
app.use(convert(session()));

app.use(new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false
}));

require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// app.use(async(ctx, next) => {
//     if (ctx.path === '/' || ctx.path === '/login' || ctx.path === '/register' || ctx.isAuthenticated()) {
//         return await next();
//     }
//     await ctx.render('auth/login.html', {
//         error_msg: '请先登录',
//         csrf: ctx.csrf
//     });
// });

app.use(controller());

app.listen(3000);
console.log('app started at http://localhost:3000');
