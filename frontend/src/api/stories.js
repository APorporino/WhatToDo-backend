import axios from "axios";

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
    return e.message;
  }
};

export const deleteStory = async (token, storyId) => {
  try {
    const res = await axios.delete(`/story/${storyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export const addStoryToSprint = async (token, sprintId, storyId) => {
  try {
    const res = await axios.post(
      `/story/addToSprint`,
      { storyId, sprintId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export const removeStoryFromSprint = async (token, storyId) => {
  try {
    const res = await axios.patch(
      `/story/removeFromSprint`,
      { storyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export const createTask = async (token, storyId, description, status, tag) => {
  try {
    const res = await axios.post(
      "/tasks",
      {
        story: storyId,
        description,
        status,
        tag,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
};
