import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/authReducer';
import servicesReducers from './reducers/servicesReducers';
import requestReducer from './reducers/requestReducer';
import pagesReducer from './reducers/pagesReducer';

export const store = configureStore({
  reducer: {
    authSlice,
    servicesReducers,
    requestReducer,
    pagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
