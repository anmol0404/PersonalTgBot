import { Api, TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";
import env from "./env.js";
import { delay } from "../extra/delay.js";
import memory from "../handlers/commands/memory.js";

const apiIdBHAIString: string = env.apiId;
const apiHashBHAI: string = env.apiHash;
const sessionBHAI: string = env.session;
export const client = new TelegramClient(
  new StringSession(sessionBHAI),
  parseInt(apiIdBHAIString),
  apiHashBHAI,
  { connectionRetries: 2 }
);
env;
export async function getMessageFromId(chat: any, messageId: any) {
  await client.connect();
  const source = await client.getInputEntity(parseInt(chat));
  const message = await client.getMessages(source, { ids: [messageId] });
  return message;
}
export async function getAllMessages(chat: number, oId: number) {
  try {
    await client.connect();
    const source = await client.getInputEntity(chat);
    // let allMessageIds: any[] = [];
    let offsetId = oId;

    const messages = await client.getMessages(source, {
      limit: 5000,
      offsetId: offsetId,
      reverse: true,
    });
    await client.disconnect();
    return messages;
  } catch (error) {
    console.error("Error getting all message IDs:", error);
    throw error;
  }
}
export async function deleteMessagesInBatches(
  channel: number,
  messageIds: number[],
  endFrom: number = 0
): Promise<void> {
  await client.connect();
  const channelEntity = await client.getInputEntity(channel);

  const filteredMessageIds = endFrom !== 0 ? messageIds.filter((id) => id <= endFrom) : messageIds;

  const batchSize = 50;
  for (let i = 0; i < filteredMessageIds.length; i += batchSize) {
    const batch = filteredMessageIds.slice(i, i + batchSize);
    if (memory.getStopDeletion()) {
      memory.set(false);
      return;
    }
    try {
      console.log(`Deleting messages: ${batch}`);
      await client.deleteMessages(channelEntity, batch, { revoke: true });
      console.log(`Deleted messages: ${batch}`);
    } catch (error) {
      console.error(`Error deleting batch ${batch}:`, error);
      await new Promise((resolve) => setTimeout(resolve, 40000));
    }

    await delay(3000, 5000);
  }

  await client.disconnect();
}
