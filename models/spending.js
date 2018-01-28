var mongoose = require('mongoose');

var SpendingSchema = new mongoose.Schema({
    id          : String,
    icon_id     : String,
    name        : String,
    cost        : Number,
    facebook_id : String,
    facebook_ids: [],
    house_id    : String,
    created_time: String
});

module.exports = mongoose.model('Spending', SpendingSchema);