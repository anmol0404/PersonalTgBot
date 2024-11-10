export interface Link {
    episodeNumber: number;
    shortUrl: string;
    teleUrl: string;
}
export interface AIODocument {
    shareId: number;
    messageIds: number[];
    aIOTitle: string;
    aIOPosterID: string;
    aioShortUrl: string;
    episodes: Link[];
}
