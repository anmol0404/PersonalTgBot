import env from "../../services/env.js";
import AIOWizardContext from "./aIOWizardContext.js";
import { sendToCollectionAll, sendToCollectionPosterIndex } from "../../utils/sendToCollection.js";
import { delay } from "../../extra/delay.js";
import fs from "fs/promises";

const apps = env.botTokens!;

async function done(ctx: AIOWizardContext) {
  try {
    if (ctx.message && "text" in ctx.message) {
      const args = ctx.message.text.trim().replace("/mkc", "").trim().split(" ");

      if (args.length < 7) {
        await ctx.reply(
          "Please provide all details: username, promoUsername, startId, fromChat, toChat, collectionAIO, endFrom"
        );
        return await ctx.scene.leave();
      }

      const [botUsername, backupLink, ...numberArgs] = args;

      const collectionAIO = parseInt(numberArgs[0], 10);
      if (isNaN(collectionAIO)) {
        await ctx.reply("Invalid details. Please make sure collectionAIO is a number.");
        return;
      }

      const data = await fs.readFile("./aio.json", "utf8");
      const jsonArray = JSON.parse(data);

      for (let i = 0; i < jsonArray.length; i++) {
        const appIndex = i % apps.length;
        const appInstance = apps[appIndex];
        const movie = jsonArray[i];
        const aIOPosterID: string = movie.aIOPosterID;
        const aIOTitle: string = movie.aIOTitle;
        let shareId: string = "";

        if (typeof movie.shareId === "object" && "$numberLong" in movie.shareId) {
          shareId += movie.shareId["$numberLong"];
        } else {
          shareId += movie.shareId.toString();
        }

        const link = `https://t.me/${botUsername}?start=${shareId}-eng`;

        try {
          await sendToCollectionAll(
            collectionAIO,
            link,
            aIOTitle || "none",
            aIOPosterID,
            appInstance,
            backupLink
          );
          await delay(300, 600);
        } catch (error) {
          await ctx.reply(`Failed to send data for movie: ${aIOTitle}`);
        }
      }
    }
  } catch (error) {
    console.error("An error occurred in the done function:", error);
    await ctx.reply("An unexpected error occurred. Please try again later.");
  }
}

export { done };
