import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Forumbee} from '../../../forumbee/forumbee.jsx';

const LogoContainer = ({className}) => (
	<div className={className}>
		<Forumbee size="50px"
				  id="braille"
		/>
		<div className="logo-text-container">
			<span className="logo-text"><strong>COLORS</strong></span>
			<span className="logo-text"><strong>SYSTEMS</strong></span>
		</div>
	</div>
);
export const Logo = styled(LogoContainer)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	position: relative;
	margin-right: 30px;

	&:after {
		content: "";
		position: absolute;
		top: 18px;
		left: 56px;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background-color: #da1818;
		box-shadow: 1px 1px 2px rgb(211, 30, 30);
		z-index: 1;
	}

	.logo-text-container {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		height: 30px;
		gap: 2px;
	}

	.logo-text {
		font-size: 14px;
		font-weight: bold;
		color: black;
		line-height: 1;
		margin: 0;
		padding: 0;
		letter-spacing: 4px;
	}
`;


LogoContainer.propTypes = {
	className: PropTypes.string,
};

