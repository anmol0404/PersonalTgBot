import axios from "axios";
import { BotContext } from "../../types";
import { getThumb, setThumb } from "../thumbnail.js";
export async function handleSetThumb(ctx: BotContext): Promise<void> {
  try {
    if (!ctx.message.reply_to_message?.photo) {
      await ctx.reply("Please reply to an image to set it as thumbnail");
      return;
    }

    const photo = ctx.message.reply_to_message.photo.pop();
    if (!photo) {
      await ctx.reply("Invalid image");
      return;
    }

    const file = await ctx.telegram.getFile(photo.file_id);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    await setThumb(ctx.from!.id, Buffer.from(response.data));

    await ctx.reply("✅ Custom thumbnail has been set successfully!");
  } catch (error) {
    await ctx.reply(
      "❌ Failed to set thumbnail: " + (error instanceof Error ? error.message : "Unknown error")
    );
  }
}

export async function handleViewThumb(ctx: BotContext): Promise<void> {
  try {
    const thumbPath = await getThumb(ctx.from!.id);
    if (!thumbPath) {
      await ctx.reply("No custom thumbnail found. Set one using /setthumb command.");
      return;
    }

    await ctx.replyWithPhoto({ source: thumbPath }, { caption: "Your current custom thumbnail" });
  } catch (error) {
    await ctx.reply(
      "Failed to retrieve thumbnail: " + (error instanceof Error ? error.message : "Unknown error")
    );
  }
}
