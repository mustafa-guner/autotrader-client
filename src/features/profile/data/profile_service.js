import api from "../../../utils/api";

const loadProfile = async () => {
    const token = localStorage.getItem('token');
    return await api('/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const loadBankAccounts = async () => {
    const token = localStorage.getItem('token');
    return await api('/me/bank-accounts', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

const loadPaymentMethods = async () => {
    const token = localStorage.getItem('token');
    return await api('/me/payment-methods', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const removeBankAccount = async (id) => {
    const token = localStorage.getItem('token');
    return await api(`/me/bank-accounts/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const removePaymentMethod = async (id) => {
    const token = localStorage.getItem('token');
    return await api(`/me/payment-methods/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const ProfileService = {
    loadProfile,
    loadBankAccounts,
    removeBankAccount,
    loadPaymentMethods,
    removePaymentMethod
}

export default ProfileService;