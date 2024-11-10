import mongoose, { Document, Schema, Model } from "mongoose";
import { TrackerDocument } from "../interfaces/tracker";

const userSchema: Schema<TrackerDocument> = new Schema({
  counter: { type: Number, required: true },
});

const TrackerModel: Model<TrackerDocument> = mongoose.model<TrackerDocument>("counter", userSchema);

export default TrackerModel;
