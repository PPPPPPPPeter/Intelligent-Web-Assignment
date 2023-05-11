const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/birds', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Could not connect to the database', err));

const birdSightSchema = new mongoose.Schema({
    author: String,
    datetime: String,
    geolocation: {
        latitude: Number,
        longitude: Number
    },
    DBPediaURL: String,
    identification: String,
    description: String,
    photo: String
}, {
    timestamps: true
});

const BirdSight = mongoose.model('BirdSight', birdSightSchema, 'birds_sights');

module.exports = BirdSight;
