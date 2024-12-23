import {ACTIONS} from '../../utils';

export const addComment = (comment) => ({
	type: ACTIONS.COMMENT_ADD,
	payload: comment,
});
