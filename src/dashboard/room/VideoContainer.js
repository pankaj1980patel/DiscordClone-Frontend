import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./RoomButtons/Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});
const VideoContainer = ({localStreams}) => {
  return <MainContainer>
    <Video stream={localStreams} isLocalStream={false} />
  </MainContainer>;
};

const mapStoreStateToProps = ({ room }) => {
  return { ...room };
};

export default connect(mapStoreStateToProps)(VideoContainer);
