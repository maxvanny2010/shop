import { ACTIONS } from '../../utils';

const initialAppState = {
	isLogout: false,
	isLogin: false,
	isOrders: false,
	isRegister: false,
	isCart: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {
		},
		onCancel: () => {
		},
	},
};
export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTIONS.LOGOUT:
			return {
				...state,
				isLogout: !state.isLogout,
			};
		case ACTIONS.OPEN_LOGIN:
			return {
				...state,
				isLogin: true,
				isRegister: false,
				isOrders: false,
				isCart: false,
			};
		case ACTIONS.OPEN_REGISTER:
			return {
				...state,
				isRegister: true,
				isLogin: false,
				isOrders: false,
				isCart: false,
			};
		case ACTIONS.OPEN_CART:
			return {
				...state,
				isCart: true,
				isLogin: false,
				isRegister: false,
				isOrders: false,
			};
		case ACTIONS.OPEN_ORDERS:
			return {
				...state,
				isOrders: true,
				isLogin: false,
				isRegister: false,
				isCart: false,
			};
		case ACTIONS.CLOSE_LOGIN:
			return {
				...state,
				isLogin: false,
			};
		case ACTIONS.CLOSE_REGISTER:
			return {
				...state,
				isRegister: false,
			};
		case ACTIONS.CLOSE_CART:
			return {
				...state,
				isCart: false,
			};
		case ACTIONS.CLOSE_ORDERS:
			return {
				...state,
				isOrders: false,
			};
		case ACTIONS.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTIONS.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
