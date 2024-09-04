import * as types from "./action_types";

const initialState = {
    user: null,
    isAuth: false,
    isRegistered: false,
    errors: {
        registration: [],
        login: [],
        logout: [],
        forgotPassword: [],
        resetPassword: [],
        loadUser: []
    },
    isPasswordResetLinkSent: false,
    token: localStorage.getItem("token"),
    loading: false
};

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        // Loading States
        case types.LOGIN_REQUEST:
        case types.REGISTER_REQUEST:
        case types.LOGOUT_REQUEST:
        case types.FORGOT_PASSWORD_REQUEST:
        case types.LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: payload,
                loading: false,
                errors: {
                    ...state.errors,
                    loadUser: []
                }
            };

        case types.LOAD_USER_FAILURE:
            return {
                ...state,
                isAuth: false,
                user: null,
                loading: false,
                errors: {
                    ...state.errors,
                    loadUser: ['User account could not be loaded.']
                }
            };
        //----------------------------------------------------------
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: payload.token,
                loading: false,
                errors: {
                    ...state.errors,
                    login: []
                }
            };

        case types.LOGIN_ERROR:
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false,
                loading: false,
                errors: {
                    ...state.errors,
                    login: payload
                }
            };
        //----------------------------------------------------------
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isRegistered: true,
                errors: {
                    ...state.errors,
                    registration: []
                }
            };

        case types.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isRegistered: false,
                errors: {
                    ...state.errors,
                    registration: payload
                }
            };

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuth: false,
                token: null,
                loading: false,
                errors: {
                    ...state.errors,
                    login: []
                }
            };

        case types.LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    login: ['Logout failed.']
                }
            };

        //----------------------------------------------------------
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isPasswordResetLinkSent: true,
                errors: {
                    ...state.errors,
                    forgotPassword: []
                }
            };

        case types.FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                isPasswordResetLinkSent: false,
                errors: {
                    ...state.errors,
                    forgotPassword: payload
                }
            }

        default:
            return state;
    }
};

export default auth;
