import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkActiveComponent = ({className, to, children, ...props}) => {
	return (
		<NavLink
			to={to}
			className={({isActive}) =>
				`${className} ${isActive ? 'active' : ''}`
			}
			{...props}
		>
			{children}
		</NavLink>
	);
};

export const LinkActive = styled(LinkActiveComponent)`
	text-decoration: none;
	color: ${({color = 'lightgrey'}) => color};
	transition: transform 0.1s ease, background 0.25s, color 0.25s;

	&.active {
		display: flex;
		justify-content: center;
		padding: 8px;
		background: #eae6e6;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	&:active {
		transform: scale(0.95);
	}
`;


LinkActiveComponent.propTypes = {
	className: PropTypes.string,
	to: PropTypes.string.isRequired,
	children: PropTypes.any,
	color: PropTypes.string,
};
