const passport = require('koa-passport');

var index = async(ctx, next) => {
    await ctx.render('auth/login.html', {   
        error_msg: '',
        csrf: ctx.csrf
    });
};


var login = async(ctx, next) => {
    let middleware = passport.authenticate('local', async(user, info) => {
        if (user === false) {
            await ctx.render('auth/login.html', {
                error_msg: '用户名或密码错误',
                csrf: ctx.csrf
            });
        } else {
            await ctx.login(user);
            await ctx.redirect('/');
        }
    })
    await middleware.call(this, ctx, next)
}


module.exports = {
    'GET /login': index,
    'POST /login': login,
}
