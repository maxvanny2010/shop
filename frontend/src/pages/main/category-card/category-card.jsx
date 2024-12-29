import styled from 'styled-components';
import PropTypes from 'prop-types';
import {StyledLink} from '../../../component/index.jsx';
import {PATH} from '../../../utils/index.jsx';

const CategoryCardComponent = ({
								   className,
								   id,
								   name,
								   imageUrl,
							   }) => {
	return (
		<div className={className}>
			<StyledLink to={id.includes('fake') ? '#' : `${PATH.CATEGORIES}/${id}${PATH.PRODUCTS}`}
						color="#211e1e">
				<img src={imageUrl}
					 alt={imageUrl}/>
				<div className="category-card-footer">
					<h4>{name}</h4>
				</div>
			</StyledLink>
		</div>
	);
};
export const CategoryCard = styled(CategoryCardComponent)`
	display: flex;
	flex-direction: column;
	font-weight: bolder;
	width: 280px;
	margin: 26px;
	padding: 10px;

	& img {
		display: block;
		width: 100%;
		border-radius: 5px;
		box-shadow: 0 4px 8px rgba(145, 141, 141, 0.2);
		margin: 0;
		padding: 2px;
	}

	& h4 {
		margin: 0;
		padding: 5px;
		text-align: left;
	}

	& .post-card-footer {

	}

	& a:hover {
		box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
	}

`;

CategoryCardComponent.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	imageUrl: PropTypes.string,
};
