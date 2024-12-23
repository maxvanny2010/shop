import { ACTIONS } from '../../utils';

export const setProductData = (data) => ({
	type: ACTIONS.PRODUCT_SET,
	payload: data,
});
