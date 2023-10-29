import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./sideBar/SideBar";
import FriendsSideBar from "./friendsSideBar/FriendsSideBar";
import Messenger from "./messenger/Messenger";
import AppBar from "./appBar/AppBar";
import { logout } from "../shared/util/auth";
import { getActions } from "../store/actions/authActions";
import { connect } from "react-redux";

import { connectionWithSocketServer } from "../realtimeCommunication/socketConnection";
import Room from "./room/Room";
const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});
const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      console.log("from Dashboard", userDetails);
      console.log("\n setUserDetails == ", setUserDetails);
      setUserDetails(JSON.parse(userDetails));
      connectionWithSocketServer(userDetails);
      console.log("I again send the connection request");
    }
  }, [setUserDetails]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};
const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
