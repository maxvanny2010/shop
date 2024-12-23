module.exports = function (order) {
    return {
        orderId: order._id,
        userLogin: order.user.login,
        totalPrice: order.cart.totalPrice,
        shipmentPrice: order.cart.shipmentPrice,
        createdAt: order.createdAt,
    };
};
