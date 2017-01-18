var index = async(ctx, next) => {
	ctx.logout();
    await ctx.redirect('/');
};

module.exports = {
    'GET /logout': index,
}