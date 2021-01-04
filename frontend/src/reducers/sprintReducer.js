import { SPRINT } from "../actions/types";

const sprintReducer = (state = [], action) => {
  switch (action.type) {
    case SPRINT:
      return action.payload;
    default:
      return state;
  }
};

export default sprintReducer;
