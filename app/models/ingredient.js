const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema ({
    ingredient: {
        type: String
    },
    price: {
        type: Number
    },
    amount: {
        type: Number,
        min: 0    
    }
    
},
{
    timestamps: true,
})



module.exports = mongoose.model('Ingredient', ingredientSchema)