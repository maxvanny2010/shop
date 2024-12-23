import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../component';

const SearchComponent = ({ className, searchPhase, onChange }) => {
	return (
		<div className={className}>
			<Input id="search"
				   value={searchPhase}
				   onChange={onChange}
				   placeholder="what are you looking for?"
			/>
			<Icon
				inactive="true"
				id="fa-search"
				size="21px"
			/>
		</div>
	);
};
export const Search = styled(SearchComponent)`
	position: relative;
	display: flex;
	width: 400px;
	height: 42px;
	margin-right: 20px;

	& > input {
		margin-top: 3px;
		padding: 2px 32px 2px 10px;
		border-radius: 4px;
		border-bottom: 1px solid #dcdcdc;
	}

	& > input::placeholder {
		color: #dcdcdc;
	}

	& > div {
		position: absolute;
		top: 62%;
		right: 9px;
		transform: translateY(-50%);
		color: #282626;
	}

`;
SearchComponent.propTypes = {
	className: PropTypes.string,
	searchPhase: PropTypes.string,
	onChange: PropTypes.func,
};
