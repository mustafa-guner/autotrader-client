import {useDispatch} from "react-redux";
import {useEffect} from "react";
import store from "./store";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./features/auth/presentation/pages/LoginPage";
import RegisterPage from "./features/auth/presentation/pages/RegisterPage";
import DashboardPage from "./features/dashboard/presentation/pages/DashboardPage";
import ForgotPasswordPage from "./features/auth/presentation/pages/ForgotPasswordPage";

if (window.localStorage.getItem('token')) {
    store.dispatch({type: 'LOAD_USER_REQUEST'});
}

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            dispatch({type: 'LOAD_USER_REQUEST'});
        }
    }, [dispatch]);

    return (
        <Router>
            <header></header>
            <Routes>
                <Route path={'/auth'}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
                </Route>
                <Route path={'/dashboard'}>
                    <Route path="" element={<DashboardPage/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
