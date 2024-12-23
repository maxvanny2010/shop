import {ERROR, METHOD, PATH, requests} from '../../utils/index.jsx';
import {setProductsData} from './set-products-data.jsx';

export const getProductsBySearchAsync = (debouncedSearchPhrase, categoryId) => (dispatch) => {
	requests(`${PATH.PRODUCTS}`,
		METHOD.GET,
		null,
		{search: debouncedSearchPhrase, categoryId})
		.then((data) => dispatch(setProductsData(data)))
		.catch((err) => console.error(ERROR.PRODUCTS_NOT_FOUND, err));
};
