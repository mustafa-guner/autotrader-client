import * as types from "./action_types";

const initialState = {
    errors: [],
    successMessages: [],
    loading: true
};

const settings = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {

        case types.ADD_BANK_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessages: [payload],
                errors: []
            };

        case types.ADD_BANK_ACCOUNT_FAILURE:
            return {
                ...state,
                loading: false,
                successMessages: [],
                errors: payload
            };

        case types.CLEAR_SETTINGS_ERROR:
            return {
                ...state,
                errors: []
            };

        case types.CLEAR_SETTINGS_MESSAGES:
            return {
                ...state,
                successMessages: []
            };

        default:
            return state;
    }
};

export default settings;
