const express = require("express");
const {BirdSightModel} = require("../databases/bird_sights");
// const BirdSightModel = require("../databases/bird_sights");

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const sightData = req.body;

    await BirdSightModel.create(sightData);
    res.status(201).send();
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const allSights = await BirdSightModel.find();
  res.status(200).json(allSights);
});
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const sight = await BirdSightModel.findById(id);
  const {
    sender,
    identification,
    DBPediaURL
  } = req.body;
  if (sender !== sight.author) {
    return res.status(403).send("You are not the author!");
  }
  await BirdSightModel.findByIdAndUpdate(
      id, {
        identification,
        DBPediaURL
      }
  );
  res.status(200).send();
})
module.exports = router;