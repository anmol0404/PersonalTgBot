import { Telegraf } from "telegraf";
import auth from "../../services/auth.js";
import { delay } from "../../extra/delay.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import env from "../../services/env.js";
import { getAllMessages } from "../../services/client.js";
import memory from "./memory.js";

const apps = env.botTokens?.map((token) => new Telegraf(token))!;

export default async function copyHandler(ctx: any) {
  const userId = ctx.from?.id;

  if (!auth.isAdmin(userId ? userId : 0 || !memory.get())) {
    return ctx.reply("Sorry, you have no permission to do this");
  }
  memory.set(true);

  try {
    const args = ctx.message.text.trim().replace("/copy", "").trim().split(" ");

    if (args.length < 5) {
      await ctx.reply(
        "Please provide all details: promoUsername, startId: number, fromChat: number, endId: number, toChats: (number)[]"
      );
      return await ctx.scene.leave();
    }

    const [promoUsername, startIdStr, fromChatStr, endIdStr, ...toChatsStr] = args;

    let startId: number, fromChat: number, endId: number, toChats: number[];

    try {
      // Parse numeric arguments
      startId = parseInt(startIdStr, 10);
      fromChat = parseInt(fromChatStr, 10);
      endId = parseInt(endIdStr, 10);
      toChats = toChatsStr.map((toChat: string) => {
        const parsedToChat = parseInt(toChat, 10);
        if (isNaN(parsedToChat)) {
          throw new Error("Invalid number in toChats");
        }
        return parsedToChat;
      });

      if (isNaN(startId) || isNaN(fromChat) || isNaN(endId)) {
        throw new Error("Invalid number for startId, fromChat, or endId");
      }
    } catch (error) {
      await ctx.reply(
        "Invalid details. Please ensure startId, fromChat, endId, and all toChats are valid numbers."
      );
      return;
    }

    let startFrom = startId;

    while (memory.get()) {
      memory.set(false);
      await ctx.reply(`Starting from message ID: ${startFrom}`);

      try {
        const messages = await getAllMessages(fromChat, startFrom);
        const lastFetchedMessageId = messages[messages.length - 1]?.id;
        startFrom = lastFetchedMessageId - 1;
        const extractedList = extractMessageData(messages);

        for (let i = 0; i < extractedList.length; i++) {
          const appIndex = i % apps.length;
          const appInstance = apps[appIndex];
          const msg = extractedList[i];
          const caption = msg.caption;
          const id = msg.id;
          startFrom = id;

          try {
            await Promise.all(
              toChats.map((toChat) =>
                appInstance.telegram.copyMessage(toChat, fromChat, id, {
                  caption: processCaption(caption, promoUsername || ""),
                })
              )
            );
            await delay(200, 400);
          } catch (error) {
            if ((error as any).code === 429) {
              console.log(`Rate limited: ${error}`);
              await new Promise((resolve) => setTimeout(resolve, 40000));
            } else {
              console.error(`Failed to copy message with ID ${id}: ${error}`);
              continue;
            }
          }

          if (i % 20 === 0) {
            await ctx.reply(`Processed up to message ID: ${extractedList[i].id.toString()}`);
          }

          if (id >= endId || messages.length === 0) {
            memory.set(true);
            break;
          }
        }

        if (lastFetchedMessageId >= endId || messages.length === 0) {
          memory.set(true);
          break;
        }
      } catch (error) {
        console.error("Error fetching messages. Retrying in 3 minutes...", error);
        await new Promise((resolve) => setTimeout(resolve, 3 * 60 * 1000));
      }

      memory.set(true);
    }

    await ctx.reply("Operation completed successfully!");
  } catch (err) {
    console.error("Error processing command:", err);
    await ctx.reply(
      "An error occurred. Please check the command format: /copy promoUsername startId fromChat endId toChats. Make sure bots are admin in all channels."
    );
  }
}

function extractMessageData(messages: any[]): { id: number; caption: string }[] {
  return messages.map((msg) => {
    const id = msg.id ?? 0;
    const messageText = msg.message ?? "";
    let caption = messageText;
    let mediaFilename = undefined;

    if (msg.media && msg.media.document) {
      const fileNameAttribute = msg.media.document.attributes.find(
        (attr: any) => attr.className === "DocumentAttributeFilename"
      );
      if (fileNameAttribute && fileNameAttribute.fileName) {
        mediaFilename = fileNameAttribute.fileName;
      }

      if (msg.media.video === false && mediaFilename) {
        caption = mediaFilename;
      } else {
        caption = mediaFilename ? mediaFilename : messageText;
      }
    }

    return { id, caption };
  });
}
