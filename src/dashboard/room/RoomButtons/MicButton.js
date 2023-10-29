import React, { useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from "@mui/material";

const MicButton = (props) => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleToggleMic = () => {
    setMicEnabled(!micEnabled);
  };
  return (
    <IconButton
      onClick={handleToggleMic}
      style={{
        color: "white",
      }}
    >
      {micEnabled ? <MicOffIcon /> : <MicIcon />}
    </IconButton>
  );
};

export default MicButton;
