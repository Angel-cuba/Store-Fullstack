import { createStore, applyMiddleware } from 'redux';
import type { Action } from 'redux';
import { thunk } from 'redux-thunk';
import type { ThunkDispatch } from 'redux-thunk';
import createRootReducer from './reducers';
import type { AppState } from '../types/ProductType';

export type { AppState };

export const store = createStore(createRootReducer(), applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<AppState, unknown, Action>;
