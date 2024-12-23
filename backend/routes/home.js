const {handlerError} = require('../helper/utils');
const {Category} = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({data: {categories}});
    } catch (error) {
        handlerError(res, error, 500);
    }
});

module.exports = router;
