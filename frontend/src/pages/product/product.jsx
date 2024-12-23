import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Error} from '../../component';
import {ProductContent} from './components';
import {loadProductAsync} from '../../redux/action';
import {useDispatch} from 'react-redux';

export const ProductContainer = ({className}) => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		dispatch(loadProductAsync(id)).then(
			(error) => {
				setError(error);
				setIsLoading(false);
			},
		);
	}, [dispatch, id]);
	if (isLoading) return <div className="loading">Loading...</div>;
	const productContent = (
		<div className={className}>
			<ProductContent/>
		</div>
	);
	return error ? <Error error={error}/> : productContent;
};
export const Product = styled(ProductContainer)`

	& .loading {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
ProductContainer.propTypes = {
	className: PropTypes.string,
};
