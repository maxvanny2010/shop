import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {checkAccess} from '../../redux/utils/index.jsx';

export const ProtectedRoute = ({allowedRoles, userRole, redirectPath = '*', children}) => {
	if (!checkAccess(allowedRoles, userRole)) {
		return <Navigate to={redirectPath}
						 replace
		/>;
	}

	return children;
};

ProtectedRoute.propTypes = {
	redirectPath: PropTypes.string,
	children: PropTypes.node.isRequired,
	userRole: PropTypes.number.isRequired,
	allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};
