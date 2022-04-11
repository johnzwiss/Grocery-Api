const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema(
	{

        title: {
            type: String,
         
        },
        description: {
            type: String,
           
        },
        spoonacularId: {
            type: String
        },
		extendedIngredients: [{
            type: Object
        }],
        instructions: {
            type: String,
           
        },
	},
	{
		timestamps: true,
	},
    {
        strict: false
    }
)

module.exports = favoriteSchema