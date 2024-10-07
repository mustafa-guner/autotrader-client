import api from "../../../utils/api";

const submitFeedback = async (formData) => {
    const token = localStorage.getItem('token');
    return await api('/feedbacks/create', {
        method: 'POST',
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

const fetchFeedbackTypes = async () => {
    const token = localStorage.getItem('token');
    return await api('/feedback-types', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const FeedbackService = {
    submitFeedback,
    fetchFeedbackTypes
}