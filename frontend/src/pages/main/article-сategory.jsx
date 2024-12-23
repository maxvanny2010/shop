import styled from 'styled-components';
import PropTypes from 'prop-types';
import {CategoryCard} from './category-card/category-card.jsx';
import {useSelector} from 'react-redux';
import {selectCategories} from '../../redux/selectors/index.jsx';
import {fakeCategory} from '../../utils';

const ArticleCategoryComponent = ({className}) => {
	const categories = useSelector(selectCategories);

	const fakeCategories = fakeCategory(categories);

	const allCategories = [...categories, ...fakeCategories];
	return (
		<article className={className}>
			<div className="category-list">
				{allCategories.length > 0 ? (
					allCategories.map(({id, name, imageUrl}, index) =>
						<CategoryCard key={index}
									  id={id}
									  name={name}
									  imageUrl={imageUrl}
						/>)
				) : null}
			</div>
		</article>
	);
};
export const ArticleCategory = styled(ArticleCategoryComponent)`
	border: 1px solid #8DCC0A;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 10px;
	max-width: 100%;
	flex-grow: 1;

	.category-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.category-list > div {
		flex: 1 1 calc(25% - 10px);
		margin-bottom: 10px;
	}
`;
ArticleCategoryComponent.propTypes = {
	className: PropTypes.string,
};

