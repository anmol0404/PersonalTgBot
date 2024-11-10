/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import mongoose, { Model } from "mongoose";
import { MessageDocument } from "./models/messageModel.js";
import { UserDocument } from "./models/userModel.js";
import { AIODocument } from "./interfaces/aIO.js";
import { SortDocument } from "./interfaces/sort.js";
import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
import { InviteService } from "./inviteService.js";
import { InviteUser } from "./interfaces/inviteUser.js";
import { TrackerDocument } from "./interfaces/tracker.js";
import { IConfigDocument } from "./interfaces/config.js";
declare class MongoDB {
    db: typeof mongoose;
    MessageModel: Model<MessageDocument>;
    UserModel: Model<UserDocument>;
    inviteService: InviteService;
    TrackerModel: Model<TrackerDocument>;
    AIOModel: Model<AIODocument>;
    SortModel: Model<SortDocument>;
    ConfigModel: Model<IConfigDocument>;
    databaseUrl: string;
    constructor();
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    saveUser(user: UserDocument): Promise<UserDocument>;
    createOrUpdateTracker(counter?: number): Promise<mongoose.Document<unknown, {}, TrackerDocument> & TrackerDocument & {
        _id: mongoose.Types.ObjectId;
    }>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<number[] | undefined>;
    saveAIO(aio: AIODocument): Promise<AIODocument>;
    getAllAIO(): Promise<(mongoose.Document<unknown, {}, AIODocument> & AIODocument & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    deleteCollection(): Promise<void>;
    saveSort(sort: SortDocument): Promise<SortDocument>;
    removeFirstItem(): Promise<import("./interfaces/sort.js").Sort | null>;
    searchAIO(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    addAIO(shareId: number, messageIds: number[]): Promise<boolean>;
    deleteAIO(shareId: number): Promise<boolean>;
    updateAIOAttribute(shareId: number, updateQuery: any): Promise<boolean>;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
    getConfig(): Promise<IConfigDocument | null>;
    setConfig(configData: IConfigDocument): Promise<IConfigDocument>;
    updateConfig(updates: Partial<IConfigDocument>): Promise<IConfigDocument | null>;
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
}
declare const mongoDB: MongoDB;
export default mongoDB;
