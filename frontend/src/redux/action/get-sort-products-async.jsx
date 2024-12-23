import { ERROR, METHOD, PATH, requests } from '../../utils/index.jsx';
import { setProductsData } from './set-products-data.jsx';

export const getSortProductsAsync = (field, direction) => async (dispatch) => {
	try {
		const data = await requests(`${PATH.PRODUCTS}`, METHOD.GET, null, {
			field: field,
			sort: direction,
		});
		dispatch(setProductsData(data));
		return data;
	} catch (err) {
		console.error(ERROR.PRODUCTS_NOT_FOUND, err);
	}
};
