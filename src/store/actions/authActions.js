import * as api from "../../api";
import { openAlertMessage } from "./alertActions";
export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigator) => dispatch(login(userDetails, navigator)),
    register: (userDetails, navigator) =>
      dispatch(register(userDetails, navigator)),
  };
};
const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};
const login = (userDetails, navigator) => {
  return async (dispatch) => {
    try {
      const response = await api.login(userDetails);
      console.log(response);
      if (response.error) {
        // Handle other errors (e.g., server-side validation errors) here
        // show error message in alert
        dispatch(openAlertMessage(response?.exception?.response?.data));
      } else {
        const { userDetails } = response.data;
        localStorage.setItem("user", JSON.stringify(userDetails));

        dispatch(setUserDetails(userDetails));
        navigator("/dispatch");
      }
    } catch (error) {
      if (error.message === "Timeout") {
        // Handle timeout error here
        // show a timeout error message
      } else {
        // Handle other unexpected errors here
        console.error(error);
        // show a generic error message
      }
    }
  };
};

const register = (userDetails, navigator) => {
  return async (dispatch) => {
    try {
      const response = await api.register(userDetails);
      console.log(response);
      if (response.error) {
        // Handle other errors (e.g., server-side validation errors) here
        // show error message in alert
        dispatch(openAlertMessage(response?.exception?.response?.data));

      } else {
        const { userDetails } = response.data;
        console.log("userdetails", userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));

        dispatch(setUserDetails(userDetails));
        navigator("/dispatch");
      }
    } catch (error) {
      if (error === "Timeout") {
        // Handle timeout error here
        // show a timeout error message
      } else {
        // Handle other unexpected errors here
        console.error(error);
        // show a generic error message
      }
    }
  };
};
