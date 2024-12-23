const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
}, { timestamps: true });

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;