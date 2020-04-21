var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function (req, res, next) {
  res.json({
    errno: 0,
    data: [1, 2, 3]
  })
});

router.get('/detail', function (req, res, next) {
  res.json({
    errno: 0,
    data: [1, 2, 3]
  })
});

module.exports = router;