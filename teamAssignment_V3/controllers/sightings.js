const express = require("express");
const {BirdSightModel} = require("../models/bird_sights");
const {getBirdData} = require("../dbpedia");

const router = express.Router();

router.get('/query/:name', async (req, res) => {
  try {
    const {name} = req.params;
    const birdData = await getBirdData(name);
    res.status(200).json([birdData]);
  } catch (err) {
    res.status(200).json([]);
  }
})

router.post('/', async (req, res) => {
  try {
    const sightData = req.body;

    await BirdSightModel.create(sightData);
    res.status(201).send();
  } catch (err) {
    console.log(err);
  }
});

router.post('/many', async (req, res) => {
  try {
    const sightData = req.body;
    await BirdSightModel.insertMany(sightData);
    res.status(201).send();
  } catch (err) {
    console.log(err);
  }
})

router.get('/', async (req, res) => {
  let allSights = await BirdSightModel.find();
  res.status(200).json(allSights);
});

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const sight = await BirdSightModel.findById(id);
  const {
    sender,
    identification,
    scientificName,
    DBPediaDescription,
    DBPediaURL
  } = req.body;
  if (sender !== sight.author) {
    return res.status(403).send("You are not the author!");
  }
  await BirdSightModel.findByIdAndUpdate(
    id, {
      identification,
      DBPediaURL,
      scientificName,
      DBPediaDescription
    }
  );
  res.status(200).send();
})

module.exports = router;