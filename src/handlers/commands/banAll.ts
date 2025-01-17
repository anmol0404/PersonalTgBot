import { telegramBaseClient } from "telegram/client/index.js";
import { CommandContext } from "../../interfaces.js";
import auth from "../../services/auth.js";
import { getAllParticipantIds } from "../../services/client.js";
import telegram from "../../services/telegram.js";

export default async function banAllHandler(ctx: CommandContext) {
  const userId = ctx.from?.id ?? 0;

  if (!ctx.message || !("text" in ctx.message)) return;
  if (!auth.isOwner(userId)) {
    return ctx.reply("Only the owner can ban all members.");
  }

  const chatId = ctx.message.text.replace("/banall", "").trim();
  if (!chatId || isNaN(parseInt(chatId, 10))) {
    return ctx.reply("Please provide a valid chat ID.");
  }

  let totalUsers;
  try {
    totalUsers = await getAllParticipantIds(parseInt(chatId, 10));
  } catch (error) {
    console.error("Error fetching participants:", error);
    return ctx.reply("Failed to fetch participant list. Ensure the bot has admin rights.");
  }

  if (!totalUsers || totalUsers.length === 0) {
    return ctx.reply("No participants found to ban.");
  }

  const message = await ctx.reply(`Starting to ban ${totalUsers.length} participants...`);

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < totalUsers.length; i++) {
    const user = totalUsers[i];
    try {
      await telegram.app.telegram.banChatMember(parseInt(chatId, 10), user);
      successCount++;
    } catch (error) {
      console.error(`Failed to ban user ${user}:`, error);
      failureCount++;
    }

    if ((i + 1) % 5 === 0 || i === totalUsers.length - 1) {
      try {
        await ctx.telegram.editMessageText(
          message.chat.id,
          message.message_id,
          undefined,
          `Banning in progress...\nBanned: ${successCount}\nFailed: ${failureCount}`
        );
      } catch (editError) {
        console.error("Error updating progress message:", editError);
      }
    }
  }

  ctx.reply(`Ban operation completed.\nBanned: ${successCount}\nFailed: ${failureCount}`);
}
