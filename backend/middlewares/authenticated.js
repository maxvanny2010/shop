const { handlerErrorMessage } = require('../helper/utils');
const { verify } = require('../helper/token');
const { ERROR } = require('../constants');
const { User } = require('../models');

module.exports = async function(req, res, next) {
	const { id } = verify(req.cookies.token);
	const user = await User.findOne({ _id: id });
	if (!user) {
		handlerErrorMessage(req, ERROR.AUTH_FAILED, 403);
		return;
	}
	req.user = user;
	next();
};