import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Icon} from '../../header/components/icon/icon.jsx';
import {FooterTitle} from './title.jsx';

const FooterContactsContainer = ({className}) => {
	return (
		<div className={className}>
			<FooterTitle className="bolder">Contact us</FooterTitle>
			<ul className="contact-list">
				<li className="contact-item">
					<Icon size="20px"
						  padding="0"
						  id={`fa-map-marker`}
						  disabled={true}
						  margin="0 10px 0 5px"
						  $lineHeight="20px"
					/>
					<div className="address-text">353 Cork Church Street</div>
				</li>
				<li className="contact-item">
					<Icon size="20px"
						  padding="0"
						  id={`fa-envelope`}
						  disabled={true}
						  margin="0 5px 0 0"
						  $lineHeight="20px"
					/>
					<div className="email-text">info@cork.com</div>
				</li>
				<li className="contact-item">
					<Icon size="20px"
						  padding="0"
						  id={`fa-phone`}
						  disabled={true}
						  margin="0 5px 0 0"
						  $lineHeight="20px"
					/>
					<div className="phone-text">+353 (87) 000 00 00</div>
				</li>
			</ul>
		</div>
	);
};
export const FooterContacts = styled(FooterContactsContainer)`
	flex: 0 0 25%;

	.contact-list {
		margin: 5px 0 0 0;
		padding-left: 12px;
		list-style: none;
	}

	.contact-item {
		display: flex;
		align-items: center;
		font-weight: 700;
		font-size: 14px;
		margin: 5px 0;
	}

	.mr {

	}
;

`;
FooterContactsContainer.propTypes = {
	className: PropTypes.string,
};
