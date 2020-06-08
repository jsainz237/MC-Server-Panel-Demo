import { NodeState, NodeStateActionTypes } from './types';

const initialState: NodeState = {
    currNode: 1122
}

/** Reducer for setting current node for single node view in redux store */
export function currentNodeReducer(state = initialState, action: NodeStateActionTypes): NodeState {
    switch(action.type) {
        case "SET_CURRENT_NODE":
            return { currNode: action.payload };
        default:
            return state;
    }
}