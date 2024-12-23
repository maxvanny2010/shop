import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {ERROR, PAGINATION_LIMIT, SYMBOLS} from '../../utils';
import {Pagination, Search} from '../main/components/index.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsBySearchAdminAsync} from '../../redux/action/index.jsx';
import {ButtonSort} from '../../component/index.jsx';
import {ProductRow} from './component/product-row.jsx';
import {getTotalPages, selectProducts} from '../../redux/selectors/index.jsx';

const AdminArticleComponent = ({className}) => {
	const dispatch = useDispatch();
	const totalPages = useSelector(getTotalPages);
	const products = useSelector(selectProducts);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [debouncedSearchPhrase, setDebouncedSearchPhrase] = useState('');

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedSearchPhrase(searchPhrase);
		}, 2000);
		return () => clearTimeout(debounceTimeout);
	}, [searchPhrase]);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getProductsBySearchAdminAsync(debouncedSearchPhrase))
			.finally(() => setIsLoading(false));
	}, [debouncedSearchPhrase, dispatch]);

	const onSearch = ({target}) => {
		setSearchPhrase(target.value);
	};
	const placeholderRows = Array.from({
		length: Math.max(0, PAGINATION_LIMIT - products.length),
	});
	return (
		<article className={className}>
			<div className="search">
				<Search
					searchPhase={searchPhrase}
					onChange={onSearch}
				/>
			</div>
			<div className="products-table">
				<table className="table-records">
					<thead>
					<tr>
						<th className="table-header-item"> id
						</th>
						<th className="table-header-item"> name
						</th>
						<th className="table-header-item"> category
						</th>
						<th className="table-header-item">
							<div className="header-block">
								<div className="start">price</div>
								<div className="end"><ButtonSort field={'price'}/></div>
							</div>
						</th>
						<th className="table-header-item">
							<div className="header-block">
								<div className="start">quantity</div>
								<div className="end"><ButtonSort field={'quantity'}/></div>
							</div>
						</th>
						<th className="table-header-item"> image
						</th>
						<th className="table-header-item">
							action
						</th>

					</tr>
					</thead>
					<tbody>
					{
						products.length > 0 ? (
								products.map((product, index) => (
									<ProductRow key={index}
												product={product}/>
								)))
							: (
								<tr>
									<td colSpan="7"
										className="records-not-found">{ERROR.PRODUCTS_NOT_FOUND}
									</td>
								</tr>
							)
					}
					{placeholderRows.map((_, index) => (
						<tr key={`placeholder-${index}`}>
							<td className="table-item">{isLoading ? SYMBOLS.IS_LOADING : SYMBOLS.SPACE}
								<span className="dots"></span>
							</td>
							<td className="table-item">{isLoading ? SYMBOLS.IS_LOADING : SYMBOLS.SPACE}
								<span className="dots"></span></td>
							<td className="table-item">{isLoading ? SYMBOLS.IS_LOADING : SYMBOLS.SPACE}
								<span className="dots"></span></td>
							<td className="table-item">{isLoading ? SYMBOLS.IS_LOADING : SYMBOLS.SPACE}
								<span className="dots"></span></td>
						</tr>
					))}
					</tbody>
				</table>
				<div className="pagination-cell">
					{totalPages > 1 && products.length > 0 && (<Pagination/>)}
				</div>
			</div>
		</article>
	)
		;
};
export const AdminArticle = styled(AdminArticleComponent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 30px;
	overflow-x: auto;
	padding: 10px;

	.pagination-cell {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 5px;
	}

	.search {
		margin: 0 auto;
	}

	.table-records {
		width: 100%;
		vertical-align: unset;
		border-top: 1px solid #ddd;
		border-collapse: collapse;
		color: #555;
		background-color: #fff;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
	}

	.table-records th,
	.table-records td {
		padding: 10px 16px;
		text-align: left;
		border-bottom: 1px solid #ddd;
		font-size: 0.95em;
	}

	.table-records thead th {
		background-color: #e0dede;
		color: #484848;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.9em;
		font-weight: bold;
	}

	.table-records tr:hover {
		background-color: #f1f1f1;
	}

	.table-records tbody tr:last-child td {
		border-bottom: none;
	}

	& td.records-not-found {
		width: 100%;
		text-align: center;
		vertical-align: middle;
		color: crimson;
		font-weight: bold;
	}

	@keyframes blink {
		0% {
			content: '';
		}
		33% {
			content: '.';
		}
		66% {
			content: '..';
		}
		100% {
			content: '...';
		}
	}

	.dots::after {
		display: inline-block;
		animation: blink 1.5s infinite;
	}

`;
AdminArticleComponent.propTypes = {
	className: PropTypes.string,
};
