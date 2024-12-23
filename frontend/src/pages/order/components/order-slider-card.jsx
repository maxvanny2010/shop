import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '../../../component/index.jsx';
import { getFormatDate, SYMBOLS } from '../../../utils/index.jsx';
import { useDispatch } from 'react-redux';
import { removeOrderAsync } from '../../../redux/action/index.jsx';

export const OrderSliderCardComponent = ({ className, order }) => {
	const { orderId, totalPrice, shipmentPrice, createdAt } = order;
	const dispatch = useDispatch();
	const handlerRemoveOrder = (event) => {
		event.preventDefault();
		dispatch(removeOrderAsync(orderId));
	};
	return (
		<div className={className}>
			<div className="order-header">
				<div className="order-title">
					<div className="order-product-text">Order #</div>
					<div>{orderId.toString().substring(0, 6)}</div>
				</div>
				<div className="order-products">
					<div className="published-at">
						<Icon
							inactive="true"
							id="fa-calendar-o"
							margin="0"
							padding="0"
							size="14px"
						/>
						<div>{getFormatDate(createdAt)}</div>
						<div className="product-card-remove">
							<Icon
								size="10px"
								id="fa-times"
								padding="0"
								onClick={handlerRemoveOrder}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="order-shipment">
				<div className="order-shipment-text">Shipment:</div>
				<div className="order-price smaller">
					<div>{shipmentPrice}</div>
					<div>{SYMBOLS.EURO}</div>
				</div>
			</div>
			<div className="order-total">
				<div className="order-total-text">Total price:</div>
				<div className="order-price ">
					<div>{totalPrice}</div>
					<div>{SYMBOLS.EURO}</div>
				</div>
			</div>
		</div>
	);
};
export const OrderSliderCard = styled(OrderSliderCardComponent)`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 5px;
	gap: 10px;
	border-bottom: 1px solid darkgrey;

	.product-card-remove {
		flex-grow: 1;
		text-align: right;
		color: grey;
		text-shadow: rgba(0, 0, 0, 0.5) 1px 1px;
	}

	.published-at {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
		font-size: 10px;
	}

	.order-title {
		display: flex;
		align-self: center;
		gap: 10px;
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		font-weight: bolder;
		align-items: center;
		background: lightgrey;
		padding: 0 5px;
		border-radius: 3px;
	}

	.order-products,
	.order-shipment,
	.order-total {
		display: flex;
		justify-content: space-between;
		padding: 0 5px;
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
		font-weight: bolder;
	}

`;
OrderSliderCardComponent.propTypes = {
	className: PropTypes.string,
	order: PropTypes.object,
};
