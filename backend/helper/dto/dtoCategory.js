module.exports = function (category) {
    return {
        id: category._id,
        name: category.name,
        imageUrl: category.imageUrl,
    };
};