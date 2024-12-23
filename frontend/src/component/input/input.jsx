import styled from 'styled-components';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const InputContainer =
	forwardRef(({
					className,
					...props
				},
				ref) => {
		return (
			<input
				className={className}
				{...props}
				ref={ref} />
		);
	});

export const Input = styled(InputContainer)`
	all: unset;
	width: ${({ width = '100%' }) => width};
	font-size: ${({ fontSize = '18px' }) => fontSize};
	height: ${({ height = '40px' }) => height};
	padding: ${({ padding = '10px' }) => padding};
	margin: 0 0 10px;
	color: #232121;
	background: ${({ background = '#f5f1f1' }) => background};

	&:focus {
		outline: none;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
	}
`;
InputContainer.displayName = 'InputContainer';
InputContainer.propTypes = {
	className: PropTypes.string,
	width: PropTypes.string,
};
