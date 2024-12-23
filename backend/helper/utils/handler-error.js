function handlerError(res, err, status) {
	res.status(status).send({ error: err.message });
}

module.exports = handlerError;