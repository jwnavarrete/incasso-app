import { NextRequest, NextResponse } from "next/server";
import { AuthMiddleware, SlugMiddleware } from "@/common/middleware";
import { TenantMiddleware } from "./common/middleware/tenant.middleware";

export const config = {
  matcher: [
    "/((?!api/|_next/|static/|_vercel|[\\w-]+\\.\\w+).*)", // Excluye /static/
  ],
};

export default async function middleware(req: NextRequest) {
  const url = new URL(req.url || "");
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // VALIDAMOS EL SLUG
  // return NextResponse.next();
  console.log("subdomain", subdomain);

  const slugResponse = await SlugMiddleware(subdomain);
  if (slugResponse) {
    console.log("slugResponse");
    return slugResponse;
  }

  const authResponse = await AuthMiddleware(subdomain, req);
  if (authResponse) {
    console.log("authResponse");
    return authResponse;
  }

  const tenantResponse = await TenantMiddleware(subdomain, req);
  if (tenantResponse) {
    console.log("tenantResponse");
    return tenantResponse;
  }

  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));

  // return new Response(null, { status: 404 });
}
