import {ERROR, METHOD, PATH, requests} from '../../utils/index.jsx';
import {setProductsData} from './set-products-data.jsx';

export const getProductsBySearchAdminAsync = (debouncedSearchPhrase) => (dispatch) => {
	return requests(`${PATH.PRODUCTS}`,
		METHOD.GET,
		null,
		{search: debouncedSearchPhrase})
		.then((data) => dispatch(setProductsData(data)))
		.catch((err) => console.error(ERROR.PRODUCTS_NOT_FOUND, err));
};
