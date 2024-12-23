const express = require('express');
const { ADMIN } = require('../constants/roles');
const { dtoCategory } = require('../helper/dto');
const { authenticated, hasRole } = require('../middlewares/');
const { handlerError, handlerErrorMessage } = require('../helper/utils');
const { get, add, update, remove } = require('../controllers/category');

const router = express.Router({ mergeParams: true });

/* to get categories */
router.get('/', async (req, res) => {
	try {
		const categories = await get();
		if (!categories || !Array.isArray(categories)) {
			handlerErrorMessage(res, 'Categories data is invalid', 400);
			return;
		}
		return res.send({ data: { categories: categories.map(dtoCategory) } });
	} catch (error) {
		handlerError(res, error, 400);
	}
});
/* to add a new product to the cart */
router.post('/', authenticated, hasRole([ADMIN]), async (req, res) => {
	try {
		const category = await add(req.body);
		let data = dtoCategory(category);
		return res.send({ data: data });
	} catch (error) {
		handlerError(res, error, 400);
	}
});
/* to update patch a product in the cart */
router.patch('/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
	try {
		const category = await update(req.params.id, req.body);
		return res.send({ data: { category: dtoCategory(category) } });
	} catch (error) {
		handlerError(res, error, 400);
	}
});
/* to delete a product in the cart */
router.delete('/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
	try {
		await remove(req.params.id);
		return res.send({ error: null });
	} catch (error) {
		handlerError(res, error, 400);
	}
});

module.exports = router;
