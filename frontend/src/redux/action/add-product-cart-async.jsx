import { METHOD, PATH, requests } from '../../utils/index.jsx';
import { addCart } from './add-cart.jsx';

export const addProductCartAsync = (id, counters) => (dispatch) => {
	requests(`${PATH.CARTS}`, METHOD.POST, { id, counters })
		.then(({ data: { cart } }) => {
			dispatch(addCart(cart));
		});
};
