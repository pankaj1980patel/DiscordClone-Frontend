import { roomActions } from "../actions/roomActions";
const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStreams: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case roomActions.SET_ACTIVE_ROOM:
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    case roomActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStreams: action.localStream,
      };
    case roomActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case roomActions.SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };
    case roomActions.SET_SCREEN_SHARE_STREAM:
      console.log("action ", action);
      return {
        ...state,
        isScreenSharingActive: action.isScreenSharingActive,
        screenSharingStream: action.screenSharingStream,
      };

    default:
      return state;
  }
};

export default roomReducer;
