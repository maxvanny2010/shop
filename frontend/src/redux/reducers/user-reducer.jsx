import {ACTIONS, ROLE} from '../../utils';

const initialUserState = {
	id: null,
	login: null,
	session: null,
	roleId: ROLE.GUEST,
	cartId: null,
};
export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTIONS.USER_SET:
			return {
				...state,
				...action.payload,
			};
		case ACTIONS.USER_REMOVE:
			return initialUserState;
		default:
			return state;
	}
};
