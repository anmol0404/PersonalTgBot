import mongoose, { Document, Schema, Model } from "mongoose";
import { IConfigDocument } from "../interfaces/config";

const configSchema: Schema<IConfigDocument> = new Schema({
  stringSession: { type: String, required: true },
  apiKey: { type: String, required: true },
  apiHash: { type: String, required: true },
  botTokens: { type: [String], required: true },
  singleBotToken: { type: String, required: true },
  promo: { type: String, required: true },
  adminIds: { type: [String], required: true },
  allowGroups: { type: Boolean, default: false },
});

const ConfigModel: Model<IConfigDocument> = mongoose.model<IConfigDocument>(
  "Configuration",
  configSchema
);

export default ConfigModel;
