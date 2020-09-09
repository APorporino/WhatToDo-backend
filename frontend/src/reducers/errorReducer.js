import { ERROR } from "../actions/types";

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case ERROR:
      console.log("WHYYY");
      return action.payload;
    default:
      return null;
  }
};

export default errorReducer;
