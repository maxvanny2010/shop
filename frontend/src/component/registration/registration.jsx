import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { AuthErrorForm, Button, Icon, Input, SideActivator } from '../../component';
import { selectSideRegister, selectUserRole } from '../../redux/selectors';
import { CLOSE_REGISTER, registration } from '../../redux/action';
import { ROLE } from '../../utils';
import { useResetForm } from '../../hooks';

const regFormSchema = yup.object().shape({
	login: yup.string()
		.required('Email is required')
		.email('Invalid email format')
		.min(5, 'Login: min 5 symbols')
		.max(15, 'Login: max 15 symbols'),
	password: yup.string()
		.required('Password is required')
		.matches(/^[\w#%]+$/, 'Password is not correct')
		.min(3, 'Password: min 3 symbols')
		.max(30, 'Password: max 30 symbols'),
	passcheck: yup.string()
		.required('Password is required')
		.oneOf([yup.ref('password'), null],
			'Password is not same'),
});
export const Registration = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRole);
	const isOpen = useSelector(selectSideRegister);
	const dispatch = useDispatch();

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		dispatch(registration(login, password))
			.catch((error) => setServerError(`${error}`));
	};

	const errorForm =
		errors?.login?.message
		|| errors?.password?.message
		|| errors?.passcheck?.message;
	const errorMessage = errorForm || serverError;

	if (roleId !== ROLE.GUEST) return <Navigate to={`#`} />;
	if (!isOpen) return null;
	return (
		<RegistrationContainer $isOpen={isOpen}
							   className={className}>
			<div className="registered-header">
				<div className="registered-title">Registration</div>
				<SideActivator action={CLOSE_REGISTER}>
					<Icon
						id="fa-times"
						margin="0 0 0 10px"
						size="18px"
					/>
				</SideActivator>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type="text"
					   width="400px"
					   placeholder="email..." {...register('login', {
						onChange: () => setServerError(null),
					},
				)} />
				<Input type="password"
					   width="400px"
					   placeholder="password..." {...register('password', {
					onChange: () => setServerError(null),
				})} />
				<Input type="password"
					   width="400px"
					   placeholder="repeat password..." {...register('passcheck', {
					onChange: () => setServerError(null),
				})} />
				<Button type="submit"
						width="420px"
						disabled={!!errorForm}>Sign in
				</Button>
				{errorMessage &&
					<AuthErrorForm>{errorMessage}</AuthErrorForm>
				}
			</form>
		</RegistrationContainer>
	);
};
export const RegistrationContainer = styled.div`
	z-index: 3;
	position: fixed;
	display: flex;
	flex-direction: column;
	right: 0;
	top: 0;
	height: 100vh;
	width: 450px;
	padding: 20px;
	background: white;
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
	transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
	transition: transform 0.3s ease;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}

	.registered-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.registered-title {
		font-size: 20px;
		font-weight: bolder;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}
`;
Registration.propTypes = {
	className: PropTypes.string,
};
