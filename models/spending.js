var mongoose = require('mongoose');

var SpendingSchema = new mongoose.Schema({
    name: String,
    description: String,
    cost: Number,
    created_time: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Spending', SpendingSchema);