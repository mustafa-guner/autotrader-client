import * as types from "./action_types";

const initialState = {
    user: null,
    isAuth: false,
    isRegistered: false,
    errors: [],
    successMessages: [],
    isPasswordResetLinkSent: false,
    passwordResetEmail: null,
    token: localStorage.getItem("token"),
    loading: true
};

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {

        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: payload,
                loading: false,
                errors: []
            };

        case types.LOAD_USER_FAILURE:
            return {
                ...state,
                isAuth: false,
                user: null,
                loading: false,
                errors: [...payload]
            };
        //----------------------------------------------------------
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: payload.token,
                loading: false,
                errors: []
            };

        case types.LOGIN_ERROR:
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false,
                loading: false,
                errors: [
                    ...payload
                ]
            };
        //----------------------------------------------------------
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isRegistered: true,
                errors: [],
                successMessages: [...payload]
            };

        case types.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isRegistered: false,
                errors: [...payload]
            };

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuth: false,
                token: null,
                loading: false,
                errors: []
            };

        case types.LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                errors: [...payload]
            };

        //----------------------------------------------------------
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isPasswordResetLinkSent: true,
                passwordResetEmail: payload.email,
                successMessages: [payload.message],
                errors: []
            };

        case types.PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                loading: false,
                isPasswordResetLinkSent: false,
                successMessages: [payload.message],
                errors: []
            };

        case types.PASSWORD_RESET_FAILURE:
            return {
                ...state,
                loading: false,
                isPasswordResetLinkSent: false,
                errors: [...payload]
            };

        case types.FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                isPasswordResetLinkSent: false,
                errors: [...payload]
            }

        case types.CLEAR_AUTH_ERRORS:
            return {
                ...state,
                errors: []
            };

        case types.CLEAR_AUTH_MESSAGES:
            return {
                ...state,
                successMessages: []
            };

        default:
            return state;
    }
};

export default auth;
