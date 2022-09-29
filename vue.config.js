module.exports = {
    // publicPath:'/client/',
    chainWebpack: (config) => {
        config.resolve.symlinks(false)
    },
}