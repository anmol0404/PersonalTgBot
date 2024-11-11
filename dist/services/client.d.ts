import { TelegramClient } from "telegram/index.js";
export declare const client: TelegramClient;
export declare function getMessageFromId(chat: any, messageId: any): Promise<import("telegram/Helpers.js").TotalList<import("telegram/index.js").Api.Message>>;
export declare function getAllMessages(chat: number, oId: number): Promise<import("telegram/Helpers.js").TotalList<import("telegram/index.js").Api.Message>>;
export declare function deleteMessagesInBatches(channel: number, messageIds: number[], endFrom?: number): Promise<void>;
