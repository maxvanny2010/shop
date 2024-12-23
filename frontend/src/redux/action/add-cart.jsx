import {ACTIONS} from '../../utils';

export const addCart = (data) => ({
	type: ACTIONS.CART_ADD,
	payload: data,
});
