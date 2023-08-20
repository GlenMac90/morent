import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhooks/clerk", "/api/uploadthing", "/"],

  ignoredRoutes: ["/api/webhooks/clerk", "/test"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
