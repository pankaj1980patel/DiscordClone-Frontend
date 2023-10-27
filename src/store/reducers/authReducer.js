import { authActions } from "../actions/authActions";
const initState = {
  userDetails: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) { // Use action.type to check the action type
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails, // Access userDetails from action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
