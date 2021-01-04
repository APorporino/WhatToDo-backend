import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storyReducer from "./storyReducer";
import sprintReducer from "./sprintReducer";
import taskReducer from "./taskReducer";
import sprint_storyReducer from "./sprintStoryReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  project: projectReducer,
  story: storyReducer,
  sprint: sprintReducer,
  task: taskReducer,
  sprint_story: sprint_storyReducer,
});
