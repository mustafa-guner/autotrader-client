import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Spinner} from "@chakra-ui/react";
import {Navigate} from "react-router-dom";
import {links} from "../../utils/constants";


const PublicRoute = ({children, auth: {loading, isAuth}}) => {
    if (loading) {
        return <Spinner/>;
    } else if (isAuth) {
        return <Navigate to={links.protected.dashboard} replace/>;
    }

    return children;
};

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PublicRoute);