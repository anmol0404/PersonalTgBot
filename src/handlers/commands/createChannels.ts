import env from "../../services/env.js";
// import { createChannelsAndInviteAsAdmin } from "../../services/client.js";
import auth from "../../services/auth.js";

export default async function createChannelHandler(ctx: any) {
  const userId = ctx.from?.id;

  if (!auth.isAdmin(userId ? userId : 0)) {
    return ctx.reply("Sorry, you have no permission to do this");
  }
  // if (ctx.message && "text" in ctx.message) {
  //   const text = ctx.message.text;
  //   const channelsDetail = text.trim().replace("/createchannel", "").trim().split(" ");
  //   const [title, numberOfChannelToCreate] = channelsDetail;

  //   await ctx.reply(
  //     (
  //       await createChannelsAndInviteAsAdmin(
  //         title,
  //         "my database",
  //         env.botUsernameList!,
  //         parseInt(numberOfChannelToCreate, 10)
  //       )
  //     ).join(" ")
  //   );
  // }
}
