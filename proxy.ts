// proxy.ts (Project Root Folder)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 💡 Next.js 16 upgrade code: middleware active name ekhon proxy() hobey
export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // 1. Current host split calculation rules
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname.replace(`.biteflow.com`, "")
      : hostname.replace(`.localhost:3000`, "");

  // 2. Main core landing platform safety route bypass
  if (
    currentHost === "biteflow.com" ||
    currentHost === "localhost:3000" ||
    currentHost === ""
  ) {
    return NextResponse.next();
  }

  // 3. Prevent recursive routing execution loops loops loop loop
  if (url.pathname.startsWith("/app.restaurant")) {
    return NextResponse.next();
  }

  // 4. Dynamic Router Intercept Target Rewrite Node
  console.log(
    `[BiteFlow Proxy Engine] Routing Subdomain Request: ${currentHost} ──> /app.restaurant/${currentHost}${url.pathname}`,
  );

  return NextResponse.rewrite(
    new URL(`/app.restaurant/${currentHost}${url.pathname}`, request.url),
  );
}

// 5. System Matcher Configurations filter layout
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
