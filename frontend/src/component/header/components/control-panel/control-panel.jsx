import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { PATH, ROLE } from '../../../../utils';
import { selectCartCount } from '../../../../redux/selectors/select-cart-count.jsx';
import { selectUserLogin, selectUserRole } from '../../../../redux/selectors';
import { SideActivator } from '../../../side-activator/side-activator.jsx';
import { logoutAsync, OPEN_CART, OPEN_LOGIN } from '../../../../redux/action';
import { checkAccess } from '../../../../redux/utils';
import { Icon } from '../icon/icon.jsx';

const LoggingRow = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const LogoutRow = styled.div`
	display: flex;
	justify-content: space-around;
`;
const IconNavigate = styled.div`
	margin: 0;
`;
const CartNavigate = styled.div`
	position: relative;
	margin: 0;

	&::after {
		content: ${({ $count }) => ($count > -1 ? `'${$count}'` : '')};
		position: absolute;
		top: 3px;
		right: -8px;
		width: ${({ $count }) => ($count > 9 ? '24px' : '18px')};
		height: ${({ $count }) => ($count > 9 ? '24px' : '18px')};
		border-radius: 50%;
		background-color: #da1818;
		color: white;
		font-size: ${({ $count }) => ($count > 9 ? '12px' : '10px')};
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}
`;
const ManagerRow = styled.div`
	display: flex;
	justify-content: space-around;
`;
const UserLogin = styled.div`
	margin-top: 10px;
	margin-left: 20px;
	font-size: 20px;
`;
const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	const cartCount = useSelector(selectCartCount) || 0;
	const isUser = roleId === ROLE.USER;
	const onLogout = (e) => {
		e.preventDefault();
		dispatch(logoutAsync()).then(() => navigate(`${PATH.HOME}`));
	};
	return (
		<div className={className}>
			<ManagerRow>
				{roleId === ROLE.GUEST
					? (
						<SideActivator action={OPEN_LOGIN}>
							<LoggingRow>
								<Icon
									size="24px"
									id="fa-sign-in"
								/>
							</LoggingRow>
						</SideActivator>
					)
					: (
						<LogoutRow>
							<UserLogin>{login}</UserLogin>
							<Icon
								size="24px"
								id="fa-sign-out"
								onClick={onLogout}
							/>
						</LogoutRow>
					)
				}
				<IconNavigate onClick={() => navigate(-1)}>
					<Icon
						size="24px"
						id="fa-backward"
						margin="0 5px 0 0"
					/>
				</IconNavigate>
				{isUser && <SideActivator
					action={cartCount > 0 && login
						? OPEN_CART
						: null
					}
				>
					<CartNavigate $count={cartCount}>
						<Icon
							size="24px"
							id="fa-shopping-cart"
						/>
					</CartNavigate>
				</SideActivator>
				}
				{
					isAdmin && (
						<>
							<Link to={`${PATH.ADMIN}`}>
								<Icon size="24px"
									  id="fa-file-text-o"
									  margin="0 5px 0 0"
								/>
							</Link>
							<Link to={`${PATH.USERS}`}>
								<Icon size="24px"
									  id="fa-users"
									  margin="0 5px 0 0"
								/>
							</Link>
						</>
					)
				}
			</ManagerRow>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	margin: 2px 10px 0 34px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

ControlPanelContainer.propTypes = {
	className: PropTypes.string,
};
