import * as userActions from "./user";
import * as projectActions from "./project";
import * as storyActions from "./story";
import * as sprintActions from "./sprint";

export default {
  ...userActions,
  ...projectActions,
  ...storyActions,
  ...sprintActions,
};
