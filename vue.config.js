module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:64100',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}