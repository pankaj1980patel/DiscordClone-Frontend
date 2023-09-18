const initState = {
  userDetails: null,
};

const authReducer = (state=initState, action) => {
  switch (action) {
    case "DUMMY":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
