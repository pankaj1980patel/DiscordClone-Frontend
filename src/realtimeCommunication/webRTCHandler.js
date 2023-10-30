import store from "../store/store";
import Peer from "simple-peer";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
const getConfiguration = () => {
  const turnIceServers = null;
  if (turnIceServers) {
    // TODO turn server credentials
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};
const onlyAudioConstraints = {
  audio: true,
  video: false,
};
const defaultConstraints = {
  audio: true,
  video: true,
};
export const getLocalSteamPreview = (onlyAudio = false, callbackFunc) => {
  // console.log("Callback function", callbackFunc);
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("Cannot get an access to local stream");
    });
  // console.log("Callback2 function", callbackFunc);
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStreams;
  if (isInitiator) {
    console.log("Preparing for new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    // TODO
    // pass signaling data to other users
    socketConnection.signalPeerData(signalData);
  });
  peers[connUserSocketId].on("stream", (remoteStream) => {
    // TODO
    // add new remote stream to our server store
    console.log("remote stream came from other user");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const addNewRemoteStream = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStreams(addNewRemoteStream));
};

export const closeAllConnection = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
  console.log("no issue from leave room webrtc");
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};