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
const VideoContainer = ({ localStreams, remoteStreams }) => {
  return (
    <MainContainer>
      <Video stream={localStreams} isLocalStream />
      {remoteStreams.map((stream) => {
        if (stream !== null || stream !== {})
          return <Video stream={stream} key={stream.id} />;

        return <></>;
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return { ...room };
};

export default connect(mapStoreStateToProps)(VideoContainer);
