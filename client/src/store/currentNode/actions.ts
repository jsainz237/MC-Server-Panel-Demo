import { NodeStateActionTypes } from './types';

/** Set current node for single node view */
export function setCurrNode(node_id: number): NodeStateActionTypes {
    return {
        type: "SET_CURRENT_NODE",
        payload: node_id
    }
}