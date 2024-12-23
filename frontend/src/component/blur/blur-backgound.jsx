import styled from 'styled-components';

export const BlurBackground = styled.div`
	z-index: 2;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(1px);
`;
