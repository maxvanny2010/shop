import {ACTIONS, METHOD, PATH, requests, STORAGE_USER_DATA} from '../../utils';

export const logoutAsync = () => async (dispatch) => {
	return await requests(`${PATH.LOGOUT}`, METHOD.GET).then(({error}) => {
		if (!error) {
			dispatch({type: ACTIONS.USER_REMOVE});
			sessionStorage.removeItem(STORAGE_USER_DATA);
		}
	});
};
