import { ACTIONS } from '../../utils';

export const setCategories = (categories) => ({
	type: ACTIONS.CATEGORIES_SET,
	payload: categories,
});
