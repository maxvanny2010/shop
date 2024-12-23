import {ACTIONS} from '../../utils';

export const removeComment = (commentId) => ({
	type: ACTIONS.COMMENT_REMOVE,
	payload: commentId,
});
