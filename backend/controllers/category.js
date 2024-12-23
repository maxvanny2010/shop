const chalk = require('chalk');

const {ERROR} = require('../constants');
const {Category, Product} = require('../models');

async function get() {
    return Category.find();
}

async function add(category) {
    console.log(chalk.blue('ADD CATEGORY START: ', category));
    try {
        const {category: {newCategory}, imageUrl = '/access/images/colors/placeholder.jpg'} = category;
        return Category.create({name: newCategory, imageUrl});
    } catch (error) {
        throw error;
    }
}

async function remove(id) {
    console.log(chalk.blue('REMOVE CATEGORY START: ', id));
    const category = await Category.findById(id);
    if (!category) {
        console.error(chalk.red(`Error: Category with ID ${id} not found!`));
        throw new Error(ERROR.NOT_FOUND_CATEGORY);
    }

    try {
        await Category.findByIdAndDelete(id);
        console.log(chalk.green(`Category with ID ${id} successfully deleted.`));

        await Product.updateMany({category: id}, {$unset: {category: ''}});
        console.log(chalk.green(`Products with category ID ${id} updated (category removed).`));
    } catch (err) {
        console.error(chalk.red(`Error deleting category with ID ${id}: ${err.message}`));
        throw new Error(ERROR.FAIL_DELETE_CATEGORY);
    }
}

async function update(id, categoryData) {
    console.log(chalk.blue('UPDATE CATEGORY START: ', id));
    const category = await Category.findById(id);
    if (!category) {
        console.error(chalk.red(`Error: Category with ID ${id} not found for update.`));
        throw new Error(ERROR.NOT_FOUND_CATEGORY);
    }
    try {
        const updatedCategory = await Category.findOneAndUpdate(
            {_id: id},
            categoryData,
            {new: true, runValidators: true},
        );
        console.log(chalk.green(`Category with ID ${id} successfully updated.`));
        return updatedCategory;
    } catch (err) {
        console.error(chalk.red(`Error updating category with ID ${id}: ${err.message}`));
        throw new Error(ERROR.FAIL_UPDATE_CATEGORY);
    }

}

module.exports = {
    get,
    add,
    update,
    remove,
};