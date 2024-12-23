import {ERROR, METHOD, PATH, requests} from '../../utils/index.jsx';
import {removeOrder} from './remove-order.jsx';

export const removeOrderAsync = (orderId) => (dispatch) => {
	requests(`${PATH.ORDERS}/${orderId}`, METHOD.DELETE)
		.then(({error}) => {
			console.log(error);
			if (!error) dispatch(removeOrder(orderId));
		}).catch((err) => console.error(ERROR.ORDER_NOT_FOUND, err));
};
