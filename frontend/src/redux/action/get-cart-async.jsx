import {ERROR, METHOD, PATH, requests} from '../../utils/index.jsx';
import {addCart} from './add-cart.jsx';

export const getCartAsync = () => (dispatch) => {
	requests(`${PATH.CARTS}`, METHOD.GET)
		.then((data) => dispatch(addCart(data)))
		.catch((err) => console.error(ERROR.CART_NOT_FOUND, err));
};
