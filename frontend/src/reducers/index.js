import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storyReducer from "./storyReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  project: projectReducer,
  story: storyReducer,
});
