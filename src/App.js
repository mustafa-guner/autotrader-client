import { useEffect } from "react";
import store from "./store";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/presentation/pages/LoginPage";
import RegisterPage from "./features/auth/presentation/pages/RegisterPage";
import DashboardPage from "./features/dashboard/presentation/pages/DashboardPage";
import ForgotPasswordPage from "./features/auth/presentation/pages/ForgotPasswordPage";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import {loadUser} from "./features/auth/presentation/redux/action";

if (window.localStorage.getItem("token")) {
    store.dispatch(loadUser())
}

function App() {

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            store.dispatch(loadUser());
        }
    }, []);

    return (
        <Router>
            <header></header>
            <Routes>
                {/* Redirect root '/' to '/dashboard' */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/auth">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute />}>
                    <Route index element={<DashboardPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
