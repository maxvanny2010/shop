import {ACTIONS} from '../../utils';

export const addOrder = (order) => ({
	type: ACTIONS.ORDER_ADD,
	payload: order,
});
