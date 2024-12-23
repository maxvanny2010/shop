import { ACTIONS, UNITS } from '../../utils';

const initialProductState = {
	product: {
		id: '',
		category: {},
		name: '',
		imageUrl: '',
		price: 0.00,
		quantity: 0,
		description: '',
		unit: UNITS.PIECES,
		comments: [],
	},
};
export const productReducer = (state = initialProductState, action) => {

	switch (action.type) {
		case ACTIONS.PRODUCT_SET:
		case ACTIONS.PRODUCT_UPDATE: {
			return {
				...state,
				product: {
					...state.product,
					...action.payload,
				},
			};
		}
		case ACTIONS.COMMENTS_SET: {
			const { data } = action.payload;
			return {
				...state,
				product: {
					...state.product,
					comments: data,
				},
			};
		}
		case ACTIONS.COMMENT_ADD: {
			const { data } = action.payload;
			return {
				...state,
				product: {
					...state.product,
					comments: data
						? [...state.product.comments, data]
						: state.product.comments,
				},
			};
		}
		case ACTIONS.COMMENT_REMOVE: {
			return {
				...state,
				product: {
					...state.product,
					comments: state.product.comments
						.filter((comment) => comment.id !== action.payload),
				},
			};
		}
		case ACTIONS.PRODUCT_CLEAR: {
			return initialProductState;
		}
		default:
			return state;
	}
};
