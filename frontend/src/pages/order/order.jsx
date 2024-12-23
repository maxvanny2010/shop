import * as yup from 'yup';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { AuthErrorForm, Input } from '../../component/index.jsx';
import { selectCart, selectUserLogin } from '../../redux/selectors/index.jsx';
import { COUNTRIES, ERROR, METHOD, PATH, requests, SUCCESS, SYMBOLS } from '../../utils/index.jsx';
import { addOrder, CLEAR_CART } from '../../redux/action/index.jsx';
import { StyleSelect } from '../users/components/index.jsx';
import { ToolTip } from './components/index.jsx';

const regFormSchema = yup.object().shape({
	name: yup.string()
		.required('Name is required')
		.matches(/^[a-zA-Z]+$/, 'Invalid name format')
		.min(3, 'Name: min 3 symbols')
		.max(10, 'Name: max 10 symbols'),
	phone: yup.string()
		.required('Phone is required')
		.matches(/^\(\d{3}\)\d{2}-\d{2}$/, '(xxx)xx-xx format')
		.min(5, 'Phone: min 5 symbols')
		.max(15, 'Phone: max 15 symbols'),
	email: yup.string()
		.required('Email is required')
		.email('Invalid email format')
		.min(5, 'Email: min 5 symbols')
		.max(15, 'Email: max 15 symbols'),
	address: yup.string()
		.required('Address is required')
		.matches(/^[a-zA-Z\s]+$/, 'Invalid Address format')
		.min(3, 'Address: min 3 symbols')
		.max(30, 'Address: max 10 symbols'),
});


export const OrderContainer = ({ className }) => {
	const email = useSelector(selectUserLogin);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorServer, setErrorServer] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isFormValid, setIsFormValid] = useState(true);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: 'Smith', phone: '(222)22-22', email: email, address: 'Church street',
		},
		resolver: yupResolver(regFormSchema),
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector(selectCart);
	const { id, totalPrice, shipmentPrice, productsPrice } = cart;
	const [countries, setCountries] = useState(['']);
	const [selectedCountry, setSelectedCountry] = useState('');
	useEffect(() => {
		setCountries(COUNTRIES);
		setSelectedCountry(COUNTRIES[0]);
	}, []);
	const onCountryChanged = ({ target }) => {
		setSelectedCountry(target.value);
	};
	const onSubmit = async ({ name, phone, email, address }) => {
		if (Object.keys(errors).length > 0) {
			setIsFormValid(false);
			return;
		}
		try {
			setIsLoading(true);
			setIsFormValid(true);
			const orderRequest = { name, phone, email, country: selectedCountry, address };
			const { data, error } = await requests(`${PATH.ORDERS}`, METHOD.POST, orderRequest);
			if (data) {
				setIsSuccess(true);
				setTimeout(() => {
					dispatch(addOrder(data));
					dispatch(CLEAR_CART);
					reset();
					setIsSuccess(false);
					navigate(`${PATH.CATEGORIES}${PATH.CATALOG}${PATH.PRODUCTS}`);
				}, 3000);
			} else setErrorServer(`${error}`);
		} catch (err) {
			setErrorServer(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const error =
			errors?.name?.message
			|| errors?.last?.message
			|| errors?.phone?.message
			|| errors?.email?.message
			|| errors?.address?.message;
		setErrorMessage(error || errorServer);
	}, [errors, errorServer]);

	useEffect(() => {
		if (errorMessage || !isFormValid) {
			const timeout = setTimeout(() => {
				setErrorMessage('');
			}, 1000);
			return () => clearTimeout(timeout);
		}
	}, [errorMessage, isFormValid]);
	return (
		<div className={className}>
			<div className="form-container">
				<h1>Place an order</h1>
				<form id="order-from"
					  onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="first-name">Name</label>
						<Input type="text"
							   name="first-name"
							   id="first-name"
							   autoComplete="given-name"
							   placeholder="your name..."
							   {...register('name', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>
					<div>
						<label htmlFor="phone">Phone</label>
						<Input type="tel"
							   name="phone"
							   id="phone"
							   autoComplete="tel"
							   placeholder="(_) __-__"
							   {...register('phone', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<Input type="email"
							   name="email"
							   id="email"
							   autoComplete="email"
							   placeholder="example@mail.com"
							   {...register('email', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>
					<div>
						<label htmlFor="country">Country delivery</label>
						<StyleSelect
							id="country"
							autoComplete="country"
							value={selectedCountry}
							onChange={onCountryChanged}
						>
							{
								countries.length > 0 && countries.map((state, index) => (
									<option key={index}
											value={state}>{state}</option>
								))
							}
						</StyleSelect>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<Input type="text"
							   name="address"
							   id="address"
							   autoComplete="street-address"
							   placeholder="your address..."
							   {...register('address', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>
					<button type="submit"
							disabled={isLoading || !isFormValid}>
						{isLoading ? 'Loading...' : 'Confirm order'}
					</button>
					{errorMessage &&
						<AuthErrorForm>{errorMessage}</AuthErrorForm>
					}
				</form>
			</div>
			<div className="order-summary">
				<div className="order-header">
					<div className="order-product-text">Order #</div>
					<div>{id.toString().substring(0, 6)}</div>
				</div>
				<hr />
				<div className="order-products">
					<div className="order-products-text smaller">Product cost:</div>
					<div className="order-price smaller">
						<div>{productsPrice}</div>
						<div>{SYMBOLS.EURO}</div>
					</div>
				</div>
				<div className="order-shipment">
					<div className="order-shipment-text ">Shipment:</div>
					<div className="order-price smaller">
						<div>{shipmentPrice}</div>
						<div>{SYMBOLS.EURO}</div>
					</div>
				</div>
				<hr />
				<div className="order-total">
					<div className="order-total-text">Total price:</div>
					<div className="order-price ">
						<div>{totalPrice}</div>
						<div>{SYMBOLS.EURO}</div>
					</div>
				</div>
			</div>
			{isSuccess && <ToolTip message={SUCCESS.ORDER_CONFIRM}
								   success="true" />}
			{!isFormValid && <ToolTip message={ERROR.FORM_NOT_VALID} />}
			{errorMessage && <ToolTip message={errorMessage} />}
		</div>

	);
};
export const Order = styled(OrderContainer)`
	width: 90%;
	max-width: 1200px;
	margin: 20px auto;
	display: flex;
	gap: 20px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

	.order-header {
		display: flex;
		justify-content: flex-start;
		font-weight: bolder;
	}

	.order-products,
	.order-shipment,
	.order-total {
		display: flex;
		justify-content: space-between;
	}

	.order-total-text,
	.order-shipment-text,
	.order-products-text {
		font-weight: bolder;
	}

	.order-shipment-text,
	.order-products-text {
		font-size: 14px;
	}

	.smaller {
		font-size: 14px;
	}

	.order-price {
		display: flex;
		justify-content: flex-end;
	}

	.form-container {
		flex: 2;
		background: white;
		padding: 20px;
		border-radius: 8px;
	}

	.order-summary {
		flex: 1;
		background: #eae5e5;
		padding: 20px;
		border-radius: 8px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	h1 {
		margin-bottom: 10px;
		font-size: 24px;
	}

	label {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
	}

	input, select, textarea {
		width: 100%;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	button {
		background-color: red;
		color: white;
		border: none;
		padding: 10px 20px;
		cursor: pointer;
		border-radius: 4px;
		font-size: 16px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	button:hover {
		background-color: darkred;
	}

	.order-summary img {
		width: 50px;
		margin-right: 10px;
	}
`;
OrderContainer.propTypes = {
	className: PropTypes.string,
};
