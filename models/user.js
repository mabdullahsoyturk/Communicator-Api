var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id          :     String,
    first_name  :     String,
    last_name   :     String,
    facebook_id :     String,
    house_id    :     String,
    status      :     Number,
    balance     :     Number,
    photo_url   :     String,
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