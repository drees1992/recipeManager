import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const register = (username, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    // load user after registration
  } catch (err) {
    // handle/show errors
    dispatch({
      type: REGISTER_FAIL
    });
  }
};