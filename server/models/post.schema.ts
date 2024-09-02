import { defineMongooseModel } from "#nuxt/mongoose";

export interface IPost {
  postKey: string;
  savedBy: string;
  uri: string;
  cid: string;
}

export const PostModel = defineMongooseModel<IPost>({
  name: "Post",
  schema: {
    savedBy: {
      required: true,
      type: String,
      index: true,
    },
    postKey: {
      required: true,
      type: String,
      unique: true,
    },
    uri: {
      required: true,
      type: String,
    },
    cid: {
      required: true,
      type: String,
    },
  },
  options: {
    timestamps: true,
  },
});
