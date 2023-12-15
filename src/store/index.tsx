import {configureStore} from '@reduxjs/toolkit';
import {linkReducer} from './reducer';

const store = configureStore({reducer:{link:linkReducer}});

const rootState = typeof store.getState();

export default store;
export type {rootState};
