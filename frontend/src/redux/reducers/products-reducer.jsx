import { ACTIONS, PAGINATION_LIMIT } from '../../utils';

const initialProductsState = {
	products: [],
	page: 0,
	totalPages: 0,
	totalProducts: 0,
};
export const productsReducer = (state = initialProductsState, action) => {

		switch (action.type) {
			case ACTIONS.PRODUCTS_SET: {
				const { data } = action.payload;
				const {
					products,
					page,
					totalPages,
					totalProducts,
				} = data;
				return {
					...state,
					products: products || [],
					page: page || 0,
					totalPages: totalPages || 0,
					totalProducts: totalProducts || 0,
				};
			}
			case ACTIONS.PRODUCT_REMOVE: {
				const { id } = action.payload;
				const updatedProducts = state.products.filter(product => product.id !== id);
				const updatedTotalProducts = updatedProducts.length;
				const updatedTotalPages = updatedTotalProducts === 0
					? 0
					: Math.ceil(updatedTotalProducts / PAGINATION_LIMIT);

				return {
					...state,
					products: updatedProducts,
					page: updatedTotalProducts === 0 ? 0 : state.page,
					totalPages: updatedTotalPages,
					totalProducts: updatedTotalProducts,
				};
			}
			case ACTIONS.PRODUCTS_UPDATE: {
				const { data } = action.payload;
				const updatedProducts = state.products.map(product => {
					return product.id === data.id ? { ...product, ...data } : product;
				});
				return {
					...state,
					products: updatedProducts,
				};
			}
			default:
				return state;
		}
	}
;
