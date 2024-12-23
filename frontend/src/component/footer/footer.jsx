import PropTypes from 'prop-types';
import styled from 'styled-components';
import {FooterLogo} from './element/footer-logo.jsx';
import {FooterContacts} from './element/contacts-component.jsx';
import {FooterAccount} from './element/account-component.jsx';
import {FooterDownLoad} from './element/download-component.jsx';
import {FooterInformation} from './element/information-component.jsx';

const FooterContainer = ({className}) => {
	return (
		<div className={className}>
			<div className="footer-container">
				<FooterContacts/>
				<FooterInformation/>
				<FooterAccount/>
				<FooterDownLoad/>
			</div>
			<div className="footer-low">
				<FooterLogo/>
			</div>
		</div>
	);
};
export const Footer = styled(FooterContainer)`
	color: #f5efef;
	background: #111111;
	width: 100%;
	position: relative;

	.footer-low {
		background: #000000;
		padding: 12px;
		align-items: center;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		color: #f5efef;
		background: #111111;
		padding: 12px;
		width: 100%;
	}

`;
FooterContainer.propTypes = {
	className: PropTypes.string,
};
