import { ERROR, METHOD, PATH, requests } from '../../utils/index.jsx';
import { setProductsData } from './set-products-data.jsx';

export const getProductsDataAsync = (page) => (dispatch) => {
	requests(`${PATH.PRODUCTS}`,
		METHOD.GET,
		null,
		{ page })
		.then((data) => dispatch(setProductsData(data)))
		.catch((err) => console.error(ERROR.PRODUCTS_NOT_FOUND, err));
};
