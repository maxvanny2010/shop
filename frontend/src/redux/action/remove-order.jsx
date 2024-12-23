import { ACTIONS } from '../../utils';

export const removeOrder = (orderId) => ({
	type: ACTIONS.ORDER_REMOVE,
	payload: { orderId },
});
