const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema ({
    ingredient: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    }
})

const recipeSchema = new mongoose.Schema(
	{

        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
		ingredients: [{
            type:String
        }],
        instructions: {
            type: String,
            required: true
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Recipe', recipeSchema)
