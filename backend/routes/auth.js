const express = require('express');
const {dtoUser} = require('../helper/dto');
const {handlerError} = require('../helper/utils');
const {ADMIN, USER} = require('../constants/roles');
const {authenticated, hasRole} = require('../middlewares');
const {register, login, clearCartByUserId} = require('../controllers/user');

const router = express.Router({mergeParams: true});

router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body.login, req.body.password);
        res.send({error: null, user: dtoUser(user)});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
router.post('/login', async (req, res) => {
    try {
        const {user, token} = await login(req.body.login, req.body.password);
        res.cookie('token', token, {httpOnly: true})
            .send({error: null, user: dtoUser(user)});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
router.get('/logout', authenticated, hasRole([ADMIN, USER]), async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            new Error('User information is missing in the request');
        }
        await clearCartByUserId(req.user.id);
        res.clearCookie('token');
        console.log('Token cleared successfully');
        res.send({error: null});
    } catch (error) {
        console.error('Error in logoutAsync route:', error.message);
        handlerError(res, error, 400);
    }
});

module.exports = router;