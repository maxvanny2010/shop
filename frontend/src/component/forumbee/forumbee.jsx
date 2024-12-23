import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon} from '../header/components/icon/icon.jsx';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../utils';

const ForumbeeComponent = ({className, size, id, disabled}) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<Icon size={size}
				  id={`fa-${id}`}
				  onClick={() => navigate(`${PATH.HOME}`)}
				  disabled={disabled}
			/>
		</div>
	);
};
export const Forumbee = styled(ForumbeeComponent)`
	display: flex;
	justify-content: center;
`;
ForumbeeComponent.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string,
	id: PropTypes.string,
	disabled: PropTypes.bool,
};
