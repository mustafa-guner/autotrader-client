import api from "../../../utils/api";

const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    return await api('/me/notifications', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const DashboardService = {
    fetchNotifications
}