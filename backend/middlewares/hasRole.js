const { handlerErrorMessage } = require('../helper/utils');
const { ERROR } = require('../constants');

module.exports = function(roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			handlerErrorMessage(res, ERROR.ACCESS_DENIED, 403);
			return;
		}
		next();
	};
};