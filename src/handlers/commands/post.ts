import { Context } from "telegraf";
import auth from "../../services/auth.js";
import memory from "./memory.js";
import telegram from "../../services/telegram.js";

memory.set(true);

export default async function postHandler(ctx: Context): Promise<void> {
  if (ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/post")) {
    try {
      const args = ctx.message.text
        .trim()
        .replace("/post", "")
        .replace(" (", "(")
        .replace("( ", "(")
        .replace(" )", ")")
        .replace(") ", ")")
        .replace(" ,", ",")
        .replace(", ", ",")
        .trim();
      const parts = args.split(",").map((part) => part.trim());

      let content = "";
      let imageUrl = "";
      let buttonArgs: string[] = [];

      if (parts[0].startsWith("http")) {
        imageUrl = parts[0];
        content = "";
        buttonArgs = parts.slice(1);
      } else if (parts[1]?.startsWith("http")) {
        imageUrl = parts[1];
        content = parts[0] || "";
        buttonArgs = parts.slice(2);
      } else {
        content = parts[0] || "";
        buttonArgs = parts.slice(1);
      }

      const buttons: { text: string; url?: string; callback_data?: string }[][] = [];
      let currentRow: { text: string; url?: string; callback_data?: string }[] = [];

      buttonArgs.forEach((buttonArg) => {
        const buttonMatches = Array.from(
          buttonArg.matchAll(/(.+?)\((http[s]?:\/\/[^\s)]+)\)|(.+)/g)
        );

        buttonMatches.forEach((match) => {
          const [_, labelWithLink, link, labelOnly] = match;
          const label = labelWithLink || labelOnly || "";

          if (label && link) {
            currentRow.push({ text: label.trim(), url: link.trim() });
          } else if (label) {
            currentRow.push({
              text: label.trim(),
              callback_data: `action_${label.trim().replace(/\s+/g, "_")}`,
            });
          }
        });

        if (currentRow.length >= 2) {
          buttons.push(currentRow);
          currentRow = [];
        }
      });

      if (currentRow.length) buttons.push(currentRow);

      const replyMarkup = {
        inline_keyboard: buttons.map((row) =>
          row.map((button) => ({
            text: button.text,
            url: button.url ? button.url : undefined,
            callback_data: button.callback_data ? button.callback_data : "",
          }))
        ),
      };
      if (ctx.message && ctx.message.reply_to_message && replyMarkup && ctx.chat?.id) {
        const repliedToMessageId = ctx.message.reply_to_message.message_id;
        try {
          await telegram.app.telegram.copyMessage(ctx.chat.id, ctx.chat.id, repliedToMessageId, {
            reply_markup: replyMarkup,
            parse_mode: "MarkdownV2",
            caption: content || "‎ ",
          });
        } catch (error) {
          await ctx.reply(
            "I think I need to become an admin to do this else insure that format is /post caption , button1(link) button2(link) ...buttons"
          );
        }
      } else if (imageUrl) {
        await ctx.replyWithPhoto(imageUrl, {
          caption: content,
          reply_markup: replyMarkup,
        });
      } else {
        await ctx.reply(content || "‎ ", { reply_markup: replyMarkup });
      }
      await ctx.deleteMessage();
    } catch (error) {
      console.error("Error while processing /post command:", error);
      await ctx.reply("/post caption , <image URL> , button1(link)> <button2(link)> ...buttons");
    }
  }
}
