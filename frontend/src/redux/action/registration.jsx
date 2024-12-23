import {METHOD, PATH, requests} from '../../utils/index.jsx';
import {CLOSE_REGISTER} from './close-register.jsx';
import {OPEN_LOGIN} from './open-login.jsx';

export const registration = (login, password) => (dispatch) => {
	return requests(`${PATH.REGISTER}`,
		METHOD.POST, {login, password})
		.then(({error}) => {
			if (error) throw new Error(error);
			dispatch(CLOSE_REGISTER);
			dispatch(OPEN_LOGIN);
		});
};
