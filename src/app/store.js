/* eslint-disable */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { compose } from 'redux';

const enhancers = compose(
    window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
);

export const store = configureStore({
    reducer: {

    },
    middleware: [...getDefaultMiddleware(), thunk],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers
});