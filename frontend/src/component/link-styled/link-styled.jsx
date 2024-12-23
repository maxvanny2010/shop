import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledLinkComponent = ({ className, to, children, ...props }) => {
	return (
		<Link to={to}
			  className={className} {...props}>
			{children}
		</Link>
	);
};
export const StyledLink = styled(StyledLinkComponent)`
	text-decoration: none;
	color: ${({ color = 'lightgrey' }) => color};
	transition: transform 0.1s ease;
	text-shadow: 1px 1px 2px rgba(38, 36, 36, 0.5);

	&:hover {
		color: #da1818;
	}

	&:active {
		transform: scale(0.95);
	}

`;
StyledLinkComponent.propTypes = {
	className: PropTypes.string,
	to: PropTypes.string.isRequired,
	children: PropTypes.any,
	color: PropTypes.string,
};
