import { ACTIONS } from '../../utils';

export const setOrders = (data) => ({
	type: ACTIONS.ORDERS_SET,
	payload: data,
});
