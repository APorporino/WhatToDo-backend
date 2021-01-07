import { SPRINT_TASK } from "../actions/types";

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case SPRINT_TASK:
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;
