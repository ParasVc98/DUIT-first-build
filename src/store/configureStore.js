import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import GlobalReducer from './reducers/GlobalReducer';
import HomeScreenReducer from './reducers/HomeScreenReducer';
import SendScreenReducer from './reducers/SendScreenReducer';
import ProfileScreenReducer from './reducers/ProfileScreenReducer';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import { persistStore, persistCombineReducers } from 'redux-persist';

/**
 * Note:
 * 
 * Problem:
 * 
 * As this app is already configured with redux persist hence it persits the
 * redux store data from the last session. This will make development incredibly
 * tiresome.
 * 
 * Solution:
 * 
 * Make the key property value in the persistConfig object unique every time the
 * app renders.
 * 
 * And also, Make the isVerified property in the state of the main App.js file
 * to true, so that you can bypass the otp verification screen and get straight
 * to development or testing.
 * 
 * Example:
 * 
 * const persistConfig = { key: 'duit-app-v10.8.0' + Math.random() * 999999,
 *                         storage
 *                       }
 */

const persistConfig = {

    key: 'duit-app-v2.12',
    storage
};

const rootReducers = {

    globalData: GlobalReducer,
    homeScreenData: HomeScreenReducer,
    sendScreenData: SendScreenReducer,
    profileScreenData: ProfileScreenReducer
};

const persistedRootReducer = persistCombineReducers(persistConfig, rootReducers);


export const store = createStore(persistedRootReducer,
                                 applyMiddleware(thunk)
                                );


export const persistedStore = persistStore(store);