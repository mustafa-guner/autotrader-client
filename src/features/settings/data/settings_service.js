import api from "../../../utils/api";

const updateProfile = async (formatData) => {
    const token = localStorage.getItem('token');
    return await api('/me/update', {
        method: 'PUT',
        data:formatData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

const banks = async () => {
    const token = localStorage.getItem('token');
    return await api('/banks', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const addBankAccount = async (formData) => {
    const token = localStorage.getItem('token');
    return await api('/me/bank-accounts', {
        method: 'POST',
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const addPaymentMethod = async(formData) => {
    const token = localStorage.getItem('token');
    return await api('/me/payment-methods', {
        method: 'POST',
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const balanceHistories = async () => {
    const token = localStorage.getItem('token');
    return await api('/me/balance-histories', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const withdraw = async (formData) => {
    const token = localStorage.getItem('token');
    return await api('/me/withdraw', {
        method: 'PUT',
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}


const deposit = async (formData) => {
    const token = localStorage.getItem('token');
    return await api('/me/deposit', {
        method: 'PUT',
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}


const SettingsService = {
    updateProfile,
    banks,
    addBankAccount,
    addPaymentMethod,
    withdraw,
    deposit,
    balanceHistories
}

export default SettingsService;