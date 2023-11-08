import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice';

export const store = configureStore({
  reducer: combineReducers({ordersReducer}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch