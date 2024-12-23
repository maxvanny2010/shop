const express = require('express');
const { dtoOrder } = require('../helper/dto');
const { handlerError } = require('../helper/utils');
const { ADMIN, USER } = require('../constants/roles');
const { authenticated, hasRole } = require('../middlewares');
const { addOrder, remove, get } = require('../controllers/order');
const router = express.Router({ mergeParams: true });

/* to add orders */
router.post('/', authenticated, hasRole([USER]), async (req, res) => {
	try {
		const order = await addOrder(req.user.id, req.body);
		return res.send({ data: { order: dtoOrder(order) } });
	} catch (error) {
		handlerError(res, error, 500);
	}
});
/* to get orders */
router.get('/', authenticated, hasRole([ADMIN, USER]), async (req, res) => {
	try {
		const orders = await get(req.user.id);
		const array = orders.length > 0 ? orders.map(dtoOrder) : [];
		return res.send({ data: { orders: array } });
	} catch (error) {
		handlerError(res, error, 500);
	}
});
/* to add a new product to the cart */
router.delete('/:roleId', authenticated, hasRole([ADMIN, USER]), async (req, res) => {
	try {
		await remove(req.user.id, req.params.roleId);
		return res.send({ error: null });
	} catch (error) {
		handlerError(res, error, 500);
	}
});

module.exports = router;
