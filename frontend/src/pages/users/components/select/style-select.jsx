import styled from 'styled-components';

export const StyleSelect = styled.select`
	background-color: #282C34;
	color: #D3D3D3;
	border-radius: 5px;
	padding: 10px 40px 10px 10px;
	appearance: none;
	cursor: pointer;
	font-size: 16px;
	width: ${({width = '100%'}) => width};
	transition: background-color 0.3s ease;
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23D3D3D3" height="10" viewBox="0 0 24 24" width="10"><path d="M7 10l5 5 5-5H7z"/></svg>');
	background-repeat: no-repeat;
	background-position: right 10px center;
	background-size: 30px;

	&:hover {
		background-color: #191C21;
	}

	&:focus {
		outline: none;
		border-color: #8AC80A;
		background-color: #2C2F35;
	}
`;
