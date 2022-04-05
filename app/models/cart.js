const mongoose = require('mongoose')

const itemSchema = require('./item')

const CartSchema = new mongoose.Schema(
	{
		items: [itemSchema],
		checkedOut:{
			type: Boolean,
			required: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
	}
)

//can make total as a virtual

module.exports = mongoose.model('Cart', CartSchema)