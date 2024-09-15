import * as types from "../../../profile/presentation/redux/action_types";
import ProfileService from "../../../profile/data/profile_service";

export const loadProfile = () => async (dispatch) => {
    try {
        const {data} = await ProfileService.loadProfile();
        dispatch({type: types.LOAD_PROFILE_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOAD_PROFILE_FAILURE, payload: error.response.data.errors});
    }
};

export const loadBankAccounts = () => async (dispatch) => {
    try {
        const {data} = await ProfileService.loadBankAccounts();
        dispatch({type: types.LOAD_BANK_ACCOUNTS_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOAD_BANK_ACCOUNTS_FAILURE, payload: error.response.data.errors});
    }
}