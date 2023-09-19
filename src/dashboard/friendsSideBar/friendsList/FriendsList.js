import React from "react";
import { styled } from "@mui/system";
import FriendListItem from "./FriendListItem";

const DUMMY_FRIENDS = [
  {
    id: 1,
    username: "Pankaj",
    isOnline: true,
  },
  {
    id: 2,
    username: "rrrrrrrr",
    isOnline: true,
  },
  {
    id: 3,
    username: "Pdfsdfankajdfdf",
    isOnline: false,
  },
  {
    id: 4,
    username: "dfdfsPankaj",
    isOnline: true,
  },
];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});
const FriendsList = (props) => {
  return (
    <MainContainer>
      {DUMMY_FRIENDS.map((f) => (
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

export default FriendsList;
