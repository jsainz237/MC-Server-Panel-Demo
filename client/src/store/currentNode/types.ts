export interface NodeState {
    currNode: number;
}

interface SetCurrentNodeAction {
    type: "SET_CURRENT_NODE",
    payload: number;
}

export type NodeStateActionTypes = SetCurrentNodeAction;