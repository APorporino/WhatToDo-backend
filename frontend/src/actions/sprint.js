import axios from "axios";
import { SPRINT } from "./types";

export const getProjectSprints = (access_token, project_id) => async (
  dispatch
) => {
  try {
    const res = await axios.get("/project/" + project_id + "/sprints", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    dispatch({ type: SPRINT, payload: res.data });
  } catch (e) {
    dispatch({ type: SPRINT, payload: "Error " + e });
  }
};
