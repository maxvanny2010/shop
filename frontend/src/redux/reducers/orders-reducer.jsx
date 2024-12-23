import {ACTIONS} from '../../utils';

const initialCartState = {
	orders: [],
	//   orderId: string,
	//   userLogin: string,
	//   totalPrice: number,
	//   shipmentPrice: number,
	//   createdAt: string
};

export const ordersReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTIONS.ORDER_ADD: {
			const {order} = action.payload;
			return {
				...state,
				orders: [...state.orders, order],
			};
		}
		case ACTIONS.ORDERS_SET: {
			const {orders} = action.payload;
			return {
				...state,
				orders: orders,
			};
		}
		case ACTIONS.ORDER_REMOVE: {
			const {orderId} = action.payload;
			return {
				...state,
				orders: state.orders.filter(order => order.orderId !== orderId),
			};
		}
		case ACTIONS.ORDERS_CLEAR: {
			return initialCartState;
		}
		default:
			return state;
	}
};
