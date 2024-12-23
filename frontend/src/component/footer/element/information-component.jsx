import {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {FooterTitle} from './title.jsx';
import {PATH} from '../../../utils/index.jsx';
import {StyledLink} from '../../link-styled/link-styled.jsx';

const FooterInformationContainer = ({className}) => {
	useEffect(() => {

	}, []);
	return (
		<div className={className}>
			<FooterTitle className="bolder">Information </FooterTitle>
			<ul className="information-list">
				<StyledLink to={`http://surl.li/lvxovt`}>
					<li className="information-item">About us</li>
				</StyledLink>
				<StyledLink to={`${PATH.OFFICE}`}>
					<li className="information-item">Find a store</li>
				</StyledLink>
				<StyledLink to={`http://surl.li/tzduza`}>
					<li className="information-item">Terms & conditions</li>
				</StyledLink>
			</ul>
		</div>
	);
};
export const FooterInformation = styled(FooterInformationContainer)`
	flex-grow: 1;

	.information-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 5px;
		padding-left: 12px;
	}

	.information-item {
		font-weight: 700;
		font-size: 14px;
		padding-bottom: 5px;

	}

`;
FooterInformationContainer.propTypes = {
	className: PropTypes.string,
};
