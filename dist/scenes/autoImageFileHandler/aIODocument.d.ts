import { AIODocument } from "../../databases/interfaces/aIO.js";
interface AIODetails {
    aIOTitle?: string;
    backupChannel?: string;
    totalEpisodes?: string;
    messageIds?: number[];
    aIOPosterID?: string;
    shareId?: any;
    sortLink?: string;
}
export default function getDramadata(dramaDetails: AIODetails, messageIdss?: number[]): Promise<AIODocument>;
export declare function getDramadata2(dramaDetails: AIODetails, messageIds: number[]): Promise<AIODocument | null>;
export {};
