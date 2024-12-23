import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonAddContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>{children}</button>
	);
};
export const ButtonAddNewComponent = styled(ButtonAddContainer)`
	background: #282c34;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin: 10px 0;
	font-size: 12px;
	width: ${({ width = '100%' }) => width};
	transition: border-color 0.25s;

	&:hover {
		background: #191c21;
	}

	&:active {
		color: #8DCC0A;
		transform: scale(0.95);
		cursor: pointer;
	}

	&:focus {
		outline: none;
	}
`;

ButtonAddContainer.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
