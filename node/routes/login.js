const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const DB = require('../mogodb/index.js');  /*引入DB数据库*/
const config = require('../config');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());


/*
  登录：
  params: {
    username: '',
    password: ''
  }
*/ 
router.get('/doLogin', (req, res) => {
  const params = req.query;

  //1.获取数据
  //2.连接数据库查询数据
  DB.find('user','user',params, (err,data) => {
    if (data.length > 0) {
      // 生成token并存入数据库
      const token = jwt.sign(params, config.token.privateKey, { expiresIn: config.token.expiresIn });
      DB.update('config','config', { title: 'token' }, { value: token}, (err, data) => {
        if (err) {
          res.send({ token: null });
          return;
        } else {
          res.send({ token: token });
        }
      });
    } else {
      res.status(500).send({ errMsg:'账户或密码错误' })
    }
  })
});

module.exports = router; 