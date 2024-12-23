import { removeComment } from './remove-comment.jsx';
import { METHOD, PATH, requests } from '../../utils';

export const removeCommentAsync = (id) => (dispatch) => {
	let url = `${PATH.PRODUCTS}${PATH.COMMENTS}/${id}`;
	requests(url, METHOD.DELETE).then(({ error }) => {
		if (!error) dispatch(removeComment(id));
	});
};
