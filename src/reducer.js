import {combineReducers} from 'redux';
//reducers
import auth from "./features/auth/presentation/redux/reducer";
import profile from "./features/profile/presentation/redux/reducer";
import notifications from './features/dashboard/presentation/redux/reducer';

export default combineReducers({
    auth, profile,notifications
});