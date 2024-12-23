import {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {FooterTitle} from './title.jsx';
import appleIcon from '@assets/svg/download-component-apple.svg';
import googleIcon from '@assets/svg/download-component-google.svg';
import {Link} from 'react-router-dom';

const FooterDownLoadContainer = ({className}) => {
	useEffect(() => {

	}, []);
	return (
		<div className={className}>
			<FooterTitle className="bolder">Download</FooterTitle>
			<div className="download">
				<div className="download-apple">
					<Link to={`/`}>
						<img src={appleIcon}
							 alt="Apple Download"/>
					</Link>
				</div>
				<div className="download-google">
					<Link to={`/`}>
						<img src={googleIcon}
							 alt="Google Download"/>
					</Link>
				</div>
			</div>
		</div>
	);
};
export const FooterDownLoad = styled(FooterDownLoadContainer)`
	flex: 0 0 20%;

	.download {
		padding-left: 12px;
		margin-top: 4px;
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
`;

FooterDownLoadContainer.propTypes = {
	className: PropTypes.string,
};
