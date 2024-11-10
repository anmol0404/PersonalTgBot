import mongoose, { Schema } from "mongoose";
var userSchema = new Schema({
    counter: { type: Number, required: true },
});
var TrackerModel = mongoose.model("counter", userSchema);
export default TrackerModel;
