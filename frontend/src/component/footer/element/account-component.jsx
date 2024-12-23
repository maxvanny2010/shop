import styled from 'styled-components';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {FooterTitle} from './title.jsx';
import {SideActivator} from '../../side-activator/side-activator.jsx';
import {OPEN_LOGIN, OPEN_ORDERS, OPEN_REGISTER} from '../../../redux/action/index.jsx';
import {useSelector} from 'react-redux';
import {selectUserId, selectUserRole} from '../../../redux/selectors/index.jsx';
import {ROLE} from '../../../utils/index.jsx';

const FooterAccountContainer = ({className}) => {
	const isUserLoggedIn = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const isAdmin = userRole === ROLE.ADMIN;
	const isGuest = userRole === ROLE.GUEST;
	const isUser = userRole === ROLE.USER;
	useEffect(() => {

	}, []);
	return (
		<div className={className}>
			<FooterTitle className="bolder">Account </FooterTitle>
			<ul className="account-list">
				<SideActivator action={isUserLoggedIn ? null : OPEN_LOGIN}>
					<li className={`account-item ${isAdmin || isUser ? 'not-active' : ''}`}>User Login</li>
				</SideActivator>
				<SideActivator action={isUserLoggedIn ? null : OPEN_REGISTER}>
					<li className={`account-item ${isAdmin || isUser ? 'not-active' : ''}`}>User Register</li>
				</SideActivator>
				<SideActivator action={isUserLoggedIn && !isAdmin ? OPEN_ORDERS : null}>
					<li className={`account-item ${isAdmin || isGuest ? 'not-active' : ''}`}>My orders</li>
				</SideActivator>
			</ul>
		</div>
	);
};
export const FooterAccount = styled(FooterAccountContainer)`
	flex-grow: 1;

	.account-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 5px;
		padding-left: 12px;
	}

	.not-active {
		color: grey;
	}

	.account-item {
		font-weight: 700;
		font-size: 14px;
		padding-bottom: 5px;

	}

`;
FooterAccountContainer.propTypes = {
	className: PropTypes.string,
};
