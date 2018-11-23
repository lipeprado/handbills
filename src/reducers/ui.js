import initialState from "./initialState";
import * as types from "../actions/ui/types";

export default function(state = initialState.ui, action) {
  switch (action.type) {
    case types.MODAL_CHANGE:
      return {
        ...state,
        modalOpen: !state.modalOpen
      };

    default:
      return state;
  }
}
