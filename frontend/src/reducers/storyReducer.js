import { STORY } from "../actions/types";

const storyReducer = (state = null, action) => {
  switch (action.type) {
    case STORY:
      return action.payload;
    default:
      return state;
  }
};

export default storyReducer;
