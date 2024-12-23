import {ACTIONS} from '../../utils';

const initialCartState = {
	id: '',
	productsPrice: 0,
	shipmentPrice: 0,
	totalPrice: 0,
	createdAt: '',
	updatedAt: '',
	products: [],
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTIONS.CART_ADD: {
			const {
				id = '',
				productsPrice = 0,
				shipmentPrice = 0,
				totalPrice = 0,
				updatedAt = '',
				createdAt = '',
				products = [],
			} = action.payload;
			return {
				...state,
				id: id,
				productsPrice: productsPrice,
				shipmentPrice: shipmentPrice,
				totalPrice: totalPrice,
				createdAt: createdAt,
				updatedAt: updatedAt,
				products: products,
			};
		}

		case ACTIONS.CLEAR_CART: {
			return initialCartState;
		}
		default:
			return state;
	}
};
