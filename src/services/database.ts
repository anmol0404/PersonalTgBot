import { User } from "telegraf/typings/core/types/typegram.js";
import getProperDB from "../extra/getProperDB.js";
import { getReqDB } from "../extra/getProperDB.js";
import getRandomId from "../extra/getRandomId.js";
import { DatabaseClient, RequestDBClient } from "../interfaces.js";
import { AIOSearchCriteria } from "../databases/interfaces/searchCriteria.js";
import { AIODocument } from "../databases/interfaces/aIO.js";
import { SortDocument } from "../databases/interfaces/sort.js";
import { InviteUser } from "../databases/interfaces/inviteUser.js";
import { IConfigDocument } from "../databases/interfaces/config.js";

class Database {
  client: DatabaseClient;

  constructor() {
    this.client = getProperDB();
  }

  async initialize() {
    await this.client.initialize();
  }

  async saveMessages(messageIds: number[]) {
    const shareId = getRandomId();
    await this.client.saveMessages(shareId, messageIds);

    return shareId;
  }
  async createOrUpdateTracker(counter?: number) {
    return await this.client.createOrUpdateTracker(counter);
  }
  async saveAIO(aIODocument: AIODocument) {
    await this.client.saveAIO(aIODocument);
    return aIODocument.shareId;
  }
  async saveSort(sortDocument: SortDocument) {
    await this.client.saveSort(sortDocument);
    return sortDocument;
  }
  async removeFirstItem() {
    return await this.client.removeFirstItem();
  }
  async getAllAIO() {
    return await this.client.getAllAIO();
  }
  async deleteCollection() {
    return await this.client.deleteCollection();
  }

  async searchAIO(searchCriteria: AIOSearchCriteria) {
    return await this.client.searchAIO(searchCriteria);
  }

  async getAIOMessages(shareId: number) {
    return this.client.getAIOMessages(shareId);
  }

  async saveUser(user: User) {
    return this.client.saveUser(user);
  }

  async getMessages(shareId: number) {
    return this.client.getMessages(shareId);
  }
  async addAIO(shareId: number, eps: number[]) {
    return this.client.addAIO(shareId, eps);
  }

  async deleteAIO(shareId: number) {
    return this.client.deleteAIO(shareId);
  }

  async updateAIOAttribute(shareId: number, attribute: any) {
    return this.client.updateAIOAttribute(shareId, attribute);
  }
  async addInvite(userId: string, invitedUsername: string, invitedUserId: string) {
    await this.client.addInvite(userId, invitedUsername, invitedUserId);
  }

  async getInviteUser(userId: string): Promise<InviteUser | null> {
    return await this.client.getInviteUser(userId);
  }

  async canRequest(userId: string): Promise<boolean> {
    return await this.client.canRequest(userId);
  }

  async useRequest(userId: string) {
    await this.client.useRequest(userId);
  }
  // Getters - returning either a value or null
  async getStringSession(): Promise<string | null> {
    return await this.client.getStringSession();
  }

  async getApiKey(): Promise<string | null> {
    return await this.client.getApiKey();
  }

  async getApiHash(): Promise<string | null> {
    return await this.client.getApiHash();
  }

  async getBotTokens(): Promise<string[] | null> {
    return await this.client.getBotTokens();
  }

  async getSingleBotToken(): Promise<string | null> {
    return await this.client.getSingleBotToken();
  }

  async getPromo(): Promise<string | null> {
    return await this.client.getPromo();
  }

  async getAdminIds(): Promise<string[] | null> {
    return await this.client.getAdminIds();
  }

  async getAllowGroups(): Promise<boolean | null> {
    return await this.client.getAllowGroups();
  }

  // Setters - accepting string, string[], boolean, or null
  async setStringSession(value: string): Promise<void> {
    await this.client.setStringSession(value);
  }

  async setApiKey(value: string): Promise<void> {
    await this.client.setApiKey(value);
  }

  async setApiHash(value: string): Promise<void> {
    await this.client.setApiHash(value);
  }

  async setBotTokens(value: string[]): Promise<void> {
    await this.client.setBotTokens(value);
  }

  async setSingleBotToken(value: string): Promise<void> {
    await this.client.setSingleBotToken(value);
  }

  async setPromo(value: string): Promise<void> {
    await this.client.setPromo(value);
  }

  async setAdminIds(value: string[]): Promise<void> {
    await this.client.setAdminIds(value);
  }

  async setAllowGroups(value: boolean): Promise<void> {
    await this.client.setAllowGroups(value);
  }

  // Update the configuration with partial updates
  async updateConfig(
    updates: Partial<{
      stringSession: string | null;
      apiKey: string | null;
      apiHash: string | null;
      botTokens: string[] | null;
      singleBotToken: string | null;
      promo: string | null;
      adminIds: string[] | null;
      allowGroups: boolean | null;
    }>
  ): Promise<void> {
    await this.client.updateConfig(updates);
  }

  // Get the entire configuration, or null if not found
  async getConfig(): Promise<IConfigDocument | null> {
    return await this.client.getConfig();
  }
}

class ReqDB {
  reqClient: RequestDBClient;
  constructor() {
    this.reqClient = getReqDB();
  }
  async initialize() {
    await this.reqClient.initialize();
  }

  async addUserRequest(userId: string) {
    return this.reqClient.addUserRequest(userId);
  }
  // async clearData() {
  //   return this.reqClient.clearData();
  // }
  async hasReachedRequestLimit(userId: string) {
    return this.reqClient.hasReachedRequestLimit(userId);
  }
  async saveRequestData(userId: string) {
    return this.reqClient.saveRequestData(userId);
  }
  // async checkAndReset() {
  //   return this.reqClient.checkAndReset();
  // }
}
const database = new Database();
const reqDB = new ReqDB();
export { reqDB };
export default database;
