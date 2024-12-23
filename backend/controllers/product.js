const mongoose = require('mongoose');
const chalk = require('chalk');

const { Product } = require('../models');
const { ERROR } = require('../constants');
const { TEMPLATE } = require('../constants/template');

const LIMIT = Number(process.env.LIMIT) || 6;
const PAGE = Number(process.env.PAGE) || 1;

// check ObjectId
function isValidObjectId(id) {
	return mongoose.isValidObjectId(id);
}

// add
async function add(product) {
	console.log(chalk.blue('ADD PRODUCT START: ', product));
	if (!isValidObjectId(product.category)) {
		console.error(chalk.red(`Invalid category ID: ${product.category}`));
		throw new Error(ERROR.ID_INVALID);
	}

	const categoryObjectId = new mongoose.Types.ObjectId(product.category);
	console.log(chalk.green(`Category ID ${product.category} is valid. Proceeding to add product.`));

	try {
		const newProduct = await Product.create({
			...product,
			category: categoryObjectId,
			imageUrl: product.imageUrl ? product.imageUrl : TEMPLATE.URL_IMAGES,
			description: TEMPLATE.PRODUCT_CHARACTERISTICS,
		});

		console.log(chalk.green(`Product with ID: ${newProduct._id} created successfully.`));

		return Product.findById(newProduct._id).populate('category');
	} catch (error) {
		console.error(chalk.red('Error adding product:', error));
		throw error;
	}
}

// delete
async function remove(id) {
	console.log(chalk.blue('DELETE START: ', id));
	if (!isValidObjectId(id)) {
		console.error(chalk.red(`Invalid product ID: ${id}`));
		throw new Error(ERROR.ID_INVALID);
	}

	console.log(chalk.green(`Product with ID: ${id} is valid. Proceeding to delete.`));
	return Product.deleteOne({ _id: id });
}

// edit
async function update(id, product) {
	console.log(chalk.blue('UPDATE PRODUCT START: ', id));

	if (!isValidObjectId(id)) {
		console.error(chalk.red(`Invalid product ID: ${id}`));
		throw new Error(ERROR.ID_INVALID);
	}
	const allowedFields = ['name', 'quantity', 'price', 'description', 'imageUrl', 'category'];

	const updates = Object.keys(product)
		.filter((key) => allowedFields.includes(key) && product[key] !== undefined)
		.reduce((acc, key) => {
			acc[key] = product[key];
			return acc;
		}, {});

	if (updates.category && !isValidObjectId(updates.category)) {
		console.error(chalk.red(`Invalid category ID: ${updates.category}`));
		throw new Error(ERROR.ID_INVALID);
	}

	console.log(chalk.green(`Product with ID: ${id} is valid. Proceeding to update.`));
	console.log('Allowed updates: ', updates);

	try {
		return await Product.findOneAndUpdate(
			{ _id: id },
			{ $set: updates },
			{ new: true },
		).populate('category');
	} catch (error) {
		console.error(chalk.red('Error updating product:', error));
		throw error;
	}
}


// get all with pagination and search
async function getProducts(search = '',
						   categoryId = '',
						   sort = 'asc',
						   field = 'name',
						   limit = LIMIT,
						   page = PAGE) {
	const filter = {};
	if (search) filter.name = { $regex: search, $options: 'i' };
	const sortDirection = sort === 'desc' ? -1 : 1;
	if (categoryId && isValidObjectId(categoryId)) {
		filter.category = new mongoose.Types.ObjectId(categoryId);
	}

	console.log(chalk.green(`Fetching products with filter: ${JSON.stringify(filter, null, 2)}`));

	try {
		const [products, totalProducts] = await Promise.all([
			Product.find(filter)
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ [field]: sortDirection }).populate('category'),
			Product.countDocuments(filter),
		]);
		const totalPages = Math.ceil(totalProducts / limit);
		console.log('totalPages', totalPages);
		console.log('totalProducts', totalProducts);
		console.log('limit', limit);
		console.log(chalk.green(`Fetched ${products.length} products. Total count: ${totalProducts}.`));

		return {
			products: products,
			page,
			totalPages,
			totalProducts,
		};
	} catch (error) {
		console.error(chalk.red('Error fetching products:', error));
		throw error;
	}
}

// get one item
async function get(id) {
	console.log(chalk.blue('GET PRODUCT START: ', id));
	if (!isValidObjectId(id)) {
		console.error(chalk.red(`Invalid product ID: ${id}`));
		throw new Error(ERROR.ID_INVALID);
	}

	console.log(chalk.green(`Fetching product with ID: ${id}`));

	try {
		return Product.findById(id).populate('category');
	} catch (error) {
		console.error(chalk.red('Error fetching product:', error));
		throw error;
	}
}

function extractProductData(req) {
	const { category, name, quantity, price, description, imageUrl } = req.body;
	return { category, name, quantity, price, description, imageUrl };
}

module.exports = {
	add,
	get,
	update,
	remove,
	getProducts,
	extractProductData,
};
