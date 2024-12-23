import { ACTIONS } from '../../utils';

export const removeProduct = (id) => ({
	type: ACTIONS.PRODUCT_REMOVE,
	payload: { id },
});
