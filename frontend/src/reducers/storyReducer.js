import { STORY } from "../actions/types";

const storyReducer = (state = [], action) => {
  switch (action.type) {
    case STORY:
      return action.payload;
    default:
      return state;
  }
};

export default storyReducer;
