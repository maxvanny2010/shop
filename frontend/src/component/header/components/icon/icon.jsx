import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = ({className, id, ...props}) => (
	<div className={className}
		 {...props}
	>
		<i className={`fa ${id}`}
		   aria-hidden="true"
		>
		</i>
	</div>
);

export const Icon = styled(IconContainer)`
	cursor: pointer;
	font-weight: 600;
	padding-left: ${({padding = '20px'}) => padding};
	line-height: ${({$lineHeight = '48px'}) => $lineHeight};
	font-size: ${({size = '20px'}) => size};
	margin: ${({margin = '0'}) => margin};
	transition: box-shadow 0.25s, color 0.25s;

	> i {
		color: ${({disabled}) => (disabled ? 'lightgrey !important' : 'black !important')};
		transition: color 0.25s;
	}

	&:hover {
		cursor: ${({inactive}) => (inactive ? 'default' : 'pointer')};
	}

	&:active {
		> i {
			color: ${({inactive}) => (inactive ? 'lightgrey !important' : '#da1818 !important')};
		}

		transform: ${({inactive}) => (inactive ? 'default' : 'scale(0.95)')};
	}
`;

IconContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
