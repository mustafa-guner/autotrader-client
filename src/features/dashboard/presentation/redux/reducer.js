import * as types from './action_types';

const initialState = {
    notifications: [],
    loading: true,
};

const notifications = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LOAD_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: payload,
                loading: false,
            };

        case types.LOAD_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case types.NEW_NOTIFICATION:
            return {
                ...state,
                notifications: [payload, ...state.notifications].slice(0, 3),
            };

        default:
            return state;
    }
};

export default notifications;
