import { PostModel } from "~/server/models/post.schema";

export default defineEventHandler(async (event) => {
  try {
    const key = getQuery(event).key;
    if (!key) {
      return new Response("key param is required", { status: 400 });
    }

    return await PostModel.deleteOne({ postKey: key });
  } catch (error) {
    return error;
  }
});
