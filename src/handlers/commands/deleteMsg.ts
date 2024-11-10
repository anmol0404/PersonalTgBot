import { delay } from "../../extra/delay.js";
import auth from "../../services/auth.js";
import { deleteMessagesInBatches, getAllMessages } from "../../services/client.js";
import memory from "./memory.js";
memory.set(true);

export default async function addAIOHandler(ctx: any) {
  const userId = ctx.from?.id;

  if (!auth.isAdmin(userId || 0) || !memory.get()) {
    return await ctx.reply("Sorry, you have no permission to do this");
  }

  const args = ctx.message.text.trim().replace("/del", "").trim().split(" ");

  try {
    memory.set(false);
    let startFrom = 0;

    while (true) {
      if (memory.getStopDeletion()) {
        memory.set(false);
        return await ctx.reply("Deletion stopped.");
      }
      await ctx.reply(`Starting deletion from ${startFrom}`);
      if (args[0] === "all") {
        const chat = ctx.message.chat.id;
        const messages = await getAllMessages(chat, startFrom);

        const extractedList = extractMessageData(messages);
        if (extractedList.length < 2) {
          await ctx.scene.leave();
          return await ctx.reply("All messages deleted!");
        }
        await delay(30000, 40000);

        await deleteMessagesInBatches(chat, extractedList);
        memory.set(true);
        return await ctx.reply("Deletion completed.");
      } else {
        const numbers = parseMessageIds(args);
        if (!numbers) return await ctx.reply("Invalid details provided.");

        let [startId, fromChat, endFrom] = numbers;
        startId = startFrom;

        const messages = await getAllMessages(fromChat, startFrom);
        const extractedList = extractMessageData(messages);

        if (extractedList.length < 1) break;

        await deleteMessagesInBatches(fromChat, extractedList);
        if (startFrom + 50 >= endFrom) {
          return await ctx.reply("deleted");
        }
        startFrom = messages[messages.length - 1]?.id - 1 || 0;

        if (messages.length <= 1) break;

        await delay(30000, 40000);
      }
    }
    await ctx.reply("Deletion completed!");
  } catch (err) {
    await ctx.reply("Error: Please use the format: /del startId fromChat endFrom.");
  } finally {
    memory.set(true);
  }
}

// Helper function to extract valid message IDs
function extractMessageData(messages: any[]): number[] {
  return messages.map((msg) => msg.id || 0).filter((id) => id);
}

// Parse IDs from input, return null if invalid
function parseMessageIds(args: string[]): number[] | null {
  const numbers = args.map((num) => parseInt(num, 10));
  if (numbers.some(isNaN)) return null;
  return numbers;
}
