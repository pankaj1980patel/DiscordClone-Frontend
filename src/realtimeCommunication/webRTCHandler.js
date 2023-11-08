import store from "../store/store";
import Peer from "simple-peer";
import { setLocalStream } from "../store/actions/roomActions";

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
  console.log("WebRTC is supported in this browser", Peer.WEBRTC_SUPPORT);

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
  peers[connUserSocketId].on("stream", (remoteStream)=> {

  })
};


  store.dispatch(setRemoteStreams(newRemoteStreams));
};