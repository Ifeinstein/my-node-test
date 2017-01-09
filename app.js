const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const serve = require('koa-static');
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

app.use(controller());

app.listen(3000);
console.log('app started at http://localhost:3000...');
