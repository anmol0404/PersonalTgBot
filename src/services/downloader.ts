import fs from "fs-extra";
import path from "path";
import axios from "axios";
import { ProgressCallback, VideoInfo } from "../types";
import { formatProgress, prettyBytes } from "../utils/formatter.js";

const DOWNLOADS_DIR = path.join(process.cwd(), "downloads");

export async function downloadVideo(
  url: string,
  progressCallback?: ProgressCallback
): Promise<VideoInfo> {
  try {
    await fs.ensureDir(DOWNLOADS_DIR);

    const fileName = `video_${Date.now()}.mp4`;
    const filePath = path.join(DOWNLOADS_DIR, fileName);

    const { headers } = await axios.head(url);

    const totalBytes = parseInt(headers["content-length"] || "0", 10);

    if (isNaN(totalBytes) || totalBytes <= 0) {
      throw new Error("Invalid content length received from server");
    }

    let downloadedBytes = 0;
    let lastUpdateTime = Date.now();
    const updateInterval = 2000;

    const writer = fs.createWriteStream(filePath, { flags: "w" });

    const chunkSize = 20 * 1024 * 1024;
    let start = 0;

    while (start < totalBytes) {
      const end = Math.min(start + chunkSize - 1, totalBytes - 1);

      try {
        const response = await axios({
          method: "GET",
          url,
          responseType: "stream",
          timeout: 2400000, // Timeout 40 minutes
          headers: {
            Range: `bytes=${start}-${end}`,
          },
        });

        await new Promise<void>((resolve, reject) => {
          response.data.on("data", (chunk: Buffer) => {
            downloadedBytes += chunk.length;

            // Ensure downloadedBytes does not exceed totalBytes
            downloadedBytes = Math.min(downloadedBytes, totalBytes);

            const currentTime = Date.now();

            // Only update progress every few seconds
            if (progressCallback && currentTime - lastUpdateTime >= updateInterval) {
              lastUpdateTime = currentTime;
              progressCallback({
                progress: formatProgress(downloadedBytes, totalBytes),
                downloaded: prettyBytes(downloadedBytes),
                total: prettyBytes(totalBytes),
                speed: `${prettyBytes(chunk.length)}/s`,
              }).catch(console.error);
            }
          });

          response.data.pipe(writer, { end: false });
          response.data.on("end", resolve);
          response.data.on("error", reject);
        });

        start += chunkSize;
      } catch (error) {
        console.warn("Range request failed, attempting to download the entire file");
        const fullResponse = await axios({
          method: "GET",
          url,
          responseType: "stream",
          timeout: 2400000,
        });

        fullResponse.data.pipe(writer);
        await new Promise<void>((resolve, reject) => {
          fullResponse.data.on("end", resolve);
          fullResponse.data.on("error", reject);
        });
        break;
      }
    }

    writer.end();

    return {
      path: filePath,
      title: fileName,
      quality: "N/A", // Placeholder for video quality
      duration: 0, // Placeholder for video duration
      width: 0, // Placeholder for video width
      height: 0, // Placeholder for video height
      size: prettyBytes(totalBytes),
    };
  } catch (error) {
    throw new Error(
      `Download failed:: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
