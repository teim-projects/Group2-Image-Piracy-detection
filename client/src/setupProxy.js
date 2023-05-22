const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware('/auth/google',{target:"http://127.0.0.1:5000/"}));
    app.use(createProxyMiddleware('/api',{target:"http://127.0.0.1:5000/","secure": false,
    "changeOrigin": true}));
    app.use(createProxyMiddleware('/api/user/*',{target:"http://127.0.0.1:5000/"}));
};

