import { AtpAgent } from "@atproto/api";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  console.log(process.env.JWT_SECRET);
  try {
    const client = new AtpAgent({
      service: "https://bsky.social",
    });

    const body = await readBody(event);
    const handle = body.handle;
    const password = body.password;
    const code = body.code;

    if (!handle || !password) {
      return new Response("handle and password are required", { status: 400 });
    }

    if (typeof handle !== "string" || typeof password !== "string") {
      return new Response("handle and password must be strings", {
        status: 400,
      });
    }

    const session = await client.login({
      identifier: handle,
      password,
      authFactorToken: code,
    });

    const { did, email, handle: _handle } = session.data;

    const token = jwt.sign(
      {
        did,
        email,
        handle: _handle,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    setCookie(event, "auth", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 3600,
    });

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    throw createError({
      statusCode: 500,
      message: "Something went wrong :(",
    });
  }
});
