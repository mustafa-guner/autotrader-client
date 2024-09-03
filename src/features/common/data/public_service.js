import api from "../../../utils/api";

const genders = async () => {
    return await api('/genders', {method: 'GET'});
}

const countries = async () => {
    return await api('/countries', {method: 'GET'});
}

const PublicService = {
    genders,
    countries
}

export default PublicService;