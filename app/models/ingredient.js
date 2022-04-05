const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema ({
    ingredient: {
        type: String
    },
    price: {
        type: Number
    }
    
},
{
    timestamps: true,
})



module.exports = mongoose.model('Ingredient', ingredientSchema)