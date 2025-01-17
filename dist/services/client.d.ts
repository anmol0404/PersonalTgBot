/// <reference types="node" />
import { Api, TelegramClient } from "telegram/index.js";
import { VideoInfo } from "../types/index.js";
export declare const client: TelegramClient;
export declare function getMessageFromId(chat: any, messageId: any): Promise<import("telegram/Helpers.js").TotalList<Api.Message>>;
export declare function getAllMessages(chat: number, oId: number): Promise<import("telegram/Helpers.js").TotalList<Api.Message>>;
export declare function deleteMessagesInBatches(channel: number, messageIds: number[], endFrom?: number): Promise<void>;
export declare function uploadFile(channel: number, videoInfo: VideoInfo): Promise<Api.Message | undefined>;
export declare function downloadPhoto(message_id: number, chat_id: number): Promise<string | Buffer | undefined>;
export declare function downloadAndUploadPhoto(message_id: number, chat_id: number): Promise<string>;
export declare function getAllParticipantIds(chat_id: number): Promise<number[]>;
