import React from "react";
import { styled } from "@mui/system";
import FriendListItem from "./FriendListItem";
import { connect } from "react-redux";

// const DUMMY_FRIENDS = [
//   {
//     id: 1,
//     username: "Pankaj",
//     isOnline: true,
//   },
//   {
//     id: 2,
//     username: "rrrrrrrr",
//     isOnline: true,
//   },
//   {
//     id: 3,
//     username: "Pdfsdfankajdfdf",
//     isOnline: false,
//   },
//   {
//     id: 4,
//     username: "dfdfsPankaj",
//     isOnline: true,
//   },
// ];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});
const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  const friend = friends.map((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
    return {
      ...f,
      isOnline: isUserOnline ? true : false,
    };
  });
  console.log("friends modifiedd", friend);
  return friend;
};
const FriendsList = ({ friends, onlineUsers }) => {
  console.log("frinends ======================", friends);
  console.log("onlineUSer ======================", onlineUsers);
  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
