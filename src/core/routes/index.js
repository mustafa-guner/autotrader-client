//Pages
import LoginPage from "../../features/auth/presentation/pages/LoginPage";
import RegisterPage from "../../features/auth/presentation/pages/RegisterPage";
import ForgotPasswordPage from "../../features/auth/presentation/pages/ForgotPasswordPage";
import ResetPasswordPage from "../../features/auth/presentation/pages/ResetPasswordPage";
import DashboardPage from "../../features/dashboard/presentation/pages/DashboardPage";
import ProfilePage from "../../features/profile/presentation/pages/ProfilePage";
import SettingsPage from "../../features/settings/presentation/pages/SettingsPage";

import {links} from "../../utils/constants";
import PortfolioPage from "../../features/portfolio/presentation/pages/PortfolioPage";


const publicLink = links.public;
const protectedLink = links.protected;

const publicRoutes = [
    {
        path: publicLink.auth.login,
        element: LoginPage,
        isProtected: false,
    },
    {
        path: publicLink.auth.register,
        element: RegisterPage,
        isProtected: false,
    },
    {
        path: publicLink.auth.forgotPassword,
        element: ForgotPasswordPage,
        isProtected: false,
    },
    {
        path: publicLink.auth.resetPassword,
        element: ResetPasswordPage,
        isProtected: false,
    }
];

const protectedRoutes = [
    {
        path: protectedLink.dashboard,
        element: DashboardPage,
        isProtected: true,
    },
    {
        path: protectedLink.profile,
        element: ProfilePage,
        isProtected: true
    },
    {
        path: protectedLink.settings,
        element: SettingsPage,
        isProtected: true
    },
    {
        path:protectedLink.portfolio,
        element: PortfolioPage,
        isProtected: true
    }
]


export const routes = [
    ...publicRoutes,
    ...protectedRoutes
];