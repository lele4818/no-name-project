const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const DB = require('../mogodb/index.js');  /*引入DB数据库*/

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/info', (req, res) => {
  res.send[1,2,3,4,5]
});

module.exports = router;