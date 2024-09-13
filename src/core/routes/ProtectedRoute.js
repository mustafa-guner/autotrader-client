import {Navigate} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../features/auth/presentation/redux/action";
import DashboardLayout from "../../features/dashboard/presentation/layouts/DasboardLayout";
import {links} from "../../utils/constants";

const ProtectedRoute = ({children, auth: {isAuth, token}}) => {

    if (!isAuth || !token) {
        return <Navigate to={links.public.auth.login} replace/>;
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
};

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(ProtectedRoute);
