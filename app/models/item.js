// import dependencies
const mongoose = require('mongoose')

// ITEMS SUBDOCUMENT - items array of the shopping cart
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        default: 1,
        min: 1
    }
}, {
    timestamps: true
})

module.exports = itemSchema