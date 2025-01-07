import { WizardContext } from "telegraf/typings/scenes";
import auth from "../../services/auth.js";
import { isValidUrl } from "../../utils/validator.js";
import { VideoHandler } from "../../utils/Handler/videoHandler.js";
import { Message } from "telegraf/typings/core/types/typegram.js";

export default async function leechHandler(ctx: WizardContext) {
  const userId = ctx.from?.id;

  if (!auth.isAdmin(userId ? userId : 0)) {
    return ctx.reply("Sorry, you have no permission to do this");
  }
  if (ctx.message && "text" in ctx.message) {
    const urls = ctx.message.text.split(" ").slice(1);

    if (urls.length === 0) {
      return ctx.reply("❌ Please provide at least one URL");
    }

    // Validate URLs
    const invalidUrls = urls.filter((url) => !isValidUrl(url));
    if (invalidUrls.length > 0) {
      return ctx.reply(`❌ Invalid URLs detected:\n${invalidUrls.join("\n")}`);
    }

    const statusMessage = (await ctx.reply("⏳ Initializing download...")) as Message.TextMessage;

    for (let index = 0; index < urls.length; index++) {
      const url = urls[index];
      try {
        await ctx.telegram.editMessageText(
          statusMessage.chat.id,
          statusMessage.message_id,
          undefined,
          `🎯 Processing URL ${index + 1}/${urls.length}\n\n🔗 ${url}`
        );

        await VideoHandler.handleDownload(ctx, url, statusMessage);
      } catch (error) {
        await ctx.reply(
          `❌ Error downloading ${url}:\n${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    return ctx.telegram.editMessageText(
      statusMessage.chat.id,
      statusMessage.message_id,
      undefined,
      "✅ All downloads completed!"
    );
  }
}
