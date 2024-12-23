import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';
import { getSortProductsAsync } from '../../redux/action/index.jsx';

const ButtonSortComponent = ({ className, field }) => {
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const [sort, setSort] = useState(false);
	const [isSorting, setIsSorting] = useState(false);
	const handleSort = async (field) => {
		setIsSorting(true);
		const direction = sort ? 'asc' : 'desc';
		dispatch(getSortProductsAsync(field, direction))
			.then(() => setSort(!sort))
			.finally(() => setIsSorting(false));
	};

	return (
		<>
			<button
				type="button"
				className={className}
				disabled={products.length === 0 || isSorting}
				onClick={async (event) => {
					event.stopPropagation();
					await handleSort(field);
				}}
			>{sort ? '▲' : '▼'}
			</button>
		</>
	);
};
export const ButtonSort = styled(ButtonSortComponent)`
	all: unset;
	cursor: pointer;
	font-size: 0.8em;
	color: #555;

	&:hover {
		color: #000;
	}

	&[disabled] {
		cursor: default;
		color: #ccc;
		opacity: 0.5;
	}

	&[disabled]:hover {
		color: #ccc;
		opacity: 0.5;
	}
`;
ButtonSortComponent.propTypes = {
	className: PropTypes.string,
	field: PropTypes.string,
};
