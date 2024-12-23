const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/products', require('./product'));
router.use('/users', require('./user'));
router.use('/carts', require('./cart'));
router.use('/orders', require('./order'));
router.use('/categories', require('./category'));

module.exports = router;