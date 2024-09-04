import api from "../../../utils/api";

const loadUser = async () => {
    const token = localStorage.getItem('token');
    return await api('/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
const login = async (formData) => {
    return await api('/auth/login', {
        method: 'POST',
        data: formData
    });
}
const register = async (formData) => {
    return await api('/auth/register', {
        method: 'POST',
        data: formData
    });
}

const logout = async () => {
    const token = localStorage.getItem('token');
    return await api('/auth/logout', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const forgotPassword = async (formData) => {
    return await api('/auth/forgot-password', {
        method: 'POST',
        data: formData
    });
}

const resetPassword = async (formData) => {
    return await api('/auth/reset-password', {
        method: 'POST',
        data: formData
    });
}

const AuthService = {
    loadUser,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
}

export default AuthService;