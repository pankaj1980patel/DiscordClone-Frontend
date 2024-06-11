import React, { useState } from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons";

const MainContainer = styled("div")({
  position: "absolute",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#202225",
});
const fullScreenRoomStyle = {
  width: "100%",
  height: "100vh",
};
const minimizedRoomStyle = {
  bottom: "0px",
  right: "0px",
  width: "30%",
  height: "40vh",
};
const Room = (props) => {
  const [isRoomMinimized, setIsMinimized] = useState(true);
  const roomResizeHandler = () => {
    setIsMinimized(!isRoomMinimized);
  };
  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
      <VideoContainer/>
      <RoomButtons/>
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomSize={roomResizeHandler}
      />
    </MainContainer>
  );
};

export default Room;
