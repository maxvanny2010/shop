import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, StyledLink } from '../../../../component';
import { PATH, SYMBOLS } from '../../../../utils';

const ProductCardComponent = ({
								  className,
								  product,
							  }) => {
	const { id, name, price, imageUrl, category: { name: categoryName }, comments } = product;
	return (
		<div className={className}>
			<StyledLink to={price !== 0.00 ? `${PATH.PRODUCTS}/${id}` : '#'}
						color="#212121"
			>
				<img src={imageUrl}
					 alt={imageUrl}
				/>
				<div className="product-card-footer">
					<div className="product-card-title">
						<div className="card-item">{name}</div>
						<div className="card-item">{price !== 0.00 ? price + SYMBOLS.EURO : ''}</div>
					</div>
					<div className="product-card-info">
						<div>{categoryName}</div>
						<div className="comments-count">
							<Icon
								inactive="true"
								id="fa-comments-o"
								margin="0 7px 0 0"
								padding="0"
								size="18px"
							/>
							<div>{comments}</div>
						</div>
					</div>
				</div>
			</StyledLink>
		</div>
	);
};
export const ProductCard = styled(ProductCardComponent)`
	display: flex;
	flex-direction: column;
	width: 250px;
	margin: 26px;
	padding: 20px;
	font-weight: bolder;
	box-shadow: 0 4px 8px rgba(77, 72, 72, 0.2);

	& img {
		display: block;
		border-radius: 5px;
		box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
		margin: 0;
		padding: 2px;
	}

	.product-card-footer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.product-card-title {
		display: flex;
		justify-content: space-between;
	}

	& .product-card-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		gap: 10px;
		border-bottom: 1px solid #6b9317;
	}

	.comments-count {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	a:hover {
		color: #211e1e;
		text-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
	}

`;
ProductCardComponent.propTypes = {
	className: PropTypes.string,
};
ProductCardComponent.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};
