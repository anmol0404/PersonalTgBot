import { CommandContext } from "../../interfaces.js";
import env from "../../services/env.js";

export default async function startHandler(ctx: CommandContext) {
  try {
    await ctx.reply("Welcome to the bot!" + ctx.from?.username);
  } catch (error) {}
}
export const generateInviteLink = (userId: string) => {
  return `https://t.me/${env.botUserName}?start=invite-${userId}`;
};
