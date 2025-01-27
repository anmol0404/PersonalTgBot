import { delay } from "../../extra/delay.js";
import auth from "../../services/auth.js";
import { getAllMessages } from "../../services/client.js";
import memory from "./memory.js";
import * as fs from "fs";

memory.set(true);
let path: string = `data`;

export default async function addAIOHandler(ctx: any) {
  const userId = ctx.from?.id;

  if (!auth.isAdmin(userId ? userId : 0 || !memory.get())) {
    return await ctx.reply("Sorry, you have no permission to do this or wait.");
  }

  if (memory.get()) {
    try {
      const numbers: number[] = ctx.message.text
        .trim()
        .replace("/mjson", "")
        .trim()
        .split(" ")
        .map((number: string) => {
          const parsedNumber = parseInt(number, 10);
          if (isNaN(parsedNumber)) {
            ctx.reply("Invalid details");
            throw new Error("Invalid number");
          }
          return parsedNumber;
        });

      const [startId, fromChat, endFrom] = numbers;
      path = `data${fromChat}.json`;

      const lastProcessedId = readLastProcessedIdFromMessagesFile();
      let startFrom = Math.max(startId, lastProcessedId);

      while (startFrom <= endFrom) {
        memory.set(false);
        await ctx.reply(`Start from ${startFrom}`);
        try {
          const messages = await getAllMessages(fromChat, startFrom);
          console.log("Messages length:", messages.length);
          if (messages.length === 0) {
            await ctx.reply("No more messages to process.");
            break;
          }
          const lastFetchedMessageId = messages[messages.length - 1]?.id;
          startFrom = lastFetchedMessageId;
          const extractedList = extractMessageData2(messages);
          await delay(2000, 3000);
        } catch (error) {
          console.error("Error processing batch:", error);
          await ctx.reply("Retrying in 2-3 minutes due to an error...");
          await delay(2 * 60 * 1000, 4 * 60 * 1000);
        }
      }

      memory.set(true);
      await ctx.reply("Done!");
      if (fs.existsSync(path)) {
        await ctx.replyWithDocument({ source: path });
      } else {
        await ctx.reply("File does not exist.");
      }
    } catch (err) {
      console.error("Error in addAIOHandler:", err);
      await ctx.reply(
        "Please provide the correct details. The command should be in the format: /add startId fromChat toChat endFrom"
      );
    }
  } else {
    ctx.reply("Please wait... \nTry again after some time.");
  }
}

interface StoredMessage {
  id: number;
  caption: string;
}

function readMessagesFromFile(): any[] {
  if (fs.existsSync(path)) {
    const data: string = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } else {
    return [];
  }
}
function saveMessagesToFile(messages: any[]): void {
  fs.writeFileSync(path, JSON.stringify(messages, null, 2), "utf-8");
}
function readLastProcessedIdFromMessagesFile(): number {
  if (fs.existsSync(path)) {
    const data: string = fs.readFileSync(path, "utf-8");
    const messages = JSON.parse(data);
    if (messages.length > 0) {
      return messages[messages.length - 1]?.id || 0;
    }
  }
  return 0;
}

function extractMessageData2(messages: any[]): {
  storedMessages: StoredMessage[];
} {
  const storedMessages: StoredMessage[] = readMessagesFromFile();
  for (let msg of messages) {
    const id = msg.id || 0;
    let caption = msg.message || "";
    let mediaFilename: string | undefined;
    if (msg.media && msg.media.document) {
      const fileNameAttribute = msg.media.document.attributes.find(
        (attr: any) => attr.className === "DocumentAttributeFilename"
      );
      if (fileNameAttribute && fileNameAttribute.fileName) {
        mediaFilename = fileNameAttribute.fileName;
        caption = mediaFilename;
      }
    }
    storedMessages.push({ id, caption });
  }
  saveMessagesToFile(storedMessages);
  return { storedMessages };
}
