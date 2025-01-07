import { Api, TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";
import env from "./env.js";
import { delay } from "../extra/delay.js";
import memory from "../handlers/commands/memory.js";

const apiId: string = env.apiId;
const api: string = env.apiHash;
const session: string = env.session;
export const client = new TelegramClient(new StringSession(session), parseInt(apiId), api, {
  connectionRetries: 2,
});
env;

export async function getMessageFromId(chat: any, messageId: any) {
  try {
    await client.connect();
    const source = await client.getInputEntity(parseInt(chat));
    const message = await client.getMessages(source, { ids: [messageId] });
    return message;
  } catch (error) {
    console.error(`Error getting message with ID ${messageId} in chat ${chat}:`, error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

export async function getAllMessages(chat: number, oId: number) {
  try {
    await client.connect();
    const source = await client.getInputEntity(chat);

    let offsetId = oId;
    const messages = await client.getMessages(source, {
      limit: 5000,
      offsetId: offsetId,
      reverse: true,
    });
    return messages;
  } catch (error) {
    console.error("Error getting all messages:", error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

export async function deleteMessagesInBatches(
  channel: number,
  messageIds: number[],
  endFrom: number = 0
): Promise<void> {
  try {
    await client.connect();
    const channelEntity = await client.getInputEntity(channel);

    const filteredMessageIds =
      endFrom !== 0 ? messageIds.filter((id) => id <= endFrom) : messageIds;
    const batchSize = 50;

    for (let i = 0; i < filteredMessageIds.length; i += batchSize) {
      const batch = filteredMessageIds.slice(i, i + batchSize);

      if (memory.getStopDeletion()) {
        memory.set(false);
        console.log("Message deletion stopped by user.");
        return;
      }

      try {
        console.log(`Deleting messages: ${batch}`);
        await client.deleteMessages(channelEntity, batch, { revoke: true });
        console.log(`Deleted messages: ${batch}`);
      } catch (batchError) {
        console.error(`Error deleting batch ${batch}:`, batchError);
        await new Promise((resolve) => setTimeout(resolve, 40000));
      }

      await delay(3000, 5000);
    }
  } catch (error) {
    console.error("Error in deleteMessagesInBatches function:", error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

export async function uploadFile(channel: number, path: string): Promise<Api.Message | undefined> {
  try {
    await client.connect();
    const message = await client.sendFile(channel, {
      file: path,
      progressCallback: console.log,
    });
    return message;
  } catch (error) {}
}
