import { Context, Markup } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { thankReply } from "../../utils/markupButton/permanantButton/lists.js";
import env from "../../services/env.js";

export default async function reqAIOHandler(ctx: WizardContext, next: () => void) {
  if (ctx.message && "text" in ctx.message) {
    if (!/^\/(start|d|m|a)/i.test(ctx.message.text)) {
      await ctx.scene.enter("reqAIO");
    }
    if (thankReply(ctx.message.text)) {
      ctx.reply(
        `If you really want to thank me so add two members for me\nhere my official Channel for updates and backup ${
          "@" + env.join
        }`
      );
    }
  }
  next();
}
