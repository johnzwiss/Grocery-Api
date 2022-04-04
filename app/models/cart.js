const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
	{
		items: {
			type: String,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		checkedOut:{
			type: Boolean,
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

module.exports = mongoose.model('Example', exampleSchema)
