import {useEffect} from "react";
import store from "./store";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import PublicRoute from "./core/routes/PublicRoute";
import {loadUser} from "./features/auth/presentation/redux/action";
import {routes} from "./core/routes";
import {links} from "./utils/constants.js";
import NotFoundPage from "./features/common/presentation/pages/errors/NotFoundPage";

// Load user if token exists
if (window.localStorage.getItem("token")) {
    store.dispatch(loadUser());
}

function App() {

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            store.dispatch(loadUser());
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Redirect root '/' to '/dashboard' */}
                <Route path="/" element={<Navigate to={links.protected.dashboard} replace/>}/>

                {/* Dynamically map routes */}
                {routes.map(({path, element: Component, isProtected}, index) => {
                    return (
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
                    );
                })}

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
