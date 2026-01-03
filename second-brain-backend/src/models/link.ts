import { model, Schema, Types } from "mongoose";

const schema = new Schema({
  hash: { type: String, required: true },
  contentId: { type: Types.ObjectId, ref: "content", required: true },
  userId: { type: Types.ObjectId, ref: "users", required: true },
});

export const linkModel = model("links", schema);
