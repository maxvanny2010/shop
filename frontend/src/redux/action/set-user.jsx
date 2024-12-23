import {ACTIONS} from '../../utils';

export const setUser = (session) => ({
	type: ACTIONS.USER_SET,
	payload: session,
});
