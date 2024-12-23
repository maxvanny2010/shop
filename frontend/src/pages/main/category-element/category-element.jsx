import styled from 'styled-components';
import PropTypes from 'prop-types';
import {PATH} from '../../../utils/index.jsx';
import {LinkActive} from '../../../component/link/link-active.jsx';

const CategoryElementComponent = ({className, id, name}) => {
	return (
		<li className={className}>
			<LinkActive
				to={`${PATH.CATEGORIES}/${id}${PATH.PRODUCTS}`}
				color="#211e1e"
			>
				{name.toUpperCase()}
			</LinkActive>

		</li>
	);
};
export const CategoryElement = styled(CategoryElementComponent)`
	padding: 10px;
	margin-bottom: 5px;
	border-radius: 5px;
	font-weight: bolder;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	transition: box-shadow 0.25s, color 0.25s;

	&:hover {
		background: #eae6e6;
	}

	&:active {
		background: grey;
		color: #da1818;
		transform: scale(0.95);
	}
`;

CategoryElementComponent.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
};
