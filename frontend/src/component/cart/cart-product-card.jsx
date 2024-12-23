import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { changeQuantityAsync, removeCartAsync } from '../../redux/action/index.jsx';
import { Icon } from '../header/components/icon/icon.jsx';
import { Counter } from '../../pages/product/components/index.jsx';
import { useEffect, useState } from 'react';
import { SYMBOLS } from '../../utils/index.jsx';
import { Button } from '../button/button.jsx';

export const CartProductCartComponent = ({ className, product }) => {
	const dispatch = useDispatch();
	const [counters, setCounters] = useState(1);
	const { id, name, imageUrl, price, counter } = product;
	const isChangeCounter = counters !== counter;
	const handlerRemoveProductFromCart = (event) => {
		event.preventDefault();
		dispatch(removeCartAsync(id));
	};
	const handlerQuantityProductCart = (event) => {
		event.preventDefault();
		dispatch(changeQuantityAsync(id, counters));
	};
	useEffect(() => {
		setCounters(counter);
	}, [counter]);

	return (
		<div className={className}>
			<div className="product-card-image">
				<img src={imageUrl}
					 alt={imageUrl}
				/>
			</div>
			<div className="product-card">
				<div className="product-card-title">
					<div className="card-name">{name}</div>
					<div className="cart-row-price-counter">
						<Counter counter={counters}
								 setCounter={setCounters}
								 sizeFactor={0.5}
						/>
						<div className="card-item">{price.toFixed(2) + SYMBOLS.EURO}</div>
					</div>
					<div className="product-card-handler">
						{isChangeCounter && <div className="button-wrapper">
							<Button
								width="67%"
								height="fit-content"
								fontSize="10px"
								onClick={handlerQuantityProductCart}
							>
								CONFIRM QUANTITY
							</Button>
						</div>
						}
						<div className="product-card-remove">
							<Icon
								size="24px"
								id="fa-trash-o"
								onClick={handlerRemoveProductFromCart}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export const CartProductCard = styled(CartProductCartComponent)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 5px;
	gap: 10px;
	border-bottom: 1px solid darkgrey;

	.button-wrapper {
		margin-top: 7px;
	}

	.cart-row-price-counter {
		all: unset;
	}

	.product-card-image {
		max-width: 40%;
	}

	.product-card-title {
		display: flex;
		flex-direction: column;
	}

	.product-card-handler {
		display: flex;
		justify-content: space-between;
	}

	.product-card {
		max-width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex-flow: wrap;
		padding: 5px;
	}

	.card-item {
		margin-bottom: 4px;
		font-weight: 700;
	}

	.card-name {
		padding-left: 5px;
		font-weight: 700;
		margin-bottom: 4px;
		background: #eeeeee;
		border-bottom: 1px solid darkgrey;
	}

	.cart-row-price-counter {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 70px;
		padding: 0 5px 0 5px;
		background: #eeeeee;
		text-shadow: rgba(0, 0, 0, 0.5) 1px 1px;
		border-bottom: 1px solid darkgrey;
	}

	.product-card-remove {
		flex-grow: 1;
		text-align: right;
		color: grey;
		padding-right: 5px;
		text-shadow: rgba(0, 0, 0, 0.5) 1px 1px;
	}
`;
CartProductCartComponent.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};
