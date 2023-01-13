const express = require('express');
const bodyParser = require('body-parser');
const { servePort } = require('./config');
const { commonRouter } = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const error404 = require('./middleware/404');
const app = express();

app.use('/', express.static('public')); //全局设置静态文件目录路劲

app.use([express.json()]);

app.use([bodyParser.urlencoded({ extended: false }), bodyParser.json()]);
app.use('/api', [commonRouter]);
app.use([error404, errorHandler]);
app.listen(servePort, () => {
    console.log(`Example app listening on port ${servePort} 1111111`);
});
