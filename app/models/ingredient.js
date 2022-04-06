const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema ({
    ingredient: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        min: 0    
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // }
},
{
    timestamps: true,
})



module.exports = mongoose.model('Ingredient', ingredientSchema)