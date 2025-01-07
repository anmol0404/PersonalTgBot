import ytdl from "ytdl-core";
import fs from "fs-extra";
import path from "path";
import { formatProgress, prettyBytes } from "./formatter.js";
import { ProgressCallback, VideoInfo } from "../types";

export async function downloadVideo(
  url: string,
  progressCallback?: ProgressCallback
): Promise<VideoInfo> {
  try {
    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: "highest" });

    const fileName = `${info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    const filePath = path.join(__dirname, "../../downloads", fileName);

    await fs.ensureDir(path.join(__dirname, "../../downloads"));

    let downloadedBytes = 0;
    const totalBytes = parseInt(videoFormat.contentLength);

    await new Promise<void>((resolve, reject) => {
      const stream = ytdl(url, { format: videoFormat })
        .on("data", (chunk) => {
          downloadedBytes += chunk.length;
          if (progressCallback) {
            progressCallback({
              progress: formatProgress(downloadedBytes, totalBytes),
              downloaded: prettyBytes(downloadedBytes),
              total: prettyBytes(totalBytes),
              speed: prettyBytes(chunk.length) + "/s",
            }).catch(reject);
          }
        })
        .pipe(fs.createWriteStream(filePath));

      stream.on("finish", () => resolve());
      stream.on("error", reject);
    });

    return {
      path: filePath,
      title: info.videoDetails.title,
      quality: `${videoFormat.qualityLabel}`,
      duration: parseInt(info.videoDetails.lengthSeconds),
      width: videoFormat.width || 0,
      height: videoFormat.height || 0,
      size: prettyBytes(totalBytes),
    };
  } catch (error) {
    throw new Error(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
