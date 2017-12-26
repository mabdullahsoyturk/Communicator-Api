var mongoose = require('mongoose');

var HouseSchema = new mongoose.Schema({
    id: String,
    name: String,
    facebook_id: String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    spendings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Spending'
        }
    ],
    buyMes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BuyMe'
        }
    ],
    created_time: String
});

module.exports = mongoose.model('House', HouseSchema);