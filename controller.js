const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        switch (true) {
            case url.startsWith('GET')||url.startsWith('get'):
                {
                    var path = url.substring(4);
                    router.get(path, mapping[url]);
                    // console.log(`register URL mapping: GET ${path}`);
                    break;
                }
            case url.startsWith('POST')||url.startsWith('post'):
                {
                    var path = url.substring(5);
                    router.post(path, mapping[url]);
                    // console.log(`register URL mapping: POST ${path}`);
                    break;
                }
            default:
                {
                    // console.log(`invalid URL: ${url}`);
                    throw(404);
                }
        }
    }
};

function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + '/' + dir);
    files.forEach((f) => {
        if (f.endsWith('.js')) {
            // console.log(`proccess controller: ${f}`)
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
