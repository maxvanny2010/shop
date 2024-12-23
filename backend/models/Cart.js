const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		productsPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		shipmentPrice: {
			type: Number,
			required: true,
			default: 0,
		},

		products: [{
			product: {
				id: {
					type: String,
					required: true,
				},
				imageUrl: {
					type: String,
					required: true,
					default: '/assets/images/colors/placeholder.jpg',
				},
				name: {
					type: String,
					required: true,
				},
				counter: {
					type: Number,
					required: true,
					default: 0,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		}],
	}, { timestamps: true },
);

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;