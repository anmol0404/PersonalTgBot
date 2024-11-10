import mongoose, { Schema } from "mongoose";
var configSchema = new Schema({
    stringSession: { type: String, required: true },
    apiKey: { type: String, required: true },
    apiHash: { type: String, required: true },
    botTokens: { type: [String], required: true },
    singleBotToken: { type: String, required: true },
    promo: { type: String, required: true },
    adminIds: { type: [String], required: true },
    allowGroups: { type: Boolean, default: false },
});
var ConfigModel = mongoose.model("Configuration", configSchema);
export default ConfigModel;
