const {
	Schema,
	model,
	Types
} = require('mongoose')

const schema = new Schema({

	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now
	},
	importance: {
		type: Number,
		default: 0
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User'
	}
})

module.exports = model('Note', schema)