import { Context } from "telegraf";
export interface ProgressInfo {
    progress: string;
    downloaded: string;
    total: string;
    speed: string;
}
export interface VideoInfo {
    path: string;
    title: string;
    quality: string;
    duration: number;
    width: number;
    height: number;
    size: string;
}
export interface BotContext extends Context {
    message: Context["message"] & {
        reply_to_message?: {
            photo?: Array<{
                file_id: string;
            }>;
        };
    };
}
export type ProgressCallback = (progress: ProgressInfo) => Promise<void>;
