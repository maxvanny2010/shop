import { METHOD, PATH, requests, STORAGE_USER_DATA } from '../../utils/index.jsx';
import { setUser } from './set-user.jsx';
import { CLOSE_LOGIN } from './close-login.jsx';

export const loginAsync = (login, password, setServerError) => (dispatch) => {
	requests(`${PATH.LOGIN}`, METHOD.POST, { login, password })
		.then(({ error, user }) => {
			if (error) {
				setServerError(`${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem(STORAGE_USER_DATA, JSON.stringify(user));
			dispatch(CLOSE_LOGIN);
		});
};
