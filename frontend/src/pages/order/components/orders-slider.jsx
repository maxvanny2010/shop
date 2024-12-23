import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {Navigate} from 'react-router-dom';
import {ROLE} from '../../../utils/index.jsx';
import {CLOSE_ORDERS, getOrdersAsync} from '../../../redux/action/index.jsx';
import {selectOrders, selectSideOrders, selectUserId, selectUserRole} from '../../../redux/selectors/index.jsx';
import {Button, Icon, SideActivator} from '../../../component/index.jsx';
import {OrderSliderCard} from './order-slider-card.jsx';
import {useEffect} from 'react';
import {useScrollBodyControl} from '../../../hooks/index.jsx';

export const OrdersSlider = ({className}) => {
		const dispatch = useDispatch();
		const roleId = useSelector(selectUserRole);
		const isUserLoggedIn = useSelector(selectUserId);
		const isOpen = useSelector(selectSideOrders);
		const orders = useSelector(selectOrders);
		const isAdmin = roleId === ROLE.ADMIN;
		const handlerOrder = () => {
			dispatch(CLOSE_ORDERS);
		};
		useEffect(() => {
			if (isUserLoggedIn && !isAdmin) dispatch(getOrdersAsync());
		}, [dispatch, isAdmin, isUserLoggedIn]);
		useScrollBodyControl(isOpen);
		if (roleId !== ROLE.USER) return <Navigate to={`#`}/>;
		if (!isOpen) return null;
		return (
			<OrderSliderContainer $isOpen={isOpen}
								  className={className}>
				<div className="orders-container">
					<div className="orders-header">
						<div className="orders-title">{'Orders'}</div>
						<SideActivator action={CLOSE_ORDERS}>
							<Icon width="400px"
								  id="fa-times"
								  margin="0 0 0 10px"
								  size="18px"
							/>
						</SideActivator>
					</div>
					<div className="orders">
						{orders.length > 0 ? (
							orders.map((order, index) => (
								<OrderSliderCard
									key={index}
									order={order}
								/>
							))
						) : (
							<p>No orders found.</p>
						)}
					</div>


				</div>

				<div className="orders-footer">
					<Button onClick={handlerOrder}>
						{'CLOSE ORDERS WINDOW'}
					</Button>
				</div>
			</OrderSliderContainer>
		);
	}
;
export const OrderSliderContainer = styled.div`
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

	.orders-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex-grow: 1;
		overflow-y: auto;
	}

	.orders-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid darkgrey;
	}

	.orders-title {
		font-size: 20px;
		font-weight: bolder;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.orders-footer {
		position: sticky;
		bottom: 0;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		margin: 10px;
		padding: 5px;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
	}
`;

OrdersSlider.propTypes = {
	className: PropTypes.string,
};
