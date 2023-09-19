import React from "react";
import { styled } from "@mui/system";
import AddFriendsButton from "./AddFriendsButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./friendsList/FriendsList";
import PendingInvitationsList from "./friendsList/PendingInvitationsList";

const MainContainer = styled("div")({
  width: "224px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2f3136",
});
const FriendsSideBar = (props) => {
  return <MainContainer>
    <AddFriendsButton/>
    <FriendsTitle title="Private Messages"/>
    <FriendsList/>
    <FriendsTitle title="Invitations"/>
    <PendingInvitationsList/>
  </MainContainer>;
};

export default FriendsSideBar;
