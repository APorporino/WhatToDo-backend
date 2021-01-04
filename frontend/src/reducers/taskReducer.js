import { TASK } from "../actions/types";

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case TASK:
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;
