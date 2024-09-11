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

const ProfileService = {
    loadProfile
}

export default ProfileService;