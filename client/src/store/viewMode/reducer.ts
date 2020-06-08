import { ViewState, ViewStateActionTypes } from "./types";

const initialState: ViewState = {
    mode: "ALL"
}

/** Reducer for setting view mode in redux store */
export function viewReducer(state = initialState, action: ViewStateActionTypes): ViewState {
    switch(action.type) {
        case "SET_VIEW_MODE":
            return { mode: action.payload };
        default: 
            return state;
    }
}