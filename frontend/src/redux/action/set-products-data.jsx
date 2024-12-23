import { ACTIONS } from '../../utils';

export const setProductsData = (data) => ({
	type: ACTIONS.PRODUCTS_SET,
	payload: data,
});
