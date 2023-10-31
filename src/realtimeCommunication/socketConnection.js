import io from "socket.io-client";
import * as roomHandler from "./roomHandler";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsAction";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/util/chat";
import * as webRTCHandler from "./webRTCHandler";
// import { useEffect, useState } from "react";
let socket = null;
export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = JSON.parse(userDetails).token;
  // const [socket, setSocket] = useState(null);
  // useEffect(() => {
  //   const newSocket = io("http://localhost:5000", {
  //     auth: {
  //       token: jwtToken,
  //     },
  //   });
  //   setSocket(newSocket);
  // });

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
  socket.on("direct-chat-history", (data) => {
    // console.log("Direct chat history came from server === ", data);
    updateDirectChatHistoryIfActive(data);
  });
  socket.on("room-create", (data) => {
    roomHandler.newRoomCreated(data);
  });
  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });
  socket.on("conn-prepare", (data) => {
    console.log("conn-prepare", data);
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId });
  });
  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });
  socket.on('conn-signal',data => {
    webRTCHandler.handleSignalingData(data);
  })
};

export const sendDiretMessage = (data) => {
  // console.log(data);
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  // console.log("from getDirectChatHistory == ", data);
  socket.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  console.log("i am emmiting room-create");
  console.log("socket == ", socket);

  socket.emit("room-create");
};

export const joinRoom = (data) => {
  console.log("i got this room-join req == ", data);
  socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
  console.log("from soketC leaveRoom == ", data);
  socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
