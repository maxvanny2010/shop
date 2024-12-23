import { ACTIONS } from '../../utils';

const initialCategoryState = {
	categories: [{ id: 'catalog', name: 'Catalog', imageUrl: '/access/images/colors/catalog/brown.jpg' }],
};
export const categoriesReducer = (state = initialCategoryState, action) => {
	switch (action.type) {
		case ACTIONS.CATEGORIES_SET: {
			return {
				...state,
				categories: [
					...state.categories.filter((category) => category.id === 'catalog'),
					...action.payload.filter((category) => category.id !== 'catalog'),
				],
			};
		}
		case ACTIONS.CATEGORY_ADD: {
			const { data } = action.payload;
			return {
				...state,
				categories: [...state.categories, data],
			};
		}
		case ACTIONS.CATEGORY_UPDATE: {
			return {
				...state,
			};
		}
		case ACTIONS.CATEGORY_REMOVE: {
			return {
				...state,
			};
		}
		default:
			return state;
	}
};
