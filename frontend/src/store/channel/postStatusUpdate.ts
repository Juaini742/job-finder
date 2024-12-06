const applicationChannel = new BroadcastChannel("application_status");

export const postStatusUpdate = () => {
  applicationChannel.postMessage({ type: "status_updated" });
};

export const listenForStatusUpdates = (callback: () => void) => {
  applicationChannel.onmessage = (event) => {
    if (event.data.type === "status_updated") {
      callback();
    }
  };
};
