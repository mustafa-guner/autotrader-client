import api from "../../../utils/api";

const updateProfile = async (data) => {
    const token = localStorage.getItem('token');
    return await api('/me', {
        method: 'GET',
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

const SettingsService = {
    updateProfile,
    banks,
    addBankAccount
}

export default SettingsService;