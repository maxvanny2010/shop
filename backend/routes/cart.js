const express = require('express');
const {dtoCart} = require('../helper/dto');
const {handlerError} = require('../helper/utils');
const {USER} = require('../constants/roles');
const {authenticated, hasRole} = require('../middlewares');
const {get, add, remove} = require('../controllers/cart');

const router = express.Router({mergeParams: true});

/* to get the cart */
router.get('/', authenticated, hasRole([USER]), async (req, res) => {
    const cart = await get(req.user.id);
    return res.send({data: {cart: cart ? dtoCart(cart) : {}}});
});
/* to add a new product to the cart */
router.post('/', authenticated, hasRole([USER]), async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await add(userId, req.body);
        return res.send({data: {cart: dtoCart(cart)}});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
/* to delete a product in the cart */
router.delete('/:id', authenticated, hasRole([USER]), async (req, res) => {
    try {
        const cart = await remove(req.user.id, req.params.id);
        return res.send({data: {cart: dtoCart(cart)}});
    } catch (error) {
        handlerError(res, error, 400);
    }
});

module.exports = router;
