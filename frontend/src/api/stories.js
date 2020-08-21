import axios from "axios";

export const getBacklogStories = async (backlogID, access_token) => {
  try {
    const res = await axios.get(`/backlog/${backlogID}/stories/0/0/0/0`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export const createStory = async (token, backlog, name, description) => {
  try {
    const res = await axios.post(
      "/story",
      {
        backlog,
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return "error";
  }
};
