import {useState, useEffect} from "react";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import PublicRoute from "./core/routes/PublicRoute";
import {loadUser} from "./features/auth/presentation/redux/action";
import {routes} from "./core/routes";
import {links} from "./utils/constants.js";
import NotFoundPage from "./features/common/presentation/pages/errors/NotFoundPage";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Spinner} from "@chakra-ui/react";

function App({user, loadUser}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            loadUser().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [loadUser]);

    if (loading) {
        return <Spinner/>
    }

    return (
        <Router>
            <Routes>
                {/* Redirect root '/' to '/dashboard' */}
                <Route path="/" element={<Navigate to={links.protected.dashboard} replace/>}/>

                {/* Dynamically map routes */}
                {routes.map(({path, element: Component, isProtected}, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={
                            isProtected ? (
                                <ProtectedRoute>
                                    <Component/>
                                </ProtectedRoute>
                            ) : (
                                <PublicRoute>
                                    <Component/>
                                </PublicRoute>
                            )
                        }
                    />
                ))}

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

App.propTypes = {
    user: PropTypes.object,
    loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {loadUser})(App);
