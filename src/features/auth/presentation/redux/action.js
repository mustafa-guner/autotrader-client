import * as types from "./action_types";
import errorParser from "../../../../utils/helpers";
import AuthService from "../../data/auth_service";

export const loadUser = () => async (dispatch) => {
    dispatch({type: types.LOAD_USER_REQUEST});
    try {
        const {data} = await AuthService.loadUser();
        dispatch({type: types.LOAD_USER_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOAD_USER_FAILURE});
    }
};

export const register = (formData) => async (dispatch) => {
    dispatch({type: types.REGISTER_REQUEST});

    try {
        const {data} = await AuthService.register(formData);
        dispatch({type: types.REGISTER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: types.REGISTER_FAILURE, payload: errorParser(error.response.data.errors)});
    }
};

export const login = (formData) => async (dispatch) => {
    dispatch({type: types.LOGIN_REQUEST});
    try {
        const {data} = await AuthService.login(formData);
        localStorage.setItem("token", data.data.token);
        dispatch({type: types.LOGIN_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOGIN_ERROR, payload: [error.response.data.message]});
    }
};

export const forgotPassword = (formData) => async (dispatch) => {
    dispatch({type: types.FORGOT_PASSWORD_REQUEST});
    try {
        const {data} = await AuthService.forgotPassword(formData);
        dispatch({type: types.FORGOT_PASSWORD_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.FORGOT_PASSWORD_FAILURE, payload: [error.response.data.message]});
    }
};

export const resetPassword = (formData) => async (dispatch) => {
    dispatch({type: types.PASSWORD_RESET_REQUEST});
    try {
        const {data} = await AuthService.resetPassword(formData);
        dispatch({type: types.PASSWORD_RESET_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.PASSWORD_RESET_FAILURE, payload: errorParser(error.response.data.errors)});
    }
};
