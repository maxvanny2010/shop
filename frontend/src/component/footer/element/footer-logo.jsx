import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Forumbee } from '../../forumbee/forumbee.jsx';

const FooterLogoContainer = ({ className }) => (
	<div className={className}>
		<Forumbee size="50px"
				  id="braille"
				  disabled={true}
		/>
		<div className="logo-text-container">
			<span className="logo-text"><strong>COLORS</strong></span>
			<span className="logo-text"><strong>SYSTEMS</strong></span>
			<span className="logo-text"><strong>@2024</strong></span>
		</div>
	</div>
);
export const FooterLogo = styled(FooterLogoContainer)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	text-shadow: 1px 1px 2px rgba(192, 183, 183, 0.5);
	position: relative;
	margin-right: 30px;

	& > #braille {
		color: lightgrey;
	}

	&:after {
		content: "";
		position: absolute;
		top: 32px;
		left: 55px;
		width: 12px;
		height: 12px;
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
		font-size: 10px;
		font-weight: bold;
		color: lightgrey;
		line-height: 1;
		margin: 0;
		padding: 0;
		letter-spacing: 4px;
	}
`;


FooterLogoContainer.propTypes = {
	className: PropTypes.string,
};

