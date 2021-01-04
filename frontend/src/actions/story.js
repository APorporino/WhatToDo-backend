import axios from "axios";
import { STORY, SPRINT_STORY } from "./types";

export const getBacklogStories = (backlogID, access_token) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/backlog/${backlogID}/stories/0/0/0/0`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    dispatch({ type: STORY, payload: res.data });
  } catch (e) {
    dispatch({ type: STORY, payload: "Story error: " + e });
  }
};

export const getStoryForSprint = (access_token, sprintId) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/sprint/getAllStories/${sprintId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    dispatch({ type: SPRINT_STORY, payload: res.data });
  } catch (e) {
    dispatch({ type: SPRINT_STORY, payload: "Story error: " + e });
  }
};
