const express = require('express');
const bodyParser = require('body-parser');
const { servePort } = require('./config');
const { userRouter, productRouter } = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const error404 = require('./middleware/404');

const app = express();

app.use(express.static('/public')); //全局设置静态文件目录路劲

app.use([bodyParser.urlencoded({ extended: false }), bodyParser.json()]);

app.get('/', (req, res) => {
  res.send('我叫木子李');
});
app.use('/api', [userRouter, productRouter]);
app.use([error404, errorHandler]);
app.listen(servePort, () => {
  console.log(`Example app listening on port ${servePort} 1111111`);
});
