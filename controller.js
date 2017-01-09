const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        switch (true) {
            case url.startsWith('GET'):
                {
                    var path = url.substring(4);
                    router.get(path, mapping[url]);
                    break;
                }
            case url.startsWith('POST'):
                {
                    var path = url.substring(5);
                    router.get(path, mapping[url]);
                    break
                }
            default:
                {
                    ctx.render('error/404.html', {})
                }
        }
    }
};

function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + '/' + dir);
    files.forEach((f) => {
        if (f.endsWith('.js')) {
            console.log(`proccess controller: ${f}`)
            let mapping = require(`${__dirname}/${dir}/${f}`);
            addMapping(router, mapping);
        } else {
            addControllers(router, dir + '/' + f)
        }
    })

}

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}
