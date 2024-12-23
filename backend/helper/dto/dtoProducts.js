module.exports = function (product) {
    return {
        id: product._id,
        category: product.category,
        name: product.name,
        price: parseFloat(product.price.toFixed(2)),
        imageUrl: product.imageUrl,
        quantity: product.quantity,
        comments: product.comments.length,
    };
};

