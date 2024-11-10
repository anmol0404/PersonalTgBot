// import { delay } from "../../extra/delay.js";
// import auth from "../../services/auth.js";
// import { deleteMessagesInBatches, getAllMessages, getAllPhotos } from "../../services/client.js";
// import memory from "./memory.js";
// import * as fs from "fs";

// memory.set(true);

// export default async function addAIOHandler(ctx: any) {
//   const userId = ctx.from?.id;

//   if (!auth.isAdmin(userId ? userId : 0 || !memory.get())) {
//     return await ctx.reply("Sorry, you have no permission to do this or wait.");
//   }

//   if (memory.get()) {
//     try {
//       const numbers: number[] = ctx.message.text
//         .trim()
//         .replace("/delphotos", "")
//         .trim()
//         .split(" ")
//         .map((number: string) => {
//           const parsedNumber = parseInt(number, 10);
//           if (isNaN(parsedNumber)) {
//             ctx.reply("Invalid details");
//             throw new Error("Invalid number");
//           }
//           return parsedNumber;
//         });

//       const [startId, fromChat, endFrom] = numbers;

//       let startFrom = Math.max(startId, 0);

//       while (startFrom <= endFrom) {
//         memory.set(false);
//         await ctx.reply(`Start from ${startFrom}`);

//         try {
//           const messages = await getAllPhotos(fromChat, startFrom);
//           console.log("Messages length:", messages.length);
//           if (messages.length === 0) {
//             await ctx.reply("No more messages to process.");
//             break;
//           }
//           const lastFetchedMessageId = messages[messages.length - 1]?.id;
//           startFrom = lastFetchedMessageId - 1;

//           const photoIds = messages
//             .filter(
//               (message: any) => message.media && message.media.className === "MessageMediaPhoto"
//             )
//             .map((photo: any) => photo.id);

//           await deleteMessagesInBatches(fromChat, photoIds);
//           await delay(4000, 6000);
//         } catch (error) {
//           console.error("Error processing batch:", error);
//           await ctx.reply("Retrying in 2-3 minutes due to an error...");
//           await delay(2 * 60 * 1000, 4 * 60 * 1000);
//         }
//       }

//       memory.set(true);
//       await ctx.reply("Done!");
//     } catch (err) {
//       console.error("Error in addAIOHandler:", err);
//       await ctx.reply(
//         "Please provide the correct details. The command should be in the format: /add startId fromChat toChat endFrom"
//       );
//     }
//   } else {
//     ctx.reply("Please wait... \nTry again after some time.");
//   }
// }
