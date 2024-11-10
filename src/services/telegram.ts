import { Markup, Scenes, Telegraf, deunionize } from "telegraf";
import env from "./env.js";
import { InlineKeyboardMarkup, User } from "telegraf/typings/core/types/typegram.js";
import filterAsync from "../extra/filterAsync.js";
import mapAsync from "../extra/mapAsync.js";
import splitArray from "../extra/splitArray.js";
import { delay } from "../extra/delay.js";
import { editAIOTitle, processCaption } from "../utils/caption/editCaption.js";
import { getMessageFromId } from "./client.js";
const botTokens = env.botTokens!;

class Telegram {
  app: Telegraf<Scenes.WizardContext>;
  messages: Map<number, number[]>;
  waitingMessageId: number;
  waitingMessageTimeout: NodeJS.Timeout;
  firstWaitingMessage: boolean;
  inviteLinks: Map<number, string>;

  constructor() {
    this.app = new Telegraf<Scenes.WizardContext>(env.token);
    this.messages = new Map();
    this.waitingMessageId = NaN;
    this.waitingMessageTimeout = setTimeout(() => {});
    this.firstWaitingMessage = true;
    this.inviteLinks = new Map();
  }

  async initialize() {
    await this.app.telegram.setMyCommands([
      {
        command: "start",
        description: "start bot",
      },
      {
        command: "add",
        description: "Admin Command",
      },

      {
        command: "edit",
        description: "Admin Command",
      },
      {
        command: "help",
        description: "examples of using the bot",
      },
    ]);
    const forceChatIds = [...env.forceChannelIds, ...env.forceGroupIds];

    await mapAsync(forceChatIds, async (chatId) => await this.getInviteLink(chatId));
  }

  async sendWaitingMessage(chatId: number) {
    clearTimeout(this.waitingMessageTimeout);

    const totalMessages = this.messages.get(chatId)?.length || 0;
    const text =
      "Send me any message and click Finish when you are done!\n" +
      `Total messages: ${totalMessages}`;
    const replyMarkup: InlineKeyboardMarkup = {
      inline_keyboard: [[{ text: "Finish", callback_data: "share-finish" }]],
    };
    const delay = this.firstWaitingMessage ? 0 : 1000;
    this.waitingMessageTimeout = setTimeout(async () => {
      try {
        await this.deleteWaitingMessage(chatId);
      } catch {}

      const waitingMessage = await this.app.telegram.sendMessage(chatId, text, {
        reply_markup: replyMarkup,
      });
      this.waitingMessageId = waitingMessage.message_id;
      this.firstWaitingMessage = false;
    }, delay);
  }

  async deleteWaitingMessage(chatId: number) {
    await this.app.telegram.deleteMessage(chatId, this.waitingMessageId);
  }

  async sendForceJoinMessage(
    shareId: number,
    chatId: number,
    user: User,
    chatsUserHasNotJoined: number[]
  ) {
    const text = `Hello ${user.first_name}\n` + `you must join all the groups/channels below first`;
    const replyMarkup = await this.getForceChatButtons(shareId, chatsUserHasNotJoined);
    await this.app.telegram.sendMessage(chatId, text, {
      reply_markup: replyMarkup,
    });
  }

  async getForceChatButtons(shareId: number, chatsUserHasNotJoined: number[]) {
    const limitPerRow = 2;

    const rawButtons = await mapAsync(chatsUserHasNotJoined, async (chatId, index) => {
      const label = `Chat ${index + 1}`;
      const inviteLink = await this.getInviteLink(chatId);

      return Markup.button.url(label, inviteLink);
    });
    const forceChatButtons = splitArray(rawButtons, limitPerRow);

    forceChatButtons.push([
      Markup.button.url(
        "You need to join this first",
        `https://t.me/${this.app.botInfo?.username}?start=${shareId}`
      ),
    ]);
    return {
      inline_keyboard: forceChatButtons,
    };
  }

  addMessage(chatId: number, messageId: number) {
    const messages = this.messages.get(chatId) || [];
    messages.push(messageId);
    this.messages.set(chatId, messages);
  }

  clearMessages(chatId: number) {
    this.messages.delete(chatId);
    this.firstWaitingMessage = true;
    this.waitingMessageId = NaN;
  }

  async forwardMessages(
    toChatId: number,
    fromChatId: number,
    messageIds: number[],
    deleteOrNot: boolean = false,
    captions: string[] = [],
    promoUsername: string = "kdl_here"
  ) {
    const resultIds: number[] = [];
    const apps = botTokens.map((token) => new Telegraf<Scenes.WizardContext>(token));

    for (let i = 0; i < messageIds.length; i++) {
      const appIndex = i % apps.length;
      const appInstance = apps[appIndex];
      const result = await getMessageFromId(fromChatId, messageIds[i]);
      const messageId = messageIds[i];
      const caption = extractMessageData(result);
      let success = false;
      while (!success) {
        try {
          const cresult = await appInstance.telegram.copyMessage(toChatId, fromChatId, messageId, {
            caption: editAIOTitle(caption, promoUsername),
          });
          resultIds.push(cresult.message_id);
          success = true;
          await delay(100, 200);
        } catch (error) {
          success = false;
          if ((error as any).code === 429) {
            console.log(`${error}`);
            await new Promise((resolve) => setTimeout(resolve, 40000));
          } else {
            console.log(`${error}`);
            await new Promise((resolve) => setTimeout(resolve, 40000));
          }
        }
      }
    }

    return resultIds;
  }

  async getChatsUserHasNotJoined(userId: number) {
    const chatIds = [...env.forceChannelIds, ...env.forceGroupIds];

    return filterAsync(chatIds, async (chatId) => !(await this.alreadyJoinChat(chatId, userId)));
  }

  async alreadyJoinChat(chatId: number, userId: number) {
    const { status } = await this.app.telegram.getChatMember(chatId, userId);

    return (
      status === "administrator" ||
      status === "creator" ||
      status === "member" ||
      status === "restricted"
    );
  }

  async getInviteLink(chatId: number) {
    const cachedInviteLink = this.inviteLinks.get(chatId);

    if (cachedInviteLink) {
      return cachedInviteLink;
    }
    const existingInviteLink = deunionize(await this.app.telegram.getChat(chatId)).invite_link;

    if (existingInviteLink) {
      this.inviteLinks.set(chatId, existingInviteLink);
      return existingInviteLink;
    }
    const inviteLink = await this.app.telegram.exportChatInviteLink(chatId);
    this.inviteLinks.set(chatId, inviteLink);

    return inviteLink;
  }
}
const telegram = new Telegram();

export default telegram;
function extractMessageData(messages: any[]) {
  const msg = messages[0];
  const messageText = msg.message ?? "";
  let caption = messageText;
  let mediaFilename = undefined;

  if (msg.media && msg.media.document) {
    const fileNameAttribute = msg.media.document.attributes.find(
      (attr: any) => attr.className === "DocumentAttributeFilename"
    );
    if (fileNameAttribute && fileNameAttribute.fileName) {
      mediaFilename = fileNameAttribute.fileName;
    }

    if (msg.media.video === false && mediaFilename) {
      caption = mediaFilename;
    } else {
      caption = mediaFilename ? mediaFilename : messageText;
    }
  }
  console.log(caption + "hii");
  return caption;
}