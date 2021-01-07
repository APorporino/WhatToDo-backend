import axios from "axios";

export const updateTask = async (access_token, taskId, updateObject) => {
  try {
    const res = await axios.patch(
      `/tasks/${taskId}`,
      { ...updateObject },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("OMG");
  } catch (e) {
    console.log(e);
  }
};
