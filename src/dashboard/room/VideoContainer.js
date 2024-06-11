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
const VideoContainer = ({
  localStreams,
  remoteStreams,
  screenSharingStream,
}) => {
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStreams}
        isLocalStream
      />

      {remoteStreams.map((stream) => {
        if (stream !== null || Object.keys(stream).length > 0)
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
