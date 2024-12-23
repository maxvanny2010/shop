import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ERROR} from '../../utils/index.jsx';
import {CategoryElement} from '../../component/index.jsx';
import {selectCategories} from '../../redux/selectors/index.jsx';
import {useSelector} from 'react-redux';

const AsideComponent = ({className}) => {
	const categories = useSelector(selectCategories);

	return (
		<ul className={className}>
			{categories.length > 0 ? (
				categories.map(({id, name}, index) =>
					<CategoryElement key={index}
									 id={id}
									 name={name}
					/>)
			) : (<CategoryElement id="-1"
								  name={`${ERROR.CATEGORIES_MISSING}`}/>)}
		</ul>
	);
};
export const Aside = styled(AsideComponent)`
	padding: 1rem;
	margin-top: .5rem;
	margin-left: .5rem;
	background-color: #f5f5f5;
	border: 1px solid lightgrey;
	border-radius: 5px;
	list-style: none;
	min-width: 200px;
`;
AsideComponent.propTypes = {
	className: PropTypes.string,
};

