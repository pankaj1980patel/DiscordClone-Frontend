import store from "../store/store";
import Peer from "simple-peer";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";

// process error fix
import * as process from "process";

window.global = window;
window.process = process;
window.Buffer = [];

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
  peers[connUserSocketId].on("stream", (remoteStream) => {
    // TODO
    // add new remote stream to our server store
    console.log("remote stream came from other");
    console.log("direct connection is extablished");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
  peers[connUserSocketId].on("change-stream", (stream) => {
    console.log("remote stream came from other 2222");
    stream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(stream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
    console.log("signal logic is exchange complete");
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
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

export const switchOutgoingTracks = (stream) => {
  // for (let socket_id in peers) {
  // let oldTrack;
  // for (let track of peers[socket_id].streams[0].getTracks()) {
  //   if (track.kind === "video") {
  //     track = stream.getTracks()[0];
  //   }
  // }
  // console.log("senderMap === ", peers[socket_id]._senderMap);
  // const sender = peers[socket_id]._senderMap
  //   ? peers[socket_id]._senderMap.get(stream)
  //   : null;
  // console.log("sender == ", sender);
  // peers[socket_id].removeStream(peers[socket_id].streams[0]);
  // }
  for (let socket_id in peers) {
    if (peers[socket_id].streams) {
      peers[socket_id].addTrack(stream.getTracks()[0],stream);
      // const remoteStreams = store.getState().room.remoteStreams;
      // const newRemoteStreams = remoteStreams.filter(
      //   (remoteStream) => remoteStream.connUserSocketId !== socket_id
      // );
      // store.dispatch(setRemoteStreams(newRemoteStreams));
      // peers[socket_id].addStream(stream);
    }
    // peers[socket_id].stream("change-stream", stream);

    // peers[socket_id].removeStream(peers[socket_id].streams[0]);
    // console.log("stream", stream);
    // const otherStream = peers[socket_id].streams[0];
    // let oldTrack;
    // for (let x in peers[socket_id].streams[0].getTracks()) {
    //   if (x.kind === "video") {
    //     oldTrack = peers[socket_id].streams[0].getTracks()[x];
    //   }
    // }
    // let submap = peers[socket_id]._senderMap;
    // for (let x in submap.values()) {
    //   console.log(x);
    // }
    // submap.forEach((value, key) => {
    //   console.log(value);
    // });
    // console.log("submap == ", submap);
    // peers[socket_id].replaceTrack(
    //   oldTrack,
    //   stream.getTracks()[0],
    //   peers[socket_id].streams[0]
    // );
    // console.log(peers);
  }
  // peers[socket_id].addTrack(stream.getTracks()[0], otherStream);
  // for (let index in peers[socket_id].streams[0].getTracks()) {
  //   if (peers[socket_id].streams[0].getTracks()[index].kind === "video") {
  //     console.log(socket_id);
  //     console.log("\n", index);
  //     // console.log("\n", index2);
  //     console.log(peers);
  //     peers[socket_id].streams[0].removeTrack(
  //       peers[socket_id].streams[0].getTracks()[index]
  //     );
  //     peers[socket_id].streams[0].addTrack(stream.getTracks()[0]);
  //     // peers[socket_id].replaceTracks(
  //     //   peers[socket_id].streams[0].getTracks()[index],
  //     //   stream.getTracks()[index2],
  //     //   peers[socket_id].streams[0]
  //     // );
  //     break;
  //   }
  // }
  // }
};
