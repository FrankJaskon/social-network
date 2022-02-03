import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import asideReducer from './aside-reducer';
import authReducer from './auth-reducer';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import settingsReducer from './settings-reducer';
import appReducer from './app-reducer';

const reducers = combineReducers({
    auth: authReducer,
    aside: asideReducer,
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    settings: settingsReducer,
    app: appReducer
});

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootStateType =  ReturnType <typeof reducers>;

export type StoreType = typeof store;

export const store = createStore(reducers, composeEnhancers(compose(applyMiddleware(thunkMiddleWare))));