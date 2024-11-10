import { Context } from "telegraf";
import env from "../services/env.js";
import auth from "../services/auth.js";
import database from "../services/database.js";
import fs from "fs";
import memory from "../handlers/commands/memory.js";
import { Message } from "telegraf/typings/core/types/typegram.js";
import telegram from "../services/telegram.js";

export default {
  async private(ctx: Context, next: () => void) {
    const userId = ctx.from?.id;
    console.log(ctx.chat?.id);
    if (ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/post")) {
      next();
      return;
    } else if (!auth.isAdmin(userId ? userId : 0)) {
      return;
    } else {
      if (ctx.message && containsMediaOrDocument(ctx.message)) {
        let caption: string = "[NONE]";
        const msgId: number = ctx.message.message_id;
        if ("caption" in ctx.message) {
          caption = ctx.message.caption || "[NONE]";
          if ("document" in ctx.message) {
            caption = ctx.message.document.file_name || "[NONE]";
          } else {
            caption = ctx.message.caption || "[NONE]";
          }
        }
        await telegram.forwardMessages(
          ctx.chat?.id!,
          ctx.chat?.id!,
          [msgId],
          true,
          [caption],
          env.join || ""
        );
        await ctx.deleteMessage(msgId);
      }
    }
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/resettracker") {
      try {
        await database.createOrUpdateTracker(0);
      } catch {}
    } else if (ctx.message && "text" in ctx.message && ctx.message.text === "/getaios") {
      const aios = await database.getAllAIO();
      const jsonContent = JSON.stringify(aios, null, 2);
      const filePath = "./aioCollection.json";
      fs.writeFileSync(filePath, jsonContent, "utf8");
      const sentMessage = await ctx.replyWithDocument({ source: filePath });
      if (sentMessage) {
        await database.deleteCollection();
      }

      fs.unlinkSync(filePath);
    } else if (ctx.message && "text" in ctx.message && ctx.message.text === "/stopdel") {
      memory.setStopDeletion(true);
    } else if (ctx.message && "text" in ctx.message && ctx.message.text === "/stopadd") {
      memory.setStopAdding(true);
    }

    if (ctx.chat?.id !== undefined) {
      next();
    }
  },
};

function containsMediaOrDocument(message: Message): boolean {
  const isDocument = (message as Message.DocumentMessage).document !== undefined;
  const isVideo = (message as Message.VideoMessage).video !== undefined;
  const isPhoto = (message as Message.PhotoMessage).photo !== undefined;

  return isDocument || isVideo || isPhoto;
}
