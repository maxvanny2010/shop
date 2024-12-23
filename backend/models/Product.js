const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.00,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    unit: {
        type: String,
        required: true,
        enum: ['grams', 'pieces', 'bottles'],
        default: 'grams',
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;