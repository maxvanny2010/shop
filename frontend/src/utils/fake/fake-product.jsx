import placeholder from '@assets/img/placeholder.jpg';
import {PAGINATION_LIMIT} from '../constants/data/pagination-limit.jsx';

export function fakeProduct(products) {
	const fakeProductsCount = Math.max(0, PAGINATION_LIMIT - products.length);
	return Array.from({length: fakeProductsCount}, (_, index) => ({
		id: `fake-${index}`,
		name: '',
		imageUrl: placeholder,
		price: 0.00,
		category: 'missing product...',
		quantity: 0,
		comments: 0,
	}));
}
