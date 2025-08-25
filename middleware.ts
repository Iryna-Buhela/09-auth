import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  let refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken && refreshToken) {
    try {
      const data = await checkServerSession();
      const setCookie = data?.headers?.["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          };

          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);

          accessToken = parsed.accessToken ?? accessToken;
          refreshToken = parsed.refreshToken ?? refreshToken;
        }
      }
    } catch {
      accessToken = undefined;
      refreshToken = undefined;
    }
  }

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
