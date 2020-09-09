import axios from "axios";
import { ERROR, CHOSEN_PROJECT } from "./types";

export const createProject = (token, name, description) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/project",
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    dispatch({ type: CHOSEN_PROJECT, payload: res.data });
  } catch (e) {
    dispatch({ type: ERROR, payload: e.message });
  }
};

export const chooseProject = (project) => async (dispatch, getState) => {
  try {
    const state = getState();
    const members = await axios.get(`/project/${project._id}/members`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    project.members = members.data;
    const admins = await axios.get(`/project/${project._id}/admins`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    project.admins = admins.data;
    dispatch({ type: CHOSEN_PROJECT, payload: project });
  } catch (e) {
    dispatch({ type: ERROR, payload: e.message });
  }
};
