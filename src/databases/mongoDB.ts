import mongoose, { Model } from "mongoose";
import env from "../services/env.js";
import MessageModel, { MessageDocument } from "./models/messageModel.js";
import UserModel, { UserDocument } from "./models/userModel.js";
import AIOModel from "./models/aIOModel.js";
import SortModel from "./models/sortModel.js";
import { AIODocument } from "./interfaces/aIO.js";
import { SortDocument } from "./interfaces/sort.js";
import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
import { InviteService } from "./inviteService.js";
import { InviteUser } from "./interfaces/inviteUser.js";
import { TrackerDocument } from "./interfaces/tracker.js";
import { IConfigDocument } from "./interfaces/config.js";
import ConfigModel from "./models/configModels.js";
import TrackerModel from "./models/trackerModel.js";

class MongoDB {
  db: typeof mongoose;
  MessageModel: Model<MessageDocument>;
  UserModel: Model<UserDocument>;
  inviteService: InviteService;
  TrackerModel: Model<TrackerDocument>;
  AIOModel: Model<AIODocument>;
  SortModel: Model<SortDocument>;
  ConfigModel: Model<IConfigDocument>;
  databaseUrl: string;

  constructor() {
    this.db = mongoose;
    this.MessageModel = MessageModel;
    this.UserModel = UserModel;
    this.TrackerModel = TrackerModel;
    this.SortModel = SortModel;
    this.AIOModel = AIOModel;
    this.ConfigModel = ConfigModel;
    this.inviteService = new InviteService();
    this.databaseUrl = env.databaseUrl || "";
  }

  async initialize() {
    await this.db.connect(this.databaseUrl);
  }

