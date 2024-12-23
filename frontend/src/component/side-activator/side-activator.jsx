import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

export const SideActivatorComponent = ({className, action, children}) => {
	const dispatch = useDispatch();

	const handleOpenLogin = () => {
		console.log('Action received:', action);
		if (action) dispatch(action);
	};

	return (
		<div className={className}
			 onClick={handleOpenLogin}>
			{children}
		</div>
	);
};

export const SideActivator = styled(SideActivatorComponent)`
	text-decoration: none;
	color: ${({color = 'lightgrey'}) => color};
	transition: transform 0.1s ease;
	cursor: pointer;

	&:hover {
		color: #da1818;
	}

	&:active {
		transform: scale(0.95);
	}
`;
SideActivatorComponent.propTypes = {
	className: PropTypes.string,
	action: PropTypes.shape({
		type: PropTypes.string.isRequired,
	}),
	children: PropTypes.any,
};
