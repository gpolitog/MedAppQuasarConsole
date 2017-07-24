const path = require('path');
const express = require('express');
const compression = require('compression');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

app.use(forceSSL());

app.use(express.static(__dirname));
app.use(compression());
app.use(history()); 

app.listen(process.env.PORT || 8080);

// var express = require('express');
// var path = require('path');
// var serveStatic = require('serve-static');
// var history = require('connect-history-api-fallback');

// app = express();
// app.use(history()); 
// app.use(serveStatic(__dirname));

// var port = process.env.PORT || 5000;
// app.listen(port);