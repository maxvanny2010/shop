import { ACTIONS } from '../../utils';

export const updateProducts = (data) => ({
	type: ACTIONS.PRODUCTS_UPDATE,
	payload: { data },
});
