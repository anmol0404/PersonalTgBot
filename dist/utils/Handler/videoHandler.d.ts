import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
export declare class VideoHandler {
    static handleDownload(ctx: Context, url: string, statusMessage: Message.TextMessage): Promise<boolean>;
    private static updateProgress;
    private static sendVideo;
    private static sendToChannel;
}
