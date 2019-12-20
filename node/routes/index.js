const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const login = require('./login.js');
const home = require('./home.js');
const DB = require('../mogodb/index.js');  /*引入DB数据库*/
const config = require('../config');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.all('*', (req, res, next) => {
  // req._parsedUrl.pathname === '/login/doLogin'
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");

  if (req._parsedUrl.pathname !== '/login/doLogin') { // 登录接口不需要token验证
    const token = req.headers.authorization;

    if (token) {
      DB.find('config', 'config', { title: 'token' }, (err, data) => {
        if (token === data[0].value) {
          jwt.verify(token, config.token.privateKey, (err, data) => {
            if (err) {
              res.status(401).send({ errMsg:'认证错误：token已过期' })
            } else {
              next();
            }
          })
        } else {
          res.status(401).send({ errMsg:'认证错误：token错误' })
        }
      })
    } else {
      res.status(401).send({ errMsg:'认证错误：token错误' })
    }
  } else {
    next();
  }
});

router.use('/login', login);
router.use('/home', home);
module.exports = router;