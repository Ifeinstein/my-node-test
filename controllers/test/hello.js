var index = async (ctx, next) => {
	var name = ctx.params.name; 
	ctx.body = `<h1>Hello, ${name}!</h1>`
};

module.exports = {
	'GET /hello/:name': index
};