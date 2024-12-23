const mongoose = require('mongoose');
const validator = require('validator');
const roles = require('../constants/roles');


const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: roles.USER,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;