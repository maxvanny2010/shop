module.exports = function(comment) {
	return {
		id: comment._id,
		author: comment.author?.login,
		product: comment.product,
		content: comment.content,
		publishedAt: comment.createdAt,
	};
};