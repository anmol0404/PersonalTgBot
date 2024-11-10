import { NarrowedContext } from "telegraf";
import { Update, Message, User } from "telegraf/typings/core/types/typegram.js";
import { WizardContext, WizardSessionData } from "telegraf/typings/scenes/index.js";
import { AIOSearchCriteria } from "./databases/interfaces/searchCriteria.js";
import { AIODocument } from "./databases/interfaces/aIO.js";
import { SortDocument } from "./databases/interfaces/sort.js";
import { InviteUser } from "./databases/interfaces/inviteUser.js";
import { IConfigDocument } from "./databases/interfaces/config.js";
export type CommandContext = NarrowedContext<WizardContext<WizardSessionData>, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
}>;
export interface DatabaseClient {
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<number[] | undefined>;
    createOrUpdateTracker(couter?: number): any;
    saveUser(user: User): Promise<User>;
    saveAIO(aIODocument: AIODocument): Promise<AIODocument>;
    saveSort(SortDocument: SortDocument): Promise<SortDocument>;
    searchAIO(searchCriteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    addAIO(shareId: number, messageIds: number[]): any;
    deleteAIO(shareId: number): any;
    updateAIOAttribute(shareId: number, attribute: any): any;
    removeFirstItem(): any;
    getAllAIO(): any;
    deleteCollection(): any;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
    getStringSession(): Promise<string | null>;
    getApiKey(): Promise<string | null>;
    getApiHash(): Promise<string | null>;
    getBotTokens(): Promise<string[] | null>;
    getSingleBotToken(): Promise<string | null>;
    getPromo(): Promise<string | null>;
    getAdminIds(): Promise<string[] | null>;
    getAllowGroups(): Promise<boolean | null>;
    setStringSession(value: string): Promise<IConfigDocument | null>;
    setApiKey(value: string): Promise<IConfigDocument | null>;
    setApiHash(value: string): Promise<IConfigDocument | null>;
    setBotTokens(value: string[]): Promise<IConfigDocument | null>;
    setSingleBotToken(value: string): Promise<IConfigDocument | null>;
    setPromo(value: string): Promise<IConfigDocument | null>;
    setAdminIds(value: string[]): Promise<IConfigDocument | null>;
    setAllowGroups(value: boolean): Promise<IConfigDocument | null>;
    updateConfig(updates: Partial<{
        stringSession: string | null;
        apiKey: string | null;
        apiHash: string | null;
        botTokens: string[] | null;
        singleBotToken: string | null;
        promo: string | null;
        adminIds: string[] | null;
        allowGroups: boolean | null;
    }>): Promise<IConfigDocument | null>;
    getConfig(): Promise<IConfigDocument | null>;
}
export interface RequestDBClient {
    initialize(): Promise<void>;
    hasReachedRequestLimit(userId: string): any;
    addUserRequest(userId: string): any;
    saveRequestData(userId: string): any;
}
