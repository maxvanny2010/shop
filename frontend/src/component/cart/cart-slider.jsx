import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {PATH, ROLE, SYMBOLS} from '../../utils';
import {Button, CartProductCard, Icon, SideActivator} from '../../component';
import {selectCart, selectSideCart, selectUserRole} from '../../redux/selectors';
import {CLOSE_CART} from '../../redux/action';
import {Navigate, useNavigate} from 'react-router-dom';
import {useScrollBodyControl} from '../../hooks/index.jsx';

export const CartSlider = ({className}) => {
		const dispatch = useDispatch();
		const navigate = useNavigate();
		const roleId = useSelector(selectUserRole);
		const isOpen = useSelector(selectSideCart);
		const cart = useSelector(selectCart);
		const {products, shipmentPrice, productsPrice, totalPrice} = cart;
		const handlerOrder = () => {
			dispatch(CLOSE_CART);
			navigate(`${PATH.ORDERS}`);
		};
		const handlerContinueShopping = () => {
			dispatch(CLOSE_CART);
		};
		useScrollBodyControl(isOpen);
		if (roleId !== ROLE.USER) return <Navigate to={`#`}/>;
		if (products.length === 0) dispatch(CLOSE_CART);
		if (!isOpen) return null;
		return (
			<CartContainer $isOpen={isOpen}
						   className={className}>
				<div className="cards-container">
					<div className="cart-header">
						<div className="cart-title">{'Cart'}</div>
						<SideActivator action={CLOSE_CART}>
							<Icon width="400px"
								  id="fa-times"
								  margin="0 0 0 10px"
								  size="18px"
							/>
						</SideActivator>
					</div>
					<div className="cards">
						{
							products.length > 0 && products.map(({product}, index) => (
								<CartProductCard
									key={index}
									product={product}
								>
								</CartProductCard>))
						}
					</div>
				</div>

				<div className="cart-footer">
					<div className="cart-products-price">
						<div className="cart-products-text">Products cost:</div>
						<div className="cart-products-price">{productsPrice + SYMBOLS.EURO}</div>
					</div>
					<div className="cart-ship">
						<div className="cart-ship-text">Shipment:</div>
						<div className="cart-ship-price">{shipmentPrice + SYMBOLS.EURO}</div>
					</div>
					<div className="cart-total">
						<div className="cart-total-text">Total Price:</div>
						<div className="cart-total-price">{totalPrice + SYMBOLS.EURO}</div>
					</div>
					<Button onClick={handlerOrder}>{'CONFIRM'}</Button>
					<Button onClick={handlerContinueShopping}>{'CONTINUE SHOPPING'}</Button>
				</div>
			</CartContainer>
		);
	}
;
export const CartContainer = styled.div`
	z-index: 3;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	right: 0;
	top: 0;
	height: 100vh;
	width: 450px;
	padding: 20px;
	background: white;
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
	transform: ${({$isOpen}) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
	transition: transform 0.3s ease;

	.cards-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex-grow: 1;
		overflow-y: auto;
	}

	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid darkgrey;
	}

	.cart-title {
		font-size: 20px;
		font-weight: bolder;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.cart-footer {
		position: sticky;
		bottom: 0;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 10px;
		margin: 10px;
		padding: 5px;
	}

	.cart-total,
	.cart-ship,
	.cart-products-price {
		display: flex;
		justify-content: space-between;
	}

	.cart-total-text,
	.cart-total-price {
		font-weight: bolder;
		font-size: 18px;
	}

	.cart-ship-text,
	.cart-ship-price,
	.cart-products-price,
	.cart-products-text {
		font-weight: bolder;
		font-size: 14px;
	}

	.cart-ship {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
`;
CartSlider.propTypes = {
	className: PropTypes.string,
};
