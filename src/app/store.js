/* eslint-disable */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { compose, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});
