import {ACTIONS} from '../../utils';

export const setComments = (data) => ({
	type: ACTIONS.COMMENTS_SET,
	payload: data,
});
