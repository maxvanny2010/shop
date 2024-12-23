import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterTitleComponent = ({ className, children }) => {
	return (
		<h2 className={className}>
			{children}
		</h2>
	);
};
export const FooterTitle = styled(FooterTitleComponent)`
	display: flex;
	justify-content: left;
	align-items: center;
	padding-left: 12px;
`;
FooterTitleComponent.propTypes = {
	className: PropTypes.string,
	children: PropTypes.string,
};
