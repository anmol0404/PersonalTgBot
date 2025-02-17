import mongoose, { Document, Schema, Model } from "mongoose";
import { InviteUser } from "../interfaces/inviteUser.js";

export interface IUserDocument extends InviteUser, Document {}

const userSchema: Schema<IUserDocument> = new Schema({
  userId: { type: String, required: true },
  invites: [
    {
      username: { type: String, required: true },
      userId: { type: String, required: true },
    },
  ],
  lastRequestDate: { type: Date, default: Date.now },
  dailyRequests: { type: Number, default: 1 },
});

const InviteModel: Model<IUserDocument> = mongoose.model<IUserDocument>("InviteUser", userSchema);

export default InviteModel;
