var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/bird_sights';
mongoose.Promise = global.Promise;

const BirdSightSchema = new mongoose.Schema({
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


