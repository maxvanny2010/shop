module.exports = function(product) {
	return {
		id: product._id,
		category: product.category ? {
			_id: product.category._id,
			name: product.category.name,
		} : null,
		name: product.name,
		price: parseFloat(product.price.toFixed(2)),
		imageUrl: product.imageUrl,
		quantity: product.quantity,
		description: product.description,
		publishedAt: product.createdAt || product.updatedAt,
	};
};

