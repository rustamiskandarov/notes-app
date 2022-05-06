const {
	Schema,
	model,
	Types
} = require('mongoose')

const schema = new Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	links: [{
		type: Types.ObjectId,
		ref: 'Note'
	}]
})

module.exports = model('User', schema)