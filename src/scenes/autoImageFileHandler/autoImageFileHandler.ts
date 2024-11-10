import { AIOSessionData } from "./wizardSessionData.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import { getDramadata2 } from "./aIODocument.js";
import AIOWizardContext from "./aIOWizardContext.js";
import { sendToCOllection } from "../../utils/sendToCollection.js";
import { Input } from "telegraf";
import { delay } from "../../extra/delay.js";
import env from "../../services/env.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import { getAllMessages } from "../../services/client.js";

async function done(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
    await ctx.reply("Share AIO Canceled start again /addaio");
    return await ctx.scene.leave();
  }

  if (!(ctx.session as AIOSessionData).done) {
    const media: [number[], string, string][] = [];
    let batch: [number[], string, string] = [[], "", ""];
    let foundFirstPhoto = false;
    let count = false;
    if (ctx.message && "text" in ctx.message) {
      const args = ctx.message.text.trim().replace("/aifile", "").trim().split(" ");

      if (args.length < 7) {
        await ctx.reply(
          "Please provide all details: username, promoUsername, startId, fromChat, toChat, collectionAIO, endFrom"
        );
        return await ctx.scene.leave();
      }

      const [botUsername, promoUsername, quality, ...numberArgs] = args;

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
      const msg: any = await getAllMessages(fromChat, startId);
      console.log("Total messages:", msg.length);

      for (const message of msg) {
        if (message.media) {
          if (message.media.webpage && message.media.webpage.type === "photo") {
            console.log("Photo found with URL:", message.media.webpage.url);
            console.log("Message details:", message);

            if (!foundFirstPhoto) {
              if (count) {
                media.push(batch);
                batch = [[], "", ""];
              } else {
                count = true;
                continue;
              }

              batch[0].push(message.id);
              batch[1] = message.message;
              batch[2] = message.media.webpage.url;
              foundFirstPhoto = true;
            }
          } else if (message.media.document) {
            if (message.message.includes(quality)) {
              batch[0].push(message.id);
              foundFirstPhoto = false;
            }
          }
        }
      }

      console.log("Final collected media:", media);

      for (const mediaItem of media) {
        const [messageIds, caption, photoId] = mediaItem;
        if (!mediaItem || mediaItem.length < 3 || !photoId) {
          console.log("Skipping invalid media item:", mediaItem);
          continue;
        }
        if (messageIds.length === 0) {
          console.log("Skipping empty batch:", messageIds);
          continue;
        }
        console.log("Processing batch:", messageIds, caption, photoId);

        let photo = await getPhotoUrlFromWebPage(photoId);

        const AIODetails = {
          aIOTitle: processCaption(caption, promoUsername || "kdl_here"),
          backupChannel: promoUsername || "kdl_here",
          messageIds,
          aIOPosterID: photo,
        };

        const AIODetailsString = JSON.stringify(AIODetails, null, 2);

        await ctx.reply(`\`\`\`AIO details and file received.\n${AIODetailsString} 🎉\`\`\``, {
          parse_mode: "MarkdownV2",
        });

        (ctx.session as AIOSessionData).done = true;
        const forwardedMessageIds = await telegram.forwardMessages(
          toChat,
          fromChat,
          AIODetails.messageIds,
          false,
          [],
          promoUsername
        );

        const AIOData = await getDramadata2(AIODetails, forwardedMessageIds)!;
        if (!AIOData) {
          return await ctx.scene.leave();
        }
        const shareId = await database.saveAIO(AIOData);
        const link = AIOData.aioShortUrl;

        await ctx.reply(`https://t.me/${botUsername}?start=${shareId}-eng`);
        await sendToCOllection(
          collectionAIO,
          photo,
          link,
          processCaption(caption, promoUsername) || "none"
        );
      }
      return await ctx.scene.leave();
    }
  }
}

export async function getPhotoUrlFromWebPage(link: any): Promise<string> {
  let success = false;
  let photo;

  while (!success) {
    try {
      const result = await telegram.app.telegram.sendPhoto(
        env.dbPosterID,
        Input.fromURL(`${link}`)
      );
      await delay(1000, 4100);
      photo = `${env.dbPosterLink}/${result.message_id}`;
      success = true;
    } catch (error) {
      console.log(error);
      success = false;
      if ((error as any).code === 429) {
        console.log(`${error}`);
        await delay(40000, 41000);
      } else {
        console.log(`${error}`);
        await delay(40000, 41000);
      }
    }
  }
  return photo || "";
}

export { done };
