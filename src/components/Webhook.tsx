import React, { useState, useEffect } from "react";
import { sendRequest, sendQueuedRequests } from "../utils/apiRequest";
import { RequestPayload } from "../utils/types";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const Webhook: React.FC = () => {
  const [offlineQueue, setOfflineQueue] = useState<RequestPayload[]>([]);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline && offlineQueue.length > 0) {
      sendQueuedRequests(offlineQueue)
        .then(() => setOfflineQueue([]))
        .catch(() => console.error("Failed to send queued requests"));
    }
  }, [isOnline, offlineQueue]);

  const handleButtonClick = async () => {
    const payload: RequestPayload = { timestamp: new Date().toISOString() };

    if (isOnline) {
      try {
        await sendRequest(payload);
      } catch {
        // Handle error
      }
    } else {
      setOfflineQueue((prevQueue) => [...prevQueue, payload]);
      console.log("Request queued for later");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-4xl font-semibold text-center pt-4 text-gray-700">
        Webhook App
      </h1>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <p>Status: {isOnline ? "Online" : "Offline"}</p>
          <p>Queued requests: {offlineQueue.length}</p>
          <button
            className="border px-4 py-2 mt-2 hover:bg-slate-100 duration-300"
            onClick={handleButtonClick}
          >
            Hit Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Webhook;
