import { Scenes, Markup, Composer } from "telegraf";
import PageSessionData from "./pageSessionData";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSearchCriteria } from "../../databases/interfaces/searchCriteria";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { makeButtons } from "../../utils/markupButton/permanantButton/keyboard.js";
import { reservedWordList } from "../../utils/markupButton/permanantButton/lists.js";

// Create a Wizard Scene
const paginationWizard = new Scenes.WizardScene<WizardContext<PageSessionData>>(
  "reqAIO",
  Composer.on("message", async (ctx) => {
    if ("text" in ctx.message) {
      (ctx.session as PageSessionData).page = 0;
      const request = ctx.message.text.replace("/eng", "").trim();
      if (
        !reservedWordList.includes(request.toLocaleLowerCase()) &&
        request.length > 2 &&
        request.length < 30
      ) {
        const searchCriteria: AIOSearchCriteria = {
          aIOTitle: request,
        };
        const finalResult = await database.searchAIO(searchCriteria);
        const random = getRandomId();
        (ctx.session as PageSessionData).prev = `prev${random}`;
        (ctx.session as PageSessionData).next = `next${random}`;
        console.log((ctx.session as PageSessionData).prev);

        (ctx.session as PageSessionData).aIOData = finalResult;
        if (finalResult && finalResult.length > 0) {
          const photo = finalResult[0].aIOPosterID;
          await ctx
            .replyWithPhoto(photo, {
              caption: `\`\`\`\n${makeAIOCaption(finalResult[0])}\n\`\`\``,
              reply_markup: makeButtons(
                `https://t.me/${env.botUserName}?start=${finalResult[0].shareId}-eng`,
                (ctx.session as PageSessionData).next || "",
                (ctx.session as PageSessionData).prev || ""
              ),
              parse_mode: "MarkdownV2",
              reply_to_message_id: ctx.message.message_id,
            })
            .then((sentMessage) => {
              const messageIdToDelete = sentMessage.message_id;
              setTimeout(() => {
                ctx.deleteMessage(messageIdToDelete);
              }, 5 * 60 * 60 * 1000);
            });

          if (finalResult.length > 1) {
            return ctx.wizard.next();
          }
        } else {
          ctx.scene.leave;
        }

        return ctx.wizard.next();
      } else {
        await ctx.scene.leave();
      }
    }
  }),
  Composer.on("callback_query", async (ctx) => {
    if (
      "data" in ctx.callbackQuery &&
      ((ctx.session as PageSessionData).next === ctx.callbackQuery.data ||
        (ctx.session as PageSessionData).prev === ctx.callbackQuery.data)
    ) {
      const page = (ctx.session as PageSessionData).page || 0;
      const aIOData = (ctx.session as PageSessionData).aIOData;
      console.log([
        (ctx.session as PageSessionData).page || 0,
        (ctx.session as PageSessionData).aIOData?.length,
      ]);

      if (aIOData) {
        try {
          if (ctx.callbackQuery.data.startsWith("next")) {
            if (page + 1 < aIOData.length) {
              (ctx.session as PageSessionData).page =
                ((ctx.session as PageSessionData).page ?? 0) + 1;
              console.log(page, aIOData.length);

              const photo = aIOData[(ctx.session as PageSessionData).page || 0].aIOPosterID;
              //edit
              await ctx.editMessageMedia({
                type: "photo",
                media: photo,
              });
              await ctx.editMessageCaption(`\`\`\`\n${makeAIOCaption(aIOData[page + 1])}\n\`\`\``, {
                reply_markup: makeButtons(
                  `https://t.me/${env.botUserName}?start=${aIOData[page + 1].shareId}-eng`,
                  (ctx.session as PageSessionData).next || "",
                  (ctx.session as PageSessionData).prev || ""
                ),
                parse_mode: "MarkdownV2",
              });
            } else {
              await sendCallbackQueryResponse(ctx, `This is the last no more there !! `);
            }
          } else if (ctx.callbackQuery.data.startsWith("prev")) {
            if (aIOData && page != 0) {
              //ignore this page != 0
              (ctx.session as PageSessionData).page = Math.max(
                ((ctx.session as PageSessionData).page ?? 0) - 1,
                0
              );
              const photo = aIOData[page - 1].aIOPosterID;
              await ctx.editMessageMedia({
                type: "photo",
                media: photo,
              });
              await ctx.editMessageCaption(
                `\`\`\`\n ${makeAIOCaption(aIOData[page - 1])}\n\`\`\``,
                {
                  reply_markup: makeButtons(
                    `https://t.me/${env.botUserName}?start=${aIOData[page - 1].shareId}-eng`,
                    (ctx.session as PageSessionData).next || "",
                    (ctx.session as PageSessionData).prev || ""
                  ),
                  parse_mode: "MarkdownV2",
                }
              );
            } else {
              await sendCallbackQueryResponse(ctx, `Nothing in Prev !! `);
            }
          }
        } catch (error) {}
      } else {
        await sendCallbackQueryResponse(ctx, `No more data there !!!`);
      }
    } else {
      await sendCallbackQueryResponse(ctx, `you need to search again this  !!!`);
    }
  })
);

export default paginationWizard;
