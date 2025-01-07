import { ProgressCallback, VideoInfo } from "../types";
export declare function downloadVideo(url: string, progressCallback?: ProgressCallback): Promise<VideoInfo>;
