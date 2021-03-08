var mongoose = require('mongoose');

var HeartRateSchema = new mongoose.Schema({
    bpm: Number,
    date: Date,
    userid: String
});

mongoose.model('HeartRate', HeartRateSchema);