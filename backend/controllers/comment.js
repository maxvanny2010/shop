const mongoose = require('mongoose');
const chalk = require('chalk');

const {ERROR} = require('../constants');
const {Product, Comment} = require('../models');

// get
async function getComments(productId) {
    console.log(chalk.blue('GET COMMENT START: ', productId));
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.error(chalk.red(`Error: Invalid product ID: ${productId}`));
        throw new Error(ERROR.INVALID_PARAMETERS);
    }
    try {
        const comments = await Comment.find({product: productId}).populate('author');
        console.log(chalk.green(`Successfully fetched comments for product ID ${productId}`));
        return comments;
    } catch (error) {
        console.error(chalk.red(`Error fetching comments for product ID ${productId}: ${error.message}`));
        throw error;
    }
}

// add
async function addComment(productId, comment) {
    console.log(chalk.blue('ADD COMMENT START: ', productId, comment));
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.error(chalk.red(`Error: Invalid product ID: ${productId}`));
        throw new Error(ERROR.ID_INVALID);
    }
    if (!mongoose.Types.ObjectId.isValid(comment.author)) {
        console.error(chalk.red(`Error: Invalid author ID: ${comment.author}`));
        throw new Error(ERROR.ID_INVALID);
    }

    try {
        const newComment = await Comment.create({
            content: comment.content,
            author: comment.author,
            product: productId,
        });

        await Product.findByIdAndUpdate(productId, {
            $push: {comments: newComment._id},
        });

        console.log(chalk.green(`Successfully added comment to product ID ${productId}`));
        return Comment.findById(newComment._id).populate('author');
    } catch (error) {
        console.error(chalk.red(`Error adding comment to product ID ${productId}: ${error.message}`));
        throw error;
    }
}

// delete
async function deleteComment(id) {
    console.log(chalk.blue('DELETE COMMENT START: ', id));
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(chalk.red(`Error: Invalid comment ID: ${id}`));
        throw new Error(ERROR.INVALID_PARAMETERS);
    }

    try {
        await Comment.deleteOne({_id: id});
        console.log(chalk.green(`Successfully deleted comment with ID ${id}`));
    } catch (error) {
        console.error(chalk.red(`Error deleting comment with ID ${id}: ${error.message}`));
        throw error;
    }
}

module.exports = {getComments, addComment, deleteComment};