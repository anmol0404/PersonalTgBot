import { CommandContext } from "../../interfaces.js";
import {
  addCommandDescription,
  aifileCommandDescription,
  postBotDescription,
  delMessagesDescription,
  mkcollectionDescription,
} from "../../utils/message.js";

export default async function helpHandler(ctx: CommandContext) {
  const chatId = ctx.chat.id;
  const user = ctx.from;
  try {
    {
      await ctx.reply(`${delMessagesDescription}\n`, { parse_mode: "Markdown" });
      await ctx.reply(`${addCommandDescription}\n`, { parse_mode: "Markdown" });
      await ctx.reply(`${mkcollectionDescription}\n`, { parse_mode: "Markdown" });
      await ctx.reply(`${postBotDescription}\n`, { parse_mode: "Markdown" });
      return await ctx.reply(`${aifileCommandDescription}\n`, { parse_mode: "Markdown" });
    }
  } catch (err) {
    console.log(err);
  }
}
