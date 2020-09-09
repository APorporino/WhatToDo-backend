import axios from "axios";

export const getProjects = async (access_token) => {
  try {
    const res = await axios.get("/users/projects", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (e) {
    return e;
  }
};

export const findUserByEmail = async (access_token, email) => {
  try {
    const res = await axios.get(`/user/${email}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const payload = res.data;
    return payload;
  } catch (e) {
    return e.message;
  }
};

export const addMember = async (access_token, email, projectId) => {
  try {
    const res = await axios.patch(
      `/project`,
      {
        user_email: email,
        project_id: projectId,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
};
