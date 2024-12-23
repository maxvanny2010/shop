import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, selectUserRole } from '../../../../redux/selectors';
import { Counter } from '../counter/counter.jsx';
import { useState } from 'react';
import { Comments } from '../comments/comments.jsx';
import { ROLE, SYMBOLS } from '../../../../utils/index.jsx';
import { addProductCartAsync } from '../../../../redux/action/index.jsx';

export const ProductContentContainer = ({
											className,
										}) => {
	const product = useSelector(selectProduct);
	const {
		name,
		price,
		imageUrl,
		quantity,
		description,
		id,
	} = product;
	const dispatch = useDispatch();
	const [isOpenedCharacteristics, setIsOpenedCharacteristics] = useState(false);
	const [isOpenedReviews, setIsOpenedReviews] = useState(false);
	const userRole = useSelector(selectUserRole);
	const isAdmin = userRole === ROLE.ADMIN;
	const isGuest = userRole === ROLE.GUEST;
	const [counters, setCounters] = useState(1);
	const handleButtonAddToCart = (event) => {
		event.preventDefault();
		dispatch(addProductCartAsync(id, counters));
	};
	const toggleCharacteristics = () => setIsOpenedCharacteristics(!isOpenedCharacteristics);
	const toggleReviews = () => setIsOpenedReviews(!isOpenedReviews);
	return (
		<div className={className}>
			<div className="product-header">
				<img src={imageUrl}
					 alt={imageUrl} />
				<div className={quantity > 0 ? 'available' : 'available-not'}>available</div>
				<div className="product-name">{name}</div>
				<div className="product-price">
					<div>{price}</div>
					<div>{SYMBOLS.EURO}</div>
				</div>
				<div className="product-counter">
					<Counter counter={counters}
							 setCounter={setCounters} />
				</div>
				<button className="add-to-chart"
						disabled={isGuest || isAdmin}
						onClick={handleButtonAddToCart}>
					{userRole !== ROLE.GUEST
						? (isAdmin ? 'ADMIN MODE' : `ADD TO CHART`)
						: 'GUEST MODE'}
				</button>
				<div className="header-characteristics"
					 onClick={() => toggleCharacteristics()}
				>
					<span className="toggle-arrow">{isOpenedCharacteristics ? '▼' : '◁'}</span>
					<span className="characteristics">CHARACTERISTICS</span>
					{isOpenedCharacteristics && (<div className="product-text">{description}</div>)}
				</div>
				<div className="header-characteristics"
					 onClick={() => toggleReviews()}
				>
					<span className="toggle-arrow">{isOpenedReviews ? '▼' : '◁'}</span>
					<span className="characteristics">REVIEWS</span>
				</div>
				{isOpenedReviews && (<Comments />)}
			</div>
		</div>
	);
};
export const ProductContent = styled(ProductContentContainer)`
	display: flex;
	flex-direction: column;
	transition: transform 0.1s ease;

	.add-to-chart {
		background: green;
		font-weight: bolder;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		margin-bottom: 10px;
	}

	.add-to-chart:hover {
		background: forestgreen;
	}

	.add-to-chart:active {
		transform: scale(0.95);
	}

	.toggle-arrow {
		color: #007bff;
	}

	.toggle-arrow:active {
		transform: scale(0.95);

	}

	& img {
		min-width: 400px;
		height: 200px;
		float: left;
		margin: 10px 60px 10px 50px;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.header-characteristics {
		position: relative;
		margin: 20px 0 0 50px;
		width: calc(100% - 110px);
		background: #e3dede;
		border-radius: 4px;
		cursor: pointer;
		display: block;
		text-align: left;
		padding: 10px 20px;
	}

	.characteristics {
		font-size: 14px;
		font-weight: bolder;
		padding: 0 20px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.product-price, .product-name {
		font-weight: bolder;
		font-size: 24px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.product-price {
		display: flex;
		justify-content: flex-start;
		gap: 5px;
	}

	.product-counter {
		margin-bottom: 35px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.product-header {
		position: relative;
	}

	.available {
		color: #03d303;
		font-weight: bolder;
		text-shadow: 1px 1px 2px rgba(238, 234, 234, 0.5);
	}

	.available-not {
		color: #d8e0d8;
		font-weight: bolder;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	& .product-text {
		margin: 10px 0 0 0;
		font-size: 18px;
		white-space: pre-line;
	}
`;

ProductContentContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		imageUrl: PropTypes.string,
		publishedAt: PropTypes.string,
		content: PropTypes.string,
	}),

};
