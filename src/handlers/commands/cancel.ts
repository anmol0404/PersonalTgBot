import { CommandContext } from "../../interfaces.js";
import memory from "./memory.js";

export default async function cancelHandler(ctx: CommandContext) {
  await ctx.reply("hello " + "canceled");
  memory.set(false);
  ctx.reply("memory was true, now set to:" + "false");
  return;
}
