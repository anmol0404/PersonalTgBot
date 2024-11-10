import telegram from "./../services/telegram.js";
import * as keyboard from "./markupButton/permanantButton/keyboard.js";

export async function sendToCOllection(
  chat: any,
  aIOPosterID: string | undefined,
  link: string,
  caption: string
): Promise<void> {
  try {
    await telegram.app.telegram.sendPhoto(chat, aIOPosterID || "", {
      caption: `\`\n${caption}\n\``,
      parse_mode: "Markdown",
      reply_markup: keyboard.makeCollectionButton(link),
    });
    console.log("Photo sent successfully!");
  } catch (error) {
    console.error("Error sending photo:", error);
  }
}
export async function sendToCOllection2(
  chat: any,
  link: string,
  caption: string,
  app: any
): Promise<void> {
  try {
    await app.telegram.sendMessage(chat, `\`\`\`\n${caption}\n\`\`\`` || "", {
      parse_mode: "Markdown",
      reply_markup: keyboard.makeCollectionButton(link),
    });
  } catch (error) {
    console.error("Error sending msg:", error);
  }
}
export async function sendToCollectionAll(
  chat: any,
  link: string,
  caption: string,
  aIOPosterID: string,
  app: any,
  backup: string = ""
): Promise<void> {
  try {
    await app.telegram.sendPhoto(chat, aIOPosterID || "", {
      caption: caption.trim(),
      reply_markup: keyboard.makeCollectionButton(link, backup),
    });
    console.log("Photo sent successfully!");
  } catch (error) {
    console.error("Error sending photo:", error);
  }
}

export async function sendToCollectionPosterIndex(
  chat: any,
  link: string,
  caption: string,
  aIOPosterID: string,
  app: any
): Promise<void> {
  try {
    await app.telegram.sendMessage(chat, caption.trim() || "", {
      parse_mode: "Markdown",
      reply_markup: keyboard.makeCollectionButton(aIOPosterID),
    });
  } catch (error) {
    console.error("Error sending msg:", error);
  }
}
