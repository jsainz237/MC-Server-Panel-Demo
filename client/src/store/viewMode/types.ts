export type ViewModeTypes = "ALL" | "SINGLE";

export interface ViewState {
    mode: ViewModeTypes
}

interface SetViewAction {
    type: "SET_VIEW_MODE",
    payload: ViewModeTypes
}

export type ViewStateActionTypes = SetViewAction;