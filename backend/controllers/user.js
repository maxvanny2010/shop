const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { generate } = require('../helper/token');
const { User, Cart } = require('../models');
const ROLES = require('../constants/roles');
const ERROR = require('../constants/errors/error');

//register
async function register(login, password) {
	if (!password) {
		console.error(chalk.red('Password is required.'));
		throw new Error(ERROR.REQUIRED_PASSWORD);
	}
	console.log(chalk.green(`Registering user with login: ${login}`));
	const hashPassword = await bcrypt.hash(password, 10);
	try {
		const newUser = await User.create({ login, password: hashPassword });
		console.log(chalk.green(`User with login: ${login} created successfully.`));
		return newUser;
	} catch (error) {
		console.error(chalk.red(`Error registering user with login: ${login}`, error));
		throw error;
	}
}

// login
async function login(login, password) {
	console.log(chalk.green(`Attempting login for user: ${login}`));
	const user = await User.findOne({ login });
	if (!user) {
		console.error(chalk.red(`User with login: ${login} not found.`));
		throw new Error(ERROR.NOT_FOUND_USER);
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		console.error(chalk.red(`Password does not match for user: ${login}`));
		throw new Error(ERROR.NOT_MATCH_PASSWORD);
	}
	const token = generate({ id: user._id });
	console.log(chalk.green(`Login successful for user: ${login}`));
	return { user, token };
}

// delete
async function deleteUser(id) {
	console.log(chalk.green(`Attempting to delete user with ID: ${id}`));
	try {
		const result = await User.deleteOne({ _id: id });
		console.log(chalk.green(`User with ID: ${id} deleted successfully.`));
		return result;
	} catch (error) {
		console.error(chalk.red(`Error deleting user with ID: ${id}`, error));
		throw error;
	}
}

// edit(roles)
async function updateUser(id, userData) {
	console.log(chalk.green(`Updating user with ID: ${id} with new data.`));
	try {
		const updatedUser = await User.findByIdAndUpdate(
			{ _id: id },
			userData,
			{ returnDocument: 'after' },
		);
		console.log(chalk.green(`User with ID: ${id} updated successfully.`));
		return updatedUser;
	} catch (error) {
		console.error(chalk.red(`Error updating user with ID: ${id}`, error));
		throw error;
	}
}

async function clearCartByUserId(userId) {
	console.log(chalk.green(`Trying to clear cart for user ID: ${userId}`));

	const user = await User.findOne({ _id: userId }).select('role');
	if (!user) {
		console.error(chalk.red(`User ID: ${userId} not found.`));
		throw new Error(ERROR.NOT_FOUND_USER);
	}
	if (user.role === ROLES.ADMIN) {
		console.log(chalk.yellow(`User ID: ${userId} is an admin. No cart to clear.`));
		return;
	}
	const cart = await Cart.findOne({ user: userId });
	if (!cart) {
		console.error(chalk.red(`Cart for user ID: ${userId} not found.`));
		return;
	}

	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			cart._id,
			{
				$set: {
					totalPrice: 0,
					productsPrice: 0,
					shipmentPrice: 0,
					products: [],
				},
			},
		);
		console.log(chalk.green(`Cart for user ${userId} has been cleared.`));
		return updatedCart;
	} catch (error) {
		console.error(chalk.red(`Error clearing cart for user ID: ${userId}`, error));
		throw error;
	}
}

function getUsers() {
	console.log(chalk.green('Fetching all users.'));
	return User.find();
}

function getRoles() {
	return [
		{ id: ROLES.ADMIN, name: 'Admin' },
		{ id: ROLES.USER, name: 'User' },
	];
}

module.exports = { clearCartByUserId, register, login, deleteUser, updateUser, getUsers, getRoles };
