import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
// import { getThumb } from '../services/thumbnail';
import env from "../../services/env.js";
import { VideoInfo } from "../../types";
import { formatDuration } from "../formatter.js";
import { uploadFile } from "../../services/client.js";
import { downloadVideo } from "../../services/downloader.js";

export class VideoHandler {
  static async handleDownload(
    ctx: Context,
    url: string,
    statusMessage: Message.TextMessage
  ): Promise<boolean> {
    try {
      let lastUpdate = Date.now();
      const updateInterval = 2000;

      const videoInfo: VideoInfo = await downloadVideo(url, async (progress) => {
        const now = Date.now();
        if (now - lastUpdate >= updateInterval) {
          await this.updateProgress(ctx, statusMessage, url, progress);
          lastUpdate = now;
        }
      });
      console.log(videoInfo);
      const videoMessage = await uploadFile(env.channel, videoInfo.path);
      // const videoMessage = await this.sendVideo(ctx, videoInfo);
      // console.log(videoMessage + "hfdvfsh");
      // const message_id = videoMessage.message_id;
      // const chat_id = videoMessage.chat.id;
      // if (process.env.CHANNEL_ID) {
      //   await this.sendToChannel(ctx, message_id, chat_id, videoInfo);
      // }

      return true;
    } catch (error) {
      throw new Error(
        `Download failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private static async updateProgress(
    ctx: Context,
    statusMessage: Message.TextMessage,
    url: string,
    progress: {
      progress: string;
      downloaded: string;
      total: string;
      speed: string;
    }
  ): Promise<void> {
    await ctx.telegram.editMessageText(
      statusMessage.chat.id,
      statusMessage.message_id,
      undefined,
      `📥 Downloading Video\n\n` +
        `🔗 ${url}\n\n` +
        `${progress.progress}\n` +
        `📦 Size: ${progress.downloaded} / ${progress.total}\n` +
        `🚀 Speed: ${progress.speed}`,
      { parse_mode: "Markdown" }
    );
  }

  private static async sendVideo(
    ctx: Context,
    videoInfo: VideoInfo
  ): Promise<Message.VideoMessage> {
    const message = await ctx.sendVideo(
      { source: videoInfo.path },
      {
        caption:
          `📹 Video Details\n\n` +
          `🎬 Title: ${videoInfo.title}\n` +
          `📊 Quality: ${videoInfo.quality}\n` +
          `⏱ Duration: ${formatDuration(videoInfo.duration)}\n` +
          `📦 Size: ${videoInfo.size}`,
        parse_mode: "HTML",
        // thumb: thumb,
        width: videoInfo.width,
        height: videoInfo.height,
        duration: videoInfo.duration,
      }
    );
    return message;
  }

  private static async sendToChannel(
    ctx: Context,
    message_id: number,
    chat_id: number,
    videoInfo: VideoInfo
  ): Promise<void> {
    await ctx.telegram.copyMessage(env.channel, chat_id, message_id, {
      caption: ` ${videoInfo.title}\n`,
    });
  }
}
