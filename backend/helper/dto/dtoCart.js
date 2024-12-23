module.exports = function (cart) {
    return {
        id: cart._id,
        user: cart.user._id,
        totalPrice: cart.totalPrice,
        productsPrice: cart.productsPrice,
        shipmentPrice: cart.shipmentPrice,
        products: cart.products,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
    };
};
