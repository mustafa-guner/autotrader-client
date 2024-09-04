import {Navigate} from 'react-router-dom';
import {connect} from "react-redux";
import {Spinner} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {logout} from "../../features/auth/presentation/redux/action";
import DashboardLayout from "../../features/dashboard/presentation/layouts/DasboardLayout";

const ProtectedRoute = ({children, auth: {loading, isAuth, token}}) => {
    console.log(loading, token, isAuth)
    if (loading && token) {
        return <Spinner/>;
    } else if (!isAuth) {
        return <Navigate to="/auth/login" replace/>;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
};

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(ProtectedRoute);
