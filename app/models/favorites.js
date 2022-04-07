const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema(
	{

        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
		extendedIngredients: [{
            type: Object
        }],
        instructions: {
            type: String,
            required: true
        },
	},
	{
		timestamps: true,
	}
)

module.exports = favoriteSchema