import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./RoomButtons/ScreenShareButton";
import MicButton from "./RoomButtons/MicButton";
import CameraButton from "./RoomButtons/CameraButton";
import CloseRoomButton from "./RoomButtons/CloseRoomButton";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/roomActions";

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
  const { localStreams } = props;
  return (
    <MainContainer>
      <ScreenShareButton {...props} />
      <MicButton localStream={localStreams} />
      <CameraButton localStream={localStreams} />
      <CloseRoomButton />
    </MainContainer>
  );
};
const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);
