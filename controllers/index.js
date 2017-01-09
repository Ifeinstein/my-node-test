var index = async (ctx, next) => {
	await ctx.render('index.html');
};

var home = async (ctx, next) => {
	await ctx.render('home.html');
};

module.exports = {
	'GET /': index,
	'GET /home': home
}