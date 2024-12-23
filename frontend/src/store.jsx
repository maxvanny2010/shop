import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import {
	appReducer,
	cartReducer,
	categoriesReducer,
	ordersReducer,
	productReducer,
	productsReducer,
	userReducer,
} from './redux/reducers';

const reducer = combineReducers({
	user: userReducer,
	product: productReducer,
	products: productsReducer,
	orders: ordersReducer,
	categories: categoriesReducer,
	cart: cartReducer,
	app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();
export const store =
	createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));


