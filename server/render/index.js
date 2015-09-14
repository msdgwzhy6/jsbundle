var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user: req.session.user || '',
    headerTitle: '列表'
  });
});

module.exports = router;
