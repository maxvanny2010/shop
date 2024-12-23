import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {ROLE} from '../../utils/index.jsx';
import {selectUserId, selectUserRole} from '../../redux/selectors/index.jsx';
import {ControlPanel} from './components/control-panel/control-panel.jsx';
import {getCartAsync, getCategoriesAsync} from '../../redux/action/index.jsx';
import {Logo} from './components/logo/logo.jsx';
import {HeaderNav} from '../nav/header-nav.jsx';

const Description = styled.div`
	display: flex;
	flex-direction: column;
	align-items: baseline;
	margin-top: 10px;
	text-shadow: 1px 1px 2px rgba(26, 25, 25, 0.5);

	.logo-text.office {
		font-size: 14px;
		font-weight: bolder;
		line-height: 1;
		letter-spacing: 1px;
	}

	.logo-text.phone-number {
		color: #da1818;
		font-weight: bolder;
		letter-spacing: 1px;
	}
`;
const HeaderContainer = ({className}) => {
		const dispatch = useDispatch();
		const isUserLoggedIn = useSelector(selectUserId);
		const isAdmin = useSelector(selectUserRole) === ROLE.ADMIN;
		useEffect(() => {
			dispatch(getCategoriesAsync());
		}, [dispatch]);
		useEffect(() => {
			if (isUserLoggedIn && !isAdmin) {
				dispatch(getCartAsync());
			}
		}, [dispatch, isAdmin, isUserLoggedIn]);
		return (
			<>
				<header className={className}>
					<Logo/>
					<Description>
						<span className="logo-text office"><strong>Call to office</strong></span>
						<span className="logo-text phone-number"><strong>+353 (87) 000 00 00</strong></span>
					</Description>
					<ControlPanel/>
				</header>
				<HeaderNav/>
			</>
		);
	}
;
export const Header = styled(HeaderContainer)`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

`;
HeaderContainer.propTypes = {
	className: PropTypes.string,
};
