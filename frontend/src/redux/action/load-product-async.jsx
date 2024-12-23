import { setProductData } from './set-product-data.jsx';
import { PATH, requests } from '../../utils';

export const loadProductAsync = (productId) => (dispatch) => {
	return requests(`${PATH.PRODUCTS}/${productId}`).then((response) => {
		const { error } = response;
		if (error) return error;
		const { data: { product: product } } = response;
		if (product) dispatch(setProductData(product));
	});
};
