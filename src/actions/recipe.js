import axios from "axios";

import {
  ADD_RECIPE,
  DELETE_RECIPE,
  RECIPE_FAIL,
  GET_RECIPES,
  GET_USERRECIPES,
  CLEAR_RECIPES,
  OPEN_ADDRECIPE,
  CLOSE_ADDRECIPE,
  UPDATE_ADDRECIPE,
  CLEAR_ADDRECIPE,
  GET_ATTRIBUTES,
} from "./types";
//import { setAlert } from "./alert";

export const addRecipe = (recipeData) => async (dispatch) => {
  try {
    const res = await axios.get(process.env.BASE_PATH + "/api/getToken");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.data.user.strapiToken}`,
      },
    };
    //const config = {
    //headers: {
    //"Content-Type": "application/json",
    //Authorization:
    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjc5NmEyYTlmNDdjMDAxNzRjMGRhYiIsImlhdCI6MTU5NjUwMTQ0OCwiZXhwIjoxNTk5MDkzNDQ4fQ.hZuCPkkCrHFh2v_Gr17L02tZlqM-Xmc5WmROpb9x6Sg",
    //},
    //};

    const formData = {
      ...recipeData,
      user: res.data.user.name,
      slug: recipeData.name,
      status: "published",
    };
    console.log(formData);

    const body = JSON.stringify(formData);

    const resTwo = await axios.post(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + "/recipes",
      body,
      config
    );
    //dispatch({
    //type: ADD_RECIPE,
    //payload: res.data,
    //});
    //dispatch(setAlert("Recipe succesfully added!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "fail")));
    }

    dispatch({
      type: RECIPE_FAIL,
      // option to star duplicate resturants
      // payload: res.data
    });
  }
};

export const getAttributes = () => async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + "/attributes"
    );
    dispatch({
      type: GET_ATTRIBUTES,
      payload: res.data,
    });
  } catch (err) {
    //const errors = err.response.data.errors;
    //if (errors) {
    //errors.forEach((error) => dispatch(setAlert(error.msg, "fail")));
    //}
  }
};

export const getUserRecipes = () => async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.SITE + process.env.BASE_PATH + "/api/getToken"
    );
    console.log(res.data.user.recipes);
    dispatch({
      type: GET_USERRECIPES,
      payload: res.data.user.recipes,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "fail")));
    }

    dispatch({
      type: CLEAR_RECIPES,
    });

    // dispatch({
    //   type: RECIPE_FAIL
    //   // option to star duplicate resturants
    //   // payload: res.data
    // });
  }
};

export const openAddRecipe = () => async (dispatch) => {
  try {
    dispatch({
      type: OPEN_ADDRECIPE,
      payload: { backdropOpen: true },
    });
  } catch (err) {
    //handle error here
  }
};

export const closeAddRecipe = () => async (dispatch) => {
  try {
    dispatch({
      type: CLOSE_ADDRECIPE,
      payload: { backdropOpen: false },
    });
  } catch (err) {
    //handle error here
  }
};

export const clearAddRecipeInfo = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_ADDRECIPE,
    });
  } catch (err) {
    //handle error here
  }
};

export const updateAddRecipeInfo = (recipeData) => (dispatch) => {
  try {
    //console.log(recipeData);
    dispatch({
      type: UPDATE_ADDRECIPE,
      payload: recipeData,
    });
  } catch (err) {
    //handle error here
    console.log(err);
  }
};
//export const getRecipes = () => async (dispatch) => {
//try {
//const res = await axios.get("/recipemanager/api/recipes");
//dispatch({
//type: GET_RECIPES,
//payload: res.data,
//});
//} catch (err) {
//const errors = err.response.data.errors;

//if (errors) {
//errors.forEach((error) => dispatch(setAlert(error.msg, "fail")));
//}
//dispatch({
//type: CLEAR_RECIPES,
//});

//// dispatch({
////   type: RECIPE_FAIL
////   // option to star duplicate resturants
////   // payload: res.data
//// });
//}
//};

//export const deleteRecipe = (id) => async (dispatch) => {
//try {
//await axios.delete(`/recipemanager/api/recipes/${id}`);

//dispatch({
//type: DELETE_RECIPE,
//payload: id,
//});
//dispatch(setAlert("Recipe succesfully deleted!", "success"));
//} catch (err) {
//const errors = err.response.data.errors;

//if (errors) {
//errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//}

//dispatch({
//type: RECIPE_FAIL,
//});
//}
//};
