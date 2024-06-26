import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
} from "../store/actions/roomActions";
import store from "../store/store";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";
export const createNewRoom = () => {
  const successCallbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
  };
  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalSteamPreview(audioOnly, successCallbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;
  console.log("entry from UpdateActiveRooms");

  const rooms = [];

  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username });
      }
    });
  });
  store.dispatch(setActiveRooms(rooms));
  console.log("from UpdateActiveRooms");
};

export const joinRoom = (roomId) => {
  console.log("i am at joinRoom in roomHandler == roodId == ", roomId);

  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalSteamPreview(audioOnly, successCallbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;
  console.log("leave room roomId == ", roomId);
  const localStream = store.getState().room.localStreams;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }
  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }
  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  // console.log("from leaveRoom == ", roomId);

  socketConnection.leaveRoom({ roomId: roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
