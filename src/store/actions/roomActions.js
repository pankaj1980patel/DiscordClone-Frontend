export const roomActions = {
  OPEN_ROOM: "ROOM.OPEN_ROOM",
  SET_ROOM_DETAILS: "ROOM.SET_ROOM_DETAILS",
  SET_ACTIVE_ROOM: "ROOM.SET_ACTIVE_ROOM",
  SET_LOCAL_STREAM: "ROOM.SET_LOCAL_STREAM",
  SET_REMOTE_STREAM: "ROOM.SET_REMOTE_STEAM",
  SET_AUDIO_ONLY: "ROOM.SET_AUDIO_ONLY",
  SET_SCREEN_SHARE_STREAM: "ROOM.SET_SCREEN_SHARE_STREAM",
};

export const getActions = (dispatch) => {
  return {
    setAudioOnly: (onlyAudio) => dispatch(setAudioOnly(onlyAudio)),
    setScreenSharingStream: (stream) =>
      dispatch(setScreenSharingStream(stream)),
  };
};

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: roomActions.OPEN_ROOM,
    isUserRoomCreator,
    isUserInRoom,
  };
};

export const setRoomDetails = (roomDetails) => {
  return {
    type: roomActions.SET_ROOM_DETAILS,
    roomDetails,
  };
};

export const setActiveRooms = (rooms) => {
  return {
    type: roomActions.SET_ACTIVE_ROOM,
    activeRooms: rooms,
  };
};

export const setLocalStream = (stream) => {
  console.log("I am at roomActions setLocalStrem");
  return {
    type: roomActions.SET_LOCAL_STREAM,
    localStream: stream,
  };
};

export const setAudioOnly = (audioOnly) => {
  return {
    type: roomActions.SET_AUDIO_ONLY,
    audioOnly,
  };
};

export const setRemoteStreams = (remoteStreams) => {
  return {
    type: roomActions.SET_REMOTE_STREAM,
    remoteStreams,
  };
};

export const setScreenSharingStream = (stream) => {
  return {
    type: roomActions.SET_SCREEN_SHARE_STREAM,
    isScreenSharingActive: stream ? true : false,
    screenSharingStream: stream || null,
  };
};

