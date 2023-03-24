var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/add_sight', function(req, res, next) {
  res.render('add_bird_sight', {title: 'Add  a Bird Sight'});
})
