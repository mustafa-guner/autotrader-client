import {ADD_BANK_ACCOUNT_SUCCESS, ADD_BANK_ACCOUNT_FAILURE,CLEAR_SETTINGS_MESSAGES,CLEAR_SETTINGS_ERROR} from './action_types';
import SettingsService from "../../data/settings_service";
import {errorParser} from "../../../../utils/helpers";


export const addBankAccount = (formData) => async (dispatch) => {
    try {
        const {data} = await SettingsService.addBankAccount(formData);
        dispatch({type: ADD_BANK_ACCOUNT_SUCCESS, payload: data.message});
    } catch (error) {
        dispatch({type: ADD_BANK_ACCOUNT_FAILURE, payload: errorParser(error.response.data.errors)});
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_SETTINGS_ERROR});
}

export const clearMessages = () => async (dispatch) => {
    dispatch({type: CLEAR_SETTINGS_MESSAGES});
}