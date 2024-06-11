import React from "react";
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { CloseFullscreen, OpenInFull } from "@mui/icons-material";

const MainContainer = styled("div")({
  position: "absolute",
  bottom: "10px",
  right: "10px",
});

const ResizeRoomButton = ({ isRoomMinimized, handleRoomSize }) => {
  return (
    <MainContainer>
      <IconButton style={{ color: "white" }} onClick={handleRoomSize}>
        {isRoomMinimized ? <OpenInFull /> : <CloseFullscreen />}
      </IconButton>
    </MainContainer>
  );
};

export default ResizeRoomButton;
