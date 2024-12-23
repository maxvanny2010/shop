import {ERROR, METHOD, PATH, requests} from '../../utils/index.jsx';
import {setCategories} from './set-categories.jsx';

export const getCategoriesAsync = () => (dispatch) => {
	requests(`${PATH.CATEGORIES}`, METHOD.GET, null)
		.then(({data: {categories}}) => dispatch(setCategories(categories)))
		.catch((err) => console.error(ERROR.CATEGORIES_NOT_FOUND, err));
};
