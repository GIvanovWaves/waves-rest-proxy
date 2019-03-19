const fs = require('fs');
var express = require('express');
var proxy = require('http-proxy-middleware');
var https = require('https');


var nodes_url = 'https://nodes.wavesplatform.com';
var matcher_url = 'https://matcher.wavesplatform.com';
var data_service_url = 'https://api.wavesplatform.com';

var options = {
    target: nodes_url,
    rejectUnauthorized: false,
    changeOrigin: true,

    pathRewrite: {
        '^/some/path': '' //Disable path
    },

    onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['access-control-allow-origin'] = req.headers.origin; // For CORS
    }
};

var credential = { 
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('certificate.pem'),
    passphrase: 'test',
    secure: true
};

options.target = nodes_url;
var node_proxy = proxy(options);

options.target = matcher_url;
var matcher_proxy = proxy(options);

options.target = data_service_url;
var data_service_proxy = proxy(options);

var node_app = express();
var matcher_app = express();
var data_service_app = express();

var port = 4000;

node_app.use('/', node_proxy);
matcher_app.use('/', matcher_proxy);
data_service_app.use('/', data_service_proxy);

https.createServer(credential, node_app).listen(port);
console.log(`Node API: \thttps://localhost:${port}`);

https.createServer(credential, matcher_app).listen(port + 1);
console.log(`Matcher API: \thttps://localhost:${port + 1}`);

https.createServer(credential, data_service_app).listen(port + 2);
console.log(`DS API: \thttps://localhost:${port + 2}`);