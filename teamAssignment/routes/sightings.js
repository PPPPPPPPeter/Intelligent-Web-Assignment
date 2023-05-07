const express = require("express");
const {BirdSightModel} = require("../databases/bird_sights");

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

module.exports = router;