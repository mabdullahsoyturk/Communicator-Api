var mongoose = require('mongoose');

var BuyMeSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    facebook_id: String,
    house_id: String,
    created_time: String
});

module.exports = mongoose.model('BuyMe', BuyMeSchema);