import PropTypes from 'prop-types';
import {Icon} from '../../../../component';

import styled from 'styled-components';
import {TableRow} from '../table-row/table-row.jsx';
import {StyleSelect} from '../select/style-select.jsx';
import {useState} from 'react';
import {getFormatDate, METHOD, PATH, requests} from '../../../../utils';

export const UserRowContainer = ({
									 className,
									 user,
									 roles,
									 onUserRemove,
								 }) => {
	const {id, login, registeredAt, roleId: userRoleId} = user;
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const onRoleChanged = ({target}) => {
		setSelectedRoleId(Number(target.value));
	};
	const onRoleSave = (userId, newRoleId) => {
		requests(`${PATH.USERS}/${userId}`,
			METHOD.PATCH, {roleId: newRoleId})
			.then(() => setInitialRoleId(newRoleId));
	};
	const isNewSelectedRoleId = selectedRoleId === initialRoleId;
	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="users-rows">
					<div className="login-column">{login}</div>
					<div className="registered-at-column">{getFormatDate(registeredAt)}</div>
					<div className="role-column">
						<StyleSelect value={selectedRoleId}
									 onChange={onRoleChanged}>
							{
								roles.map(({id, name: roleName}) => (
									<option key={Number(id)}
											value={Number(id)}>{roleName}</option>
								))
							}
						</StyleSelect>
					</div>
					<Icon
						size="24px"
						id="fa-floppy-o"
						padding="0"
						disabled={isNewSelectedRoleId}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon
				size="24px"
				id="fa-trash-o"
				onClick={onUserRemove}
			/>
		</div>
	);
};
export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	.users-rows {
		align-items: center;
		padding: 2px 8px 0 8px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.role-column {
		margin-right: 4px;
	}
`;


UserRowContainer.propTypes = {
	className: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	roles: PropTypes.arrayOf(PropTypes.shape({})),
	onUserRemove: PropTypes.func.isRequired,
};
