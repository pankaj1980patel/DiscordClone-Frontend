import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/alertActions";

const AlertNotification = ({ showAlertMessage, closeAlertMessage, alertMessageContent }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage} // Use the openAlertMessage function to  determine if it should be open.
      onClose={closeAlertMessage} // Use the closeAlertMessage function to handle close.
      autoHideDuration={5000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(AlertNotification);
