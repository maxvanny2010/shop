import { ERROR, METHOD, PATH, requests } from '../../utils/index.jsx';
import { removeProduct } from './remove-product.jsx';
import { CLOSE_MODAL } from './close-modal.jsx';

export const removeProductAsync = (id) => (dispatch) => {
	requests(`${PATH.PRODUCTS}/${id}`, METHOD.DELETE)
		.then(({ error }) => {
			if (!error) dispatch(removeProduct(id));
		})
		.catch((err) => console.error(ERROR.ORDER_NOT_FOUND, err))
		.finally(() => dispatch(CLOSE_MODAL),
		);
};
