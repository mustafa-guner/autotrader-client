import * as types from "./action_types";
import {errorParser} from "../../../../utils/helpers";
import AuthService from "../../data/auth_service";

export const loadUser = () => async (dispatch) => {
    try {
        const {data} = await AuthService.loadUser();
        dispatch({type: types.LOAD_USER_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOAD_USER_FAILURE});
    }
};

export const register = (formData) => async (dispatch) => {
    try {
        const {data} = await AuthService.register(formData);
        dispatch({type: types.REGISTER_SUCCESS, payload: [data.message]});
    } catch (error) {
        dispatch({type: types.REGISTER_FAILURE, payload: errorParser(error.response.data)});
        throw error;
    }
};

export const login = (formData) => async (dispatch) => {
    try {
        const {data} = await AuthService.login(formData);
        localStorage.setItem("token", data.data.token);
        dispatch({type: types.LOGIN_SUCCESS, payload: data.data});
        dispatch(loadUser());
    } catch (error) {
        dispatch({type: types.LOGIN_ERROR, payload: errorParser(error.response.data)});
    }
};

export const logout = () => async (dispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem("token");
        dispatch({type: types.LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type: types.LOGOUT_FAILURE});
    }
}

export const forgotPassword = (formData) => async (dispatch) => {
    try {
        let email = formData.email;
        let {data} = await AuthService.forgotPassword(formData);
        data = {message: data.message, email: email}
        dispatch({type: types.FORGOT_PASSWORD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: types.FORGOT_PASSWORD_FAILURE, payload: ['error']});
    }
};

export const resetPassword = (formData) => async (dispatch) => {
    try {
        let {data} = await AuthService.resetPassword(formData);
        data = {message: data.message}
        dispatch({type: types.PASSWORD_RESET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: types.PASSWORD_RESET_FAILURE, payload: errorParser(error.response.data)});
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({type: types.CLEAR_AUTH_ERRORS});
}

export const clearMessages = () => async (dispatch) => {
    dispatch({type: types.CLEAR_AUTH_MESSAGES});
}