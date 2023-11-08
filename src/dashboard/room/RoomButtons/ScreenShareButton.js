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
    let stream = null;
    if (!isScreenSharingActive) {
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log(
          "error occured when trying to get access to screen share stream\nerror === ",
          error
        );
      }
    }
    if (stream) {
      console.log("Control is here");
      setScreenSharingStream(stream);
      // webRTCHandler.switchOutgoing video tracks
      webRTCHandler.switchOutgoingTracks(stream);
    } else {
      // webRTCHandler.switchOutgoingTracks
      webRTCHandler.switchOutgoingTracks(localStreams);
      screenSharingStream.getTrack().forEach((t) => t.stop());
      setScreenSharingStream(null);
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
