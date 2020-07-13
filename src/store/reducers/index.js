import { combineReducers } from 'redux';
import auth from './auth.reducer';
import trip from './trip.reducer';
import profile from './profile.reducer';

const rootReducer = combineReducers({
    auth: auth,
    trip: trip,
    profile:profile
})

export default (state, action) => rootReducer(action.type === 'AUTH_LOGOUT' ? undefined : state, action);