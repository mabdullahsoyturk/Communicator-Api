var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name:     String,
    last_name:      String,
    email:          String,
    facebook_id:    String,
    balance:    Number,
    photo_url: String,
    status: Number,
    houses: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
        }
    ],

    spendings: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spending'
        }
    ],

    created_time: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);