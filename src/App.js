import {useEffect} from "react";
import store from "./store";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import PublicRoute from "./core/routes/PublicRoute";
import {loadUser} from "./features/auth/presentation/redux/action";
import {routes} from "./core/routes";
console.log(routes)

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
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>

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
            </Routes>
        </Router>
    );
}

export default App;
