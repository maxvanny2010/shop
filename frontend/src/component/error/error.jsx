import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Forumbee} from '../forumbee/forumbee.jsx';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 18px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

	& h2 {
		margin: 5px 0 5px 0;
	}

	.error-content {
		margin: 10px 0 0;
		width: 420px;
		padding: 10px;
		font-size: 14px;
		border-radius: 4px;
		background: rgba(145, 67, 115, 0.17);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
`;
export const Error = ({error}) =>
	error
	&& (
		<Div>
			<Forumbee size="24px"
					  id={'braille'}/>
			<h2>MISTAKE</h2>
			<div className="error-content">
				{error}
			</div>
		</Div>
	);

Error.propTypes = {
	error: PropTypes.string,
};
