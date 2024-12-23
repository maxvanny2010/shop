import { METHOD, PATH, requests } from '../../utils';
import { addComment } from './add-comment.jsx';

export const addCommentAsync = (id, content) => (dispatch) => {
	requests(`${PATH.PRODUCTS}/${id}${PATH.COMMENTS}`,
		METHOD.POST, { content },
	).then((data) => {
		dispatch(addComment(data));
	});
};
