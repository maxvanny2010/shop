import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {Navigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {AuthErrorForm, Button, Icon, Input, SideActivator} from '../../component';
import {ROLE} from '../../utils';
import {CLOSE_LOGIN, loginAsync, OPEN_REGISTER} from '../../redux/action';
import {selectSideLogin, selectUserRole} from '../../redux/selectors';
import {useResetForm} from '../../hooks';

const StyledSignup = styled.div`
	margin-top: 10px;
	font-size: 14px;
	display: inline-block;

`;

const authFormSchema = yup.object().shape({
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
});
export const Login = ({className}) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: {errors},
	} = useForm({
		defaultValue: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRole);
	const isOpen = useSelector(selectSideLogin);
	const dispatch = useDispatch();

	useResetForm(reset);

	const onSubmit = ({login, password}) => {
		dispatch(loginAsync(login, password, setServerError));
	};

	const errorForm =
		errors?.login?.message || errors?.password?.message;
	const errorMessage = errorForm || serverError;

	if (roleId !== ROLE.GUEST) return <Navigate to={`#`}/>;
	if (!isOpen) return null;

	return (
		<LoginContainer $isOpen={isOpen}
						className={className}>
			<div className="login-header">
				<div className="login-title">Login</div>
				<SideActivator action={CLOSE_LOGIN}>
					<Icon width="400px"
						  id="fa-times"
						  margin="0 0 0 10px"
						  size="18px"
					/>
				</SideActivator>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input width="400px"
					   type="text"
					   placeholder="email..." {...register('login', {
						onChange: () => setServerError(null),
					},
				)} />
				<Input width="400px"
					   type="password"
					   placeholder="password..." {...register('password', {
					onChange: () => setServerError(null),
				})} />
				<Button width="420px"
						type="submit"
						disabled={!!errorForm}>Log in
				</Button>
				{errorMessage &&
					<AuthErrorForm>{errorMessage}</AuthErrorForm>
				}
				<StyledSignup>
					<div className="login-footer">
						<div>Don’t you have an account?</div>
						<SideActivator action={CLOSE_LOGIN}>
							<SideActivator action={OPEN_REGISTER}>
								Sign up
							</SideActivator>
						</SideActivator>
					</div>
				</StyledSignup>
			</form>
		</LoginContainer>
	);
};
export const LoginContainer = styled.div`
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
	transform: ${({$isOpen}) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
	transition: transform 0.3s ease;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}

	.login-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.login-title {
		font-size: 20px;
		font-weight: bolder;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.login-footer {
		display: flex;
		justify-content: flex-start;
		gap: 10px;
	}
`;
Login.propTypes = {
	className: PropTypes.string,
};
