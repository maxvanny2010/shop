import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { selectUserRole } from '../../redux/selectors';
import { Forumbee, PrivateContent } from '../../component';
import { TableRow, UserRow } from './components';
import { checkAccess } from '../../redux/utils';
import { METHOD, PATH, requests, ROLE } from '../../utils/';

export const UsersContainer = ({ className }) => {
	const userRole = useSelector(selectUserRole);
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);
	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;
		Promise.all(
			[
				requests(`${PATH.USERS}`),
				requests(`${PATH.USERS}${PATH.ROLES}`),
			])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			}).catch((error) => {
			setErrorMessage(error.message);
		});

	}, [shouldUpdateUsers, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;
		requests(`${PATH.USERS}/${userId}`, METHOD.DELETE)
			.then(() => setShouldUpdateUsers(!shouldUpdateUsers));
	};
	return (
		<PrivateContent access={[ROLE.ADMIN]}
						errorServer={errorMessage}>
			<div className={className}>
				<Forumbee size="24px"
						  id={'braille'} />
				<TableRow>
					<div className="users-header">
						<div className="login-column">Login</div>
						<div className="registered-at-column">Date of registration</div>
						<div className="role-column">Role</div>
					</div>
				</TableRow>
				{
					users.map((user) => (
						<UserRow
							key={user.id}
							user={user}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(user.id)}
						/>
					))
				}
			</div>
		</PrivateContent>
	);
};
export const Users =
	styled(UsersContainer)`
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 570px;

		.users-header {
			min-width: 94%;
			border-radius: 4px;
			padding: 10px;
			background: #fff;
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		}
	`;
UsersContainer.propTypes = {
	className: PropTypes.string,
};
