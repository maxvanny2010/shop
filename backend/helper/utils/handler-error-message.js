function handlerErrorMessage(res, message, status) {
	res.status(status).send({ error: message });
}

module.exports = handlerErrorMessage;