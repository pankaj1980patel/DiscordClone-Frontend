import React, { useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from "@mui/material";

const MicButton = ({ localStream }) => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled;
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
