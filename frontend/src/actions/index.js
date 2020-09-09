import * as userActions from "./user";
import * as projectActions from "./project";
import * as storyActions from "./story";

export default { ...userActions, ...projectActions, ...storyActions };
