import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = ({children, className, ...props}) => {
	return (
		<button className={className} {...props}>{children}</button>
	);
};
ButtonContainer.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export const Button = styled(ButtonContainer)`
	width: ${({width = '100%'}) => width};
	font-size: ${({fontSize = '1em'}) => fontSize};
	font-weight: 700;
	color: ${({disabled}) => (disabled ? 'lightgrey' : '#eee7e7')};
	text-align: center;

	background: #b20a0a;

	padding: ${({padding = '0.6em 1.2em'}) => padding};
	border-radius: 0;
	border: 1px solid transparent;
	transition: border-color 0.25s;
	box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

	&:hover {
		color: ${({disabled}) => (disabled ? '' : '#fff')};
		border: ${({disabled}) => (disabled ? '1px solid transparent' : '1px solid #fff')};
		cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
	}

	&:active {
		color: ${({disabled}) => (disabled ? '' : '#fff')};
		border-color: ${({disabled}) => (disabled ? 'transparent' : '#ef1212')};
		transform: ${({disabled}) => (disabled ? 'none' : 'scale(0.95)')};
		cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
	}
`;
