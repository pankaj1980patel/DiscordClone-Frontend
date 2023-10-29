import React, { useState } from "react";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { IconButton } from "@mui/material";

const MicButton = (props) => {
  const [isScreenShareActive, setIsScreenShareActive] = useState(false);

  const handleScreenShareToggle = () => {
    setIsScreenShareActive(!isScreenShareActive);
  };
  return (
    <IconButton
      onClick={handleScreenShareToggle}
      style={{
        color: "white",
      }}
    >
      {isScreenShareActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default MicButton;
