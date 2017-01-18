const model = require('../../model');
const moment = require('moment');

var index = async(ctx, next) => {
    await ctx.logout();
    await ctx.render('auth/register.html', {
        error_msg: '',
        csrf: ctx.csrf
    });
};

var register = async(ctx, next) => {

    let body = ctx.request.body;

    let find_user = await model.User.findAll({
        where: {
            email: body.email
        }
    });

    if (find_user.length) {
        await ctx.render('auth/register.html', {
            error_msg: "This email has been registered!",
            csrf: ctx.csrf
        });
    } else {
        let create_user = await model.User.create({
            email: body.email,
            password: body.password,
            name: body.name || '',
            gender: body.gender || '',
        });
        console.log('create:' + JSON.stringify(create_user));
        await ctx.redirect('/login');
    }

}


module.exports = {
    'GET /register': index,
    'POST /register': register
}
