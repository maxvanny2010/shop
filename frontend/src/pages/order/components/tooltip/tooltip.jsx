import styled from 'styled-components';
import PropTypes from 'prop-types';

const ToolTipContainer = ({className, message, ...props}) => {
	return (
		<span className={className} {...props}>
			{message}
        </span>
	);
};
export const ToolTip = styled(ToolTipContainer)`
	position: fixed;
	right: 16px;
	top: 22px;

	font-size: 1rem;
	line-height: 1.5rem;
	color: whitesmoke;

	background-color: ${({success}) => (success ? '#699410' : '#ce2f43')};
	padding: 10px 15px;
	border-radius: 5px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

	width: 10%;
	box-sizing: border-box;
	z-index: 1000;

	opacity: 1;
	transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

	transform: translateY(-20px);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 30%;
		background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;
ToolTipContainer.propTypes = {
	className: PropTypes.string,
	message: PropTypes.string.isRequired,
};
