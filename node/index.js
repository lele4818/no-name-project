const express = require('express');
const app = new express();
const routes = require('./routes');
const config = require('./config');

app.use('/', routes);
app.listen(config.port, config.domain);
console.log(`this is running on http://${config.domain}:${config.port}`);