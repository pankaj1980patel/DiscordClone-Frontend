import { Check, Clear } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

const InvitationDecisionButtons = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <Check />
      </IconButton>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <Clear />
      </IconButton>
    </Box>
  );
};

export default InvitationDecisionButtons;
