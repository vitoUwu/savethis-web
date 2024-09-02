import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  if (event.path === "/logout") {
    setCookie(event, "auth", "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
    event.context.auth = null;
    return sendRedirect(event, "/login");
  }
  if (event.path === "/login") {
    return;
  }

  const isApi = event.path.startsWith("/api");
  const cookie = getCookie(event, "auth");
  if (!cookie) {
    if (isApi) {
      return;
    }

    return sendRedirect(event, "/login");
  }

  try {
    const auth = jwt.verify(cookie, process.env.JWT_SECRET as string);
    if (!auth) {
      if (isApi) {
        return;
      }

      return sendRedirect(event, "/login");
    }
    event.context.auth = auth;
  } catch (error) {
    return sendRedirect(event, "/login");
  }
});
