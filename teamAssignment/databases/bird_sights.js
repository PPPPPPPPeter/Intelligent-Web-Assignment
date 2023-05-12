// const mongoose = require('mongoose');
//
// mongoose.connect('mongodb://localhost:27017/birds', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('Connected to the database'))
//     .catch(err => console.error('Could not connect to the database', err));
//
// const birdSightSchema = new mongoose.Schema({
//     author: String,
//     datetime: String,
//     geolocation: {
//         latitude: Number,
//         longitude: Number
//     },
//     DBPediaURL: String,
//     identification: String,
//     description: String,
//     photo: String
// }, {
//     timestamps: true
// });
//
//
// const BirdSight = mongoose.model('BirdSight', birdSightSchema, 'birds_sights');
//
// module.exports = BirdSight;
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


const BirdSightModel = mongoose.model('BirdSight', BirdSightSchema);

try {
    connection = mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        checkServerIdentity: false,
    });
    console.log('connection to mongodb worked!');
} catch (e) {
    console.log('error in db connection: ' + e.message);
}

module.exports = {
    BirdSightModel
}