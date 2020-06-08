import { combineReducers } from 'redux';
import { viewReducer } from './viewMode/reducer';
import { currentNodeReducer } from './currentNode/reducer';

export const rootReducer = combineReducers({
    view: viewReducer,
    node: currentNodeReducer
})

export type RootState = ReturnType<typeof rootReducer>