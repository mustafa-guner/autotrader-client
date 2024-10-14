import * as types from './action_types';
import {DashboardService} from "../../data/dashboard_service";


export const getNotifications = () => async (dispatch) => {
    try {
        const {data} = await DashboardService.fetchNotifications();
        dispatch({type: types.LOAD_NOTIFICATIONS_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({type: types.LOAD_NOTIFICATIONS_FAILURE, payload: error.response.data.errors});
    }
};

export const addNotification = (notification) => async (dispatch) => {
    dispatch({type: types.NEW_NOTIFICATION, payload: notification});
}
