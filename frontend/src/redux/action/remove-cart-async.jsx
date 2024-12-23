import { METHOD, PATH, requests } from '../../utils/index.jsx';
import { addCart } from './add-cart.jsx';

export const removeCartAsync = (id) => (dispatch) => {
	requests(`${PATH.CARTS}/${id}`, METHOD.DELETE)
		.then(({ data: { cart } }) => {
			dispatch(addCart(cart));
		});
};
