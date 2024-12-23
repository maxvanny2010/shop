import {METHOD, PATH, requests} from '../../utils';
import {setComments} from './set-comments.jsx';

export const setCommentsAsync = (id) => (dispatch) => {
	requests(`${PATH.PRODUCTS}/${id}${PATH.COMMENTS}`, METHOD.GET)
		.then((data) => {
			dispatch(setComments(data ? data : []));
		});
};
