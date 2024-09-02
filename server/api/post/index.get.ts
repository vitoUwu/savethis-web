import { PostModel } from "~/server/models/post.schema";

export default defineEventHandler(async (event) => {
  try {
    const did = event.context.auth?.did;
    if (!did) {
      return new Response("Unauthorized", { status: 401 });
    }

    const queries = getQuery(event);
    const limit = Number(queries.limit);
    const skip = Number(queries.skip);

    return await PostModel.find(
      { savedBy: did },
      {},
      {
        sort: { createdAt: -1 },
        limit: isNaN(limit) ? 50 : limit,
        skip: isNaN(skip) ? 0 : skip,
      }
    );
  } catch (error) {
    return error;
  }
});
