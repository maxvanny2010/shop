import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon} from '../../../component/index.jsx';
import {CLOSE_MODAL, openModal, removeProductAsync, setProductData} from '../../../redux/action/index.jsx';
import {useDispatch} from 'react-redux';


const ProductRowComponent = ({className, product}) => {
	const dispatch = useDispatch();
	const {id, name, category: {name: categoryName}, price, quantity, imageUrl} = product;

	const handlerRemoveProduct = (event) => {
		event.preventDefault();
		dispatch(openModal(
			{
				text: 'Remove product?',
				onConfirm: () => {
					dispatch(removeProductAsync(id));
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			},
		));

	};
	const handlerUpdateProduct = () => {

		dispatch(setProductData(product));
	};

	return (
		<tr className={className}>
			<td className="table-item">{id}</td>
			<td className="table-item">{name}</td>
			<td className="table-item">{categoryName}</td>
			<td className="table-item">{price}</td>
			<td className="table-item">{quantity}</td>
			<td className="table-item">
				<img src={imageUrl}
					 alt={imageUrl}
				/>
			</td>
			<td className="table-item">
				<div className="table-row-actions">
					<Icon
						size="20px"
						id="fa-times"
						padding="0"
						onClick={handlerRemoveProduct}
					/>
					<Icon
						size="20px"
						id="fa-pencil-square-o"
						padding="0"
						onClick={handlerUpdateProduct}
					/>
				</div>
			</td>
		</tr>
	);
};
export const ProductRow = styled(ProductRowComponent)`


	& img {
		display: block;
		border-radius: 5px;
		box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
		margin: 0;
		padding: 2px;
	}

	.table-row-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
ProductRowComponent.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};
