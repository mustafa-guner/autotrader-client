import * as types from "./action_types";
import {LOAD_PROFILE_FAILURE} from "./action_types";

const initialState = {
    profile: null,
    errors: {
        profile: {}
    },
    loading: false
};

const profile = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        // Loading States
        case types.LOAD_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case types.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loading: false,
                errors: {}
            };

        case types.LOAD_PROFILE_FAILURE:
            return {
                ...state,
                profile: null,
                loading: false,
                errors: {
                    ...state.errors,
                    profile: payload
                }
            };

        default:
            return state;
    }
};

export default profile;
