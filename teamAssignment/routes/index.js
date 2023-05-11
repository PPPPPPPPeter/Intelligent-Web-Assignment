var express = require('express');
const {BirdSightModel} = require("../databases/bird_sights");
var router = express.Router();
var createError = require('http-errors');
/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index');
});


router.get('/add_sight', function(req, res, next) {
  res.render('add_bird_sight', {title: 'Add  a Bird Sight'});
})

router.get('/bird_sight/:id', async function(req, res) {
  const {id} = req.params;
  const bird_sight = await BirdSightModel.findById(id);
  if (!bird_sight) {
    return createError(404);
  }
  res.render("bird_sight", {
    bird_sight
  })
});

module.exports = router;
