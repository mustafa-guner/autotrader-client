import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import PublicRoute from "./core/routes/PublicRoute";
import { loadUser } from "./features/auth/presentation/redux/action";
import { routes } from "./core/routes";
import { links } from "./utils/constants.js";
import NotFoundPage from "./features/common/presentation/pages/errors/NotFoundPage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "./features/common/presentation/components/Loading";

function App({ loadUser, auth: { loading, isAuth } }) {
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            loadUser().finally(() => setInitialLoading(false));
        } else {
            setInitialLoading(false);
        }
    }, [loadUser]);

    if (initialLoading) {
        return <Loading />;
    }

    return (
        <Router>
            <Routes>
                {/* Redirect root '/' to '/dashboard' */}
                <Route path="/" element={<Navigate to={links.protected.dashboard} replace />} />

                {/* Dynamically map routes */}
                {routes.map(({ path, element: Component, isProtected }, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={
                            isProtected ? (
                                <ProtectedRoute>
                                    <Component />
                                </ProtectedRoute>
                            ) : (
                                <PublicRoute>
                                    <Component />
                                </PublicRoute>
                            )
                        }
                    />
                ))}

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

App.propTypes = {
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(App);
