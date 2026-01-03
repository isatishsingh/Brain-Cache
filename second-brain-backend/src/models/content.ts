import { Schema, Types, model } from "mongoose";

const contentType = [
  "youtube",
  "image",
  "link",
  "document",
  "video",
  "social",
  "article",
  "twitter",
  "other",
];
const schema = new Schema(
  {
    link: { type: String, required: true },
    type: { type: String, enum: contentType, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "tags" }],
    userId: { type: Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

export const content = model("content", schema);
