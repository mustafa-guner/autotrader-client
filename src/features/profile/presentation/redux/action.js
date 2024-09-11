import * as types from "../../../profile/presentation/redux/action_types";
import ProfileService from "../../../profile/data/profile_service";

export const loadProfile = () => async (dispatch) => {
    dispatch({type: types.LOAD_PROFILE_REQUEST});
    try {
        const {data} = await ProfileService.loadProfile();
        dispatch({type: types.LOAD_PROFILE_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOAD_PROFILE_FAILURE, payload: error.response.data.errors});
    }
};