  async saveMessages(shareId: number, messageIds: number[]) {
    await new this.MessageModel({
      shareId,
      messageIds,
    }).save();

    return shareId;
  }
  async saveUser(user: UserDocument) {
    await new this.UserModel(user).save();
    return user;
  }
  async createOrUpdateTracker(counter?: number) {
    if (!counter) {
      let tracker = await this.TrackerModel.findOne({});
      if (!tracker) {
        tracker = await this.TrackerModel.create({ counter: 0 });
      }
      return tracker;
    }

    const updatedTracker = await this.TrackerModel.findOneAndUpdate(
      {},
      { counter },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return updatedTracker;
  }

  async getMessages(shareId: number) {
    return (await this.MessageModel.findOne({ shareId }))?.messageIds;
  }

  async getAIOMessages(shareId: number) {
    return (await this.AIOModel.findOne({ shareId }))?.messageIds;
  }

  async saveAIO(aio: AIODocument) {
    await new this.AIOModel(aio).save();
    return aio;
  }
  async getAllAIO() {
    try {
      const aios = await this.AIOModel.find();
      return aios;
    } catch (error) {
      console.error("Error while fetching the collection:", error);
      throw error;
    }
  }
  async deleteCollection() {
    try {
      await this.AIOModel.deleteMany({}); // Delete all documents in the collection
      console.log("Collection deleted successfully");
    } catch (error) {
      console.error("Error while deleting the collection:", error);
    }
  }

  async saveSort(sort: SortDocument) {
    await new this.SortModel(sort).save();
    return sort;
  }
  async removeFirstItem() {
    try {
      const document = await SortModel.findOne({}, { sort: { $slice: 1 } });
      if (!document || document.sort.length === 0) {
        console.log("No document found or the sort array is empty.");
        return null;
      }
      const removedItem = document.sort[0];
      await SortModel.findOneAndUpdate(
        { _id: document._id },
        { $pop: { sort: -1 } },
        { new: true }
      );
      return removedItem;
    } catch (err) {
      return null;
    }
  }

  async searchAIO(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined> {
    const regexOptions = { $regex: new RegExp(criteria.aIOTitle || "", "i") };

    const query: any = {};

    if (criteria.aIOTitle && criteria.aIOTitle.length >= 2) {
      query.aIOTitle = regexOptions;
    } else {
      query.aIOTitle = undefined;
    }
    try {
      const results = await this.AIOModel.find(query);
      console.log("Search Result:", results);
      return results;
    } catch (err) {
      console.error("Error executing the query:", err);
      return undefined;
    }
  }

  async addAIO(shareId: number, messageIds: number[]) {
    const aioDocument = await this.AIOModel.findOne({ shareId });
    if (aioDocument) {
      await this.AIOModel.findByIdAndUpdate(
        aioDocument.id,
        { $push: { messageIds: { $each: messageIds } } },
        { new: true }
      );
      return true;
    } else {
      return false;
    }
  }

  async deleteAIO(shareId: number) {
    const animeDocument = await this.AIOModel.findOne({ shareId });
    if (animeDocument) {
      await this.AIOModel.findByIdAndDelete(animeDocument.id);
      return true;
    } else {
      return false;
    }
  }

  async updateAIOAttribute(shareId: number, updateQuery: any) {
    try {
      await AIOModel.updateOne({ shareId: shareId }, { $set: updateQuery });
      return true;
    } catch (error) {
      console.error("Error updating drama attribute:", error);
      return false;
    }
  }

  //invite
  async addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void> {
    await this.inviteService.addInvite(userId, invitedUsername, invitedUserId);
  }

  async getInviteUser(userId: string): Promise<InviteUser | null> {
    return this.inviteService.getInviteUser(userId);
  }

  async canRequest(userId: string): Promise<boolean> {
    return this.inviteService.canRequest(userId);
  }

  async useRequest(userId: string): Promise<void> {
    await this.inviteService.useRequest(userId);
  }
  async getConfig(): Promise<IConfigDocument | null> {
    return ConfigModel.findOne();
  }

  // Set a new configuration (replace existing config or create a new one)
  async setConfig(configData: IConfigDocument): Promise<IConfigDocument> {
    const existingConfig = await ConfigModel.findOne();
    if (existingConfig) {
      // Update existing configuration
      Object.assign(existingConfig, configData);
      return existingConfig.save();
    } else {
      // Create a new configuration document
      const newConfig = new ConfigModel(configData);
      return newConfig.save();
    }
  }

  // Update specific fields in the configuration
  async updateConfig(updates: Partial<IConfigDocument>): Promise<IConfigDocument | null> {
    return ConfigModel.findOneAndUpdate({}, updates, { new: true });
  }

  // Individual getters
  async getStringSession(): Promise<string | null> {
    const config = await this.getConfig();
    return config?.stringSession || null;
  }

  async getApiKey(): Promise<string | null> {
    const config = await this.getConfig();
    return config?.apiKey || null;
  }

  async getApiHash(): Promise<string | null> {
    const config = await this.getConfig();
    return config?.apiHash || null;
  }

  async getBotTokens(): Promise<string[] | null> {
    const config = await this.getConfig();
    return config?.botTokens || null;
  }

  async getSingleBotToken(): Promise<string | null> {
    const config = await this.getConfig();
    return config?.singleBotToken || null;
  }

  async getPromo(): Promise<string | null> {
    const config = await this.getConfig();
    return config?.promo || null;
  }

  async getAdminIds(): Promise<string[] | null> {
    const config = await this.getConfig();
    return config?.adminIds || null;
  }

  async getAllowGroups(): Promise<boolean | null> {
    const config = await this.getConfig();
    return config?.allowGroups || null;
  }

  // Individual setters
  async setStringSession(value: string): Promise<IConfigDocument | null> {
    return this.updateConfig({ stringSession: value });
  }

  async setApiKey(value: string): Promise<IConfigDocument | null> {
    return this.updateConfig({ apiKey: value });
  }

  async setApiHash(value: string): Promise<IConfigDocument | null> {
    return this.updateConfig({ apiHash: value });
  }

  async setBotTokens(value: string[]): Promise<IConfigDocument | null> {
    return this.updateConfig({ botTokens: value });
  }

  async setSingleBotToken(value: string): Promise<IConfigDocument | null> {
    return this.updateConfig({ singleBotToken: value });
  }

  async setPromo(value: string): Promise<IConfigDocument | null> {
    return this.updateConfig({ promo: value });
  }

  async setAdminIds(value: string[]): Promise<IConfigDocument | null> {
    return this.updateConfig({ adminIds: value });
  }

  async setAllowGroups(value: boolean): Promise<IConfigDocument | null> {
    return this.updateConfig({ allowGroups: value });
  }
}

const mongoDB = new MongoDB();

export default mongoDB;
