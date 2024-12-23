const express = require('express');
const {
    add,
    get,
    update,
    remove,
    getProducts,
    extractProductData,
} = require('../controllers/product');
const {handlerError} = require('../helper/utils');
const {ADMIN, USER} = require('../constants/roles');
const {authenticated, hasRole} = require('../middlewares');
const {dtoComment, dtoProduct, dtoProducts} = require('../helper/dto');
const {addComment, deleteComment, getComments} = require('../controllers/comment');

const router = express.Router({mergeParams: true});

/* to get products by search, categoryId, limit, current page*/
router.get('/', async (req, res) => {
    try {
        const {products, page, totalPages, totalProducts} = await getProducts(
            req.query.search,
            req.query.categoryId,
            req.query.sort,
            req.query.field,
            req.query.limit,
            req.query.page,
        );
        return res.send({
            data: {
                page, totalPages, totalProducts,
                products: products.map(dtoProducts),
            },
        });
    } catch (error) {
        handlerError(res, error, 400);
    }
});
/* to get product by id */
router.get('/:id', async (req, res) => {
    try {
        const product = await get(req.params.id);
        return res.send({data: {product: dtoProduct(product)}});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
/* to add new Product by admin panel*/
router.post('/', authenticated, hasRole([ADMIN]), async (req, res) => {
    try {
        let product = extractProductData(req);
        const newProduct = await add(product);
        return res.send({data: dtoProduct(newProduct)});
    } catch (error) {
        handlerError(res, error, 400);
    }
});

/* update patch product by admin panel */
router.patch('/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
    try {
        const newProduct =
            await update(req.params.id, extractProductData(req));
        return res.send({data: dtoProduct(newProduct)});
    } catch (error) {
        handlerError(res, error, 400);
    }
});
/* delete product by admin panel */
router.delete('/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
    try {
        await remove(req.params.id);
        return res.send({error: null});
    } catch (error) {
        handlerError(res, error, 400);
    }
});

/* get comments to product by token and product id  */
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await getComments(req.params.id);
        const array = comments ? comments?.map(dtoComment) : [];
        return res.send({data: array});
    } catch (error) {
        handlerError(res, error, 400);
    }
});

/* add comment to product by token and product id  */
router.post('/:id/comments', authenticated, hasRole([ADMIN, USER]), async (req, res) => {
    try {
        const newComment =
            await addComment(
                req.params.id,
                {
                    content: req.body.content,
                    author: req.user.id,
                });
        return res.send({data: dtoComment(newComment)});
    } catch (error) {
        handlerError(res, error, 400);
    }
});

/* delete comment by admin */
router.delete('/comments/:id', authenticated, hasRole([ADMIN]), async (req, res) => {
    try {
        await deleteComment(req.params.id);
        res.send({error: null});
    } catch (error) {
        handlerError(res, error, 400);
    }
});

module.exports = router;
