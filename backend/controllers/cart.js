const chalk = require('chalk');
const mongoose = require('mongoose');

const { ERROR } = require('../constants');
const { Product, Cart, User } = require('../models');

const SHIPMENT_RATE = Number(process.env.SHIPMENT) || 6;

function isProductId(item, productId) {
	return item.product.id === productId;
}

function getExistingProduct(cart, productId) {
	return cart.products?.find(item => isProductId(item, productId));
}

function updateCartData(cart) {
	cart.productsPrice = cart.products.reduce(
		(sum, item) => sum + item.product.price * item.product.counter,
		0,
	);
	cart.shipmentPrice = Number((cart.productsPrice * SHIPMENT_RATE).toFixed(2));
	cart.totalPrice = Number((cart.productsPrice + cart.shipmentPrice).toFixed(2));
	cart.productsPrice = cart.productsPrice.toFixed(2);
}

function getObjectId(productId) {
	return new mongoose.Types.ObjectId(productId);
}

function clearCart(cart) {
	cart.totalPrice = 0.00;
	cart.productsPrice = 0.00;
	cart.shipmentPrice = 0.00;
	cart.products = [];
}

function updateProductQuantity(cart, existingProduct, counter) {
	const parsedCounter = parseInt(counter, 10);
	if (isNaN(parsedCounter) || parsedCounter < 0) {
		throw new Error(ERROR.COUNTER_INVALID_CART);
	}
	const productIndex = cart.products
		.findIndex(item => isProductId(item, existingProduct.product.id));
	if (productIndex !== -1) {
		cart.products[productIndex].product.counter = parsedCounter;
	} else throw new Error(ERROR.NOT_FOUND_PRODUCT_CART);
}

function addProductToCart(cart, product, counter) {
	const cartProduct = {
		product: {
			id: product._id,
			name: product.name,
			counter: counter,
			price: product.price,
			imageUrl: product.imageUrl,
		},
	};
	cart.products.push(cartProduct);
}


/*  BASE METHODS */
async function get(userId) {
	console.log(chalk.blue(`Getting cart for user: ${userId}`));
	return Cart.findOne({ user: userId })
		.populate({
			path: 'user',
			model: 'User',
			select: '_id',
		});
}

async function add(userId, body) {
	console.log(chalk.blue('CART ADD PRODUCT START: ', userId));
	const { id, counters = 0 } = body;
	console.log(chalk.green(`Adding product with ID: ${id} to user's cart: ${userId}`));
	let user = await User.findById(userId).populate('cart');
	if (!user) throw new Error(ERROR.NOT_FOUND_USER);

	if (!user.cart) {
		const newCart =
			await Cart.create({ user: userId, products: [] });
		user.cart = newCart._id;
		await user.save();
		user = await User.findById(userId).populate('cart');
	}

	const cart = user.cart;
	const existingProduct = getExistingProduct(cart, id);
	if (existingProduct) {
		updateProductQuantity(cart, existingProduct, counters);
	} else {
		const product = await Product.findById(getObjectId(id));
		if (!product) throw new Error(ERROR.NOT_FOUND_PRODUCT);
		addProductToCart(cart, product, counters);
	}

	updateCartData(cart);
	await cart.populate(
		{
			path: 'user',
			model: 'User',
			select: '_id',
		},
	);
	await cart.save();
	console.log(chalk.green(`Product with ID: ${id} added successfully.`));
	return cart;
}


async function remove(userId, productId) {
	console.log(chalk.blue('CART REMOVE PRODUCT START: ', userId));
	console.log(chalk.yellow(`Removing product with ID: ${productId} from user's cart: ${userId}`));
	let user = await User.findById(userId).populate('cart');

	if (!user || !user.cart) throw new Error(ERROR.NOT_FOUND_CART);
	const cart = user.cart;

	const productIndex = cart.products.findIndex(item => isProductId(item, productId));
	if (productIndex === -1) throw new Error(ERROR.NOT_FOUND_PRODUCT);

	const product = await Product.findById(getObjectId(productId));
	if (!product) throw new Error(ERROR.NOT_FOUND_PRODUCT);

	cart.products.splice(productIndex, 1);

	if (cart.products.length !== 0) updateCartData(cart);
	else clearCart(cart);

	try {
		await cart.save();
		console.log(chalk.green(`Product with ID: ${productId} removed successfully.`));
	} catch (err) {
		console.error(chalk.red(ERROR.FAIL_SAVE_CART), err.message);
		throw new Error(ERROR.FAIL_SAVE_CART);
	}
	return cart;
}

module.exports = {
	get,
	add,
	remove,
};