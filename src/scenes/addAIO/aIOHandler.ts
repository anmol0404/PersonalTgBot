import { AIOSessionData } from "./wizardSessionData.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import AIOWizardContext from "./aIOWizardContext.js";
import { sendToCOllection } from "../../utils/sendToCollection.js";
import { delay } from "../../extra/delay.js";
import fs from "fs/promises";
import memory from "../../handlers/commands/memory.js";

let can = true;

async function done(ctx: AIOWizardContext) {
  try {
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
      await ctx.reply("Share AIO Canceled, start again with /add ");
      return await ctx.scene.leave();
    }

    const tracker = await database.createOrUpdateTracker();

    if (ctx.message && "text" in ctx.message) {
      const args = ctx.message.text.trim().replace("/add", "").trim().split(" ");

      if (args.length < 7) {
        await ctx.reply(
          "Please provide all details: username, promoUsername, startId, fromChat, toChat, collectionAIO, endFrom"
        );
        return await ctx.scene.leave();
      }

      const [botUsername, promoUsername, ...numberArgs] = args;

      // Parse the numeric arguments and handle errors
      const [startId, fromChat, toChat, collectionAIO, endFrom] = numberArgs.map((arg) => {
        const parsedNumber = parseInt(arg, 10);
        if (isNaN(parsedNumber)) {
          ctx.reply(
            "Invalid details. Please make sure startId, fromChat, toChat, collectionAIO, and endFrom are numbers."
          );
          throw new Error("Invalid number in arguments");
        }
        return parsedNumber;
      });

      if (!(ctx.session as AIOSessionData).done && can) {
        can = false;

        const data = await fs.readFile("./bl.json", "utf8");
        const jsonArray = JSON.parse(data);

        for (let i = tracker.counter; i < jsonArray.length; i++) {
          if (memory.getStopAdding()) {
            memory.set(false);
            return await ctx.reply("Adding stopped.");
          }

          const drama = jsonArray[i];

          try {
            const forwardedMessageIds = await telegram.forwardMessages(
              toChat,
              fromChat,
              drama.messageIds ? drama.messageIds : [],
              false,
              [],
              promoUsername
            );

            drama.messageIds = forwardedMessageIds ? forwardedMessageIds : [];
            const AIOData = await getAIOdata(drama);

            const link = `https://t.me/${botUsername}?start=${AIOData.shareId}-eng`;

            await ctx.reply(`${drama.aIOTitle || "none"}\n${link}`);

            const shareId = await database.saveAIO(AIOData);
            await sendToCOllection(
              collectionAIO,
              drama.aIOPosterID,
              link,
              drama.aIOTitle.replace("  #", "") || "none"
            );

            const ctracker = await database.createOrUpdateTracker(i + 1);
            await ctx.reply("track" + ctracker.counter.toString());
            await delay(200, 400);
          } catch (error) {
            await ctx.reply(`Failed to process drama item: ${i + 1}. Skipping to next.`);
            continue;
          }
        }

        return await ctx.scene.leave();
      }
    }
  } catch (error) {
    console.error("An error occurred in the done function:", error);
    await ctx.reply("An unexpected error occurred. Please try again later.");
  } finally {
    can = true;
  }
}

export { done };
