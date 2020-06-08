import { ViewStateActionTypes, ViewModeTypes } from "./types";

/** Set data view mode */
export function setViewMode(mode: ViewModeTypes): ViewStateActionTypes {
    return {
        type: "SET_VIEW_MODE",
        payload: mode
    }
}