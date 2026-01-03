import { Types, model, Schema } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true, unique: true },
});

export const tagsModel = model("tags", schema);
