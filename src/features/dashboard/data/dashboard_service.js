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

const fetchShares = async () => {
    const token = localStorage.getItem('token');
    return await api('/me/shares', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const buyShares = async (data) => {
    const token = localStorage.getItem('token');
    return await api('/shares/buy', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    });
}

const sellShares = async (data) => {
    const token = localStorage.getItem('token');
    return await api('/shares/sell', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    });
}

const fetchTickers = async () => {
    const token = localStorage.getItem('token');
    return await api('/tickers', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const DashboardService = {
    fetchNotifications,
    buyShares,
    sellShares,
     fetchShares,
    fetchTickers
}