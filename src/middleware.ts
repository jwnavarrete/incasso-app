import { NextResponse } from "next/server";
import subdomains from "./subdomains.json";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  const hostname = req.headers.get("host") || "";

  // Define list of allowed domains
  // (including localhost and your deployed domain)
  const allowedDomains = ["localhost:3000", "trillionclues.com.com", "yourdomain.com", "auth.localhost:3000"];

  // Check if the current hostname is in the list of allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));

  // Extract the potential subdomain from the URL
  const subdomain = hostname.split(".")[0];

  // If the subdomain is not found in the subdomains.json file and it's not an allowed domain, redirect to a 404 page
  if (!subdomains.some(d => d.subdomain === subdomain) && !allowedDomains.includes(subdomain)) {
    console.log('subdomain not found:', subdomain);
    return NextResponse.redirect(new URL(`http://auth.localhost:3000/slug_not_found`));
  }

  // If user is on an allowed domain and it's not a subdomain, allow the request
  if (isAllowedDomain && !subdomains.some(d => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find(d => d.subdomain === subdomain);

  if (subdomainData) {
    // Rewrite the URL to a dynamic path based on the subdomain
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  return new Response(null, { status: 404 });
}