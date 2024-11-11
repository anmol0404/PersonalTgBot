import { AIOSessionData } from "./wizardSessionData.js";
import { TelegramClient, errors } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";
import AIOWizardContext from "./aIOWizardContext.js";
let client: TelegramClient;
// Ask for API Key
async function askAPIKey(ctx: AIOWizardContext) {
  (ctx.session as AIOSessionData).session = "";
  (ctx.session as AIOSessionData).apiHash = "";
  (ctx.session as AIOSessionData).apiKey = 0;

  await ctx.reply(
    `Note: Go to [Telegram API](https://my.telegram.org/) to get your API Key Send the API Key here or say /cancel to exit`,
    { parse_mode: "Markdown" }
  );
  return ctx.wizard.next();
}

// Handle API Key and request API Hash
async function handleAPIKeyAskHash(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel") {
    (ctx.session as AIOSessionData).apiKey = parseInt(ctx.message.text);
    await ctx.reply("Please send your API Hash, or type /cancel to exit.");
    return ctx.wizard.next();
  } else {
    await ctx.reply("Operation canceled.");
    return await ctx.scene.leave();
  }
}

// Handle API Hash and ask for phone number
async function handleHashAskPhone(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel") {
    (ctx.session as AIOSessionData).apiHash = ctx.message.text;
    await ctx.reply(
      "Please provide your phone number (in international format), or type /cancel to exit."
    );
    return ctx.wizard.next();
  } else {
    await ctx.reply("Operation canceled.");
    return await ctx.scene.leave();
  }
}

// Handle phone number input and send OTP
async function handlePhoneAskOTP(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message) {
    if (ctx.message.text === "/cancel") {
      await ctx.reply("Operation canceled. Start again with /addaio.");
      return await ctx.scene.leave();
    }

    // Save the phone number
    (ctx.session as AIOSessionData).phone = ctx.message.text;
    try {
      const apiId = (ctx.session as AIOSessionData).apiKey!;
      const apiHash = (ctx.session as AIOSessionData).apiHash!;
      const stringSession = new StringSession("");

      client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
      });

      await client.connect();
      await client.sendCode({ apiId, apiHash }, (ctx.session as AIOSessionData).phone!);
      await ctx.reply("OTP has been sent to your phone. Please enter the OTP you received.");

      // Move to the next wizard step to handle OTP input
      return ctx.wizard.next();
    } catch (error) {
      console.error("Error sending OTP:", error);
      await ctx.reply("Failed to send OTP. Please start again with /addaio.");
      return await ctx.scene.leave();
    }
  } else {
    await ctx.reply("Operation canceled.");
    return await ctx.scene.leave();
  }
}

// Handle OTP verification and sign in
async function handleOTPVerification(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message) {
    if (ctx.message.text === "/cancel") {
      await ctx.reply("Operation canceled. Start again with /addaio.");
      return await ctx.scene.leave();
    }

    // Save the OTP entered by the user
    (ctx.session as AIOSessionData).otp = ctx.message.text;

    try {
      const apiId = (ctx.session as AIOSessionData).apiKey!;
      const apiHash = (ctx.session as AIOSessionData).apiHash!;
      const stringSession = new StringSession("");

      await client.signInUser(
        { apiId, apiHash },
        {
          phoneNumber: async () => (ctx.session as AIOSessionData).phone!,
          password: async () => " ctx.message.text",
          phoneCode: async () => (ctx.session as AIOSessionData).otp!,
          onError: (err: any) => console.error("Error during client start:", err),
        }
      );
      // Save the session string
      const sessionString = client.session.save();
      await ctx.reply(`\`\n${sessionString.toString()}\``);
      await ctx.reply(
        "Authentication successful! Save your session key and don't share it with anyone."
      );

      return await ctx.scene.leave();
    } catch (error) {
      console.error("Authentication error:", error);
      await ctx.reply("Authentication failed. Please start again with /addaio.");
      return await ctx.scene.leave();
    }
  } else {
    await ctx.reply("Invalid OTP. Please try again.");
    return await ctx.scene.leave();
  }
}

export {
  askAPIKey,
  handleAPIKeyAskHash,
  handleHashAskPhone,
  handlePhoneAskOTP,
  handleOTPVerification,
};
