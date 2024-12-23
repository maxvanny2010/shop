const chalk = require('chalk');

const { ERROR } = require('../constants');
const { Order, User, Cart, Address } = require('../models');


async function addOrder(userId, body) {
	console.log(chalk.blue('ADD ORDER START: ', userId, body));
	const { name, phone, email, country, address } = body;

	const user = await User.findOne({ _id: userId });
	if (!user) {
		console.error(chalk.red(`User with ID: ${userId} not found`));
		throw new Error(ERROR.NOT_FOUND_USER);
	}
	console.log(chalk.green(`User with ID: ${userId} found`));

	const cart = await Cart.findOne({ _id: user.cart });
	if (!cart) {
		console.error(chalk.red(`Cart for user with ID: ${userId} not found`));
		throw new Error(ERROR.NOT_FOUND_CART);
	}
	console.log(chalk.green(`Cart for user with ID: ${userId} found`));

	const zip = await Address.create({
		user: userId,
		name: name,
		phone: phone,
		email: email,
		country: country,
		address: address,
	});
	console.log(chalk.green(`New address created for order with ID: ${zip._id}`));

	const order = await Order.create({
		user: userId,
		cart: cart,
		address: zip,
	});
	console.log(chalk.green(`Order with ID: ${order._id} created`));

	await User.updateOne({ _id: userId }, { $unset: { cart: '' } });
	console.log(chalk.green(`User with ID: ${userId} cart unset after order`));

	return Order.findById(order._id).populate(['user', 'cart', 'address']);
}

async function remove(userId, orderId) {
	console.log(chalk.blue('REMOVE ORDER START: ', userId, orderId));
	console.log(chalk.blue(`Attempting to remove order with ID: ${orderId} for user with ID: ${userId}`));

	const user = await User.findById({ _id: userId });
	if (!user) {
		console.error(chalk.red(`User with ID: ${userId} not found`));
		throw new Error(ERROR.NOT_FOUND_USER);
	}
	console.log(chalk.green(`User with ID: ${userId} found`));

	const order = await Order.findById({ _id: orderId });
	if (!order) {
		console.error(chalk.red(`Order with ID: ${orderId} not found`));
		throw new Error(ERROR.NOT_FOUND_ORDER);
	}
	console.log(chalk.green(`Order with ID: ${orderId} found`));

	const cart = order.cart ? await Cart.findById(order.cart) : null;
	if (cart) {
		console.log(chalk.green(`Cart with ID: ${cart._id} found`));
		await Cart.deleteOne({ _id: cart._id });
		console.log(chalk.green(`Cart with ID: ${cart._id} deleted`));
	} else {
		console.log(chalk.yellow(`No cart found for order with ID: ${orderId}`));
	}

	const address = order.address ? await Address.findById(order.address[0]) : null;
	if (address) {
		console.log(chalk.green(`Address with ID: ${address._id} found`));
		await Address.deleteOne({ _id: address._id });
		console.log(chalk.green(`Address with ID: ${address._id} deleted`));
	} else {
		console.log(chalk.yellow(`No address found for order with ID: ${orderId}`));
	}

	const result = await Order.deleteOne({ _id: orderId });
	if (result.deletedCount === 1) {
		console.log(chalk.green(`Order with ID: ${orderId} successfully deleted`));
	} else {
		console.error(chalk.red(`Failed to delete order with ID: ${orderId}`));
	}

	return result;
}


async function get(userId) {
	console.log(chalk.blue('GET ORDER START: ', userId));
	return Order.find({ user: userId })
		.populate('user')
		.populate('cart')
		.populate('address') || [];
}

module.exports = {
	addOrder,
	remove,
	get,
};