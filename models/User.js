const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	profilePicture: {
		type: String,
		default: '',
	},
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);