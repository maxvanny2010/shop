import placeholder from '@assets/img/placeholder.jpg';
import {PAGINATION_LIMIT} from '../constants/data/pagination-limit.jsx';

export function fakeCategory(categories) {
	const fakeCategoriesCount = Math.max(0, PAGINATION_LIMIT - categories.length);

	return Array.from({length: fakeCategoriesCount}, (_, index) => ({
		id: `fake-${index}`,
		name: 'category missing...',
		imageUrl: placeholder,
	}));
}
