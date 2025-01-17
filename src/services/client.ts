import { Api, TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";
import env from "./env.js";
import { delay } from "../extra/delay.js";
import memory from "../handlers/commands/memory.js";
import { CustomFile } from "telegram/client/uploads.js";
import { VideoInfo } from "../types/index.js";
import { formatDuration } from "../utils/formatter.js";
import { v2 as cloudinary } from "cloudinary";

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

export async function uploadFile(
  channel: number,
  videoInfo: VideoInfo
): Promise<Api.Message | undefined> {
  try {
    await client.connect();
    const message = await client.sendFile(channel, {
      file: videoInfo.path,
      fileSize: parseInt(videoInfo.size) || 0,
      workers: 2,
      supportsStreaming: true,

      // thumb: path,
      caption: `${videoInfo.title}\n${formatDuration(videoInfo.duration)}`,

      attributes: [
        new Api.DocumentAttributeVideo({
          duration: videoInfo.duration,
          w: 600,
          h: 350,
          supportsStreaming: true,
        }),
      ],
      progressCallback: async (onprogress) => {
        console.log(onprogress);
      },
    });
    return message;
  } catch (error) {}
}

// export async function uploadFile(
//   channel: number,
//   videoInfo: VideoInfo
// ): Promise<Api.Message | undefined> {
//   try {
//     await client.connect();
//     const message = await client.sendFile(channel, {
//       file: await client.uploadFile({
//         file: new CustomFile(
//           videoInfo.path.replace("./", "") + ".mp4",
//           parseInt(videoInfo.size) || 0,
//           videoInfo.path
//         ),
//         workers: 2,
//       }),
//       // thumb: path,
//       attributes: [
//         new Api.DocumentAttributeVideo({
//           duration: videoInfo.duration,
//           w: 350,
//           h: 200,
//           supportsStreaming: true,
//         }),
//       ],
//       progressCallback: console.log,
//     });
//     return message;
//   } catch (error) {}
// }
export async function downloadPhoto(message_id: number, chat_id: number) {
  try {
    await client.connect();
    const source = await client.getInputEntity(chat_id);
    const messages = await client.getMessages(source, { ids: [message_id] });
    const message = messages[0];
    const photo = await client.downloadMedia(message);

    return photo;
  } catch (error) {
    console.error("Error downloading photo:", error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

export async function downloadAndUploadPhoto(message_id: number, chat_id: number): Promise<string> {
  try {
    await client.connect();
    const source = await client.getInputEntity(chat_id);
    const messages = await client.getMessages(source, { ids: [message_id] });
    const message = messages[0];

    const photoBuffer = await client.downloadMedia(message);

    if (!photoBuffer) {
      throw new Error("Photo not found or could not be downloaded.");
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" }, // Adjust resource type if necessary
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(photoBuffer);
    });

    // Return the URL from the upload result
    const url = (uploadResult as any).secure_url;
    return url;
  } catch (error) {
    console.error("Error downloading or uploading photo:", error);
    throw error;
  } finally {
    await client.disconnect();
  }
}
export async function getAllParticipantIds(chat_id: number): Promise<number[]> {
  try {
    await client.connect();
    const source = await client.getInputEntity(chat_id);
    const participants = await client.getParticipants(source);
    const userIds = participants.map((participant: any) => participant.id);
    return userIds;
  } catch (error) {
    console.error("Error getting all participant IDs:", error);
    throw error;
  } finally {
    await client.disconnect();
  }
}
