import { SPRINT_STORY } from "../actions/types";

const sprint_storyReducer = (state = [], action) => {
  switch (action.type) {
    case SPRINT_STORY:
      return action.payload;
    default:
      return state;
  }
};

export default sprint_storyReducer;
