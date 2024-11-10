import { AIODocument } from "../../databases/interfaces/aIO.js";
import getRandomId from "../../extra/getRandomId.js";
import env from "../../services/env.js";
import { shortenUrl } from "../../utils/sortLink.js";

interface AIODetails {
  aIOTitle?: string;
  backupChannel?: string;
  totalEpisodes?: string;
  messageIds?: number[];
  aIOPosterID?: string;
  shareId?: any;
  sortLink?: string;
}

export default async function getDramadata(
  dramaDetails: AIODetails,
  messageIdss: number[] = []
): Promise<AIODocument> {
  return {
    shareId: Number(dramaDetails.shareId?.["$numberLong"] || dramaDetails.shareId),
    messageIds: dramaDetails.messageIds ? dramaDetails.messageIds : [],
    aIOTitle: dramaDetails.aIOTitle ? dramaDetails.aIOTitle : "",
    aIOPosterID: dramaDetails.aIOPosterID ? dramaDetails.aIOPosterID : "0",
    aioShortUrl: "shortLink",
    episodes: [
      { episodeNumber: 1, shortUrl: "DummyLink1", teleUrl: "DummyURL1" },
      { episodeNumber: 2, shortUrl: "DummyLink2", teleUrl: "DummyURL2" },
    ],
  };
}
export async function getDramadata2(
  dramaDetails: AIODetails,
  messageIds: number[]
): Promise<AIODocument | null> {
  try {
    const shareId = parseInt(getRandomId().toString().slice(3));
    return {
      shareId: shareId,
      messageIds: messageIds || [],
      aIOTitle: dramaDetails.aIOTitle || "",
      aIOPosterID: dramaDetails.aIOPosterID || "0",
      aioShortUrl: "null",
      episodes: [
        { episodeNumber: 1, shortUrl: "DummyLink1", teleUrl: "DummyURL1" },
        { episodeNumber: 2, shortUrl: "DummyLink2", teleUrl: "DummyURL2" },
      ],
    };
  } catch (error) {
    return null;
  }
}
