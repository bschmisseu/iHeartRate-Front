var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    apple_id: String,
    full_name: String,
    email: String,
});

mongoose.model('User', UserSchema);