import {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Pagination, ProductCard, Search} from './components/index.jsx';
import {ERROR, fakeProduct} from '../../utils';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalPages, selectProducts} from '../../redux/selectors/index.jsx';
import {getProductsBySearchAsync} from '../../redux/action/index.jsx';

const ArticleComponent = ({className}) => {
	const {categoryId} = useParams();
	const dispatch = useDispatch();
	const totalPages = useSelector(getTotalPages);
	const products = useSelector(selectProducts);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [debouncedSearchPhrase, setDebouncedSearchPhrase] = useState('');
	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedSearchPhrase(searchPhrase);
		}, 2000);
		return () => clearTimeout(debounceTimeout);
	}, [searchPhrase]);

	useEffect(() => {
		dispatch(getProductsBySearchAsync(debouncedSearchPhrase, categoryId));
	}, [categoryId, debouncedSearchPhrase, dispatch]);

	const onSearch = ({target}) => {
		setSearchPhrase(target.value);
	};

	const fakeProducts = fakeProduct(products);
	const allProducts = [...products, ...fakeProducts];

	return (
		<article className={className}>
			<div className="search">
				<Search
					searchPhase={searchPhrase}
					onChange={onSearch}
				/>
			</div>
			<div className="product-list">
				{allProducts.length > 0 ? (
					allProducts.map((product, index) =>
						<ProductCard key={index}
									 product={product}
						/>,
					)
				) : (<div className="product-not-found">{`${ERROR.PRODUCTS_NOT_FOUND}`}</div>)}
			</div>
			{totalPages > 1 && products.length > 0 && (<Pagination/>)}
		</article>
	);
};
export const Article = styled(ArticleComponent)`
	flex-direction: column;
	justify-content: flex-start;
	padding: 10px;

	.product-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.product-list > div {
		flex: 1 1 calc(25% - 10px);
		margin-bottom: 10px;
	}

	.search {
		display: flex;
		justify-content: center;
		margin: 0 auto;
		text-align: center;
	}

	& .product-not-found {
		display: flex;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		font-size: 21px;
		text-align: center;
		height: 50px;
		padding: 10px;
		border-radius: 4px;
		background: rgba(145, 67, 115, 0.17);
	}

`;

ArticleComponent.propTypes = {
	className: PropTypes.string,
};

