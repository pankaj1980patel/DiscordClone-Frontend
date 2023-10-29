import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./RoomButtons/ScreenShareButton";
import MicButton from "./RoomButtons/MicButton";
import CameraButton from "./RoomButtons/CameraButton";
import CloseRoomButton from "./RoomButtons/CloseRoomButton";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const RoomButtons = (props) => {
  return (
    <MainContainer>
      <ScreenShareButton />
      <MicButton />
      <CameraButton />
      <CloseRoomButton />
    </MainContainer>
  );
};

export default RoomButtons;
