import axios from "axios";
import { SPRINT, SPRINT_TASK } from "./types";

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

export const getSprintTasks = (access_token, sprintId) => async (dispatch) => {
  try {
    const res = await axios.get(`/sprint/getAllTasks/${sprintId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    dispatch({ type: SPRINT_TASK, payload: res.data });
  } catch (e) {
    dispatch({ type: SPRINT_TASK, payload: "Error " + e });
  }
};
