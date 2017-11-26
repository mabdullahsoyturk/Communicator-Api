var mongoose = require('mongoose');

var HouseSchema = new mongoose.Schema({
    name: String,
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
    buy_mes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BuyMe'
        }
    ],
    created_time: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('House', HouseSchema);