import {useEffect} from "react";
import store from "./store";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import LoginPage from "./features/auth/presentation/pages/LoginPage";
import RegisterPage from "./features/auth/presentation/pages/RegisterPage";
import DashboardPage from "./features/dashboard/presentation/pages/DashboardPage";
import ForgotPasswordPage from "./features/auth/presentation/pages/ForgotPasswordPage";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import PublicRoute from "./core/routes/PublicRoute";
import {loadUser} from "./features/auth/presentation/redux/action";
import {authLinks, dashboardLinks} from "./utils/constants";

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

    const routesConfig = [
        {
            path: authLinks.login,
            element: LoginPage,
            isProtected: false,
        },
        {
            path: authLinks.register,
            element: RegisterPage,
            isProtected: false,
        },
        {
            path: authLinks.forgotPassword,
            element: ForgotPasswordPage,
            isProtected: false,
        },
        {
            path: dashboardLinks.dashboard,
            element: DashboardPage,
            isProtected: true,
        },
    ];

    return (
        <Router>
            <Routes>
                {/* Redirect root '/' to '/dashboard' */}
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>

                {/* Dynamically map routes */}
                {routesConfig.map(({path, element: Component, isProtected}, index) => {
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
            </Routes>
        </Router>
    );
}

export default App;
