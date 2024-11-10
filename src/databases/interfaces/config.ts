import { Document } from "mongoose";

export interface IConfigDocument extends Document {
  stringSession: string;
  apiKey: string;
  apiHash: string;
  botTokens: string[];
  singleBotToken: string;
  promo: string;
  adminIds: string[];
  allowGroups: boolean;
}
