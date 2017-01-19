var cooking = require('cooking')

cooking.set({
    entry: './static/css/',
    dist: './dist',

    assetsPath: 'static',
    clean: true,
    hash: false,
    sourceMap: true,
    extractCSS: true,
    minimize: {
        js: true,
        css: true
    }
})

module.exports = cooking.resolve()
