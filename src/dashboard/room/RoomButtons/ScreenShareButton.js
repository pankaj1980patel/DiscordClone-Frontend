import React from "react";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { IconButton } from "@mui/material";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({
  localStreams,
  screenSharingStream,
  isScreenSharingActive,
  setScreenSharingStream,
}) => {
  const handleScreenShareToggle = async () => {
    try {
      if (!isScreenSharingActive) {
        // Start screen sharing
        const stream = await navigator.mediaDevices.getDisplayMedia(
          constraints
        );
        if (stream) {
          setScreenSharingStream(stream);
          webRTCHandler.switchOutgoingTracks(stream);
        }
      } else {
        // Stop screen sharing
        webRTCHandler.switchOutgoingTracks(localStreams);
        screenSharingStream.getTracks().forEach((track) => track.stop());
        setScreenSharingStream(null);
      }
    } catch (error) {
      console.error("Error occurred during screen sharing toggle:", error);
    }
  };

  return (
    <IconButton
      onClick={handleScreenShareToggle}
      style={{
        color: "white",
      }}
    >
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
