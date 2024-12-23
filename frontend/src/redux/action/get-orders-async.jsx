import { ERROR, METHOD, PATH, requests } from '../../utils/index.jsx';
import { setOrders } from './set-orders.jsx';

export const getOrdersAsync = () => (dispatch) => {
	requests(`${PATH.ORDERS}`, METHOD.GET)
		.then(({ data }) => {
			dispatch(setOrders(data));
		}).catch((err) => console.error(ERROR.ORDER_NOT_FOUND, err));
};
