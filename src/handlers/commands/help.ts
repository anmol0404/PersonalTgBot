import { Markup } from "telegraf";
import { CommandContext } from "../../interfaces.js";

export default async function helpHandler(ctx: CommandContext) {
  const chatId = ctx.chat.id;
  const user = ctx.from;
  try {
    await ctx.reply(
      "Choose a topic below to get more help:",
      Markup.inlineKeyboard([
        [Markup.button.callback("Delete Messages Command", "delMessages")],
        [Markup.button.callback("Add Command", "addCommand")],
        [Markup.button.callback("Make Collection Command", "mkcollection")],
        [Markup.button.callback("AI File Command", "aifileCommand")],
        [Markup.button.callback("Post Bot Command", "postBot")],
        [Markup.button.callback("Copy Command", "copyCommand")],
        [Markup.button.callback("How to Create String Session", "howToCreateSession")],
      ])
    );
  } catch (err) {
    console.log(err);
  }
}
