const express = require('express');
const {dtoUser} = require('../helper/dto');
const {ADMIN} = require('../constants/roles');
const {handlerError} = require('../helper/utils');
const {authenticated, hasRole} = require('../middlewares');
const {getRoles, getUsers, updateUser, deleteUser} = require('../controllers/user');

const router = express.Router({mergeParams: true});

router.get('/', authenticated, hasRole([ADMIN]), async (req, res) => {
    const users = await getUsers();
    res.send({data: users.map(dtoUser)});
});
router.patch('/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
    try {
        const newUser =
            await updateUser(req.params.id, {role: req.body.roleId});
        res.send({data: dtoUser(newUser)});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
router.delete('/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.send({error: null});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
router.get('/roles', authenticated, hasRole([ADMIN]), async (req, res) => {
    const roles = await getRoles();
    res.send({data: roles});
});

module.exports = router;
