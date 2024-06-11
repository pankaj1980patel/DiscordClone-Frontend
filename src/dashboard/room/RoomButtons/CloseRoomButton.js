import React from "react";
import { IconButton } from "@mui/material";
import CLoseIcon from "@mui/icons-material/Close";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";

const CloseRoomButton = (props) => {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom();
  };
  return (
    <IconButton
      onClick={handleLeaveRoom}
      style={{
        color: "white",
      }}
    >
      <CLoseIcon />
    </IconButton>
  );
};

export default CloseRoomButton;
