import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Button} from '../../../../component';
import {useEffect, useState} from 'react';
import {getProductsDataAsync} from '../../../../redux/action/index.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalPages} from '../../../../redux/selectors/index.jsx';

const PaginationComponent = ({
								 className,
							 }) => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const pageLast = useSelector(getTotalPages);
	useEffect(() => {
		if (page !== 1) {
			dispatch(getProductsDataAsync(page));
		}
	}, [page, dispatch]);
	return (
		<div className={className}>
			<Button
				disabled={page === 1}
				width="20px"
				margin="4px 4px 0 0"
				onClick={() => setPage(1)}> {'['} </Button>
			<Button
				disabled={page === 1}
				width="20px"
				onClick={() => setPage(page - 1)}> {'\u25C0'} </Button>
			<div className="current-page">{page}</div>
			<Button
				disabled={page === pageLast}
				width="20px"
				onClick={() => setPage(page + 1)}> {'\u25B6'} </Button>
			<Button
				disabled={page === pageLast}
				width="20px"
				onClick={() => setPage(pageLast)}> {']'} </Button>
		</div>
	);
};
export const Pagination = styled(PaginationComponent)`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 0 3px;

	& button {
		width: 30px;
		height: 30px;
		display: flex;
		font-size: 16px;
		margin: 7px 4px 0 0;
		align-items: center;
		justify-content: center;
		background-color: #ced2c7;
		color: #d0cdcd;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

		&:hover {
			color: ${({disabled}) => (disabled ? '' : 'white')};
			background-color: ${({disabled}) => (disabled ? '' : 'rgba(227,4,4,0.94)')};
			cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
		}
	}

	& .current-page {
		width: 50px;
		height: 40px;
		text-align: center;
		margin: 2px 8px 0 5px;
		padding-top: 8px;
		color: #6b9317;
		border: 1px dotted #b4b3b3;
		border-radius: 5px;
	}
`;
PaginationComponent.propTypes = {
	className: PropTypes.string,
	setPage: PropTypes.func,
	page: PropTypes.number,
	pageLast: PropTypes.number,
};
