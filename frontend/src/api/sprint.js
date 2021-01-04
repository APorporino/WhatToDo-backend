import axios from "axios";

export const createSprint = async (
  access_token,
  startDate,
  endDate,
  project
) => {
  try {
    await axios.post(
      "/sprint",
      {
        project,
        startDate,
        endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteSprint = async (access_token, sprintId) => {
  try {
    console.log(access_token);
    await axios.delete("/sprint", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        sprintId,
      },
    });
    console.log("deleted");
  } catch (e) {
    console.log(e);
  }
};
