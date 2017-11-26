var mongoose = require('mongoose');

var BuyMeSchema = new mongoose.Schema({
    name: String,
    description: String,
    created_time: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BuyMe', BuyMeSchema);