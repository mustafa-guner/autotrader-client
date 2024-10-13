import * as types from "./action_types";

const initialState = {
    profile: null,
    bankAccounts: [],
    paymentMethods: [],
    errors: [],
    loading: true
};

const profile = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {

        case types.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loading: false,
                errors: []
            };

        case types.LOAD_PROFILE_FAILURE:
            return {
                ...state,
                profile: null,
                loading: false,
                errors: payload
            };

        case types.LOAD_BANK_ACCOUNTS_SUCCESS:
            return {
                ...state,
                bankAccounts: payload,
                loading: false,
                errors: []
            };

        case types.LOAD_BANK_ACCOUNTS_FAILURE:
            return {
                ...state,
                bankAccounts: state.bankAccounts,
                loading: false,
                errors: payload
            };

        case types.LOAD_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                paymentMethods: payload,
                loading: false,
                errors: []
            };

        case types.LOAD_PAYMENT_METHODS_FAILURE:
            return {
                ...state,
                paymentMethods: state.paymentMethods,
                loading: false,
                errors: payload
            };

        default:
            return state;
    }
};

export default profile;
