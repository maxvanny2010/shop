import styled from 'styled-components';

export const AuthErrorForm = styled.div`
	margin: 10px 0 0;
	padding: 10px;
	font-size: 14px;
	width: ${({width = '420px'}) => width};
	border-radius: 4px;
	background: rgba(145, 67, 115, 0.17);
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: row;
`;
