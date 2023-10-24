import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsAction";
import store from "../store/store";
let socket = null;
export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = JSON.parse(userDetails).token;
  socket = io("http://localhost:5000", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("error", (error) => {
    // ...
    console.log("error in socket");
    console.log(error);
  });
  socket.on("connect", () => {
    console.log("Succesfully connected with socket.io server");
    console.log(socket.id);
  });
  socket.on("friends-invitations", (data) => {
    const { pendingInvitation } = data;
    // console.log("pending Invitation from socket = ",pendingInvitation)
    store.dispatch(setPendingFriendsInvitations(pendingInvitation));
  });
  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });
  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};

export const sendDiretMessage = (data) => {
  console.log(data)
  socket.emit("direct-message", data);
};
