// src/utils/requestHandler.ts
import axios from "axios";
import { RequestPayload } from "./types";

export const WEBHOOK_URL = "/api";

export const sendRequest = async (payload: RequestPayload): Promise<void> => {
  try {
    await axios.post(WEBHOOK_URL, payload);
    console.log("Request sent successfully");
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
};

export const sendQueuedRequests = async (
  queue: RequestPayload[]
): Promise<void> => {
  for (let i = 0; i < queue.length; i++) {
    const payload = queue[i];
    try {
      await sendRequest(payload);
      console.log("Queued request sent successfully");
    } catch (error) {
      console.error("Error sending queued request:", error);
      return;
    }
  }
};
